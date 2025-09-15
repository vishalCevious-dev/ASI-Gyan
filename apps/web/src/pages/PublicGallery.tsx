/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/ui/header";
import { usePublicGalleryList } from "@/hooks/usePublicQuery";

export default function PublicGallery() {
  const { data, isLoading, isError } = usePublicGalleryList(1, 12);
  const items = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative pt-24">
        <main className="container mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6">Gallery</h1>
          {isLoading ? (
            <div className="text-muted-foreground">Loading gallery…</div>
          ) : isError ? (
            <div className="text-destructive">Failed to load gallery.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items?.map((g: any) => (
                <div
                  key={g.id}
                  className="rounded-xl overflow-hidden border border-primary/20 bg-accent/10"
                >
                  {g.type === "PHOTO" ? (
                    <img
                      src={g.imageUrl}
                      alt={g.title}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-black flex items-center justify-center text-white">
                      Video
                    </div>
                  )}
                  <div className="p-3">
                    <div className="font-medium">{g.title}</div>
                    {g.description && (
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {g.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
