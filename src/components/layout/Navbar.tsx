import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.jpeg";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Sign In", href: "/auth" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Enbat Logo" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-semibold text-foreground">Enbat</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === link.href
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-muted-foreground text-xs">
                    {isAdmin ? "Admin" : "User"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            <Button asChild variant="hero" size="default">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === link.href
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    {user.email} ({isAdmin ? "Admin" : "User"})
                  </div>
                  <Button variant="outline" onClick={handleSignOut} className="mx-4">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button asChild variant="outline" className="mx-4">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              )}
              <Button asChild variant="hero" size="lg" className="mx-4">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
