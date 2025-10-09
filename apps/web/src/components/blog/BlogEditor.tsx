import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { ArrowLeft, Save, Eye, Send } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useToast } from "@/components/ui/use-toast";
import { slugify } from "@/lib/slug";
import {
  blogCreateSchema,
  parseTagsString,
  isRichTextEmpty,
} from "@/validation/blog";
import { validateImageFile } from "@/validation/file";
import { useNavigate } from "react-router-dom";
import { useCreateAndUpdateBlog } from "@/hooks/useBlogMutations";
import QuillEditor from "../editor/QuillEditor";

interface BlogEditorProps {
  post?: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    status: string;
    category: string;
  } | null;
  onClose: () => void;
}

export function BlogEditor({ post, onClose }: BlogEditorProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [metaDescription, setMetaDescription] = useState(post?.excerpt || "");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(post?.category || "");
  const [tags, setTags] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [metaEdited, setMetaEdited] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState<string>("");
  const [isPublished, setIsPublished] = useState(post?.status === "Published");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});

  // Path-based mutation like your other project
  const { mutate, isPending } = useCreateAndUpdateBlog(() =>
    navigate("/dashboard"),
  );

  async function submit(status: "DRAFT" | "PUBLISHED") {
    // Debug trace for troubleshooting: verify handler is invoked
    console.info("[BlogEditor] submit called", {
      status,
      hasFile: !!featuredImageFile,
    });
    setFieldErrors({});
    if (!title || isRichTextEmpty(content)) {
      setFieldErrors((prev) => ({
        ...prev,
        ...(title ? {} : { title: "Title is required" }),
        ...(!isRichTextEmpty(content)
          ? {}
          : { content: "Content is required" }),
      }));
      toast({
        title: "Missing fields",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }
    try {
      // Validate file if present
      if (featuredImageFile) {
        const v = validateImageFile(featuredImageFile);
        if (!v.ok) {
          setFieldErrors((prev) => ({ ...prev, image: v.error }));
          toast({
            title: "Invalid image",
            description: v.error,
            variant: "destructive",
          });
          return;
        }
      }

      const tagArr = parseTagsString(tags);
      const slugToUse = slugify(slugEdited && slug ? slug : title);
      if (!slugToUse || slugToUse.length < 2) {
        setFieldErrors((prev) => ({
          ...prev,
          slug: "Slug must be at least 2 characters",
        }));
        toast({
          title: "Validation failed",
          description: "Please provide a valid slug",
          variant: "destructive",
        });
        return;
      }
      const payload = {
        title,
        slug: slugToUse,
        excerpt: excerpt || undefined,
        content,
        status,
        category: category || undefined,
        tags: tagArr,
        metaDescription: metaDescription || undefined,
        videoUrl: videoUrl || undefined,
      };

      const parsed = blogCreateSchema.safeParse(payload);
      if (!parsed.success) {
        const issues = parsed.error.issues;
        const next: Record<string, string> = {};
        for (const i of issues) {
          const k = (i.path?.[0] as string) || "form";
          if (!next[k]) next[k] = i.message;
        }
        setFieldErrors((prev) => ({ ...prev, ...next }));
        const msg = issues[0]?.message || "Invalid form input";
        toast({
          title: "Validation failed",
          description: msg,
          variant: "destructive",
        });
        return;
      }
      // Build FormData like your pattern
      const fd = new FormData();
      fd.append("title", parsed.data.title);
      fd.append("slug", slugToUse);
      if (parsed.data.excerpt) fd.append("excerpt", parsed.data.excerpt);
      fd.append("content", parsed.data.content);
      fd.append("status", parsed.data.status);
      if (parsed.data.category) fd.append("category", parsed.data.category);
      if (parsed.data.metaDescription)
        fd.append("metaDescription", parsed.data.metaDescription);
      if (parsed.data.videoUrl) fd.append("videoUrl", parsed.data.videoUrl);
      if (Array.isArray(parsed.data.tags)) {
        for (const t of parsed.data.tags) fd.append("tags", t);
      }
      if (featuredImageFile) fd.append("image", featuredImageFile);

      const path = post ? `/blog/update/${post.id}` : "/blog/add";
      const method = post ? "PUT" : "POST";

      mutate({ path, method, formData: fd });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error("[BlogEditor] Create failed", e);
      toast({
        title: "Failed to save post",
        description: e.message || "Please try again",
        variant: "destructive",
      });
    }
  }

  const handleSave = () => submit("DRAFT");
  const handlePublish = () => submit("PUBLISHED");

  const handlePreview = () => {
    // Handle preview logic here
    console.log("Opening preview...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              {post ? "Edit Post" : "Create New Post"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {post
                ? "Update your blog post content and settings."
                : "Write and publish educational content for your community."}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePreview}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            disabled={isPending}
            variant="outline"
            onClick={handleSave}
            className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            disabled={isPending}
            onClick={handlePublish}
            className="gradient-primary text-black font-medium hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Details */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    const v = e.target.value;
                    setTitle(v);
                    if (!slugEdited) setSlug(slugify(v));
                    if (fieldErrors.title)
                      setFieldErrors((p) => ({ ...p, title: undefined }));
                  }}
                  placeholder="Enter your post title..."
                  className="bg-input border-primary/20 text-lg"
                />
                {fieldErrors.title && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => {
                    const v = e.target.value;
                    setExcerpt(v);
                    if (!metaEdited) setMetaDescription(v);
                    if (fieldErrors.excerpt)
                      setFieldErrors((p) => ({ ...p, excerpt: undefined }));
                  }}
                  placeholder="Brief description of your post..."
                  className="bg-input border-primary/20 min-h-20"
                />
                {fieldErrors.excerpt && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.excerpt}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL</Label>
                <Input
                  id="video-url"
                  value={videoUrl}
                  onChange={(e) => {
                    setVideoUrl(e.target.value);
                    if (fieldErrors.videoUrl)
                      setFieldErrors((p) => ({ ...p, videoUrl: undefined }));
                  }}
                  placeholder="https://example.com/video or /uploads/blog/video.mp4"
                  className="bg-input border-primary/20"
                />
                {fieldErrors.videoUrl && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.videoUrl}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-image">Featured Image</Label>
                <Input
                  id="featured-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setFeaturedImageFile(f);
                    setFeaturedPreview(f ? URL.createObjectURL(f) : "");
                    if (fieldErrors.image)
                      setFieldErrors((p) => ({ ...p, image: undefined }));
                  }}
                  className="bg-input border-primary/20"
                />
                {fieldErrors.image && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.image}
                  </p>
                )}
                {featuredPreview && (
                  <div className="mt-4">
                    <ImageWithFallback
                      src={featuredPreview}
                      alt="Featured image preview"
                      className="w-full h-48 object-cover rounded-lg border border-primary/20"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quill toolbar is built-in below */}

              <QuillEditor
                value={content}
                onChange={(html) => {
                  setContent(html);
                  if (fieldErrors.content)
                    setFieldErrors((p) => ({ ...p, content: undefined }));
                }}
                className="bg-input border border-primary/20 rounded-md"
                minHeight="28rem"
              />
              {fieldErrors.content && (
                <p className="text-xs text-destructive">
                  {fieldErrors.content}
                </p>
              )}

              <div className="text-xs text-muted-foreground">
                <p>
                  💡 Tip: Use markdown syntax for rich formatting. The content
                  will be rendered beautifully for your readers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="inline-flex items-center gap-5 text-sm">
                  <input
                    type="radio"
                    name="publish-status"
                    value="PUBLISHED"
                    checked={isPublished}
                    onChange={() => setIsPublished(true)}
                  />
                  Publish
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="publish-status"
                    value="DRAFT"
                    checked={!isPublished}
                    onChange={() => setIsPublished(false)}
                  />
                  Draft
                </label>
              </div>

              <div className="pt-2">
                <Badge
                  variant={isPublished ? "default" : "secondary"}
                  className={
                    isPublished
                      ? "bg-accent-foreground/20 text-accent-foreground border-accent-foreground/30"
                      : "bg-chart-4/20 text-chart-4 border-chart-4/30"
                  }
                >
                  {isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Categories & Tags */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-input border-primary/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="glassmorphism border-primary/20">
                    <SelectItem value="ai-research">AI Research</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="deep-learning">Deep Learning</SelectItem>
                    <SelectItem value="nlp">NLP</SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="machine-learning, ai, education"
                  className="bg-input border-primary/20"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas
                </p>
              </div>

              {tags && (
                <div className="flex flex-wrap gap-2">
                  {tags.split(",").map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-primary/30 text-primary"
                    >
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => {
                    setMetaEdited(true);
                    setMetaDescription(e.target.value);
                    if (fieldErrors.metaDescription)
                      setFieldErrors((p) => ({
                        ...p,
                        metaDescription: undefined,
                      }));
                  }}
                  placeholder="SEO description for search engines..."
                  className="bg-input border-primary/20 min-h-16"
                />
                <p className="text-xs text-muted-foreground">
                  {metaDescription.length}/160 characters
                </p>
                {fieldErrors.metaDescription && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.metaDescription}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugEdited(true);
                    if (fieldErrors.slug)
                      setFieldErrors((p) => ({ ...p, slug: undefined }));
                  }}
                  placeholder={slugify(title || "your-title")}
                  className="bg-input border-primary/20"
                />
                {fieldErrors.slug && (
                  <p className="text-xs text-destructive">{fieldErrors.slug}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
