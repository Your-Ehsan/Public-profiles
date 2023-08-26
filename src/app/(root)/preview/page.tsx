import PreviewMain from "@/components/PreviewMain";

// const DynamicMobilePreview = dynamic(
//   () => import("@/components/MobilePreview"),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   },
// );
const Preview = () => {
  // const data = localStorage.getItem("links");
  return (
    <section>
      <PreviewMain/>
    </section>
  );
};

export default Preview;
