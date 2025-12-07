
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/database.types";
import { ImageUpload } from "./ImageUpload";

type ProjectRow = Tables<"projects">;
type ProjectInsert = TablesInsert<"projects">;
type ProjectUpdate = TablesUpdate<"projects">;
type ServiceTypeRow = Tables<"service_type">;

export function AdminProjects() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Default form state matching database schema
    const defaultForm: {
        title: string;
        description: string;
        subtitle: string;
        logo_url: string;
        service_type: string; // Will be converted to number
        is_completed: boolean;
        year: string; // Will be converted to number
    } = {
        title: "",
        description: "",
        subtitle: "",
        logo_url: "",
        service_type: "",
        is_completed: false,
        year: new Date().getFullYear().toString(),
    };

    const [formData, setFormData] = useState(defaultForm);

    // Fetch Projects
    const { data: projects, isLoading: projectsLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as ProjectRow[];
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

    // Create/Update Project
    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const payload: ProjectInsert | ProjectUpdate = {
                title: data.title || null,
                description: data.description || null,
                subtitle: data.subtitle || null,
                logo_url: data.logo_url || null,
                service_type: data.service_type ? parseInt(data.service_type, 10) : null,
                is_completed: data.is_completed,
                year: data.year ? parseInt(data.year, 10) : null,
            };

            if (editingId) {
                const { error } = await supabase
                    .from("projects")
                    .update(payload as ProjectUpdate)
                    .eq("id", editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("projects").insert([payload as ProjectInsert]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            setIsOpen(false);
            resetForm();
            toast({ title: "Success", description: `Project ${editingId ? "updated" : "created"} successfully.` });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    // Delete Project
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast({ title: "Success", description: "Project deleted." });
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

    const handleEdit = (project: ProjectRow) => {
        setFormData({
            title: project.title || "",
            description: project.description || "",
            subtitle: project.subtitle || "",
            logo_url: project.logo_url || "",
            service_type: project.service_type ? String(project.service_type) : "",
            is_completed: project.is_completed ?? false,
            year: project.year ? String(project.year) : new Date().getFullYear().toString(),
        });
        setEditingId(project.id);
        setIsOpen(true);
    };

    if (projectsLoading) return <Loader2 className="h-8 w-8 animate-spin mx-auto" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Project" : "Add New Project"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    placeholder="Optional subtitle"
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

                            <div className="grid grid-cols-2 gap-4">
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

                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        placeholder={new Date().getFullYear().toString()}
                                    />
                                </div>
                            </div>

                            <ImageUpload
                                value={formData.logo_url}
                                onChange={(url) => setFormData({ ...formData, logo_url: url })}
                                label="Project Logo"
                                bucket="projects"
                                folder="logos"
                                maxSizeMB={5}
                            />

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_completed"
                                    checked={formData.is_completed}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, is_completed: checked === true })
                                    }
                                />
                                <Label htmlFor="is_completed" className="cursor-pointer">
                                    Project is completed
                                </Label>
                            </div>

                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update" : "Create Project"}
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
                            <TableHead>Subtitle</TableHead>
                            <TableHead>Service Type</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects?.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.title || "-"}</TableCell>
                                <TableCell>{project.subtitle || "-"}</TableCell>
                                <TableCell>
                                    {project.service_type
                                        ? serviceTypes?.find((st) => st.id === project.service_type)?.name || "-"
                                        : "-"}
                                </TableCell>
                                <TableCell>{project.year || "-"}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-xs border ${
                                            project.is_completed
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-gray-50 text-gray-700 border-gray-200"
                                        }`}
                                    >
                                        {project.is_completed ? "COMPLETED" : "IN PROGRESS"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => {
                                            if (confirm("Delete this project?")) deleteMutation.mutate(project.id);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {projects?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No projects found. Add one above.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
