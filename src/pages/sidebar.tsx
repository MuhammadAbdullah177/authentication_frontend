import {
  Home,
  Users,
  Settings,
  Package,
  Calendar,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export function Sidebar({
  isCollapsed,
  toggleSidebar,
  activeItem,
  setActiveItem,
}: SidebarProps) {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Calendar", icon: Calendar, path: "/calendar" },
    { name: "Chats", icon: MessageSquare, path: "/chat" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen bg-[#1a1a1a] border-r border-white/10 shadow-xl transition-all duration-300 ease-in-out md:relative ${
        isCollapsed ? "w-16 md:w-20" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
              IntelliCore
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-gray-200"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    activeItem === item.name
                      ? "bg-white/10 text-[#60a5fa]"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setActiveItem(item.name);
                    navigate(item.path);
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto px-2 pb-4">
          <div
            className={`mb-4 flex items-center gap-3 rounded-lg px-3 py-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Avatar className="h-10 w-10 border border-white/10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-200">
                  John Doe
                </span>
                <span className="text-xs text-gray-400">john@example.com</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-400 hover:text-gray-200 hover:bg-white/5"
            onClick={() => navigate("/login")}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}