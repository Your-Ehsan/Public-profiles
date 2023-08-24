import { Button } from "@/components/ui/button"

export function GhostButton({text, classes}:{text: string, classes?: string | undefined}) {
  return <Button className={classes} variant="ghost">{text}</Button>
}
