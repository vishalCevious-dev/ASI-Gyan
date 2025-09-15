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

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState<"PHOTO" | "VIDEO">("PHOTO");
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [image, setImage] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await galleryApi.add({
        title,
        description: desc || undefined,
        type,
        image: image || undefined,
        videoUrl: type === "VIDEO" ? videoUrl || undefined : undefined,
        status,
      });
      toast({ title: "Gallery item created" });
      setTitle("");
      setDesc("");
      setImage(null);
      setVideoUrl("");
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
    <div className="space-y-8">
      {/* Hero */}
      <div
        className="rounded-2xl p-8 md:p-14"
        style={{
          background:
            "linear-gradient(180deg, #04111F, rgba(0,255,140,0.05), rgba(0,255,140,0.1))",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="space-y-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white whitespace-pre-line">
                {"Explore Knowledge\nin Pictures & Videos"}
              </h1>
              <p className="text-[#F9FAFA]/90 text-base md:text-lg whitespace-pre-line">
                {
                  "Discover our rich collection of educational content,\ncommunity moments, and AI-powered learning\nexperiences through visual storytelling."
                }
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Button
                className="py-3 px-6 text-white font-bold border-0"
                style={{
                  background: "linear-gradient(180deg, #00FFFF, #8A2CE2)",
                }}
                onClick={() => alert("Pressed!")}
              >
                Browse Gallery
              </Button>
              <Button
                variant="outline"
                className="bg-white text-[#2B303B] border border-gray-200 py-3 px-6 font-bold"
                onClick={() => alert("Pressed!")}
              >
                Watch Video Tour
              </Button>
            </div>
            <div className="flex items-center gap-8 text-center">
              <div>
                <div className="text-[#00FFFF] text-2xl font-bold">1K+</div>
                <div className="text-[#676F7E] text-sm">Photos</div>
              </div>
              <div>
                <div className="text-[#00FFFF] text-2xl font-bold">250+</div>
                <div className="text-[#676F7E] text-sm">Videos</div>
              </div>
              <div>
                <div className="text-[#00FFFF] text-2xl font-bold">50+</div>
                <div className="text-[#676F7E] text-sm">Events</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className="w-36 h-12 rounded-xl mb-4"
              style={{
                background: "linear-gradient(180deg, #FFFFFF, #F9FAFA)",
              }}
            />
            <div
              className="rounded-2xl h-64 md:h-80 lg:h-[500px] ml-4"
              style={{ boxShadow: "0px 25px 50px #00000040" }}
            >
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Fp1eI3jIZT/nyi9gi6m_expires_30_days.png"
                alt="Gallery highlight"
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <div
              className="absolute bottom-4 right-4 w-20 p-3 rounded-xl text-center"
              style={{
                background: "linear-gradient(180deg, #FFFFFF, #F9FAFA)",
              }}
            >
              <div className="text-[#00FFFF] text-lg font-bold">AI</div>
              <div className="text-[#676F7E] text-xs">Powered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#31415833] rounded-xl py-4 px-4">
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="flex items-center rounded-[10px] px-3 py-2"
            style={{ background: "linear-gradient(180deg, #00FFFF, #8A2CE2)" }}
          >
            <span className="text-white text-sm font-bold mr-2">All</span>
            <span className="text-white text-xs font-bold bg-[#00FEFE1A] rounded-full px-3 py-1">
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
              className="flex items-center bg-[#0F1B2E] py-2 px-3 rounded-[10px] border border-[#FFFFFF1A]"
            >
              <input
                placeholder={String(ph)}
                value={String(val)}
                onChange={(e) =>
                  (setVal as (v: string) => void)(e.target.value)
                }
                className="text-white bg-transparent text-sm font-bold w-[92px] py-[1px] border-0 outline-none"
              />
              <span className="text-white text-xs font-bold bg-[#00FEFE1A] rounded-full px-3 py-1 ml-2">
                {String(count)}
              </span>
            </div>
          ))}
        </div>
        <div className="text-white/90 text-sm">Newest First</div>
      </div>

      {/* Admin: create new item */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle>Create New Gallery Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Optional"
              />
            </div>
            {type === "VIDEO" ? (
              <div className="space-y-2 md:col-span-2">
                <Label>Video URL</Label>
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                  required={type === "VIDEO"}
                />
              </div>
            ) : null}
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

      {/* Live gallery grid from API */}
      {isLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : isError ? (
        <div className="text-destructive">Failed to load gallery.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((g: any) => (
            <GalleryCard
              key={g.id}
              item={g}
              onUpdated={() =>
                qc.invalidateQueries({ queryKey: ["gallery", "admin"] })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryCard({
  item,
  onUpdated,
}: {
  item: any;
  onUpdated: () => void;
}) {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title as string);
  const [status, setStatus] = useState(item.status as "PUBLISHED" | "DRAFT");
  const [saving, setSaving] = useState(false);
  async function save() {
    setSaving(true);
    try {
      await galleryApi.update(item.id, { title, status });
      toast({ title: "Item updated" });
      setEditing(false);
      onUpdated();
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
  return (
    <div className="rounded-xl overflow-hidden border border-primary/20 bg-accent/10">
      {item.type === "PHOTO" ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-black flex items-center justify-center text-white">
          Video
        </div>
      )}
      <div className="p-3 space-y-2">
        {editing ? (
          <>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="font-medium">{item.title}</div>
            {item.description && (
              <div className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">
                {item.status}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
