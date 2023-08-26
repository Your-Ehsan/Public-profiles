import dynamic from "next/dynamic";

const DynamicMobilePreview = dynamic(
    () => import("@/components/MobilePreview"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    },
  );
  export default DynamicMobilePreview