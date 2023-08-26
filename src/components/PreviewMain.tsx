"use client";

import { useQuery } from "@tanstack/react-query";
import DynamicMobilePreview from "./dynamic/DynamicMobilePreview";
import PreviewHeader from "./navigations/PreviewHeader";
import { localdata } from "@/constants";

const PreviewMain = () => {
  const initdata = useQuery({
    queryKey: ["Previewlinks"],
    queryFn: localdata,
    // initialData: initdata,
    // refetchInterval: 1500,
  });
  return (
    <>
      <PreviewHeader />
      <DynamicMobilePreview initdata={initdata.data} backgroundStyles="" />
    </>
  );
};

export default PreviewMain;
