import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "@/components/ui/header";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "@/lib/api";

const RegisterSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof RegisterSchema>;

const Register = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const superAdminKey = searchParams.get("superAdminKey") || undefined;

  const form = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: RegisterValues) {
    setIsLoading(true);
    try {
      await authApi.register(
        values.name,
        values.email,
        values.password,
        superAdminKey ? { superAdminKey } : undefined,
      );
      toast({
        title: "Account created",
        description: `Welcome, ${values.name}`,
      });
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({
        title: "Registration failed",
        description: e.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-accent/5 to-accent/10" />

        <main className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left side visuals (hidden on small for focus) */}
            <div className="hidden lg:block">
              <div className="mb-6">
                <img
                  src={logo}
                  alt="ASI Gyan"
                  className="h-16 w-auto animate-logo-glow"
                />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Create your account
              </h1>
              <p className="text-muted-foreground max-w-md">
                Join the learning revolution.
              </p>
              <div className="mt-8 flex gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-glow-green" />
                <span className="inline-block h-2 w-2 rounded-full bg-secondary shadow-glow-cyan" />
              </div>
            </div>

            {/* Registration form */}
            <Card className="w-full max-w-md mx-auto border-border/60 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="ASI Gyan"
                    className="h-8 w-auto lg:hidden"
                  />
                  <CardTitle>Register</CardTitle>
                </div>
                <CardDescription>
                  Fill in your details to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Jane Doe"
                              autoComplete="name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              autoComplete="new-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              autoComplete="new-password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account…" : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
