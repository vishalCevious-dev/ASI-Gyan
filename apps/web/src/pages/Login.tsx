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
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/lib/api";

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof LoginSchema>;

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: LoginValues) {
    setIsLoading(true);
    try {
      await authApi.login(values.email, values.password);
      toast({
        title: "Signed in",
        description: `Welcome back, ${values.email}`,
      });
      // Cookie is set by server; navigate to home
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({
        title: "Sign in failed",
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

      {/* Page background accent to match theme */}
      <div className="relative pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-accent/5 to-accent/10" />

        <main className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left side: brand / copy (hidden on small screens for focus) */}
            <div className="hidden lg:block">
              <div className="mb-6">
                <img
                  src={logo}
                  alt="ASI Gyan"
                  className="h-16 w-auto animate-logo-glow"
                />
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Welcome back
              </h1>
              <p className="text-muted-foreground max-w-md">
                Sign in to continue your learning journey.
              </p>
              <div className="mt-8 flex gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-glow-green" />
                <span className="inline-block h-2 w-2 rounded-full bg-secondary shadow-glow-cyan" />
              </div>
            </div>

            {/* Right side: form */}
            <Card className="w-full max-w-md mx-auto border-border/60 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="ASI Gyan"
                    className="h-8 w-auto lg:hidden"
                  />
                  <CardTitle>Sign in</CardTitle>
                </div>
                <CardDescription>
                  Use your email and password to continue.
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
                              autoComplete="current-password"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-end">
                            <Link
                              to="#"
                              className="text-sm text-primary hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in…" : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Create one
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

export default Login;
