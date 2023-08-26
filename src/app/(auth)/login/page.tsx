"use client";
import { Button } from "@/components/ui/button";
import { SignIn } from "@/lib/firebase/auth/signIn";
import { saveUser } from "@/lib/firebase/databases/saveUsers";
import { AuthData } from "@/types";
import { User, UserCredential } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";

const Login = () => {
  const _router = useRouter();
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <div className="">
        <Button
          onClick={async () => {
            const result: any = await SignIn();
            if (result?.user?.uid) {
              await saveUser(result).then(() => _router.push("/"));
            }
          }}
        >
          Sign in with Google
        </Button>
      </div>
    </section>
  );
};

export default Login;
