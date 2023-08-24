import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const ButtonWithIcon = ({
  text,
  classes,
}: {
  text: string;
  classes?: string | undefined;
}) => {
  return (
    <Button className={classes}>
      <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
};

export default ButtonWithIcon;
