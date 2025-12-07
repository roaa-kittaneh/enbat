import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  bucket: string;
  folder?: string;
  maxSizeMB?: number;
  className?: string;
};

export function ImageUpload({
  value,
  onChange,
  label = "Image",
  bucket,
  folder = "",
  maxSizeMB = 5,
  className,
}: ImageUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSizeMB}MB.`,
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      if (data?.publicUrl) {
        onChange(data.publicUrl);
        toast({
          title: "Success",
          description: "Image uploaded successfully.",
        });
      } else {
        throw new Error("Failed to get public URL");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      setPreview(null);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Update preview when value changes externally
  useEffect(() => {
    if (value && value !== preview) {
      setPreview(value);
    } else if (!value) {
      setPreview(null);
    }
  }, [value]);

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      
      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-secondary">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleButtonClick}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Replace
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF up to {maxSizeMB}MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      {value && (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={value}
            readOnly
            className="text-xs"
            placeholder="Image URL will appear here"
          />
        </div>
      )}
    </div>
  );
}
