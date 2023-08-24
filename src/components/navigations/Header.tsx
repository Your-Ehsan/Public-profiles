
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignIn } from "@/lib/firebase/auth/signIn";
import { currentUser } from "@/lib/firebase/auth/currentUser";
import { useState } from "react";
import { AuthData } from "@/types";
import { User } from "firebase/auth";

const Header = ({userdata}:{userdata: User | undefined}) => {
  
  return (
    <header className="text-gray-400 bg-gray-900 body-font fixed top-0 w-screen">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">Tailblocks</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* <ButtonWithIcon classes="mx-2" text="Links" /> */}
          {/* <ButtonWithIcon classes="mx-2" text="Profile Details" /> */}
        </nav>
        <div className="">
          <Image
          onClick={SignIn}
            src={
              userdata?.photoURL || "/vercel.svg"
            }
            width={80}
            height={80}
            alt="avatar img"
          />
          <Link href={"/preview"}>
            <Button variant="outline">Preview</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
