import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blogApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export function CreatePost() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) {
      toast({
        title: "Missing fields",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await blogApi.create({
        title,
        slug: slug || undefined,
        excerpt: excerpt || undefined,
        content,
        status,
        image,
      });
      toast({ title: "Post created", description: `Slug: ${res.data.slug}` });
      // reset form
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setStatus("DRAFT");
      setImage(undefined);
      const fileInput = document.getElementById(
        "featured-image",
      ) as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({
        title: "Failed to create post",
        description: e.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="glassmorphism border-primary/20">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Slug (optional)</label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated from title"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Featured Image</label>
              <Input
                id="featured-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0])}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Excerpt (optional)</label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              rows={8}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Publishing</label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="status"
                  value="PUBLISHED"
                  checked={status === "PUBLISHED"}
                  onChange={() => setStatus("PUBLISHED")}
                />
                Publish
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="status"
                  value="DRAFT"
                  checked={status === "DRAFT"}
                  onChange={() => setStatus("DRAFT")}
                />
                Draft
              </label>
            </div>
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-primary text-primary-foreground"
            >
              {submitting ? "Creating…" : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
