import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Zap,
  Brain,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const aiTools = [
  {
    id: 1,
    name: "AI Prompt Builder",
    description:
      "Generate optimized prompts for various AI models and use cases",
    icon: Lightbulb,
    color: "text-chart-5",
    gradient: "from-chart-5 to-chart-4",
    features: ["GPT Optimization", "Multi-model Support", "Template Library"],
    usage: "2,847 prompts generated",
    status: "Active",
  },
  {
    id: 2,
    name: "Learning Assistant",
    description:
      "Personalized AI tutor that adapts to individual learning styles",
    icon: Brain,
    color: "text-primary",
    gradient: "from-primary to-accent-foreground",
    features: [
      "Adaptive Learning",
      "Progress Tracking",
      "Personalized Content",
    ],
    usage: "15,643 sessions",
    status: "Active",
  },
  {
    id: 3,
    name: "Smart Analytics",
    description: "AI-powered insights and predictions for learning outcomes",
    icon: BarChart3,
    color: "text-accent-foreground",
    gradient: "from-accent-foreground to-primary",
    features: [
      "Predictive Analytics",
      "Performance Insights",
      "Trend Analysis",
    ],
    usage: "8,921 reports generated",
    status: "Active",
  },
  {
    id: 4,
    name: "Content Generator",
    description: "Create educational content using advanced AI models",
    icon: Sparkles,
    color: "text-chart-3",
    gradient: "from-chart-3 to-chart-4",
    features: ["Content Creation", "Auto-grading", "Curriculum Design"],
    usage: "1,234 pieces generated",
    status: "Beta",
  },
  {
    id: 5,
    name: "Discussion Bot",
    description: "AI moderator for community discussions and Q&A",
    icon: MessageSquare,
    color: "text-chart-4",
    gradient: "from-chart-4 to-chart-5",
    features: ["Auto-moderation", "Q&A Assistance", "Topic Suggestions"],
    usage: "5,678 interactions",
    status: "Active",
  },
  {
    id: 6,
    name: "Goal Optimizer",
    description: "AI-driven goal setting and achievement tracking",
    icon: Target,
    color: "text-chart-2",
    gradient: "from-chart-2 to-primary",
    features: ["Goal Planning", "Progress Tracking", "Achievement Rewards"],
    usage: "3,456 goals set",
    status: "Coming Soon",
  },
];

const stats = [
  { label: "Active AI Tools", value: "6", icon: Zap, color: "text-primary" },
  {
    label: "Total Interactions",
    value: "36.8K",
    icon: Brain,
    color: "text-accent-foreground",
  },
  {
    label: "AI Queries Today",
    value: "2,847",
    icon: MessageSquare,
    color: "text-chart-4",
  },
  {
    label: "Automation Rate",
    value: "94%",
    icon: BarChart3,
    color: "text-chart-5",
  },
];

export function AITools() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            AI Tools Suite
          </h1>
          <p className="text-muted-foreground mt-2">
            Leverage powerful AI tools to enhance learning experiences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-green"
          >
            <Link to="/dashboard/openai">Launch OpenAI Chat</Link>
          </Button>
          <Button className="gradient-primary text-black font-medium hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 mr-2" />
            Request New Tool
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-accent/20">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className="glassmorphism border-primary/20 hover:border-primary/40 hover:neon-glow transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} bg-opacity-20`}
                  >
                    <Icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <Badge
                    variant={
                      tool.status === "Active"
                        ? "default"
                        : tool.status === "Beta"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      tool.status === "Active"
                        ? "bg-accent-foreground/20 text-accent-foreground border-accent-foreground/30"
                        : tool.status === "Beta"
                          ? "bg-chart-4/20 text-chart-4 border-chart-4/30"
                          : "bg-muted/20 text-muted-foreground border-muted-foreground/30"
                    }
                  >
                    {tool.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-foreground">
                  {tool.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  {tool.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usage:</span>
                  <span className={`font-medium ${tool.color}`}>
                    {tool.usage}
                  </span>
                </div>

                {/* Action Button */}
                {tool.status === "Coming Soon" ? (
                  <Button
                    className={`w-full bg-gradient-to-r ${tool.gradient} text-black font-medium hover:scale-105 transition-transform group-hover:shadow-lg`}
                    disabled
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Button>
                ) : tool.name === "Discussion Bot" ? (
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${tool.gradient} text-black font-medium hover:scale-105 transition-transform group-hover:shadow-lg`}
                  >
                    <Link to="/dashboard/openai">
                      OpenAI Chat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className={`w-full bg-gradient-to-r ${tool.gradient} text-black font-medium hover:scale-105 transition-transform group-hover:shadow-lg`}
                  >
                    Launch Tool
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Usage Overview */}
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Usage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">98.7%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent-foreground w-[98.7%]" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent-foreground">
                156ms
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Response Time
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-foreground to-primary w-[85%]" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-chart-4">24/7</div>
              <div className="text-sm text-muted-foreground">Availability</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-chart-4 to-chart-5 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
