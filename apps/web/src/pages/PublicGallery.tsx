/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/ui/header";
import GalleryBanner from "@/components/sections/GalleryBanner";
import FeaturedContent from "@/components/sections/FeaturedContent";
import ShareJourney from "@/components/sections/ShareJourney";
import { usePublicGalleryList } from "@/hooks/usePublicQuery";
import Footer from "@/components/ui/footer";

export default function PublicGallery() {
  const { data, isLoading, isError } = usePublicGalleryList(1, 12);
  const items = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative pt-20 sm:pt-24">
        {/* Banner Section */}
        <GalleryBanner />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Gallery</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore our collection of photos and videos
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">Loading gallery…</div>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="text-destructive">Failed to load gallery.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
              {items?.map((g: any) => (
                <div
                  key={g.id}
                  className="group rounded-xl overflow-hidden border border-primary/20 bg-accent/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                >
                  {g.type === "PHOTO" ? (
                    <img
                      src={g.imageUrl}
                      alt={g.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-56 bg-black flex items-center justify-center text-white">
                      Video
                    </div>
                  )}
                  <div className="p-3 sm:p-4">
                    <div className="font-medium text-sm sm:text-base mb-1">{g.title}</div>
                    {g.description && (
                      <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {g.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Featured Content Section */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <FeaturedContent />
          </div>
          
          {/* Share Journey Section */}
          <div className="mb-8 sm:mb-12">
            <ShareJourney />
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  );
}
