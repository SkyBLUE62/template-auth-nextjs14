"use client";

import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut, signIn } from "next-auth/react";

export type IsLoginButtonProps = {
  session: Session | null;
};

export const IsLoginButton = ({ session }: IsLoginButtonProps) => {
  return (
    <>
      <Button
        onClick={() => {
          session ? signOut() : signIn();
        }}
        type="button"
        variant="default"
      >
        {session ? "Logout" : "Login"}
      </Button>
    </>
  );
};
