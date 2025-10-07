
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  BookOpen,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Star,
  TrendingUp,
  CheckCircle,
  Target,
  Award,
  DollarSign,
  Eye,
  Sparkles,
  Brain,
  Zap,
  Wand2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Upload,
  Image,
  Video,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Mock data
const courseStats = {
  total: 156,
  active: 134,
  draft: 15,
  archived: 7,
  totalStudents: 2847,
  completionRate: 73,
  revenue: 125420,
};

const enrollmentData = [
  { month: "Jan", enrollments: 245, completions: 178 },
  { month: "Feb", enrollments: 312, completions: 201 },
  { month: "Mar", enrollments: 398, completions: 267 },
  { month: "Apr", enrollments: 445, completions: 312 },
  { month: "May", enrollments: 521, completions: 389 },
  { month: "Jun", enrollments: 478, completions: 356 },
];

const categoryData = [
  {
    name: "AI & Machine Learning",
    value: 35,
    color: "#00FFFF",
  },
  { name: "Web Development", value: 28, color: "#00FF9D" },
  { name: "Data Science", value: 22, color: "#8A2BE2" },
  { name: "Mobile Development", value: 15, color: "#FF6B9D" },
];

const recentCourses = [
  {
    id: 1,
    title: "Advanced React & TypeScript",
    category: "Web Development",
    instructor: "Sarah Chen",
    students: 234,
    rating: 4.8,
    status: "active",
    progress: 85,
    revenue: 12560,
    createdAt: "2024-01-15",
    duration: "8 weeks",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    category: "AI & ML",
    instructor: "Dr. Alex Kumar",
    students: 456,
    rating: 4.9,
    status: "active",
    progress: 92,
    revenue: 23400,
    createdAt: "2024-01-10",
    duration: "12 weeks",
  },
  {
    id: 3,
    title: "Data Visualization with D3.js",
    category: "Data Science",
    instructor: "Maya Rodriguez",
    students: 189,
    rating: 4.7,
    status: "draft",
    progress: 45,
    revenue: 8900,
    createdAt: "2024-01-20",
    duration: "6 weeks",
  },
  {
    id: 4,
    title: "Flutter Mobile Development",
    category: "Mobile Development",
    instructor: "James Wilson",
    students: 312,
    rating: 4.6,
    status: "active",
    progress: 78,
    revenue: 15600,
    createdAt: "2024-01-05",
    duration: "10 weeks",
  },
  {
    id: 5,
    title: "Python for Data Science",
    category: "Data Science",
    instructor: "Lisa Park",
    students: 567,
    rating: 4.8,
    status: "active",
    progress: 88,
    revenue: 28350,
    createdAt: "2023-12-28",
    duration: "14 weeks",
  },
];

const categories = [
  "All",
  "AI & ML",
  "Web Development",
  "Data Science",
  "Mobile Development",
  "DevOps",
  "Design",
];

export function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isCreateDialogOpen, setIsCreateDialogOpen] =
    useState(false);
  const [isAICreateOpen, setIsAICreateOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] =
    useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);
  const [showAdvancedAI, setShowAdvancedAI] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{
    id: number;
    file: File;
    url: string;
    name: string;
  }>>([]);
  const [uploadedVideos, setUploadedVideos] = useState<Array<{
    id: number;
    file: File;
    url: string;
    name: string;
  }>>([]);

  const filteredCourses = recentCourses.filter((course) => {
    const matchesSearch =
      course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.instructor
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      course.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" ||
      course.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-accent-foreground/20 text-accent-foreground border-accent-foreground/30">
            Active
          </Badge>
        );
      case "draft":
        return (
          <Badge
            variant="secondary"
            className="bg-muted text-muted-foreground"
          >
            Draft
          </Badge>
        );
      case "archived":
        return (
          <Badge
            variant="outline"
            className="border-muted-foreground/50 text-muted-foreground"
          >
            Archived
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setIsEditDialogOpen(true);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const mockGeneratedCourse = {
        title: generateCourseTitle(aiPrompt),
        description: generateCourseDescription(aiPrompt),
        category: inferCategory(aiPrompt),
        level: inferLevel(aiPrompt),
        duration: inferDuration(aiPrompt),
        price: inferPrice(aiPrompt),
        modules: generateModules(aiPrompt),
        objectives: generateObjectives(aiPrompt),
        prerequisites: generatePrerequisites(aiPrompt),
      };

      setGeneratedCourse(mockGeneratedCourse);
      setIsGenerating(false);
    }, 2000);
  };

  const generateCourseTitle = (prompt: string) => {
    const topics = prompt.toLowerCase();
    if (
      topics.includes("react") &&
      topics.includes("typescript")
    )
      return "Advanced React & TypeScript Masterclass";
    if (
      topics.includes("machine learning") ||
      topics.includes("ml")
    )
      return "Complete Machine Learning Bootcamp";
    if (topics.includes("python") && topics.includes("data"))
      return "Python Data Science Masterclass";
    if (topics.includes("flutter") || topics.includes("mobile"))
      return "Flutter Mobile App Development";
    if (
      topics.includes("ai") ||
      topics.includes("artificial intelligence")
    )
      return "AI Fundamentals & Applications";
    return "Advanced Programming Course";
  };

  const generateCourseDescription = (prompt: string) => {
    return `This comprehensive course covers everything you need to know about ${prompt}. Designed for professionals and enthusiasts, you'll learn through hands-on projects and real-world applications. Our expert instructors will guide you through advanced concepts and best practices.`;
  };

  const inferCategory = (prompt: string) => {
    const topics = prompt.toLowerCase();
    if (
      topics.includes("ai") ||
      topics.includes("machine learning") ||
      topics.includes("ml")
    )
      return "AI & ML";
    if (
      topics.includes("react") ||
      topics.includes("javascript") ||
      topics.includes("web")
    )
      return "Web Development";
    if (
      topics.includes("data") ||
      topics.includes("analytics") ||
      topics.includes("python")
    )
      return "Data Science";
    if (
      topics.includes("flutter") ||
      topics.includes("mobile") ||
      topics.includes("ios") ||
      topics.includes("android")
    )
      return "Mobile Development";
    return "AI & ML";
  };

  const inferLevel = (prompt: string) => {
    const topics = prompt.toLowerCase();
    if (
      topics.includes("beginner") ||
      topics.includes("introduction") ||
      topics.includes("basics")
    )
      return "beginner";
    if (
      topics.includes("advanced") ||
      topics.includes("expert") ||
      topics.includes("master")
    )
      return "advanced";
    return "intermediate";
  };

  const inferDuration = (prompt: string) => {
    const topics = prompt.toLowerCase();
    if (
      topics.includes("bootcamp") ||
      topics.includes("intensive")
    )
      return "16";
    if (topics.includes("quick") || topics.includes("crash"))
      return "4";
    if (
      topics.includes("comprehensive") ||
      topics.includes("complete")
    )
      return "12";
    return "8";
  };

  const inferPrice = (prompt: string) => {
    const topics = prompt.toLowerCase();
    if (
      topics.includes("advanced") ||
      topics.includes("expert")
    )
      return "299";
    if (
      topics.includes("bootcamp") ||
      topics.includes("intensive")
    )
      return "499";
    if (
      topics.includes("beginner") ||
      topics.includes("introduction")
    )
      return "99";
    return "199";
  };

  const generateModules = (_prompt: string) => {
    return [
      "Introduction & Fundamentals",
      "Core Concepts & Theory",
      "Practical Implementation",
      "Advanced Techniques",
      "Real-world Projects",
      "Best Practices & Optimization",
      "Final Project & Deployment",
    ];
  };

  const generateObjectives = (_prompt: string) => {
    return [
      "Master the fundamental concepts",
      "Build real-world applications",
      "Understand industry best practices",
      "Develop problem-solving skills",
      "Create a professional portfolio",
    ];
  };

  const generatePrerequisites = (prompt: string) => {
    const topics = prompt.toLowerCase();
    if (topics.includes("advanced")) {
      return [
        "Strong programming background",
        "Previous experience with related technologies",
        "Understanding of algorithms",
      ];
    }
    if (topics.includes("beginner")) {
      return ["Basic computer skills", "Enthusiasm to learn"];
    }
    return [
      "Basic programming knowledge",
      "Familiarity with development tools",
    ];
  };

  const handleUseAIGenerated = () => {
    // Transfer AI generated content to the regular create form
    setIsAICreateOpen(false);
    setIsCreateDialogOpen(true);
    // In a real implementation, you would populate the form fields with generated data
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          file,
          url: e.target?.result as string,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    videoFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedVideos(prev => [...prev, {
          id: Date.now() + Math.random(),
          file,
          url: e.target?.result as string,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: number) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const removeVideo = (id: number) => {
    setUploadedVideos(prev => prev.filter(vid => vid.id !== id));
  };

  const handleCloseModal = () => {
    setIsCreateDialogOpen(false);
    setUploadedImages([]);
    setUploadedVideos([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Courses Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your courses, track student progress, and
            analyze performance
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isAICreateOpen}
            onOpenChange={setIsAICreateOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-accent-foreground to-primary text-background hover:opacity-90 neon-glow">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Create
              </Button>
            </DialogTrigger>
            <DialogContent className="glassmorphism border-primary/20 max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-primary flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Course Creator
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Describe your course idea and let AI generate
                  a comprehensive course structure for you.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt">
                    Course Description
                  </Label>
                  <Textarea
                    id="ai-prompt"
                    placeholder="Describe the course you want to create. For example: 'Create an advanced React course focusing on hooks, context, and performance optimization for experienced developers'"
                    value={aiPrompt}
                    onChange={(e) =>
                      setAiPrompt(e.target.value)
                    }
                    className="bg-input-background border-border min-h-[120px]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setShowAdvancedAI(!showAdvancedAI)
                    }
                    className="text-primary"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Advanced AI Options
                    {showAdvancedAI ? (
                      <ChevronUp className="w-4 h-4 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-2" />
                    )}
                  </Button>
                </div>

                {showAdvancedAI && (
                  <div className="grid grid-cols-2 gap-4 p-4 glassmorphism border-primary/10 rounded-lg">
                    <div className="space-y-2">
                      <Label>Target Audience</Label>
                      <Select>
                        <SelectTrigger className="bg-input-background border-border">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphism border-primary/20">
                          <SelectItem value="beginner">
                            Beginner
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">
                            Advanced
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Course Duration</Label>
                      <Select>
                        <SelectTrigger className="bg-input-background border-border">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphism border-primary/20">
                          <SelectItem value="4-weeks">
                            4 weeks
                          </SelectItem>
                          <SelectItem value="8-weeks">
                            8 weeks
                          </SelectItem>
                          <SelectItem value="12-weeks">
                            12 weeks
                          </SelectItem>
                          <SelectItem value="16-weeks">
                            16 weeks
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Focus Area</Label>
                      <Select>
                        <SelectTrigger className="bg-input-background border-border">
                          <SelectValue placeholder="Select focus" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphism border-primary/20">
                          <SelectItem value="theoretical">
                            Theoretical
                          </SelectItem>
                          <SelectItem value="practical">
                            Practical
                          </SelectItem>
                          <SelectItem value="project-based">
                            Project-based
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Industry Application</Label>
                      <Select>
                        <SelectTrigger className="bg-input-background border-border">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent className="glassmorphism border-primary/20">
                          <SelectItem value="general">
                            General
                          </SelectItem>
                          <SelectItem value="fintech">
                            FinTech
                          </SelectItem>
                          <SelectItem value="healthcare">
                            Healthcare
                          </SelectItem>
                          <SelectItem value="ecommerce">
                            E-commerce
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {generatedCourse && !isGenerating && (
                  <div className="space-y-4 p-4 glassmorphism border-accent-foreground/20 rounded-lg">
                    <div className="flex items-center gap-2 text-accent-foreground">
                      <CheckCircle className="w-5 h-5" />
                      <span>
                        Course Generated Successfully!
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-accent-foreground">
                            Title
                          </Label>
                          <p className="text-foreground">
                            {generatedCourse.title}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-accent-foreground">
                            Category
                          </Label>
                          <p className="text-foreground">
                            {generatedCourse.category}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-accent-foreground">
                            Duration & Level
                          </Label>
                          <p className="text-foreground">
                            {generatedCourse.duration} weeks •{" "}
                            {generatedCourse.level}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-accent-foreground">
                            Estimated Price
                          </Label>
                          <p className="text-foreground">
                            ${generatedCourse.price}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-accent-foreground">
                            Course Modules
                          </Label>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {generatedCourse.modules?.map(
                              (module: string, index: number) => (
                                <li key={index}>• {module}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-accent-foreground">
                        Description
                      </Label>
                      <p className="text-foreground text-sm">
                        {generatedCourse.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAICreateOpen(false)}
                  className="border-border"
                >
                  Cancel
                </Button>
                {!generatedCourse && (
                  <Button
                    onClick={handleAIGenerate}
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="bg-gradient-to-r from-primary to-accent-foreground text-background"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Course
                      </>
                    )}
                  </Button>
                )}
                {generatedCourse && (
                  <Button
                    onClick={handleUseAIGenerated}
                    className="bg-gradient-to-r from-primary to-accent-foreground text-background"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Use This Course
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Manual Create
              </Button>
            </DialogTrigger>
            <DialogContent className="glassmorphism border-primary/20 max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  Create New Course
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Fill in the details to create a new course for
                  your students.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter course title"
                      className="bg-input-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="glassmorphism border-primary/20">
                        <SelectItem value="ai-ml">
                          AI & Machine Learning
                        </SelectItem>
                        <SelectItem value="web-dev">
                          Web Development
                        </SelectItem>
                        <SelectItem value="data-science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="mobile-dev">
                          Mobile Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Course description"
                    className="bg-input-background border-border min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      Duration (weeks)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="8"
                      className="bg-input-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="199"
                      className="bg-input-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select>
                      <SelectTrigger className="bg-input-background border-border">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="glassmorphism border-primary/20">
                        <SelectItem value="beginner">
                          Beginner
                        </SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">
                          Advanced
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Media Upload Section */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Course Media</Label>
                    <p className="text-sm text-muted-foreground">
                      Upload images and videos to enhance your course content
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Upload */}
                    <div className="space-y-3">
                      <Label htmlFor="image-upload" className="flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        Course Images
                      </Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground text-center">
                            Click to upload images
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </label>
                      </div>
                      
                      {/* Image Previews */}
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {uploadedImages.map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-20 object-cover rounded-lg border border-border"
                              />
                              <button
                                onClick={() => removeImage(image.id)}
                                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <p className="text-xs text-muted-foreground mt-1 truncate">
                                {image.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Video Upload */}
                    <div className="space-y-3">
                      <Label htmlFor="video-upload" className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Course Videos
                      </Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          multiple
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="video-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground text-center">
                            Click to upload videos
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            MP4, MOV, AVI up to 100MB
                          </span>
                        </label>
                      </div>
                      
                      {/* Video Previews */}
                      {uploadedVideos.length > 0 && (
                        <div className="space-y-2">
                          {uploadedVideos.map((video) => (
                            <div key={video.id} className="relative group">
                              <video
                                src={video.url}
                                className="w-full h-24 object-cover rounded-lg border border-border"
                                controls
                              />
                              <button
                                onClick={() => removeVideo(video.id)}
                                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <p className="text-xs text-muted-foreground mt-1 truncate">
                                {video.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="border-border"
                >
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent-foreground text-background">
                  Create Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glassmorphism border-primary/20 neon-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Courses
                </p>
                <p className="text-3xl font-bold text-primary">
                  {courseStats.total}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Students
                </p>
                <p className="text-3xl font-bold text-accent-foreground">
                  {courseStats.totalStudents.toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-accent-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Completion Rate
                </p>
                <p className="text-3xl font-bold text-accent-foreground">
                  {courseStats.completionRate}%
                </p>
              </div>
              <Target className="w-8 h-8 text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-primary">
                  ${courseStats.revenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Enrollment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient
                    id="enrollmentGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#00FFFF"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#00FFFF"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                  <linearGradient
                    id="completionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#00FF9D"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#00FF9D"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0, 255, 255, 0.1)"
                />
                <XAxis dataKey="month" stroke="#A0A9B8" />
                <YAxis stroke="#A0A9B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(16, 24, 40, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#00FFFF"
                  fill="url(#enrollmentGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="completions"
                  stroke="#00FF9D"
                  fill="url(#completionGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Course Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(16, 24, 40, 0.9)",
                    border: "1px solid rgba(0, 255, 255, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Management */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Course Management
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-10 bg-input-background border-border"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40 bg-input-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glassmorphism border-primary/20">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-32 bg-input-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glassmorphism border-primary/20">
                  <SelectItem value="All">
                    All Status
                  </SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">
                    Archived
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow
                  key={course.id}
                  className="border-border hover:bg-muted/50"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">
                        {course.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.category}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {course.instructor}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{course.students}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress
                        value={course.progress}
                        className="w-16"
                      />
                      <span className="text-xs text-muted-foreground">
                        {course.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-primary">
                    ${course.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(course.status)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="glassmorphism border-primary/20"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            handleEditCourse(course)
                          }
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Course Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <DialogContent className="glassmorphism border-primary/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary">
              Edit Course
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update course information and settings.
            </DialogDescription>
          </DialogHeader>
          {editingCourse && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">
                    Course Title
                  </Label>
                  <Input
                    id="edit-title"
                    defaultValue={editingCourse.title}
                    className="bg-input-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">
                    Category
                  </Label>
                  <Select defaultValue={editingCourse.category}>
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glassmorphism border-primary/20">
                      <SelectItem value="AI & ML">
                        AI & Machine Learning
                      </SelectItem>
                      <SelectItem value="Web Development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="Data Science">
                        Data Science
                      </SelectItem>
                      <SelectItem value="Mobile Development">
                        Mobile Development
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-instructor">
                    Instructor
                  </Label>
                  <Input
                    id="edit-instructor"
                    defaultValue={editingCourse.instructor}
                    className="bg-input-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">
                    Duration
                  </Label>
                  <Input
                    id="edit-duration"
                    defaultValue={editingCourse.duration}
                    className="bg-input-background border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={editingCourse.status}>
                  <SelectTrigger className="bg-input-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glassmorphism border-primary/20">
                    <SelectItem value="active">
                      Active
                    </SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">
                      Archived
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent-foreground text-background">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}