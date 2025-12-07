
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/database.types";
import { IconSelector } from "./IconSelector";
import { DynamicIcon } from "lucide-react/dynamic";
import { toKebabCase } from "@/lib/utils";

type ServiceRow = Tables<"services">;
type ServiceInsert = TablesInsert<"services">;
type ServiceUpdate = TablesUpdate<"services">;
type ServiceTypeRow = Tables<"service_type">;

export function AdminServices() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Default form state matching database schema
    const defaultForm: {
        title: string;
        description: string;
        icon: string;
        service_type: string; // Will be converted to number
    } = {
        title: "",
        description: "",
        icon: "",
        service_type: "",
    };

    const [formData, setFormData] = useState(defaultForm);

    // Fetch Services
    const { data: services, isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as ServiceRow[];
        },
    });

    // Fetch Service Types for Dropdown
    const { data: serviceTypes } = useQuery({
        queryKey: ["service_types"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("service_type")
                .select("id, name")
                .order("name", { ascending: true });
            if (error) throw error;
            return data as Pick<ServiceTypeRow, "id" | "name">[];
        },
    });

    // Create/Update Service
    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const payload: ServiceInsert | ServiceUpdate = {
                title: data.title || null,
                description: data.description || null,
                icon: data.icon || null,
                service_type: data.service_type ? parseInt(data.service_type, 10) : null,
            };

            if (editingId) {
                const { error } = await supabase
                    .from("services")
                    .update(payload as ServiceUpdate)
                    .eq("id", editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("services").insert([payload as ServiceInsert]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            setIsOpen(false);
            resetForm();
            toast({ title: "Success", description: `Service ${editingId ? "updated" : "created"} successfully.` });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    // Delete Service
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from("services").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toast({ title: "Success", description: "Service deleted." });
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

    const handleEdit = (service: ServiceRow) => {
        setFormData({
            title: service.title || "",
            description: service.description || "",
            icon: service.icon || "",
            service_type: service.service_type ? String(service.service_type) : "",
        });
        setEditingId(service.id);
        setIsOpen(true);
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin mx-auto" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Services</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Service" : "Add New Service"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Service Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                            <div className="space-y-2">
                                <Label>Service Type</Label>
                                <Select
                                    value={formData.service_type || undefined}
                                    onValueChange={(val) => setFormData({ ...formData, service_type: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Service Type (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceTypes?.map((st) => (
                                            <SelectItem key={st.id} value={String(st.id)}>
                                                {st.name || `Service Type ${st.id}`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formData.service_type && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setFormData({ ...formData, service_type: "" })}
                                        className="h-8 text-xs"
                                    >
                                        Clear selection
                                    </Button>
                                )}
                            </div>
                            <IconSelector
                                value={formData.icon}
                                onChange={(value) => setFormData({ ...formData, icon: value })}
                                label="Icon"
                            />
                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update" : "Create Service"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Service Type</TableHead>
                            <TableHead>Icon</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services?.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.title || "-"}</TableCell>
                                <TableCell className="max-w-md truncate">{service.description || "-"}</TableCell>
                                <TableCell>
                                    {service.service_type
                                        ? serviceTypes?.find((st) => st.id === service.service_type)?.name || "-"
                                        : "-"}
                                </TableCell>
                                <TableCell><DynamicIcon name={toKebabCase(service.icon) as any} className="h-5 w-5" /></TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => {
                                            if (confirm("Delete this service?")) deleteMutation.mutate(service.id);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {services?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No services found. Create one above.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
