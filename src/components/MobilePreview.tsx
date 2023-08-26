"use client";
import {
  ArrowRightIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";

type MobilePreviewBtnProps = {
  icon: ReactNode;
  text: string;
  color?: string;
  link: string;
};

interface PreviewDataProps {
  links: {
    link: string;
    provider: string;
  }[];
  user: string;
}

const MobilePreviewBtn = ({
  icon,
  text,
  color,
  link,
}: MobilePreviewBtnProps) => {
  return (
    <Link href={link} rel="noreferrer noopener" className="grid mx-3 my-1">
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

const MobilePreview = ({
  initdata,
  backgroundStyles,
}: {
  initdata: unknown;
  backgroundStyles: string;
}) => {
  return (
    <section className="w-full grid justify-center items-center">
      <div
        className="grid _wrapper_ w-[320px] h-[560px]  items-center justify-center"
        style={{ background: backgroundStyles }}
      >
        <div className="w-[230px] h-[490px] grid items-center overflow-x-hidden overflow-y-hidden">
          <div className="_wrapper_ h-full grid">
            <div className="auth_section grid items-center justify-center content-evenly">
              <div className=" flex justify-center items-center">
                <Avatar className="w-28 h-28">
                  <AvatarImage src={initdata?.user?.image} />
                  <AvatarFallback>
                    <Image
                      src={"/vercel.svg"}
                      alt="no-photo"
                      width={200}
                      height={200}
                    />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid justify-center items-center">
                <h1 className=" text-2xl text-center">
                  {initdata?.user?.name}
                </h1>
                <hr />
                <span className="font-mono text-center text-sm ">
                  {initdata?.user?.email}
                </span>
                {/* <span>
                  @
                </span> */}
              </div>
            </div>
            <div className="grid content-center">
              {initdata?.links?.map(({ link, provider }, index) => {
                return (
                  <span key={index}>
                    {provider === "Github" ? (
                      <MobilePreviewBtn
                        text="Github"
                        icon={<GitHubLogoIcon className="mx-2" />}
                        link={link}
                      />
                    ) : provider === "Linkedin" ? (
                      <MobilePreviewBtn
                        text="Linkedin"
                        icon={<LinkedInLogoIcon className="mx-2" />}
                        link={link}
                      />
                    ) : provider === "Twitter" ? (
                      <MobilePreviewBtn
                        text="Twitter"
                        icon={<TwitterLogoIcon className="mx-2" />}
                        link={link}
                      />
                    ) : null}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
