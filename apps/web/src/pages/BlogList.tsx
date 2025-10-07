/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const pageSize = 9;

export default function BlogList() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(parseInt(params.get("page") || "1"), 1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", "list", page, pageSize],
    queryFn: () => blogApi.list(page, pageSize),
    staleTime: 60_000,
  });

  const posts = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">AI Learning Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Learning Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and stories from ASI Gyan
          </p>
        </div>

        {isLoading && (
          <div className="text-center text-muted-foreground">
            Loading posts…
          </div>
        )}
        {isError && (
          <div className="text-center text-destructive">
            Failed to load posts. {isError}
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post: any) => (
              <Card
                key={post.id}
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
                    {post.coverImageUrl ? (
                      <span>With cover</span>
                    ) : (
                      <span>No cover</span>
                    )}
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
        )}

        {pagination && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setParams({ page: String(page - 1) })}
              className="border-border hover:border-primary/50 transition-colors duration-300"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.pages}
            </span>
            <Button
              variant="outline"
              disabled={page >= pagination.pages}
              onClick={() => setParams({ page: String(page + 1) })}
              className="border-border hover:border-primary/50 transition-colors duration-300"
            >
              Next
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}