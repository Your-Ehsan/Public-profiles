import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { SignIn } from "@/lib/firebase/auth/signIn";
import { User } from "firebase/auth";
import { EyeOpenIcon } from "@radix-ui/react-icons";

const Header = ({ userdata }: { userdata: User | undefined }) => {
  return (
    <header className="bg-background shadow-lg body-font fixed top-0 w-screen">
      <div className="container mx-auto flex p-5 items-center justify-between">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center md:mb-0"
        >
          <span className="ml-3 text-xl">Profiles</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"></nav>
        <div className="flex items-center">
          <Link href={"/preview"}>
            <Button variant="outline" className="mx-4">
              <span className="max-md:hidden font-semibold text-slate-600">
                Preview
              </span>
              <span className="mx-1 md:hidden">
                <EyeOpenIcon className="font-semibold text-primary/60" />
              </span>
            </Button>
          </Link>

          <Image
            // onClick={SignIn}
            src={userdata?.photoURL || "/vercel.svg"}
            width={80}
            height={80}
            alt={`${userdata?.displayName}-avatar`}
            title={`${userdata?.displayName}-avatar`}
            className="p-1 rounded-full border border-primary/60 w-12"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
