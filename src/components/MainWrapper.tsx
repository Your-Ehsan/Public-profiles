"user client";

import Header from "./navigations/Header";
import { currentUser } from "@/lib/firebase/auth/currentUser";
import { redirect } from "next/navigation";
import MobilePreview from "./MobilePreview";
import LinksForm from "./forms/LinksForm";
import { useQuery } from "@tanstack/react-query";

//@ts-ignore
export const locadata = () => JSON.parse(localStorage.getItem("links"));

const MainWrapper = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUser,
    cacheTime: 0.5 * 60 * 1000, // 30sec cache time
  });
  const initdata = useQuery({
    queryKey: ["links"],
    queryFn: locadata,
    // initialData: initdata,
    refetchInterval: 1500,
  });

  if (isLoading) return <h1>looading...</h1>;
  if (data?.uid === null) redirect("/login");

  if (data?.user !== null) {
    return (
      <>
        <Header userdata={data?.user} />
        <main className="flex min-h-screen pt-4">
          <section className="flex max-md:flex-col pt-16 w-full">
            <div className="flex justify-center w-full p-4 h-full items-center max-md:hidden ">
              <MobilePreview initdata={initdata.data} backgroundStyles="url('/phone_modal.png')" />
            </div>
            <div className="flex justify-center w-full p-4 overflow-x-auto">
              <LinksForm userdata={data?.user} />
            </div>
          </section>
        </main>
      </>
    );
  } else {
    return <h1> You are not sign in </h1>;
  }
};

export default MainWrapper;
