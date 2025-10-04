import { useState, useMemo } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

// Course data structure
const coursesData = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals Program",
    description: "Master the core concepts of Artificial Intelligence through hands-on projects and real-world applications.",
    longDescription: "This comprehensive 8-week program is designed for beginners who want to enter the exciting world of AI. You'll learn the fundamental concepts, algorithms, and tools that power modern AI systems. Through hands-on projects and real-world case studies, you'll build a solid foundation in machine learning, neural networks, and Python programming.",
    duration: "8 Weeks",
    mode: "Online",
    level: "Beginner",
    price: "$899",
    rating: 4.8,
    students: 2847,
    instructor: "Dr. Sarah Chen",
    category: "fundamentals",
    image: "/api/placeholder/600/400",
    highlights: ["Machine Learning Basics", "Neural Networks", "Python for AI", "Project Portfolio"],
    curriculum: [
      { week: 1, title: "Introduction to AI & ML", topics: ["AI History", "Types of ML", "Python Setup"] },
      { week: 2, title: "Data Preprocessing", topics: ["Data Cleaning", "Feature Engineering", "Visualization"] },
      { week: 3, title: "Supervised Learning", topics: ["Linear Regression", "Classification", "Model Evaluation"] },
      { week: 4, title: "Unsupervised Learning", topics: ["Clustering", "Dimensionality Reduction", "Anomaly Detection"] },
      { week: 5, title: "Neural Networks", topics: ["Perceptrons", "Backpropagation", "Deep Learning Basics"] },
      { week: 6, title: "Computer Vision", topics: ["Image Processing", "CNNs", "Object Detection"] },
      { week: 7, title: "Natural Language Processing", topics: ["Text Processing", "Sentiment Analysis", "Chatbots"] },
      { week: 8, title: "Final Project", topics: ["Project Planning", "Implementation", "Presentation"] }
    ],
    prerequisites: ["Basic programming knowledge", "High school mathematics"],
    skills: ["Python Programming", "Machine Learning", "Data Analysis", "AI Model Development"]
  },
  {
    id: "advanced-ai",
    title: "Advanced AI Specialization",
    description: "Deep dive into advanced AI topics including deep learning, computer vision, and natural language processing.",
    longDescription: "Take your AI skills to the next level with this intensive 12-week specialization program. Designed for practitioners with foundational AI knowledge, this course covers cutting-edge techniques in deep learning, advanced computer vision, and sophisticated NLP applications.",
    duration: "12 Weeks",
    mode: "Hybrid",
    level: "Advanced",
    price: "$1,499",
    rating: 4.9,
    students: 1256,
    instructor: "Prof. Michael Rodriguez",
    category: "specialization",
    image: "/api/placeholder/600/400",
    highlights: ["Deep Learning", "Computer Vision", "NLP", "AI Ethics"],
    curriculum: [
      { week: 1, title: "Advanced Deep Learning", topics: ["Advanced Architectures", "Optimization Techniques", "Regularization"] },
      { week: 2, title: "Generative AI", topics: ["GANs", "VAEs", "Diffusion Models"] },
      { week: 3, title: "Computer Vision Advanced", topics: ["Object Detection", "Semantic Segmentation", "Face Recognition"] },
      { week: 4, title: "NLP Deep Dive", topics: ["Transformers", "BERT", "GPT Models"] },
      { week: 5, title: "Reinforcement Learning", topics: ["Q-Learning", "Policy Gradients", "Deep RL"] },
      { week: 6, title: "MLOps & Deployment", topics: ["Model Serving", "Monitoring", "CI/CD for ML"] },
      { week: 7, title: "AI Ethics & Bias", topics: ["Fairness", "Explainability", "Responsible AI"] },
      { week: 8, title: "Edge AI", topics: ["Model Optimization", "Mobile Deployment", "IoT Integration"] }
    ],
    prerequisites: ["AI Fundamentals completion", "Python proficiency", "Statistics knowledge"],
    skills: ["Advanced Deep Learning", "Computer Vision", "NLP", "MLOps", "AI Ethics"]
  },
  {
    id: "ai-leadership",
    title: "AI Leadership Track",
    description: "Strategic AI implementation for executives and team leaders driving organizational transformation.",
    longDescription: "This executive-level program is designed for leaders who need to understand AI's strategic implications and guide their organizations through AI transformation. Learn how to identify AI opportunities, manage AI teams, and implement AI solutions at scale.",
    duration: "6 Weeks",
    mode: "Executive",
    level: "Leadership",
    price: "$2,999",
    rating: 4.7,
    students: 589,
    instructor: "Dr. Emily Watson",
    category: "leadership",
    image: "/api/placeholder/600/400",
    highlights: ["AI Strategy", "Team Management", "ROI Analysis", "Implementation"],
    curriculum: [
      { week: 1, title: "AI Strategy & Vision", topics: ["AI Landscape", "Strategic Planning", "Vision Setting"] },
      { week: 2, title: "AI Team Building", topics: ["Talent Acquisition", "Team Structure", "Culture Building"] },
      { week: 3, title: "AI Project Management", topics: ["Project Planning", "Risk Management", "Agile for AI"] },
      { week: 4, title: "ROI & Business Value", topics: ["Metrics", "KPIs", "Business Cases"] },
      { week: 5, title: "Implementation & Change", topics: ["Change Management", "Stakeholder Buy-in", "Scaling"] },
      { week: 6, title: "Future of AI", topics: ["Emerging Trends", "Long-term Planning", "Continuous Learning"] }
    ],
    prerequisites: ["Leadership experience", "Basic business acumen"],
    skills: ["AI Strategy", "Team Leadership", "Project Management", "Change Management"]
  },
  {
    id: "data-science-ai",
    title: "Data Science for AI",
    description: "Comprehensive data science skills specifically tailored for AI and machine learning applications.",
    longDescription: "Bridge the gap between data science and AI with this specialized program. Learn advanced data manipulation, statistical analysis, and visualization techniques essential for AI projects.",
    duration: "10 Weeks",
    mode: "Online",
    level: "Intermediate",
    price: "$1,199",
    rating: 4.6,
    students: 1834,
    instructor: "Dr. James Park",
    category: "data-science",
    image: "/api/placeholder/600/400",
    highlights: ["Statistical Analysis", "Data Visualization", "Feature Engineering", "Model Validation"],
    curriculum: [
      { week: 1, title: "Data Science Foundations", topics: ["Statistics Review", "Probability", "Hypothesis Testing"] },
      { week: 2, title: "Advanced Data Manipulation", topics: ["Pandas", "NumPy", "Data Cleaning"] },
      { week: 3, title: "Exploratory Data Analysis", topics: ["Visualization", "Pattern Recognition", "Outlier Detection"] },
      { week: 4, title: "Feature Engineering", topics: ["Feature Selection", "Transformation", "Creation"] },
      { week: 5, title: "Statistical Modeling", topics: ["Regression", "Time Series", "Bayesian Methods"] },
      { week: 6, title: "ML Model Selection", topics: ["Cross-validation", "Hyperparameter Tuning", "Model Comparison"] }
    ],
    prerequisites: ["Basic statistics", "Python programming"],
    skills: ["Statistical Analysis", "Data Visualization", "Feature Engineering", "Model Validation"]
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics & Governance",
    description: "Navigate the complex landscape of AI ethics, bias, and governance in modern AI systems.",
    longDescription: "As AI becomes more prevalent, understanding its ethical implications is crucial. This course covers fairness, accountability, transparency, and governance frameworks for responsible AI development.",
    duration: "6 Weeks",
    mode: "Online",
    level: "Intermediate",
    price: "$799",
    rating: 4.5,
    students: 967,
    instructor: "Dr. Aisha Patel",
    category: "ethics",
    image: "/api/placeholder/600/400",
    highlights: ["AI Ethics", "Bias Detection", "Governance Frameworks", "Responsible AI"],
    curriculum: [
      { week: 1, title: "Ethics Foundations", topics: ["Ethical Frameworks", "AI Impact", "Stakeholder Analysis"] },
      { week: 2, title: "Bias & Fairness", topics: ["Types of Bias", "Detection Methods", "Mitigation Strategies"] },
      { week: 3, title: "Transparency & Explainability", topics: ["XAI Methods", "Model Interpretation", "Communication"] },
      { week: 4, title: "Privacy & Security", topics: ["Data Privacy", "Federated Learning", "Adversarial Attacks"] },
      { week: 5, title: "Governance Frameworks", topics: ["Policy Development", "Compliance", "Risk Management"] },
      { week: 6, title: "Future Considerations", topics: ["AGI Ethics", "Global Perspectives", "Emerging Challenges"] }
    ],
    prerequisites: ["Basic AI knowledge"],
    skills: ["AI Ethics", "Bias Detection", "Policy Development", "Risk Assessment"]
  },
  {
    id: "computer-vision-mastery",
    title: "Computer Vision Mastery",
    description: "Comprehensive computer vision course covering image processing, object detection, and advanced CV applications.",
    longDescription: "Master computer vision with this hands-on course covering everything from basic image processing to advanced applications like autonomous vehicles and medical imaging.",
    duration: "14 Weeks",
    mode: "Hybrid",
    level: "Advanced",
    price: "$1,799",
    rating: 4.8,
    students: 743,
    instructor: "Prof. Lisa Zhang",
    category: "specialization",
    image: "/api/placeholder/600/400",
    highlights: ["Image Processing", "Object Detection", "Facial Recognition", "Medical Imaging"],
    curriculum: [
      { week: 1, title: "Image Fundamentals", topics: ["Digital Images", "Color Spaces", "Basic Operations"] },
      { week: 2, title: "Feature Detection", topics: ["Edge Detection", "Corner Detection", "SIFT/SURF"] },
      { week: 3, title: "Convolutional Networks", topics: ["CNN Architecture", "Training", "Optimization"] },
      { week: 4, title: "Object Detection", topics: ["YOLO", "R-CNN", "SSD"] },
      { week: 5, title: "Semantic Segmentation", topics: ["U-Net", "DeepLab", "Mask R-CNN"] },
      { week: 6, title: "Face Recognition", topics: ["Face Detection", "Recognition", "Verification"] }
    ],
    prerequisites: ["Deep learning knowledge", "Python proficiency"],
    skills: ["Computer Vision", "Image Processing", "Object Detection", "Neural Networks"]
  }
];

const categories = [
  { id: "all", name: "All Courses", count: coursesData.length },
  { id: "fundamentals", name: "Fundamentals", count: coursesData.filter(c => c.category === "fundamentals").length },
  { id: "specialization", name: "Specialization", count: coursesData.filter(c => c.category === "specialization").length },
  { id: "leadership", name: "Leadership", count: coursesData.filter(c => c.category === "leadership").length },
  { id: "data-science", name: "Data Science", count: coursesData.filter(c => c.category === "data-science").length },
  { id: "ethics", name: "Ethics", count: coursesData.filter(c => c.category === "ethics").length }
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

  const filteredCourses = useMemo(() => {
    let filtered = coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
      const matchesMode = selectedMode === "All Modes" || course.mode === selectedMode;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesMode;
    });

    // Sort courses
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => b.students - a.students);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "price-low":
        return filtered.sort((a, b) => parseInt(a.price.replace(/[$,]/g, "")) - parseInt(b.price.replace(/[$,]/g, "")));
      case "price-high":
        return filtered.sort((a, b) => parseInt(b.price.replace(/[$,]/g, "")) - parseInt(a.price.replace(/[$,]/g, "")));
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, selectedLevel, selectedMode, sortBy]);

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
                    {categories.map(category => (
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
                          <Badge variant="secondary">{category.count}</Badge>
                        </div>
                      </button>
                    ))}
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
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCourses.map(course => (
                <Card key={course.id} className="group hover:shadow-glow-green transition-all duration-300 cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-2xl font-bold opacity-50">{course.title.charAt(0)}</span>
                    </div>
                  </div>
                  
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="text-right">
                        <div className="font-bold text-lg text-primary">{course.price}</div>
                        <div className="text-sm text-muted-foreground">{course.mode}</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>⭐ {course.rating}</span>
                      <span>👥 {course.students.toLocaleString()} students</span>
                      <span>⏱️ {course.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.highlights.slice(0, 3).map(highlight => (
                        <Badge key={highlight} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {course.instructor.charAt(0)}
                        </div>
                        <span className="text-sm">{course.instructor}</span>
                      </div>
                      
                      <Button 
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="group-hover:shadow-glow-green"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
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
                <Badge variant="outline">{course.mode}</Badge>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span>{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.students.toLocaleString()} students)
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-cyber-sheen bg-clip-text text-transparent">
                {course.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                {course.longDescription}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">Instructor</div>
                  </div>
                </div>
                
                <div className="border-l border-border pl-6">
                  <div className="font-semibold text-2xl text-primary">{course.price}</div>
                  <div className="text-sm text-muted-foreground">{course.duration}</div>
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
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Button variant="ghost" size="lg" className="w-20 h-20 rounded-full bg-primary/20">
                  <span className="text-3xl">▶</span>
                </Button>
              </div>
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
                  {course.skills.map(skill => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
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
                  {course.curriculum.map(week => (
                    <div key={week.week} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Week {week.week}: {week.title}</h4>
                        <Badge variant="outline">{week.topics.length} topics</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {week.topics.map(topic => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
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
                  {course.prerequisites.map(prereq => (
                    <li key={prereq} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">{course.price}</div>
                  <div className="text-muted-foreground">{course.duration} program</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span>{course.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full mb-4 shadow-glow-green">
                  Enroll Now
                </Button>
                
                <Button variant="outline" className="w-full">
                  Add to Wishlist
                </Button>
              </CardContent>
            </Card>

            {/* Course Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Course Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.highlights.map(highlight => (
                    <div key={highlight} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
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
                  {coursesData.filter(c => c.id !== course.id && c.category === course.category).slice(0, 2).map(relatedCourse => (
                    <div key={relatedCourse.id} className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                         onClick={() => navigate(`/courses/${relatedCourse.id}`)}>
                      <h4 className="font-semibold text-sm mb-1">{relatedCourse.title}</h4>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{relatedCourse.duration}</span>
                        <span className="font-semibold text-primary">{relatedCourse.price}</span>
                      </div>
                    </div>
                  ))}
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
      <Route path=":courseId" element={<CourseDetailsPage />} />
    </Routes>
  );
}
