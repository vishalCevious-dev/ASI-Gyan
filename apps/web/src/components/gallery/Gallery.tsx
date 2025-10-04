/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { galleryApi } from "@/lib/api";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { VideoCard } from "../ui/VideoCard";
import { VideoSelector } from "../ui/VideoSelector";
import {
  Grid3X3,
  List as ListIcon,
  Eye,
  Download,
  Share,
  Edit,
  Trash2,
  Calendar,
  Video,
  Image as ImageIcon,
  Tag,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";


// Simple themed Gallery page matching dashboard look-and-feel
export default function Gallery() {
  const [input1, onChangeInput1] = useState("");
  const [input2, onChangeInput2] = useState("");
  const [input3, onChangeInput3] = useState("");
  const [input4, onChangeInput4] = useState("");
  const [input5, onChangeInput5] = useState("");
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["gallery", "admin", { page: 1, limit: 12 }],
    queryFn: () => galleryApi.list(1, 12),
  });
  const items = useMemo(() => data?.data?.data || [], [data]);

  // Local UI state: filters and view mode
  const [searchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "PHOTO" | "VIDEO">(
    "ALL",
  );
  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "PUBLISHED" | "DRAFT"
  >("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const filteredItems = useMemo(() => {
    return items.filter((it: any) => {
      const q = searchQuery.trim().toLowerCase();
      const inTitle = (it.title || "").toLowerCase().includes(q);
      const inCategory = (it.category || "").toLowerCase().includes(q);
      const inTags = Array.isArray(it.tags)
        ? it.tags.some((t: string) => (t || "").toLowerCase().includes(q))
        : false;
      const matchesQ = !q ? true : inTitle || inCategory || inTags;
      const matchesType =
        filterType === "ALL"
          ? true
          : (it.type || "").toUpperCase() === filterType;
      const matchesStatus =
        filterStatus === "ALL"
          ? true
          : (it.status || "").toUpperCase() === filterStatus;
      return matchesQ && matchesType && matchesStatus;
    });
  }, [items, searchQuery, filterType, filterStatus]);

  // Quick stats
  const total = items.length;
  const photos = items.filter((i: any) => i.type === "PHOTO").length;
  const videos = items.filter((i: any) => i.type === "VIDEO").length;
  const published = items.filter((i: any) => i.status === "PUBLISHED").length;

  // Description removed per request
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<"PHOTO" | "VIDEO">("PHOTO");
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [image, setImage] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState<string>("General");
  const [tagsText, setTagsText] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // Function to detect video type from URL
  const detectVideoType = (url: string): "PHOTO" | "VIDEO" => {
    if (!url) return "PHOTO";
    
    // Check for video platforms
    const videoPatterns = [
      /youtube\.com\/watch/,
      /youtu\.be\//,
      /vimeo\.com\//,
      /dailymotion\.com\//,
      /instagram\.com\/reel/,
      /instagram\.com\/p\//,
      /tiktok\.com\//,
      /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i
    ];
    
    return videoPatterns.some(pattern => pattern.test(url)) ? "VIDEO" : "PHOTO";
  };

  // Handle video URL change with auto-detection
  const handleVideoUrlChange = (url: string) => {
    setVideoUrl(url);
    if (url.trim()) {
      const detectedType = detectVideoType(url);
      setType(detectedType);
    }
  };

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const finalTitle = title.trim() || `${type === "VIDEO" ? "Video" : "Photo"} ${category} ${new Date()
        .toISOString()
        .slice(0, 10)}`;
      const tags = tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await galleryApi.add({
        title: finalTitle,
        type,
        image: image || undefined,
        videoUrl: type === "VIDEO" ? videoUrl || undefined : undefined,
        status,
        category,
        tags,
      });
      toast({ title: "Gallery item created" });
      setTitle("");
      setImage(null);
      setVideoUrl("");
      setCategory("General");
      setTagsText("");
      await qc.invalidateQueries({ queryKey: ["gallery", "admin"] });
      refetch();
    } catch (e: any) {
      toast({
        title: "Failed to create",
        description: e?.message || "",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filter bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-card/50 border border-border rounded-xl py-4 sm:py-6 px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center rounded-[10px] px-3 py-2 gradient-primary">
            <span className="text-white text-sm font-bold mr-2">All</span>
            <span className="text-white text-xs font-bold bg-white/10 rounded-full px-3 py-1">
              1342
            </span>
          </div>

          {[
            ["Photos", input1, onChangeInput1, "982"],
            ["Videos", input2, onChangeInput2, "234"],
            ["Events", input3, onChangeInput3, "78"],
            ["Community", input4, onChangeInput4, "156"],
            ["Featured", input5, onChangeInput5, "42"],
          ].map(([ph, val, setVal, count], i) => (
            <div
              key={i}
              className="flex items-center bg-card py-2 px-3 rounded-[10px] border border-border"
            >
              <input
                placeholder={String(ph)}
                value={String(val)}
                onChange={(e) =>
                  (setVal as (v: string) => void)(e.target.value)
                }
                className="text-foreground bg-transparent text-sm font-bold w-[92px] py-[1px] border-0 outline-none"
              />
              <span className="text-foreground text-xs font-bold bg-secondary/40 rounded-full px-3 py-1 ml-2">
                {String(count)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Admin: create new item */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle>Create New Gallery Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Title field */}
            <div className="space-y-2 md:col-span-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this item"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PHOTO">Photo</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "General",
                    "AI Generated",
                    "Design",
                    "Charts",
                    "Art",
                    "Abstract",
                    "Community",
                    "Events",
                    "Featured",
                  ].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Tags</Label>
              <Input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Enter tags (comma separated)"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <VideoSelector
                value={videoUrl}
                onChange={handleVideoUrlChange}
                onTypeDetected={(detectedType) => setType(detectedType)}
                placeholder="Paste YouTube, Instagram, TikTok, or direct video URL..."
              />
            </div>
            <div className="space-y-2">
              <Label>
                {type === "VIDEO" ? "Thumbnail (optional)" : "Image"}
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Item"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Stats Cards (like dashboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">{total}</p>
              </div>
              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Photos</p>
                <p className="text-xl sm:text-2xl font-bold text-accent-foreground">
                  {photos}
                </p>
              </div>
              <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-accent-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-xl sm:text-2xl font-bold text-chart-3">{videos}</p>
              </div>
              <Video className="w-6 h-6 sm:w-8 sm:h-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-xl sm:text-2xl font-bold text-chart-4">{published}</p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search like the reference design, with Type and Status */}
      <Card className="glassmorphism border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Select
                value={filterType}
                onValueChange={(v) => setFilterType(v as any)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="PHOTO">Photo</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filterStatus}
                onValueChange={(v) => setFilterStatus(v as any)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 md:ml-6">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <ListIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listing */}
      {isLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : isError ? (
        <div className="text-destructive">Failed to load gallery.</div>
      ) : filteredItems.length === 0 ? (
        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              : "space-y-3 sm:space-y-4"
          }
        >
          {filteredItems.map((g: any) => (
            <div key={g.id}>
              {viewMode === "list" ? (
                <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        {g.type === "PHOTO" ? (
                          <ImageWithFallback
                            src={g.imageUrl || ""}
                            alt={g.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <VideoCard
                            videoUrl={g.videoUrl || ''}
                            title={g.title}
                            className="w-full h-full"
                            showPlatformInfo={true}
                            isShortForm={g.isShortForm}
                            videoPlatform={g.videoPlatform}
                            videoType={g.videoType}
                            onClick={() => setSelectedItem(g)}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {g.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {g.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {g.status}
                          </span>
                        </div>
                        {g.createdAt && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(g.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedItem(g)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {g.imageUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(g.imageUrl, "_blank")}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedItem(g)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    {g.type === "PHOTO" ? (
                      <ImageWithFallback
                        src={g.imageUrl || ""}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <VideoCard
                        videoUrl={g.videoUrl || ''}
                        title={g.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        showPlatformInfo={true}
                        isShortForm={g.isShortForm}
                        videoPlatform={g.videoPlatform}
                        videoType={g.videoType}
                        onClick={() => setSelectedItem(g)}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(g);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {g.imageUrl && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(g.imageUrl, "_blank");
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-2 truncate">
                      {g.title}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {g.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {g.status}
                      </span>
                    </div>
                    {g.createdAt && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(g.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Detail Dialog with Edit/Share/Delete */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={(o) => !o && setSelectedItem(null)}
      >
        <DialogContent className="max-w-4xl glassmorphism border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              {selectedItem?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <GalleryDetail
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onChange={() =>
                qc.invalidateQueries({ queryKey: ["gallery", "admin"] })
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GalleryDetail({
  item,
  onClose,
  onChange,
}: {
  item: any;
  onClose: () => void;
  onChange: () => void;
}) {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title as string);
  const [status, setStatus] = useState(item.status as "PUBLISHED" | "DRAFT");
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await galleryApi.update(item.id, { title, status });
      toast({ title: "Item updated" });
      setEditing(false);
      onChange();
    } catch (e: any) {
      toast({
        title: "Update failed",
        description: e?.message || "",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }
  

  async function remove() {
    if (!confirm("Delete this item?")) return;
    setRemoving(true);
    try {
      await galleryApi.remove(item.id);
      toast({ title: "Item deleted" });
      onChange();
      onClose();
    } catch (e: any) {
      toast({
        title: "Delete failed",
        description: e?.message || "",
        variant: "destructive",
      });
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="aspect-square rounded-lg overflow-hidden">
          {item.type === "PHOTO" ? (
            <ImageWithFallback
              src={item.imageUrl || ""}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <VideoCard
              videoUrl={item.videoUrl || ''}
              title={item.title}
              className="w-full h-full"
              showPlatformInfo={true}
              isShortForm={item.isShortForm}
              videoPlatform={item.videoPlatform}
              videoType={item.videoType}
            />
          )}
        </div>
        <div className="flex gap-2">
          {(item.imageUrl || item.videoUrl) && (
            <Button
              className="flex-1"
              onClick={() => window.open(item.imageUrl || item.videoUrl, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => navigator.clipboard?.writeText(location.href)}
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={() => setEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={remove} disabled={removing}>
            <Trash2 className="w-4 h-4 mr-2" />
            {removing ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {!editing ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Type</div>
                <p className="font-medium">{item.type}</p>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Status</div>
                <p className="font-medium">{item.status}</p>
              </div>
              {item.category && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <p className="font-medium">{item.category}</p>
                </div>
              )}
              {item.createdAt && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Upload Date
                  </div>
                  <p className="font-medium">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            {/* Description removed from detail display */}
            {item.tags && item.tags.length ? (
              <div>
                <div className="text-sm text-muted-foreground">Tags</div>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded border border-border text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={save} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
