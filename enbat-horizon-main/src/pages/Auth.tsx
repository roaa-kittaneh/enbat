import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const { isLoggedIn, signIn, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data: FormValues) => {
    if (isLogin) {
      // Sign In
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error,
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Logged in successfully!" });
      // Navigation will happen via useEffect when isLoggedIn updates
    } else {
      // Sign Up
      const { error } = await registerUser(data.email, data.password);
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error,
          variant: "destructive",
        });
        return;
      }
      toast({ 
        title: "Account created!",
        description: "Please wait for admin confirmation to access the system."
      });
      reset();
      // Switch to login mode after successful registration
      setIsLogin(true);
    }
  };

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-24 bg-hero">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="card-elevated p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin ? "Sign in to continue" : "Create a new account"}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* EMAIL */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isLogin ? " Signing in..." : " Creating account..."}
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            {/* SWITCH MODE */}
            <div className="mt-6 text-center">
              <p className="text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                  disabled={isSubmitting}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}