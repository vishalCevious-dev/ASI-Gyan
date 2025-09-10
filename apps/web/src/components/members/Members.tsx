import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  UserCheck,
  Search,
  MoreHorizontal,
  Mail,
  UserX,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const members = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex.chen@email.com",
    role: "Student",
    status: "Active",
    joinedDate: "2024-01-15",
    avatar: "AC",
    courses: 12,
    communities: 5,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    role: "Instructor",
    status: "Active",
    joinedDate: "2024-02-20",
    avatar: "SW",
    courses: 3,
    communities: 8,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2024-01-08",
    avatar: "MJ",
    courses: 0,
    communities: 15,
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    role: "Student",
    status: "Active",
    joinedDate: "2024-03-10",
    avatar: "ED",
    courses: 8,
    communities: 3,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@email.com",
    role: "Student",
    status: "Inactive",
    joinedDate: "2024-02-28",
    avatar: "DB",
    courses: 2,
    communities: 1,
  },
];

const stats = [
  {
    label: "Total Members",
    value: "12,547",
    change: "+12%",
    color: "text-primary",
  },
  {
    label: "Active Members",
    value: "11,823",
    change: "+8%",
    color: "text-accent-foreground",
  },
  {
    label: "New This Month",
    value: "1,247",
    change: "+24%",
    color: "text-chart-4",
  },
  { label: "Instructors", value: "156", change: "+3", color: "text-chart-5" },
];

export function Members() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Members
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your platform members and their roles.
          </p>
        </div>
        <Button className="gradient-primary text-black font-medium hover:scale-105 transition-transform">
          <UserCheck className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glassmorphism border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-accent/20 text-accent-foreground border-accent-foreground/20"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="glassmorphism border-primary/20">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  className="pl-10 bg-input border-primary/20"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-48 bg-input border-primary/20">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent className="glassmorphism border-primary/20">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48 bg-input border-primary/20">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="glassmorphism border-primary/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            Members List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20">
                <TableHead className="text-muted-foreground">Member</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Courses</TableHead>
                <TableHead className="text-muted-foreground">
                  Communities
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Joined Date
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member.id}
                  className="border-primary/10 hover:bg-accent/10"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="gradient-secondary text-black font-medium">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        member.role === "Admin"
                          ? "border-chart-4/30 text-chart-4"
                          : member.role === "Instructor"
                            ? "border-accent-foreground/30 text-accent-foreground"
                            : "border-primary/30 text-primary"
                      }
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {member.courses}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {member.communities}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(member.joinedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === "Active" ? "default" : "secondary"
                      }
                      className={
                        member.status === "Active"
                          ? "bg-accent-foreground/20 text-accent-foreground border-accent-foreground/30"
                          : "bg-muted/20 text-muted-foreground border-muted-foreground/30"
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="glassmorphism border-primary/20"
                      >
                        <DropdownMenuItem className="hover:bg-accent/20">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-accent/20">
                          <Shield className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-accent/20 text-chart-4">
                          <UserX className="w-4 h-4 mr-2" />
                          Suspend
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
