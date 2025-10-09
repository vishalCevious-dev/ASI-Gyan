/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
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
// import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  // TrendingUp,
  // Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import BlogEditorFormik from "./BlogEditorFormik";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";
import { useBlogMutation } from "@/hooks/useBlogMutations";
import { toast } from "sonner";

type UIPost = {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  author: string;
  authorAvatar: string;
  status: "Published" | "Draft" | "Scheduled";
  publishDate: string;
  views: number;
  category: string;
  readTime?: string;
};

type FullPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string | null;
  videoUrl?: string | null;
  metaDescription?: string | null;
  status: "DRAFT" | "PUBLISHED";
  category?: string;
  tags?: string[];
  author?: string;
};

const stats = [
  { label: "Total Posts", value: "247", change: "+12", color: "text-mute-foreground" },
  {
    label: "Published",
    value: "189",
    change: "+8",
    color: "text-mute-foreground",
  },
  { label: "Drafts", value: "42", change: "+3", color: "text-chart-4" },
  {
    label: "Total Views",
    value: "156.2K",
    change: "+24%",
    color: "text-chart-5",
  },
];

export function Blog() {
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<FullPost | null>(null);
  const [loadingPostSlug, setLoadingPostSlug] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<UIPost | null>(null);

  // Blog mutations
  const { mutate: deleteBlog, isPending: isDeleting } = useBlogMutation(() => {
    toast.success("Blog post deleted successfully");
  });

  // Load posts from API
  const { data, isLoading } = useQuery({
    queryKey: ["blog", "list", page, limit],
    queryFn: () => blogApi.list(page, limit),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });

  const blogPosts: UIPost[] = useMemo(() => {
    const arr = (data?.data?.data as any[]) || [];
    return arr.map((p: any) => ({
      id: String(p.id),
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      author: p.author || "—",
      authorAvatar: (p.author || "—").slice(0, 2).toUpperCase(),
      status: p.status === "PUBLISHED" ? "Published" : "Draft",
      publishDate: p.createdAt || new Date().toISOString(),
      views: typeof p.views === "number" ? p.views : 0,
      category: p.category || "-",
      readTime: p.readTime || undefined,
    }));
  }, [data]);

  const pagination =
    (data?.data?.pagination as
      | { page: number; pages: number; total: number; limit: number }
      | undefined) || undefined;

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = async (post: UIPost) => {
    if (!post.slug) {
      toast.error("Cannot edit post without slug");
      return;
    }
    
    try {
      setLoadingPostSlug(post.slug);
      // Fetch full post data by slug
      const response = await blogApi.getBySlug(post.slug);
      const fullPost = response.data;
      
      setEditingPost({
        id: String(fullPost.id),
        title: fullPost.title,
        slug: fullPost.slug,
        excerpt: fullPost.excerpt || "",
        content: fullPost.content || "",
        coverImageUrl: fullPost.coverImageUrl,
        videoUrl: fullPost.videoUrl || "",
        metaDescription: fullPost.metaDescription || "",
        status: fullPost.status,
        category: (fullPost as any).category || "",
        tags: (fullPost as any).tags || [],
        author: (fullPost as any).author || "",
      });
      setShowEditor(true);
    } catch (error) {
      console.error("Failed to fetch post:", error);
      toast.error("Failed to load post data");
    } finally {
      setLoadingPostSlug(null);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleDeletePost = (post: UIPost) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deleteBlog({
        path: "delete",
        id: postToDelete.id,
      });
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handlePreviewPost = (post: UIPost) => {
    // Open the blog post in a new tab using the slug
    const blogUrl = post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`;
    window.open(blogUrl, '_blank');
  };

  if (showEditor) {
    return <BlogEditorFormik post={editingPost} onClose={handleCloseEditor} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Blog Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage educational content for your platform.
          </p>
        </div>
        <Button
          onClick={handleCreatePost}
          className="gradient-primary text-black font-medium hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300"
          >
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
                  className="bg-input text-accent-foreground border-accent-foreground/20"
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
                  placeholder="Search posts..."
                  className="pl-10 bg-input border-primary/20"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-48 bg-input border-primary/20">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="glassmorphism  border-primary/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48 bg-input border-primary/20">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="glassmorphism border-primary/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="ai-research">AI Research</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="deep-learning">Deep Learning</SelectItem>
                <SelectItem value="nlp">NLP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={String(limit)}
            onValueChange={(v) => {
              setLimit(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-24 bg-input border-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glassmorphism border-primary/20">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={!pagination || page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination?.page || page} of {pagination?.pages || "-"}
          </span>
          <Button
            variant="outline"
            disabled={!pagination || (pagination && page >= pagination.pages)}
            onClick={() =>
              setPage((p) =>
                pagination ? Math.min(pagination.pages, p + 1) : p + 1,
              )
            }
          >
            Next
          </Button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Blog Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20">
                <TableHead className="text-muted-foreground">Post</TableHead>
                {/* <TableHead className="text-muted-foreground">Author</TableHead> */}
                <TableHead className="text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                {/* <TableHead className="text-muted-foreground">Views</TableHead> */}
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    Loading posts…
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && blogPosts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                blogPosts?.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-primary/10 hover:bg-accent/10"
                  >
                    <TableCell>
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">
                          {post.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                        {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime || '—'}
                      </div> */}
                      </div>
                    </TableCell>
                    {/* <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="gradient-secondary text-black text-sm">
                          {post.authorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{post.author || '—'}</span>
                    </div>
                  </TableCell> */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-accent-foreground/30 text-muted-foreground"
                      >
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === "Published"
                            ? "default"
                            : post.status === "Draft"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          post.status === "Published"
                            ? "bg-accent-foreground/20 text-muted-foreground border-accent-foreground/30"
                            : post.status === "Draft"
                              ? "bg-chart-4/20 text-chart-4 border-chart-4/30"
                              : "bg-chart-5/20 text-chart-5 border-chart-5/30"
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    {/* <TableCell>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {post.views > 0 ? post.views.toLocaleString() : '-'}
                      </span>
                    </div>
                  </TableCell> */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
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
                          <DropdownMenuItem 
                            className="hover:bg-accent/20"
                            onClick={() => handlePreviewPost(post)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-accent/20"
                            onClick={() => handleEditPost(post)}
                            disabled={loadingPostSlug === post.slug}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            {loadingPostSlug === post.slug ? "Loading..." : "Edit"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="hover:bg-accent/20 text-chart-4"
                            onClick={() => handleDeletePost(post)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {isDeleting ? "Deleting..." : "Delete"}
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

      {/* Recent Activity */}
      {/* <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-chart-5" />
            Content Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">89.5%</div>
              <div className="text-sm text-muted-foreground">Avg. Read Rate</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent-foreground w-[89.5%]" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-accent-foreground">4.2K</div>
              <div className="text-sm text-muted-foreground">Avg. Monthly Views</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-foreground to-primary w-[75%]" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-chart-4">12</div>
              <div className="text-sm text-muted-foreground">Posts This Month</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-chart-4 to-chart-5 w-[60%]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="glassmorphism border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={cancelDelete}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
