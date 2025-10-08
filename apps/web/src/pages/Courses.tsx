import { useState, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { coursesApi } from "@/lib/api";
import { getMediaUrl } from "@/lib/utils";
import { slugify } from "@/lib/slug";
import { toast } from "sonner";

// Helper function to find course by slug
const findCourseBySlug = (courses: any[], slug: string) => {
  if (!courses || !slug) return null;
  
  // First try exact match
  let foundCourse = courses.find(course => slugify(course.title) === slug);
  
  // If not found, try case-insensitive match
  if (!foundCourse) {
    foundCourse = courses.find(course => 
      slugify(course.title).toLowerCase() === slug.toLowerCase()
    );
  }
  
  // If still not found, try partial match (in case of typos)
  if (!foundCourse) {
    foundCourse = courses.find(course => {
      const courseSlug = slugify(course.title);
      return courseSlug.includes(slug) || slug.includes(courseSlug);
    });
  }
  
  return foundCourse;
};

const categories = [
  { id: "all", name: "All Courses" },
  { id: "AI & ML", name: "AI & Machine Learning" },
  { id: "Web Development", name: "Web Development" },
  { id: "Data Science", name: "Data Science" },
  { id: "Mobile Development", name: "Mobile Development" }
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced", "Leadership"];
const modes = ["All Modes", "Online", "Hybrid", "Executive"];

// All Courses Page Component
function CoursesListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [sortBy, setSortBy] = useState("popular");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load courses on component mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesApi.list();
      setCourses(response.data.data);
    } catch (error) {
      console.error("Failed to load courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = useMemo(() => {
    if (!courses || courses.length === 0) {
      return [];
    }
    
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => b.duration - a.duration);
      case "rating":
        return filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "price-low":
        return filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-high":
        return filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return filtered;
    }
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-space-depth">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-cyber-sheen bg-clip-text text-transparent">
            All Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our comprehensive AI education programs designed to accelerate your career
          </p>
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 text-lg bg-card/80 backdrop-blur border-border"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => {
                      const count = category.id === "all" 
                        ? (courses?.length || 0)
                        : (courses?.filter(c => c.category === category.id).length || 0);
                      
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category.name}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Level</h4>
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Mode Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Mode</h4>
                  <select 
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border"
                  >
                    {modes.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Courses Grid */}
          <main className="lg:col-span-3">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} courses
              </p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-background border border-border"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Courses Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted rounded-t-lg mb-4"></div>
                    <CardContent className="space-y-4">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredCourses.map(course => {
                  // Get the first image if available
                  const firstImage = course.images && course.images.length > 0 ? course.images[0] : null;
                  
                  return (
                    <Card key={course.id} className="group hover:shadow-glow-green transition-all duration-300 cursor-pointer overflow-hidden border border-border/50 hover:border-primary/50">
                      <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden relative">
                        {firstImage ? (
                          <img 
                            src={getMediaUrl(firstImage)} 
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <span class="text-2xl font-bold opacity-50">${course.title.charAt(0)}</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-2xl font-bold opacity-50">{course.title.charAt(0)}</span>
                          </div>
                        )}
                        {/* Overlay gradient for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary">{course.level}</Badge>
                        <div className="text-right">
                          <div className="font-bold text-lg text-primary">${course.price}</div>
                          <div className="text-sm text-muted-foreground">{course.duration} weeks</div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      
                      <p className="text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>⭐ 4.5</span>
                        <span>👥 {course.duration} weeks</span>
                        <span>📚 {course.category}</span>
                        {course.images && course.images.length > 1 && (
                          <span className="text-primary">📷 {course.images.length} images</span>
                        )}
                        {course.videos && course.videos.length > 0 && (
                          <span className="text-primary">🎥 {course.videos.length} videos</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {course.title.charAt(0)}
                          </div>
                          <span className="text-sm">Instructor</span>
                        </div>
                        
                        <Button 
                          onClick={() => navigate(`/courses/${slugify(course.title)}`)}
                          className="group-hover:shadow-glow-green"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              </div>
            )}

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Course Details Page Component
function CourseDetailsPage() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseSlug) {
      loadAllCourses();
    }
  }, [courseSlug]);

  const loadAllCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesApi.list();
      const courses = response.data.data;
      
      // Debug logging
      console.log("All courses:", courses);
      console.log("Looking for slug:", courseSlug);
      console.log("Course slugs:", courses.map(c => ({ title: c.title, slug: slugify(c.title) })));
      
      // Find course by slug
      const foundCourse = findCourseBySlug(courses, courseSlug!);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        console.error("Course not found for slug:", courseSlug);
        console.log("Available courses and their slugs:");
        courses.forEach(c => {
          console.log(`- "${c.title}" -> "${slugify(c.title)}"`);
        });
        toast.error(`Course "${courseSlug}" not found`);
        // Don't navigate away immediately, let the user see the error page
      }
    } catch (error) {
      console.error("Failed to load courses:", error);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The course "{courseSlug}" could not be found. Please check the URL or browse our available courses.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Course Hero */}
      <section className="py-20 bg-space-depth">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {course.level}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span>4.5</span>
                  <span className="text-muted-foreground">
                    (Rating)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-cyber-sheen bg-clip-text text-transparent">
                {course.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                {course.description}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {course.title.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">Instructor</div>
                    <div className="text-sm text-muted-foreground">Course Instructor</div>
                  </div>
                </div>
                
                <div className="border-l border-border pl-6">
                  <div className="font-semibold text-2xl text-primary">${course.price}</div>
                  <div className="text-sm text-muted-foreground">{course.duration} weeks</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="shadow-glow-green">
                  Enroll Now
                </Button>
                <Button variant="outline" size="lg">
                  Watch Preview
                </Button>
              </div>
            </div>

            <div className="aspect-video bg-card rounded-xl border border-border overflow-hidden">
              {course.videos && course.videos.length > 0 ? (
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster={course.images && course.images.length > 0 ? 
                    getMediaUrl(course.images[0]) : 
                    undefined
                  }
                >
                  <source 
                    src={getMediaUrl(course.videos[0])} 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Button variant="ghost" size="lg" className="w-20 h-20 rounded-full bg-primary/20">
                    <span className="text-3xl">▶</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-2 space-y-12">
            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>{course.category} Skills</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Hands-on Projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Real-world Applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Industry Best Practices</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Week 1: Introduction to {course.category}</h4>
                      <Badge variant="outline">3 topics</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Fundamentals</Badge>
                      <Badge variant="secondary" className="text-xs">Setup & Tools</Badge>
                      <Badge variant="secondary" className="text-xs">First Project</Badge>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Week 2-{course.duration-1}: Core Concepts</h4>
                      <Badge variant="outline">Multiple topics</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Advanced Topics</Badge>
                      <Badge variant="secondary" className="text-xs">Practical Exercises</Badge>
                      <Badge variant="secondary" className="text-xs">Case Studies</Badge>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Week {course.duration}: Final Project</h4>
                      <Badge variant="outline">1 project</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Project Planning</Badge>
                      <Badge variant="secondary" className="text-xs">Implementation</Badge>
                      <Badge variant="secondary" className="text-xs">Presentation</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span>Basic programming knowledge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span>High school mathematics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span>Enthusiasm to learn {course.category}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-24 border border-border/50 hover:border-primary/50 transition-colors duration-300">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">${course.price}</div>
                  <div className="text-muted-foreground">{course.duration} weeks program</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Level:</span>
                    <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Category:</span>
                    <span className="text-sm">{course.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Duration:</span>
                    <span className="text-sm">{course.duration} weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Price:</span>
                    <span className="text-sm font-semibold text-primary">${course.price}</span>
                  </div>
                </div>

                <Button className="w-full mb-4 shadow-glow-green hover:shadow-glow-green/80 transition-all duration-300">
                  Enroll Now
                </Button>
                
                <Button variant="outline" className="w-full hover:bg-muted/50 transition-colors duration-300">
                  Add to Wishlist
                </Button>
              </CardContent>
            </Card>

            {/* Course Highlights */}
            <Card className="border border-border/50 hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Course Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{course.category} Course</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{course.level} Level</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{course.duration} weeks duration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Hands-on projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Related Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold text-sm mb-1">More {course.category} Courses</h4>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Coming Soon</span>
                      <span className="font-semibold text-primary">$199</span>
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <h4 className="font-semibold text-sm mb-1">Advanced {course.category}</h4>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Coming Soon</span>
                      <span className="font-semibold text-primary">$299</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Main Courses Component with Routing
export default function Courses() {
  return (
    <Routes>
      <Route index element={<CoursesListPage />} />
      <Route path=":courseSlug" element={<CourseDetailsPage />} />
    </Routes>
  );
}
