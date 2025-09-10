import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Users,
  BookOpen,
  Zap,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const kpiData = [
  {
    icon: Users,
    label: "Total Members",
    value: "12,547",
    change: "+12%",
    color: "text-primary",
  },
  {
    icon: Users,
    label: "Communities",
    value: "48",
    change: "+3",
    color: "text-accent-foreground",
  },
  {
    icon: BookOpen,
    label: "Active Courses",
    value: "156",
    change: "+8",
    color: "text-chart-3",
  },
  {
    icon: Zap,
    label: "AI Queries Today",
    value: "2,847",
    change: "+24%",
    color: "text-chart-4",
  },
  {
    icon: DollarSign,
    label: "Monthly Revenue",
    value: "$48,596",
    change: "+18%",
    color: "text-chart-5",
  },
];

const revenueData = [
  { name: "Jan", value: 28000 },
  { name: "Feb", value: 32000 },
  { name: "Mar", value: 35000 },
  { name: "Apr", value: 42000 },
  { name: "May", value: 38000 },
  { name: "Jun", value: 48596 },
];

const aiQueriesData = [
  { name: "Mon", queries: 1200 },
  { name: "Tue", queries: 1850 },
  { name: "Wed", queries: 2100 },
  { name: "Thu", queries: 1900 },
  { name: "Fri", queries: 2400 },
  { name: "Sat", queries: 2847 },
  { name: "Sun", queries: 2200 },
];

const recentActivity = [
  {
    type: "signup",
    user: "Alex Chen",
    action: "joined the platform",
    time: "2 minutes ago",
    avatar: "AC",
  },
  {
    type: "course",
    user: "Sarah Wilson",
    action: 'completed "AI Fundamentals"',
    time: "15 minutes ago",
    avatar: "SW",
  },
  {
    type: "blog",
    user: "Admin",
    action: 'published "Future of AI Learning"',
    time: "1 hour ago",
    avatar: "AD",
  },
  {
    type: "community",
    user: "Mike Johnson",
    action: 'created "ML Engineers" community',
    time: "2 hours ago",
    avatar: "MJ",
  },
  {
    type: "payment",
    user: "Emma Davis",
    action: "purchased premium membership",
    time: "3 hours ago",
    avatar: "ED",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <Button className="gradient-primary text-black font-medium hover:scale-105 transition-transform">
          <TrendingUp className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={index}
              className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 hover:neon-glow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-accent/20 text-accent-foreground border-accent-foreground/20"
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">
                    {kpi.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="glassmorphism border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent-foreground" />
              Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00FF9D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00FF9D" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,255,255,0.1)"
                />
                <XAxis dataKey="name" stroke="#A0A9B8" />
                <YAxis stroke="#A0A9B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(16, 24, 40, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#00FF9D"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Queries Chart */}
        <Card className="glassmorphism border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              AI Queries This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aiQueriesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,255,255,0.1)"
                />
                <XAxis dataKey="name" stroke="#A0A9B8" />
                <YAxis stroke="#A0A9B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(16, 24, 40, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="#00FFFF"
                  strokeWidth={3}
                  dot={{ fill: "#00FFFF", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-chart-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 border border-primary/10 hover:border-primary/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center text-black font-bold text-sm">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-foreground">
                    <span className="font-medium text-primary">
                      {activity.user}
                    </span>{" "}
                    {activity.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary"
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
