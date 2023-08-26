"use client";
// import MobilePreview from "@/components/MobilePreview";
import PreviewHeader from "@/components/navigations/PreviewHeader";
import { localStorageData } from "@/constants";

import dynamic from "next/dynamic";

const DynamicMobilePreview = dynamic(
  () => import("@/components/MobilePreview"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);
const Preview = () => {
  // const data = localStorage.getItem("links");
  return (
    <section>
      <PreviewHeader />
      <DynamicMobilePreview
        // @ts-ignore
        initdata={JSON.parse(localStorageData)}
        backgroundStyles=""
      />
    </section>
  );
};

export default Preview;
