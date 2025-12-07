
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/database.types";

type ServiceTypeRow = Tables<"service_type">;
type ServiceTypeInsert = TablesInsert<"service_type">;
type ServiceTypeUpdate = TablesUpdate<"service_type">;

export function AdminServiceType() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Default form state matching database schema
    const defaultForm: {
        name: string;
        description: string;
    } = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState(defaultForm);

    // Fetch Service Types
    const { data: serviceTypes, isLoading } = useQuery({
        queryKey: ["service_types"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("service_type")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as ServiceTypeRow[];
        },
    });

    // Create/Update Service Type
    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const payload: ServiceTypeInsert | ServiceTypeUpdate = {
                name: data.name || null,
                description: data.description || null,
            };

            if (editingId) {
                const { error } = await supabase
                    .from("service_type")
                    .update(payload as ServiceTypeUpdate)
                    .eq("id", editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("service_type").insert([payload as ServiceTypeInsert]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["service_types"] });
            setIsOpen(false);
            resetForm();
            toast({ title: "Success", description: `Service type ${editingId ? "updated" : "created"} successfully.` });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    // Delete Service Type
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from("service_type").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["service_types"] });
            toast({ title: "Success", description: "Service type deleted." });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const resetForm = () => {
        setFormData(defaultForm);
        setEditingId(null);
    };

    const handleEdit = (serviceType: ServiceTypeRow) => {
        setFormData({
            name: serviceType.name || "",
            description: serviceType.description || "",
        });
        setEditingId(serviceType.id);
        setIsOpen(true);
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin mx-auto" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Service Types</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Service Type</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Service Type" : "Add New Service Type"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Service Type Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update" : "Create Service Type"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {serviceTypes?.map((serviceType) => (
                            <TableRow key={serviceType.id}>
                                <TableCell className="font-medium">{serviceType.name || "-"}</TableCell>
                                <TableCell className="max-w-md truncate">{serviceType.description || "-"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(serviceType)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => {
                                            if (confirm("Delete this service type?")) deleteMutation.mutate(serviceType.id);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {serviceTypes?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                    No service types found. Add one above.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

