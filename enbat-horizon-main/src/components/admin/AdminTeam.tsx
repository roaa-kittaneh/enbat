
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
import { ImageUpload } from "./ImageUpload";

type MemberRow = Tables<"members">;
type MemberInsert = TablesInsert<"members">;
type MemberUpdate = TablesUpdate<"members">;

export function AdminTeam() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Default form state matching database schema
    const defaultForm: {
        name: string;
        role: string;
        description: string;
        image_url: string;
    } = {
        name: "",
        role: "",
        description: "",
        image_url: "",
    };

    const [formData, setFormData] = useState(defaultForm);

    // Fetch Team Members
    const { data: team, isLoading } = useQuery({
        queryKey: ["members"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("members")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as MemberRow[];
        },
    });

    // Create/Update Team Member
    const mutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const payload: MemberInsert | MemberUpdate = {
                name: data.name || null,
                role: data.role || null,
                description: data.description || null,
                image_url: data.image_url || null,
            };

            if (editingId) {
                const { error } = await supabase
                    .from("members")
                    .update(payload as MemberUpdate)
                    .eq("id", editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("members").insert([payload as MemberInsert]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            setIsOpen(false);
            resetForm();
            toast({ title: "Success", description: `Team member ${editingId ? "updated" : "added"} successfully.` });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    // Delete Team Member
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from("members").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            toast({ title: "Success", description: "Team member removed." });
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

    const handleEdit = (member: MemberRow) => {
        setFormData({
            name: member.name || "",
            role: member.role || "",
            description: member.description || "",
            image_url: member.image_url || "",
        });
        setEditingId(member.id);
        setIsOpen(true);
    };

    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin mx-auto" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Team Members</h2>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Member</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Member" : "Add New Member"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input
                                    id="role"
                                    placeholder="e.g. CEO, Lead Developer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description about the team member"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <ImageUpload
                                value={formData.image_url}
                                onChange={(url) => setFormData({ ...formData, image_url: url })}
                                label="Profile Image"
                                bucket="team"
                                folder="avatars"
                                maxSizeMB={5}
                            />
                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update" : "Add Member"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {team?.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>
                                    {member.image_url ? (
                                        <img
                                            src={member.image_url}
                                            alt={member.name || "Team member"}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                            {member.name?.charAt(0) || "?"}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{member.name || "-"}</TableCell>
                                <TableCell>{member.role || "-"}</TableCell>
                                <TableCell className="max-w-md truncate">{member.description || "-"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => {
                                            if (confirm("Delete this member?")) deleteMutation.mutate(member.id);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {team?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No team members found. Add one above.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
