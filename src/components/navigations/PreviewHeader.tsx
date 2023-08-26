import Link from "next/link";
import { Button } from "../ui/button";

const PreviewHeader = () => {
  return (
    <header className="bg-background shadow-lg body-font">
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-evenly">
        <Link href={"/"}>
          <Button variant="outline">Back to Editor</Button>
        </Link>
        {/* <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
        <span className="ml-3 text-xl">Tailblocks</span>
      </a> */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {/* <ButtonWithIcon classes="mx-2" text="Links" />
        <ButtonWithIcon classes="mx-2" text="Profile Details" /> */}
        </nav>
        <Button variant="default">Share</Button>
      </div>
    </header>
  );
};

export default PreviewHeader;
