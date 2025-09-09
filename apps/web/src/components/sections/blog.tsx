import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import blogHeroImage from "@/assets/blog-hero.jpg";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of AI in Education: Transforming Learning Experiences",
      excerpt:
        "Explore how artificial intelligence is revolutionizing educational methodologies and creating personalized learning pathways for students worldwide.",
      author: "Dr. Priya Sharma",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "AI Education",
      featured: true,
    },
    {
      title: "Building Your First AI Model: A Beginner's Complete Guide",
      excerpt:
        "Step-by-step tutorial on creating your first machine learning model, from data preparation to deployment in production environments.",
      author: "Raj Patel",
      date: "Dec 12, 2024",
      readTime: "12 min read",
      category: "Tutorial",
    },
    {
      title: "AI Ethics in Practice: Real-World Case Studies",
      excerpt:
        "Examining ethical considerations in AI development through actual industry examples and lessons learned from major implementations.",
      author: "Dr. Sarah Chen",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Ethics",
    },
    {
      title: "Career Transition to AI: Success Stories from Our Alumni",
      excerpt:
        "Inspiring journeys of professionals who successfully transitioned into AI careers and the strategies that led to their success.",
      author: "ASI Gyan Team",
      date: "Dec 8, 2024",
      readTime: "10 min read",
      category: "Career",
    },
    {
      title: "Generative AI Tools Every Developer Should Know in 2024",
      excerpt:
        "A comprehensive review of the latest generative AI tools that are transforming software development and increasing productivity.",
      author: "Mike Johnson",
      date: "Dec 5, 2024",
      readTime: "7 min read",
      category: "Tools",
    },
    {
      title: "The Economics of AI: Market Trends and Investment Opportunities",
      excerpt:
        "Analysis of current AI market dynamics, emerging investment opportunities, and predictions for industry growth in the coming years.",
      author: "Dr. Anita Verma",
      date: "Dec 2, 2024",
      readTime: "9 min read",
      category: "Market Analysis",
    },
  ];

  const categories = [
    "All",
    "AI Education",
    "Tutorial",
    "Ethics",
    "Career",
    "Tools",
    "Market Analysis",
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-secondary text-secondary bg-secondary/10 mb-4"
          >
            📚 Knowledge Hub
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Learning Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the latest insights, tutorials, and thought leadership in
            artificial intelligence. Learn from industry experts and advance
            your AI knowledge.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className={
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="bg-card border-primary/20 shadow-glow-green overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-space-depth p-8 lg:p-12 flex items-center">
                  <div>
                    <Badge
                      variant="outline"
                      className="border-primary text-primary bg-primary/10 mb-4"
                    >
                      ⭐ Featured Article
                    </Badge>
                    <h3 className="text-3xl font-bold mb-4 leading-tight">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span>{blogPosts[0].author}</span>
                      <span>•</span>
                      <span>{blogPosts[0].date}</span>
                      <span>•</span>
                      {/* <span>{Blog[0].readTime}</span> */}
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Read Full Article
                    </Button>
                  </div>
                </div>
                <div
                  className="relative min-h-[300px] lg:min-h-full bg-cover bg-center overflow-hidden"
                  style={{ backgroundImage: `url(${blogHeroImage})` }}
                >
                  <div className="absolute inset-0 bg-neon-core opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-space-depth/80 to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-green group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="border-muted text-muted-foreground text-xs"
                  >
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 h-auto p-0"
                  >
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-secondary text-secondary hover:bg-secondary/10 mt-4"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
