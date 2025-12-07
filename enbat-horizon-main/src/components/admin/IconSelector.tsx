import { useState, useMemo } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import * as LucideIcons from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn, toKebabCase } from "@/lib/utils";

// Get all valid icon names from lucide-react
// Icons are exported as named exports, some have "Icon" suffix as aliases
const getIconNames = (): string[] => {
    const keys = Object.keys(LucideIcons);
    const validIcons: string[] = [];
    const seenIcons = new Set<string>();

    for (const key of keys) {
        // Skip if we've already added this icon (avoid duplicates from Icon suffix aliases)
        const baseName = key.endsWith("Icon") ? key.slice(0, -4) : key;
        if (seenIcons.has(baseName)) continue;
        
        if (key.length === 0 || key[0] !== key[0].toUpperCase()) continue;
        
        // Skip if it's an Icon alias (prefer the base name)
        if (key.endsWith("Icon")) {
            // Only add if base name doesn't exist
            if (!keys.includes(baseName)) {
                validIcons.push(key);
                seenIcons.add(baseName);
            }
            continue;
        }
        
        // Add the icon
        validIcons.push(key);
        seenIcons.add(baseName);
    }
    
    return validIcons.sort();
};

const iconNames = getIconNames();

// Debug: log icon count
console.log(`IconSelector: Loaded ${iconNames.length} icons`);

type IconSelectorProps = {
    value: string;
    onChange: (value: string) => void;
    label?: string;
};

export function IconSelector({ value, onChange, label = "Icon" }: IconSelectorProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Convert value to kebab-case for DynamicIcon
    const iconNameKebab = value ? toKebabCase(value) : null;

    // Filter icons based on search
    const filteredIcons = useMemo(() => {
        if (!search) return iconNames;
        return iconNames.filter((name) =>
            name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        <div className="flex items-center gap-2">
                            {value && iconNameKebab ? (
                                <>
                                    <DynamicIcon name={iconNameKebab} className="h-4 w-4" />
                                    <span>{value}</span>
                                </>
                            ) : (
                                <span className="text-muted-foreground">Select an icon...</span>
                            )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0" align="start">
                    <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Input
                            placeholder="Search icons..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div className="max-h-[400px] overflow-y-auto p-3">
                        {filteredIcons.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No icon found.
                            </div>
                        ) : (
                            <div className="grid grid-cols-6 gap-2">
                                {filteredIcons.map((iconName) => {
                                    const iconKebab = toKebabCase(iconName);
                                    const isSelected = value === iconName;
                                    
                                    return (
                                        <button
                                            key={iconName}
                                            type="button"
                                            onClick={() => {
                                                onChange(iconName);
                                                setOpen(false);
                                                setSearch("");
                                            }}
                                            className={cn(
                                                "relative flex flex-col items-center justify-center p-3 cursor-pointer rounded-md border transition-colors hover:bg-accent",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                            title={iconName}
                                        >
                                            <DynamicIcon name={iconKebab} className="h-5 w-5 mb-1" />
                                            <span className="text-[10px] truncate w-full text-center leading-tight">
                                                {iconName}
                                            </span>
                                            {isSelected && (
                                                <Check className="h-3 w-3 absolute top-1 right-1" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
