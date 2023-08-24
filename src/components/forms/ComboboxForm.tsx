"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { toast } from "@/components/ui/use-toast";

const languages = [
  // { label: "English", value: "English" },
  // { label: "French", value: "French" },
  // { label: "German", value: "German" },
  // { label: "Spanish", value: "Spanish" },
  // { label: "Portuguese", value: "Portuguese" },
  // { label: "Russian", value: "Russian" },
  { label: "Twitter", value: "Twitter" },
  { label: "Linkedin", value: "Linkedin" },
  { label: "Github", value: "Github" },
] as const;

// const FormSchema = z.object({
//   language: z.string({
//     required_error: "Please select a language.",
//   }),
// });

type Props = {
  form: UseFormReturn<
    {
      links: {
        link: string;
        provider: string;
      }[];
      user: {
        image: string;
        name: string;
        email: string;
      };
    },
    any,
    undefined
  >;
  name: `links.${number}.provider`;
};

export function ComboboxForm({ form, name }: Props) {
  //   const form = useForm<z.infer<typeof FormSchema>>({
  //     // @ts-ignore
  //     resolver: zodResolver(FormSchema),defaultValues:{
  //         language: ""
  //     }
  //   });

  //   function onSubmit(data: z.infer<typeof FormSchema>) {
  //     toast({
  //       title: "You submitted the following values:",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //         </pre>
  //       ),
  //     });
  //   }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Language</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? languages.find(
                        (language) => language.value === field.value,
                      )?.label
                    : "Select language"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      value={language.label}
                      key={language.value}
                      onSelect={() => {
                        form.setValue(name, language.value);
                      }}
                    >
                      {language.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          language.value === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            This is the language that will be used in the dashboard.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
