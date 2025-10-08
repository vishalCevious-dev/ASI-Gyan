import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import blogHeroImage from "@/assets/blog-hero.jpg";
import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";
import { Link } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const [page, setPage] = useState(1);
  const limit = 7; // keep 1 featured + 6 grid on first page
  const { data, isLoading } = useQuery({
    queryKey: ["home-blog", page, limit],
    queryFn: () => blogApi.list(page, limit),
    staleTime: 60_000,
    keepPreviousData: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = (data?.data?.data as any[]) || [];
  const pagination = data?.data?.pagination as
    | { page: number; pages: number; total: number; limit: number }
    | undefined;
  const isFirstPage = page === 1;
  const featured = isFirstPage ? posts[0] : undefined;
  const rest = isFirstPage ? posts.slice(1) : posts;

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">AI Blog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Learning <span className="text-primary">Blog</span>
          </h2>
          <p className="text-sl text-muted-foreground max-w-3xl mx-auto">
            Discover the latest insights, tutorials, and thought  leadership <br/> in
            artificial intelligence.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="mb-12">
            <Card className="bg-card border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12 flex items-center">
                    <div>
                      <Badge
                        variant="outline"
                        className="border-primary text-primary bg-primary/10 mb-4"
                      >
                        Featured Article
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                        {featured.title}
                      </h3>
                      {featured.excerpt && (
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                          {featured.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span>
                          {new Date(
                            featured.createdAt || Date.now(),
                          ).toLocaleDateString()}
                        </span>
                        <span>·</span>
                        <span>{featured.slug}</span>
                      </div>
                      <Button
                        asChild
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Link to={`/blog/${featured.slug}`}>
                          Read Full Article
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div
                    className="relative min-h-[300px] lg:min-h-full bg-cover bg-center overflow-hidden"
                    style={{
                      backgroundImage: `url(${featured.coverImageUrl || blogHeroImage})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
            <div className="text-muted-foreground">Loading posts…</div>
          )}
          {!isLoading &&
            rest.map((post, index) => (
              <Card
                key={index}
                className="group relative border border-border rounded-2xl bg-card text-foreground hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="border-muted text-muted-foreground text-xs"
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  {post.excerpt && (
                    <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/90 transition-colors duration-300">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {new Date(
                        post.createdAt || Date.now(),
                      ).toLocaleDateString()}
                    </span>
                    <span>{post.coverImageUrl ? "Cover" : "No cover"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {post.slug}
                    </span>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 h-auto p-0 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <Link to={`/blog/${post.slug}`}>Read More →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Pagination + View All */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            disabled={!pagination || page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="border-border hover:border-primary/50 transition-colors duration-300"
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
            className="border-border hover:border-primary/50 transition-colors duration-300"
          >
            Next
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="ml-4 border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
          >
            <Link to="/blog">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;