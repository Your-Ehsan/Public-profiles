"use client";
import MobilePreview from "@/components/MobilePreview";
import PreviewHeader from "@/components/navigations/PreviewHeader";

const Preview = () => {
  const data = localStorage.getItem("links");
  return (
    <section>
      <PreviewHeader />
      <MobilePreview initdata={JSON.parse(data)} backgroundStyles="" />
    </section>
  );
};

export default Preview;
