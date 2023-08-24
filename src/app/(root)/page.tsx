'use client'
import Header from "@/components/navigations/Header";
import MainWrapper from "@/components/MainWrapper";
import MobilePreview from "@/components/MobilePreview";
import LinksForm from "@/components/forms/LinksForm";
import { LocalStorageProvider } from "@/contexts/LocalStorageContext";
// import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { currentUser } from "@/lib/firebase/auth/currentUser";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

// const getdata = async () => {
//   return new Promise((resolve, reject) =>
//     resolve({
//       user: { image: "", name: "", email: "" },
//       links: [{ link: "https://github.com/your-ehsan", provider: "Github" }],
//     }),
//   );
// };
const Home =  () => {
  // const initdata =  getdata();
  // const userdata = await currentUser();
  // const _oauth = getAuth().currentUser
  // console.log(userdata);
  // console.log(_oauth);

  // const {data} = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: ()=> {
  //       const locadata = JSON.parse(localStorage.getItem('links'))
  //   return locadata
  //   },
  //   initialData: initdata,
  // })
  // console.log(data);

  return (

      <MainWrapper
        // formComponent={<LinksForm />}
        // preview={
          // <MobilePreview
            // initdata={initdata}
            // backgroundStyles="url('/phone_modal.png')"
          // />
        // }
      />

    // <main className="h-screen overflow-hidden flex items-center">
    // <section className="flex flex-row max-h-screen pt-16 w-full">
    //   <div className="flex justify-center w-full p-4 h-auto items-center ">
    //     <MobilePreview initdata={data}/>
    //     {/* <Image priority src={'/phone.png'} width={600} height={700} alt="phone-img"/> */}
    //   </div>
    //   <div className="flex justify-center w-full p-4 overflow-x-auto">
    //   <LinksForm />
    //   </div>
    // </section>
    // </main>
  );
};

export default Home;
