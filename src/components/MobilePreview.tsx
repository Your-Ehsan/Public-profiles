"use client";
import {
  ArrowRightIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@/contexts/LocalStorageContext";

type MobilePreviewBtnProps = {
  icon: ReactNode;
  text: string;
  color?: string;
  link: string;
};
// const gh = {
//   links: [{ link: "https://shadcn.com", provider: "Portuguese" }],
//   user: "ehsan@mail.com",
// };
interface PreviewDataProps {
  links: {
    link: string;
    provider: string;
  }[];
  user: string;
}
export const locadata = () => JSON.parse(localStorage.getItem('link'))
// function renderItem() {
//     switch (item.type) {
//       case "text":
//         return <p>{item.content}</p>;
//       case "image":
//         return <img src={item.content} alt="Image" />;
//       case "video":
//         return (
//           <iframe
//             width="560"
//             height="315"
//             src={item.content.replace("watch?v=", "embed/")}
//             title="Video"
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         );
//       default:
//         return null;
//     }
//   }

const MobilePreviewBtn = ({
  icon,
  text,
  color,
  link,
}: MobilePreviewBtnProps) => {
  return (
    <Link href={link} rel="noreferrer noopener" className="grid mx-3 my-2">
      <Button className={`${color} flex justify-between`}>
        <span className="flex items-center mx-2">
          {icon}
          {text}
        </span>
        <span className="flex items-center mx-2">
          <ArrowRightIcon />
        </span>
      </Button>
    </Link>
  );
};

const MobilePreview = ({initdata ,backgroundStyles}: {initdata?: unknown , backgroundStyles: string}) => {
 
  const { data } = useQuery({
    queryKey: ['links'],
    queryFn: locadata,
    initialData: initdata,
    refetchInterval: 1500
  })
  console.log(data);
  
//  const data =  useQuery({
//     queryKey: ["posts",],
//     queryFn: () => getPost(id),
//   }),
//   userQuery = useQuery({
//     queryKey: ["users", postQuery?.data?.userId],
//     enabled: postQuery?.data?.userId != null,
//     queryFn: () => getUser(postQuery.data.userId),
//   });
// const {localdata} = useLocalStorage()
// console.log(localdata);

// const [value , setvalue] = useLocalStorage('links', '')
// console.log(value);
   
// const { data, updateData } = useLocalStorage()
        // console.log(data , updateData);
         
  //@ts-ignore
//   const PreviewData: PreviewDataProps = JSON.parse(localStorage.getItem("links"));
//   console.log(PreviewData);
// const [MobileLinks, setMobileLinks] = useState(PreviewData)
//   useEffect(() => {
//     console.log("value changed");
    
//       return () => {
//         setMobileLinks(PreviewData)    
//     }
//   }, [PreviewData])
  
  return (
    <section className="w-full grid justify-center items-center bg-green-300">
      <div
        className="_wrapper_ w-[320px] h-[560px] bg-red-400 grid items-center justify-center"
        style={{ background: backgroundStyles }}
      >
        <div className="w-[230px] h-[490px] bg-red-200 grid items-center overflow-y-auto">
          <div className="_wrapper_">
            <div className="auth_section grid items-center justify-center ">
              <div className=" flex justify-center items-center bg-orange-200">
                <Avatar className="w-28 h-28">
                  <AvatarImage src={data?.user?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="grid justify-center items-center">
                <h1 className="text-2xl text-center">Ehsan Shahid</h1>
                <hr />
                <span className="font-mono text-center text-base">
                  ehsanshahid787@gmail.com
                </span>
                <span>
                  @
                </span>
              </div>
            </div>
            <div className="">
              {data?.links?.map(({ link, provider }, index) => {
                return (
                  <span key={index}>
                    {provider === "Github" ? (
                      <MobilePreviewBtn
                        text="Github"
                        icon={<GitHubLogoIcon className="mx-2" />}
                        link="https://github.com/your-ehsan"
                      />
                    ) : provider === "Linkedin" ? (
                      <MobilePreviewBtn
                        text="Linkedin"
                        icon={<LinkedInLogoIcon className="mx-2" />}
                        link="https://github.com/your-ehsan"
                      />
                    ) : provider === "Twitter" ? (
                      <MobilePreviewBtn
                        text="Twitter"
                        icon={<TwitterLogoIcon className="mx-2" />}
                        link="https://github.com/your-ehsan"
                      />
                    ) : null}
                  </span>
                );
              })}
              {/* <MobilePreviewBtn
                text="Github"
                icon={<GitHubLogoIcon className="mx-2" />}
                link="https://github.com/your-ehsan"
              />
              <MobilePreviewBtn
                text="Twitter"
                icon={<TwitterLogoIcon className="mx-2" />}
                link="https://github.com/your-ehsan"
              />
              <MobilePreviewBtn
                text="Linkedin"
                icon={<LinkedInLogoIcon className="mx-2" />}
                link="https://github.com/your-ehsan"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
