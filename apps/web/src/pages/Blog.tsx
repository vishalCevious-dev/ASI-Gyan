import { useState, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { blogApi } from "@/lib/api";
import { getMediaUrl } from "@/lib/utils";
import { slugify } from "@/lib/slug";
import { toast } from "sonner";


const statuses = ["All Status", "PUBLISHED", "DRAFT"];

// All Blog Posts Page Component
function BlogListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("recent");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate categories dynamically from posts
  const categories = useMemo(() => {
    if (!posts || posts.length === 0) return [{ id: "all", name: "All Posts" }];
    
    const uniqueCategories = Array.from(
      new Set(posts.map(post => post.category).filter(Boolean))
    );
    
    return [
      { id: "all", name: "All Posts" },
      ...uniqueCategories.map(category => ({
        id: category,
        name: category
      }))
    ];
  }, [posts]);

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await blogApi.list(1, 50); // Load more posts for filtering
      setPosts(response.data.data);
    } catch (error) {
      console.error("Failed to load blog posts:", error);
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    if (!posts || posts.length === 0) {
      return [];
    }
    
    let filtered = posts.filter(post => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === "all" || 
        (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
      
      // Status filter
      const matchesStatus = selectedStatus === "All Status" || 
        (post.status && post.status.toLowerCase() === selectedStatus.toLowerCase());
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort posts
    switch (sortBy) {
      case "recent":
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "oldest":
        return filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case "title":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [posts, searchQuery, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-14 bg-space-depth pt-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-cyber-sheen bg-clip-text text-transparent">
            AI Learning Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the latest insights, tutorials, and thought leadership in artificial intelligence
          </p>
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 text-lg bg-card/80 backdrop-blur border-border"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Clear Filters */}
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Filters</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedStatus("All Status");
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => {
                      const count = category.id === "all" 
                        ? (posts?.length || 0)
                        : (posts?.filter(p => p.category === category.id).length || 0);
                      
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category.name}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Status</h4>
                  <div className="space-y-2">
                    {statuses.map(status => {
                      const count = status === "All Status" 
                        ? (posts?.length || 0)
                        : (posts?.filter(p => p.status === status).length || 0);
                      
                      const displayName = status === "All Status" ? "All Posts" : 
                                        status === "PUBLISHED" ? "Published" : 
                                        status === "DRAFT" ? "Draft" : status;
                      
                      return (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedStatus === status 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{displayName}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Blog Posts Grid */}
          <main className="lg:col-span-3">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground">
                  Showing {filteredPosts.length} of {posts.length} posts
                </p>
                {(searchQuery || selectedCategory !== "all" || selectedStatus !== "All Status") && (
                  <Badge variant="outline" className="text-xs">
                    Filtered
                  </Badge>
                )}
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-background border border-border"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* Blog Posts Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted rounded-t-lg mb-4"></div>
                    <CardContent className="space-y-4">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map(post => {
                  return (
                    <Card
                      key={post.id}
                      className="group hover:shadow-glow-green transition-all duration-300 cursor-pointer overflow-hidden border border-border/50 hover:border-primary/50"
                      role="button"
                      tabIndex={0}
                      aria-label={`Open post ${post.title}`}
                      onClick={() => navigate(`/blog/${post.slug || slugify(post.title)}`)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigate(`/blog/${post.slug || slugify(post.title)}`);
                        }
                      }}
                    >
                      <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden relative">
                        {post.coverImageUrl ? (
                          <img 
                            src={getMediaUrl(post.coverImageUrl)} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <span class="text-2xl font-bold opacity-50">${post.title.charAt(0)}</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-2xl font-bold opacity-50">{post.title.charAt(0)}</span>
                          </div>
                        )}
                        {/* Overlay gradient for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary">{post.status}</Badge>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>📝 {post.category || 'General'}</span>
                        <span>👤 {post.author || 'Author'}</span>
                        <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {post.category || 'General'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {post.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {(post.author || 'A').charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm">{post.author || 'Author'}</span>
                        </div>
                        
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/blog/${post.slug || slugify(post.title)}`);
                          }}
                          className="group-hover:shadow-glow-green"
                        >
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No blog posts found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Blog Post Details Page Component
function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      loadPostBySlug();
    }
  }, [slug]);

  const loadPostBySlug = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getBySlug(slug!);
      
      if (response.data) {
        setPost(response.data);
      } else {
        console.error("Post not found for slug:", slug);
        toast.error(`Blog post "${slug}" not found`);
      }
    } catch (error) {
      console.error("Failed to load blog post:", error);
      toast.error("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post "{slug}" could not be found. Please check the URL or browse our available posts.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Blog Post Hero */}
      <section className="py-12 bg-space-depth">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/blog")}
                className="text-primary hover:text-primary/80"
              >
                ← Back to Blog
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary" className="text-sm">
                {post.category || 'General'}
              </Badge>
              <Badge variant="outline">{post.status}</Badge>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-cyber-sheen bg-clip-text text-transparent">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-8">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  {(post.author || 'A').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold">{post.author || 'Author'}</div>
                  <div className="text-sm text-muted-foreground">Blog Author</div>
                </div>
              </div>
              
              <div className="border-l border-border pl-6">
                <div className="text-sm text-muted-foreground">Published</div>
                <div className="font-semibold">{new Date(post.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-2 space-y-12">
            {/* Featured Image */}
            {post.coverImageUrl && (
              <div className="aspect-video bg-card rounded-xl border border-border overflow-hidden">
                <img 
                  src={getMediaUrl(post.coverImageUrl)} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Blog Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted">
                  {post.content ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        This blog post content is not available yet. Please check back later for the full article.
                      </p>
                      {post.excerpt && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h3 className="font-semibold mb-2">Preview:</h3>
                          <p>{post.excerpt}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Post Info */}
            <Card className="sticky top-24 border border-border/50 hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Category:</span>
                    <Badge variant="secondary" className="text-xs">{post.category || 'General'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                    <span className="text-sm font-semibold text-primary">{post.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Published:</span>
                    <span className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Author:</span>
                    <span className="text-sm">{post.author || 'Author'}</span>
                  </div>
                </div>

                <Button className="w-full mb-4 shadow-glow-green hover:shadow-glow-green/80 transition-all duration-300">
                  Share Post
                </Button>
                
                <Button variant="outline" className="w-full hover:bg-muted/50 transition-colors duration-300">
                  Bookmark
                </Button>
              </CardContent>
            </Card>

            {/* Post Highlights */}
            <Card className="border border-border/50 hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Post Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{post.category || 'General'} Content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{post.status} Status</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Educational Content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">AI Learning</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Related Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold text-sm mb-1">More {post.category || 'AI'} Posts</h4>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Coming Soon</span>
                      <span className="font-semibold text-primary">Latest</span>
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold text-sm mb-1">Advanced {post.category || 'AI'}</h4>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Coming Soon</span>
                      <span className="font-semibold text-primary">Latest</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Main Blog Component with Routing
export default function Blog() {
  return (
    <Routes>
      <Route index element={<BlogListPage />} />
      <Route path=":slug" element={<BlogPostPage />} />
    </Routes>
  );
}
