//TODO: i will handle this later -> export async function generateStaticParams()

import MobilePreview from "@/components/MobilePreview";
import { valuesFromFirestore } from "@/lib/firebase/databases/profileData";
import Link from "next/link";

const Profiles = async ({ params }: { params: { username: string } }) => {
  const userProfile = await valuesFromFirestore(params.username);
  return (
    <>
      <header className="bg-background shadow-lg body-font fixed top-0 w-screen">
        <div className="container mx-auto flex p-5 items-center justify-between">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center md:mb-0"
          >
            <span className="ml-3 text-xl">Profiles</span>
          </Link>
        </div>
      </header>
      <section className="mt-8">
        <MobilePreview initdata={userProfile} backgroundStyles="" />
      </section>
    </>
  );
};

export default Profiles;
