import { Button } from "@/components/ui/button";
import Link from "next/link";
import {  UrlObject } from "url";

export function GhostButton({
  text,
  classes,
  // link,
}: {
  // link?: string | UrlObject;
  text: string;
  classes?: string | undefined;
}) {
  return (
    // <Link href={link || ''}>
      <Button className={classes} variant="ghost">
        {text}
      </Button>
    // </Link>
  );
}
