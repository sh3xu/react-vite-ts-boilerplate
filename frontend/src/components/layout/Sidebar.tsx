import {
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    subItems: [{ name: "All Users", href: "/admin/users" }],
  },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    subItems: [
      { name: "General", href: "/admin/settings/general" },
      { name: "System", href: "/admin/settings/system" },
      { name: "Email", href: "/admin/settings/email" },
      { name: "API", href: "/admin/settings/api" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
  const toggleSidebarCollapsed = useUIStore((state) => state.toggleSidebarCollapsed);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false);
        if (!sidebarOpen) {
          setSidebarOpen(false);
        }
      } else {
        if (!sidebarOpen) {
          setSidebarOpen(true);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarCollapsed, setSidebarOpen, sidebarOpen]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemName)) {
        next.delete(itemName);
      } else {
        next.add(itemName);
      }
      return next;
    });
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    const cleanHref = href.replace(":id", "");
    if (location.pathname === cleanHref) {
      return true;
    }
    if (cleanHref.includes("/:id")) {
      const basePath = cleanHref.replace("/:id", "");
      return location.pathname.startsWith(`${basePath}/`) && location.pathname !== basePath;
    }
    return location.pathname.startsWith(`${cleanHref}/`);
  };

  const isMainItemActive = (item: NavItem) => {
    if (location.pathname === item.href) {
      return true;
    }
    if (item.subItems) {
      return item.subItems.some((subItem) => {
        const subHref = subItem.href.replace(":id", "");
        return isActive(subHref);
      });
    }
    return false;
  };

  const hasActiveSubItem = (item: NavItem) => {
    if (!item.subItems) return false;
    return item.subItems.some((subItem) => {
      const subHref = subItem.href.replace(":id", "");
      return isActive(subHref);
    });
  };

  const displayUser = user || {
    name: "Admin User",
    email: "admin@example.com",
    avatar: undefined,
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.has(item.name);

    if (sidebarCollapsed) {
      if (hasSubItems) {
        const mainItemActive = isMainItemActive(item);
        const hasActiveSub = hasActiveSubItem(item);
        return (
          <li key={item.name}>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex items-center justify-center w-full rounded-lg p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        (mainItemActive || hasActiveSub) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
              <DropdownMenuContent side="right" align="start" className="w-48">
                <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {item.subItems?.map((subItem) => {
                  const subHref = subItem.href.replace(":id", "");
                  const subItemActive = isActive(subHref);
                  return (
                    <DropdownMenuItem
                      key={subItem.name}
                      onClick={() => {
                        navigate(subHref);
                        handleLinkClick();
                      }}
                      className={cn("cursor-pointer", subItemActive && "bg-accent font-medium")}
                    >
                      {subItem.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        );
      }

      const itemActive = isActive(item.href);
      return (
        <li key={item.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center justify-center w-full rounded-lg p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  itemActive && "bg-accent text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        </li>
      );
    }

    if (hasSubItems) {
      const mainItemActive = isMainItemActive(item);
      const hasActiveSub = hasActiveSubItem(item);
      return (
        <li key={item.name}>
          <button
            type="button"
            onClick={() => toggleExpanded(item.name)}
            className={cn(
              "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              (mainItemActive || hasActiveSub) && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {isExpanded && (
            <ul className="mt-1 space-y-1 pl-4 border-l-2 border-border ml-3">
              {item.subItems?.map((subItem) => {
                const subHref = subItem.href.replace(":id", "");
                const subItemActive = isActive(subHref);
                return (
                  <li key={subItem.name}>
                    <Link
                      to={subHref}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        subItemActive && "bg-accent text-accent-foreground font-medium"
                      )}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    const itemActive = isActive(item.href);
    return (
      <li key={item.name}>
        <Link
          to={item.href}
          onClick={handleLinkClick}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            itemActive && "bg-accent text-accent-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          <span>{item.name}</span>
        </Link>
      </li>
    );
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300 ease-in-out z-40 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          sidebarCollapsed && sidebarOpen ? "w-16" : sidebarOpen ? "w-64" : "w-0 lg:w-64",
          !sidebarOpen && "lg:w-64",
          !sidebarOpen && isMobile && "w-0"
        )}
      >
        {!isMobile && (
          <div className="relative">
            <button
              type="button"
              onClick={toggleSidebarCollapsed}
              className="absolute -right-3 top-4 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md transition-all hover:bg-accent"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        )}
        <nav
          className={cn(
            "flex-1 p-4 flex flex-col",
            sidebarOpen ? "overflow-y-auto opacity-100" : "overflow-hidden opacity-0 lg:opacity-100",
            !sidebarOpen && isMobile && "hidden lg:flex"
          )}
        >
          <ul className="space-y-2 flex-1">{navigation.map(renderNavItem)}</ul>
        </nav>
        <div className={cn("p-4", !sidebarCollapsed && "border-t", !sidebarOpen && isMobile && "hidden lg:block")}>
          {sidebarCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center justify-center w-full rounded-lg p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Avatar size="sm">
                        {displayUser.avatar && <AvatarImage src={displayUser.avatar} alt={displayUser.name} />}
                        <AvatarFallback>{getInitials(displayUser.name)}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleLinkClick();
                      }}
                      className="cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/admin/settings");
                        handleLinkClick();
                      }}
                      className="cursor-pointer"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} variant="destructive" className="cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">{displayUser.name}</TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Avatar size="sm">
                    {displayUser.avatar && <AvatarImage src={displayUser.avatar} alt={displayUser.name} />}
                    <AvatarFallback>{getInitials(displayUser.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium truncate">{displayUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{displayUser.email}</p>
                  </div>
                  <MoreVertical className="h-4 w-4 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleLinkClick();
                  }}
                  className="cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/admin/settings");
                    handleLinkClick();
                  }}
                  className="cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} variant="destructive" className="cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
