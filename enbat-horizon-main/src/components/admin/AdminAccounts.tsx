
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import type { Tables, TablesUpdate } from "@/integrations/supabase/database.types";

type AdminAccountRow = Tables<"admin-accounts">;
type AdminAccountUpdate = TablesUpdate<"admin-accounts">;

const SUPER_ADMIN_EMAIL = import.meta.env.VITE_SUPER_ADMIN_EMAIL || "";

export function AdminAccounts() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Fetch Admin Accounts
    const { data: accounts, isLoading } = useQuery({
        queryKey: ["admin-accounts"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("admin-accounts")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as AdminAccountRow[];
        },
    });

    // Confirm Account
    const confirmMutation = useMutation({
        mutationFn: async (id: number) => {
            const payload: AdminAccountUpdate = {
                status: "confirmed",
            };
            const { error } = await supabase
                .from("admin-accounts")
                .update(payload)
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-accounts"] });
            toast({ title: "Success", description: "Account confirmed successfully." });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    // Unconfirm Account
    const unconfirmMutation = useMutation({
        mutationFn: async (id: number) => {
            const payload: AdminAccountUpdate = {
                status: "pending",
            };
            const { error } = await supabase
                .from("admin-accounts")
                .update(payload)
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-accounts"] });
            toast({ title: "Success", description: "Account unconfirmed successfully." });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const handleConfirm = (id: number) => {
        if (confirm("Confirm this admin account?")) {
            confirmMutation.mutate(id);
        }
    };

    const handleUnconfirm = (id: number) => {
        if (confirm("Unconfirm this admin account? They will lose access to the admin panel.")) {
            unconfirmMutation.mutate(id);
        }
    };

    const isSuperAdmin = (email: string | null) => {
        return email && SUPER_ADMIN_EMAIL && email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin mx-auto" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Admin Accounts</h2>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>User ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accounts?.map((account) => {
                            const isSuperAdminAccount = isSuperAdmin(account.email);
                            return (
                                <TableRow key={account.id}>
                                    <TableCell className="font-medium">
                                        {account.email || "-"}
                                        {isSuperAdminAccount && (
                                            <span className="ml-2 text-xs text-primary font-semibold">(Super Admin)</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">{account.user_id || "-"}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded text-xs border ${
                                                account.status === "confirmed"
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                            }`}
                                        >
                                            {account.status?.toUpperCase() || "PENDING"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {account.created_at
                                            ? new Date(account.created_at).toLocaleDateString()
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {!isSuperAdminAccount && (
                                            <>
                                                {account.status !== "confirmed" ? (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleConfirm(account.id)}
                                                        disabled={confirmMutation.isPending}
                                                    >
                                                        {confirmMutation.isPending ? (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                                        )}
                                                        Confirm
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleUnconfirm(account.id)}
                                                        disabled={unconfirmMutation.isPending}
                                                    >
                                                        {unconfirmMutation.isPending ? (
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                        )}
                                                        Unconfirm
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                        {isSuperAdminAccount && (
                                            <span className="text-xs text-muted-foreground">Protected</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {accounts?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No admin accounts found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

