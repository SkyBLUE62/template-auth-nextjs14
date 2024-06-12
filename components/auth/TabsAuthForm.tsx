"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registerUser } from "@/server-actions/auth-action";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderPinwheel } from "lucide-react";

export function TabsAuthForm() {
  const router = useRouter();

  const handleSubmitRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await registerMutation.mutateAsync(formData);
  };

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = loginMutation.mutateAsync(formData);
  };

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const res: any = await registerUser({ email, password });
      if (res.validationErrors) {
        Object.keys(res.validationErrors).forEach((key) => {
          toast.error(key + ": " + res.validationErrors[key][0]);
        });
        return;
      }
      if (res.data.error === null) {
        toast.success("Register successful");
        toast.warning("Please wait login now");

        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });
        if (res?.ok) {
          toast.success("Login successful");
          router.push("/");
          router.refresh;
        } else {
          toast.error("Login failed");
        }
      }
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const res: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (res.validationErrors) {
        Object.keys(res.validationErrors).forEach((key) => {
          toast.error(key + ": " + res.validationErrors[key][0]);
        });
        return;
      }
      if (res?.error != "Configuration") {
        toast.success("Login successful");
        router.push("/");
        router.refresh;
      } else {
        toast.error("Email or password is incorrect");
      }
    },
  });

  return (
    <Tabs defaultValue="register" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">Register</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create an account now to join us !{" "}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitRegister}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input type="email" id="email" name="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? (
                  <LoaderPinwheel size={20} className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Welcome back ! We're delighted to see you again !
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitLogin}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input type="email" id="email" name="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginMutation.isPending} type="submit">
                {loginMutation.isPending ? (
                  <LoaderPinwheel size={20} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
