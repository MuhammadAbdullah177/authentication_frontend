import { useState } from "react";
import { Sidebar } from "../pages/sidebar";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { MessageSquare, Calendar, Users, TrendingUp, DollarSign, Package, Activity } from "lucide-react";

export function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "2,234",
      change: "+15.3%",
      icon: Users,
    },
    {
      title: "New Orders",
      value: "345",
      change: "+5.7%",
      icon: Package,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+2.4%",
      icon: TrendingUp,
    },
  ];

  const recentActivity = [
    {
      user: "John Doe",
      action: "Completed task",
      description: "Update dashboard design",
      time: "2 hours ago",
      avatar: "https://github.com/shadcn.png",
    },
    {
      user: "Jane Smith",
      action: "Added new product",
      description: "Premium Package",
      time: "4 hours ago",
      avatar: "https://github.com/shadcn.png",
    },
    {
      user: "Mike Johnson",
      action: "Sent message",
      description: "Project update",
      time: "6 hours ago",
      avatar: "https://github.com/shadcn.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
      <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <Button
              variant="ghost"
              className="md:hidden text-gray-400 hover:text-gray-200"
                onClick={toggleMobileSidebar}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 border-0 bg-white/10 backdrop-blur-md shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-200 mt-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-emerald-400 mt-1">
                      {stat.change}
                    </p>
            </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#c084fc]">
                    <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
              </Card>
            ))}
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Chart */}
            <Card className="border-0 bg-white/10 backdrop-blur-md shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-4">
                  Revenue Overview
                </h3>
                <div className="h-[300px] flex items-center justify-center">
                  <Activity className="h-24 w-24 text-[#60a5fa]" />
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 bg-white/10 backdrop-blur-md shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <Avatar className="border border-white/10">
                        <AvatarImage src={activity.avatar} />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                    </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-200">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-400">
                          {activity.action} "{activity.description}"
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  </div>
              </div>
            </Card>
          </div>

          {/* Calendar and Messages Preview */}
          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
            {/* Calendar */}
            <Card className="border-0 bg-white/10 backdrop-blur-md shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-4">
                  Upcoming Events
                </h3>
                <div className="flex items-center justify-center h-[300px]">
                  <Calendar className="h-24 w-24 text-[#60a5fa]" />
                </div>
            </div>
          </Card>

            {/* Messages */}
            <Card className="border-0 bg-white/10 backdrop-blur-md shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-4">
                  Recent Messages
                </h3>
                <div className="flex items-center justify-center h-[300px]">
                  <MessageSquare className="h-24 w-24 text-[#60a5fa]" />
      </div>
    </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}