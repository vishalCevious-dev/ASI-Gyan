import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Send, X, Eye } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import QuillEditor from "@/components/editor/QuillEditor";
import { slugify } from "@/lib/slug";
import {
  blogCreateSchema,
  parseTagsString,
  isRichTextEmpty,
} from "@/validation/blog";
import { validateImageFile } from "@/validation/file";
import { useToast } from "@/components/ui/use-toast";
import { useBlogMutation } from "@/hooks/useBlogMutations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
} | null;

export default function BlogEditorFormik({
  post,
  onClose,
}: {
  post: FullPost;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [metaEdited, setMetaEdited] = useState(false);
  const { mutate, isPending } = useBlogMutation(() => onClose());
  const [previewOpen, setPreviewOpen] = useState(false);

  // Set existing image when post is loaded
  useEffect(() => {
    if (post?.coverImageUrl) {
      setExistingImageUrl(post.coverImageUrl);
    }
  }, [post?.coverImageUrl]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    submitForm,
    submitCount,
  } = useFormik({
    initialValues: {
      title: post?.title || "",
      slug: post?.slug || slugify(post?.title || ""),
      excerpt: post?.excerpt || "",
      metaDescription: post?.metaDescription || post?.excerpt || "",
      videoUrl: post?.videoUrl || "",
      content: post?.content || "",
      status: post?.status || ("DRAFT" as "DRAFT" | "PUBLISHED"),
      category: post?.category || "",
      tags: (post?.tags || []) as string[],
    },
    validateOnChange: true,
    validate: (v) => {
      const e: Record<string, string> = {};
      const title = (v.title || "").trim();
      if (!title || title.length < 2)
        e.title = "Title must be at least 2 characters";

      const slug = (v.slug || "").trim();
      if (!slug) e.slug = "Slug is required";
      else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
        e.slug = "Slug may contain lowercase letters, numbers and hyphens only";

      if ((v.excerpt || "").length > 512)
        e.excerpt = "Excerpt must be at most 512 characters";

      if ((v.metaDescription || "").length > 160)
        e.metaDescription = "Meta description must be at most 160 characters";

      if (v.videoUrl) {
        const isAbs = /^https?:\/\//i.test(v.videoUrl);
        const isRel = v.videoUrl.startsWith("/");
        if (!isAbs && !isRel)
          e.videoUrl = "Must be a valid URL or start with /";
      }

      if (isRichTextEmpty(v.content)) e.content = "Content is required";

      return e;
    },
    enableReinitialize: true,
    onSubmit: (v) => {
      // Basic validations similar to your pattern
      if (!v.title.trim()) {
        toast({ title: "Title is required", variant: "destructive" });
        return;
      }
      if (!v.slug.trim()) {
        toast({ title: "Slug is required", variant: "destructive" });
        return;
      }
      if (isRichTextEmpty(v.content)) {
        toast({ title: "Content is required", variant: "destructive" });
        return;
      }
      if (imageFile) {
        const r = validateImageFile(imageFile);
        if (!r.ok) {
          toast({
            title: "Invalid image",
            description: r.error,
            variant: "destructive",
          });
          return;
        }
      }
      const parsed = blogCreateSchema.safeParse(v);
      if (!parsed.success) {
        console.error(parsed.error);
        const m = parsed.error.issues[0]?.message || "Invalid form input";
        toast({
          title: "Validation failed",
          description: m,
          variant: "destructive",
        });
        return;
      }
      
      // Check if we're editing or creating
      if (post?.id) {
        // Update existing post
        mutate({ 
          path: "update", 
          id: post.id,
          ...parsed.data, 
          image: imageFile || undefined,
          removeImage: removeExistingImage
        });
      } else {
        // Create new post
        mutate({ path: "create", ...parsed.data, image: imageFile || undefined });
      }
    },
  });

  const addTag = () => {
    const arr = parseTagsString(tagsInput);
    if (arr && arr.length) {
      setFieldValue("tags", [...values.tags, ...arr]);
      setTagsInput("");
    }
  };
  const removeTag = (i: number) =>
    setFieldValue(
      "tags",
      values.tags.filter((_, idx) => idx !== i),
    );

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
              Write and publish educational content for your community.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              await setFieldValue("status", "DRAFT");
              submitForm();
            }}
            className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10"
            disabled={isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewOpen(true)}
            className="border-primary/30 hover:bg-primary/10"
            disabled={isPending}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="gradient-primary text-black font-medium hover:scale-105 transition-transform"
            disabled={isPending}
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
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
                  name="title"
                  value={values.title}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("slug", slugify(e.target.value));
                  }}
                  onBlur={handleBlur}
                  placeholder="Enter your post title..."
                  className="bg-input border-primary/20 text-lg"
                />
                {touched.title && errors.title ? (
                  <p className="text-sm text-destructive">{errors.title}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={values.slug}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={slugify(values.title || "your-title")}
                  className="bg-input border-primary/20"
                />
                {touched.slug && errors.slug ? (
                  <p className="text-sm text-destructive">{errors.slug}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={values.excerpt}
                  onChange={(e) => {
                    handleChange(e);
                    if (!metaEdited)
                      setFieldValue("metaDescription", e.target.value);
                  }}
                  onBlur={handleBlur}
                  placeholder="Brief description of your post..."
                  className="bg-input border-primary/20 min-h-20"
                />
                {touched.excerpt && errors.excerpt ? (
                  <p className="text-sm text-destructive">{errors.excerpt}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={values.metaDescription}
                  onChange={(e) => {
                    setMetaEdited(true);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  placeholder="SEO description for search engines..."
                  className="bg-input border-primary/20 min-h-16"
                />
                <p className="text-xs text-muted-foreground">
                  {(values.metaDescription || "").length}/160 characters
                </p>
                {touched.metaDescription && errors.metaDescription ? (
                  <p className="text-sm text-destructive">
                    {errors.metaDescription}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  value={values.videoUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="https://example.com/video or /uploads/blog/video.mp4"
                  className="bg-input border-primary/20"
                />
                {touched.videoUrl && errors.videoUrl ? (
                  <p className="text-sm text-destructive">{errors.videoUrl}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured-image">Featured Image</Label>
                <Input
                  id="featured-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setImageFile(f);
                    setImagePreview(f ? URL.createObjectURL(f) : "");
                    if (f) {
                      setRemoveExistingImage(false);
                    }
                  }}
                  className="bg-input border-primary/20"
                />
                {imagePreview && (
                  <div className="mt-4 relative">
                    <ImageWithFallback
                      src={imagePreview}
                      alt="Featured image preview"
                      className="w-full h-48 object-cover rounded-lg border border-primary/20"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {!imagePreview && existingImageUrl && !removeExistingImage && (
                  <div className="mt-4 relative">
                    <ImageWithFallback
                      src={existingImageUrl}
                      alt="Current featured image"
                      className="w-full h-48 object-cover rounded-lg border border-primary/20"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setRemoveExistingImage(true);
                        setExistingImageUrl(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">Current image (upload a new one to replace)</p>
                  </div>
                )}
                {removeExistingImage && !imagePreview && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Image will be removed when you save</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setRemoveExistingImage(false);
                        if (post?.coverImageUrl) {
                          setExistingImageUrl(post.coverImageUrl);
                        }
                      }}
                    >
                      Undo
                    </Button>
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
              <QuillEditor
                value={values.content}
                onChange={(html) => {
                  setFieldValue("content", html);
                  // Mark as touched on first interaction with the editor
                  setFieldTouched("content", true, false);
                }}
                minHeight="28rem"
                className="bg-input border border-primary/20 rounded-md"
              />
              {(touched.content || submitCount > 0) && errors.content ? (
                <p className="text-sm text-destructive">{errors.content}</p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organization */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={values.category}
                  onValueChange={(v) => setFieldValue("category", v)}
                >
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
            </CardContent>
          </Card>

          {/* Publishing */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="status"
                    value="PUBLISHED"
                    checked={values.status === "PUBLISHED"}
                    onChange={() => setFieldValue("status", "PUBLISHED")}
                  />
                  Publish
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="status"
                    value="DRAFT"
                    checked={values.status === "DRAFT"}
                    onChange={() => setFieldValue("status", "DRAFT")}
                  />
                  Draft
                </label>
              </div>

              <div className="pt-2">
                <Badge
                  variant={
                    values.status === "PUBLISHED" ? "default" : "secondary"
                  }
                  className={
                    values.status === "PUBLISHED"
                      ? "bg-accent-foreground/20 text-accent-foreground border-accent-foreground/30"
                      : "bg-chart-4/20 text-chart-4 border-chart-4/30"
                  }
                >
                  {values.status === "PUBLISHED" ? "Published" : "Draft"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Add tags, comma separated"
                  className="bg-input border-primary/20"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              {values.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {values.tags.map((t, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-primary/30 text-primary cursor-pointer"
                      onClick={() => removeTag(idx)}
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary text-primary-foreground"
            >
              {isPending
                ? "Please wait…"
                : values.status === "PUBLISHED"
                  ? "Publish"
                  : "Save Draft"}
            </Button>
          </div>
        </div>
      </form>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Post preview</DialogTitle>
            <DialogDescription>
              Review how your post will look before publishing.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto space-y-4">
            {(imagePreview || existingImageUrl) && (
              <ImageWithFallback
                src={imagePreview || (existingImageUrl as string)}
                alt="Featured image"
                className="w-full h-56 object-cover rounded-md border border-border"
              />
            )}
            <h2 className="text-2xl font-semibold">{values.title || "Untitled"}</h2>
            {values.excerpt && (
              <p className="text-muted-foreground">{values.excerpt}</p>
            )}
            {values.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {values.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded border border-primary/30 text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: values.content || "" }}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewOpen(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                await setFieldValue("status", "DRAFT");
                submitForm();
                setPreviewOpen(false);
              }}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={async () => {
                await setFieldValue("status", "PUBLISHED");
                submitForm();
                setPreviewOpen(false);
              }}
              className="gradient-primary text-black"
            >
              Publish Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
