import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminServices } from "@/components/admin/AdminServices";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminTeam } from "@/components/admin/AdminTeam";
import { AdminServiceType } from "@/components/admin/AdminServiceType";
import { AdminAccounts } from "@/components/admin/AdminAccounts";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Admin() {
    const { isLoggedIn, isConfirmed } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/auth");
        }
    }, [isLoggedIn, navigate]);

    // Show loading while auth state is being determined
    if (isLoggedIn === undefined) {
        return (
            <Layout>
                <div className="flex h-[50vh] items-center justify-center">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </Layout>
        );
    }

    // User is logged in but not confirmed
    if (isLoggedIn && !isConfirmed) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                    <ShieldAlert className="h-16 w-16 text-yellow-500 opacity-50" />
                    <h1 className="text-2xl font-bold">Account Pending Confirmation</h1>
                    <p className="text-muted-foreground max-w-md">
                        Your account is awaiting admin approval. You'll be able to access this page once your account has been confirmed.
                    </p>
                    <Button onClick={() => navigate("/")} variant="outline">
                        Return Home
                    </Button>
                </div>
            </Layout>
        );
    }

    // User is confirmed - show admin dashboard
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your website content, projects, and team members.
                    </p>
                </div>

                <Tabs defaultValue="projects" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="service-types">Service Types</TabsTrigger>
                        <TabsTrigger value="team">Team</TabsTrigger>
                        <TabsTrigger value="accounts">Accounts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="projects" className="space-y-4">
                        <AdminProjects />
                    </TabsContent>

                    <TabsContent value="services" className="space-y-4">
                        <AdminServices />
                    </TabsContent>

                    <TabsContent value="service-types" className="space-y-4">
                        <AdminServiceType />
                    </TabsContent>

                    <TabsContent value="team" className="space-y-4">
                        <AdminTeam />
                    </TabsContent>

                    <TabsContent value="accounts" className="space-y-4">
                        <AdminAccounts />
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}