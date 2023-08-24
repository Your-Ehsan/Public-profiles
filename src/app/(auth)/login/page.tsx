"use client";
import { Button } from "@/components/ui/button";
import { SignIn } from "@/lib/firebase/auth/signIn";
import { saveUser } from "@/lib/firebase/databases/saveUsers";
import { redirect, useRouter } from "next/navigation";

const Login = () => {
  const _router = useRouter();
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <div className="">
        <Button
          onClick={async () => {
            await SignIn().then((result) => {
              if (result?.user?.uid) {
                saveUser(result);
                _router.push('/')
              }
            });
          }}
        >
          Sign in with Google
        </Button>
      </div>
    </section>
  );
};

export default Login;
