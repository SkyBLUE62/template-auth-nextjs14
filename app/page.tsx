import { auth, signIn, signOut } from "@/auth";
import { IsLoginButton } from "@/components/auth/IsLoginButton";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold uppercase">
        {session ? "You are login" : "You not login"}
      </h1>
      {session ? <p className="text-lg">{session.user?.email}</p> : null}
      <IsLoginButton session={session} />
    </main>
  );
}
