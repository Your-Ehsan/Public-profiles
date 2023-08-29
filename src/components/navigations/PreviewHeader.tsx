import Link from "next/link";
import { Button } from "../ui/button";

const PreviewHeader = () => {
  return (
    <header className="bg-background shadow-lg body-font">
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-evenly">
        <Link href={"/"}>
          <Button variant="outline">Back to Editor</Button>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        </nav>
        <Button variant="default">Share</Button>
      </div>
    </header>
  );
};

export default PreviewHeader;
