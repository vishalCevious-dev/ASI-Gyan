import React from "react";
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
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Archive,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const communities = [
  {
    id: 1,
    name: "AI Researchers",
    members: 2847,
    createdDate: "2024-01-15",
    status: "Active",
    description: "Community for AI research discussions",
    category: "Research",
  },
  {
    id: 2,
    name: "Machine Learning Engineers",
    members: 1923,
    createdDate: "2024-02-20",
    status: "Active",
    description: "Practical ML implementation discussions",
    category: "Engineering",
  },
  {
    id: 3,
    name: "Data Scientists",
    members: 3156,
    createdDate: "2024-01-08",
    status: "Active",
    description: "Data analysis and insights community",
    category: "Data Science",
  },
  {
    id: 4,
    name: "Neural Networks",
    members: 1567,
    createdDate: "2024-03-10",
    status: "Active",
    description: "Deep learning and neural network focus",
    category: "Deep Learning",
  },
  {
    id: 5,
    name: "NLP Enthusiasts",
    members: 987,
    createdDate: "2024-02-28",
    status: "Paused",
    description: "Natural Language Processing community",
    category: "NLP",
  },
];

export function Communities() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Manage Communities
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage learning communities for your platform.
          </p>
        </div>
        <Button className="gradient-primary text-black font-medium hover:scale-105 transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          Create Community
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">48</p>
                <p className="text-sm text-muted-foreground">
                  Total Communities
                </p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-accent-foreground">45</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent-foreground/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-chart-4">12,547</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
              <Users className="w-8 h-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-chart-5">+18%</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
              <div className="w-8 h-8 rounded-full gradient-secondary flex items-center justify-center">
                <span className="text-black font-bold text-sm">↑</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="glassmorphism border-primary/20">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search communities..."
                  className="pl-10 bg-input border-primary/20"
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Communities Table */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Communities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20">
                <TableHead className="text-muted-foreground">
                  Community Name
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="text-muted-foreground">Members</TableHead>
                <TableHead className="text-muted-foreground">
                  Created Date
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communities.map((community) => (
                <TableRow
                  key={community.id}
                  className="border-primary/10 hover:bg-accent/10"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {community.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {community.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-accent-foreground/30 text-accent-foreground"
                    >
                      {community.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium text-primary">
                        {community.members.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(community.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        community.status === "Active" ? "default" : "secondary"
                      }
                      className={
                        community.status === "Active"
                          ? "bg-accent-foreground/20 text-accent-foreground border-accent-foreground/30"
                          : "bg-chart-4/20 text-chart-4 border-chart-4/30"
                      }
                    >
                      {community.status}
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
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-accent/20">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-accent/20 text-chart-4">
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
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
