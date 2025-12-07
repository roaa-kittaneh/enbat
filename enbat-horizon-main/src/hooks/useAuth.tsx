import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type AuthUser = {
  email: string | null;
  isLoggedIn: boolean;
  isConfirmed: boolean;
  register: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthUser>({
  email: null,
  isLoggedIn: false,
  isConfirmed: false,
  register: async () => ({ error: "AuthContext not ready" }),
  signIn: async () => ({ error: "AuthContext not ready" }),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const loadUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setEmail(null);
      setIsLoggedIn(false);
      setIsConfirmed(false);
      return;
    }

    const userEmail = session.user.email;
    setEmail(userEmail);
    setIsLoggedIn(true);

    const { data: accountRecord } = await supabase
      .from("admin-accounts")
      .select("status")
      .eq("email", userEmail)
      .maybeSingle();

    setIsConfirmed(accountRecord?.status === "confirmed");
  };

  useEffect(() => {
    loadUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return { error: error.message };

    if (data.user) {
      // Check if this is the super admin email
      const superAdminEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL || "";
      const isSuperAdmin = superAdminEmail && email.toLowerCase() === superAdminEmail.toLowerCase();
      
      const { error: insertError } = await supabase
        .from("admin-accounts")
        .insert({
          email: data.user.email,
          user_id: data.user.id,
          status: isSuperAdmin ? "confirmed" : "pending",
        });

      if (insertError) return { error: insertError.message };
    }

    return {};
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    await loadUser();
    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await loadUser();
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        isLoggedIn,
        isConfirmed,
        register,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
