import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";
import Header from "@/components/ui/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", "slug", slug],
    queryFn: () => blogApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 60_000,
  });

  const post = data?.data;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-16 max-w-3xl">
        <div className="mb-6">
          <Button asChild variant="ghost" className="px-0 text-primary">
            <Link to="/blog">← Back to Blog</Link>
          </Button>
        </div>
        {isLoading && <div className="text-muted-foreground">Loading…</div>}
        {isError && (
          <div className="text-destructive">Failed to load post.</div>
        )}
        {post && (
          <article className="space-y-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {post.coverImageUrl && (
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full rounded-md border border-border"
              />
            )}
            <Card className="bg-card border-border">
              <CardContent className="prose prose-invert max-w-none pt-6">
                {post.excerpt && (
                  <p className="text-muted-foreground italic">{post.excerpt}</p>
                )}
                <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
              </CardContent>
            </Card>
          </article>
        )}
      </main>
    </div>
  );
}
