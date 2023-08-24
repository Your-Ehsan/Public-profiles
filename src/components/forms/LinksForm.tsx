"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ComboboxForm } from "./ComboboxForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ChangeEvent, useEffect, useState } from "react";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DocumentData,
  doc,
  getDoc,
  getDocFromCache,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { uploadImage } from "@/lib/firebase/upload/uploadImage";
import { User } from "firebase/auth";
import { GhostButton } from "../buttons/GhostButton";
import Link from "next/link";
import { valuesFromFirestore } from "@/lib/firebase/databases/profileData";
// import { useLocalStorage } from "@/contexts/LocalStorageContext";



// const dataFromFirestore = await valuesFromFirestore();

const linkValidation = z.object({
  links: z.array(
    z.object({
      link: z.string().url({ message: "Please enter a valid link" }).min(2, {
        message: "Username must be at least 2 characters.",
      }),
      provider: z.string({
        required_error: "please select organization",
      }),
    }),
  ),
  user: z.object({
    image: z.string().url().nonempty(),
    name: z.string({
      invalid_type_error: "please enter a valid name",
      required_error: "Please enter name",
    }),
    email: z.string({ invalid_type_error: "email is invalid" }).email(),
  }),
  // z.string().email({ message: "email is not valid" }).optional(),
});

type ProfileFormValues = z.infer<typeof linkValidation>;

// This can come from your database or API.
// const localFormValues = JSON.parse(localStorage.getItem("links"));
// const values =async () => {

const LinksForm = ({
  // savedFormValues,
  userdata,
}: {
  // savedFormValues: UseQueryResult<ProfileFormValues>;
  userdata: User | undefined;
}) => {
  // console.log(currentUserData?.email);

  // const savedFormValues = useQuery({
  //   queryKey: ["formData"],
  //   enabled: userdata?.uid !== null,
  //   queryFn: () => valuesFromFirestore(userdata?.uid),
  //   retryOnMount: false,
  //   retry: false,
  //   // initialData: initdata,
  //   // refetchInterval: 1500
  // });
  // const savedFormValues: UseQueryResult<
  //   ProfileFormValues | undefined,
  //   unknown
  // > = useQuery({
  //   queryKey: ["formData"],
  //   // enabled: currentUserData?.email !== null || undefined,
  //   queryFn: () => valuesFromFirestore(),
  //   // initialData: initdata,
  //   // refetchInterval: 1500
  // });

  const [files, setFiles] = useState<File[]>([]);
  // const defaultValues: Partial<ProfileFormValues> = {
  //   user: {
  //     image: localFormValues?.user?.image || "",
  //     name: localFormValues?.user?.name || "",
  //     email: localFormValues?.user?.email || "",
  //   },
  //   links: localFormValues?.links || [],
  //   // [
  //   //   { link: "https://shadcn.com", provider: "" },
  //   //   { link: "https://github.com/your-ehsan", provider: "Github" },
  //   // ],
  //   // };
  //   // return defaultValues
  // };
  // console.log(savedFormValues.data);

  // if(savedFormValues.data){
  const defaultValues: Partial<ProfileFormValues> = {
    user: {
      image: "",
      name: "",
      email: "",
    },
    links: [],
    // [
    //   { link: "https://shadcn.com", provider: "" },
    //   { link: "https://github.com/your-ehsan", provider: "Github" },
    // ],
    // };
    // return defaultValues
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(linkValidation),
    defaultValues: async () =>
      (await valuesFromFirestore(userdata?.uid)) || defaultValues,
    // {
    //   user: {
    //     image: savedFormValues?.data?.user.image || "",
    //     name: savedFormValues?.data?.user?.name || "heloo",
    //     email: savedFormValues?.data?.user?.email || "",
    //   },
    //   links: savedFormValues.data?.links || [],
    // },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: form.control,
  });
  // /profiles/ehsanshahid787@gmail.com
  const onSubmit = async (Formdata: ProfileFormValues) => {
    const { downloadURL, progress } = await uploadImage(
      userdata?.uid,
      files[0],
    );
    console.log(progress);
    console.log(downloadURL);

    await setDoc<DocumentData, DocumentData>(
      doc(db, "profiles", userdata?.uid || ""),
      {
        user: {
          email: Formdata?.user?.email,
          image: downloadURL, // || data?.user?.image,
          name: Formdata?.user.name,
        },
        links: Formdata?.links,
      },
    );
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(Formdata, null, 2)}
          </code>
        </pre>
      ),
    });
  };
  const wayth = form.watch();

  localStorage.setItem("links", JSON.stringify(wayth));
  // const [value, setvalue] = useLocalStorage("links", "");
  // useEffect(() => {
  // setvalue(wayth);
  // }, [wayth , setvalue]);

  // const {data, updateData} = useLocalStorage()
  // updateData(wayth)
  // const locadataMutation = (data) => localStorage.setItem("links", JSON.stringify(data))
  // const queryclient = useQueryClient();
  // const linksMutation = useMutation({
  //   mutationFn: (data) => localStorage.setItem("links", JSON.stringify(data)),
  //   onSuccess: (data) => {
  //     queryclient.setQueryData(["links"], data);
  //     queryclient.invalidateQueries(["links"], { exact: true });
  //   },
  // });
  // linksMutation.mutate(wayth)
  // useEffect(()=> {
  // return () =>  linksMutation.mutate(wayth)
  // }, [wayth,linksMutation])
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  // console.log(files);
  // console.log(savedFormValues.data);

  // if (savedFormValues.isLoading) {
  // return <h1>Saved Form values loading ...</h1>;
  // } else {
  return (
    <section className="bg-red-300">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid bg-blue-400"
        >
          <Tabs defaultValue="links" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="links">links</TabsTrigger>
              <TabsTrigger value="profile">profile</TabsTrigger>
            </TabsList>
            <TabsContent value="links">
              {fields.map((field, index) => {
                // console.log();

                return (
                  <section key={field.id}>
                    <FormField
                      control={form.control}
                      name={`links.${index}.link`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            URLs
                          </FormLabel>
                          <FormDescription
                            className={cn(index !== 0 && "sr-only")}
                          >
                            Add links to your website, blog, or social media
                            profiles.
                          </FormDescription>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <ComboboxForm
                      form={form}
                      name={`links.${index}.provider`}
                    />
                    <Button onClick={() => remove(index)}>Remove</Button>
                  </section>
                );
              })}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ link: "", provider: "" })}
              >
                Add URL
              </Button>
            </TabsContent>
            <TabsContent value="profile">
              <FormField
                control={form.control}
                name="user.image"
                render={({ field }) => (
                  <FormItem className="grid justify-center items-center gap-4">
                    <FormLabel className="account-form_image-label">
                      {field.value ? (
                        <div className=" flex justify-center items-center bg-orange-200">
                          <Avatar className="w-28 h-28">
                            <AvatarImage src={field.value} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                      ) : (
                        <div className=" flex justify-center items-center bg-orange-200">
                          <Avatar className="w-28 h-28">
                            <AvatarImage src={"/next.svg"} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      {/* {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )} */}
                    </FormLabel>
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="Add profile photo"
                        className="cursor-pointer border-none bg-transparent outline-none file:text-blue hidden"
                        onChange={(e) => handleImage(e, field.onChange)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`user.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                    //  className={cn(index !== 0 && "sr-only")}
                    >
                      URLs
                    </FormLabel>
                    <FormDescription
                    // className={cn(index !== 0 && "sr-only")}
                    >
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`user.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                    //  className={cn(index !== 0 && "sr-only")}
                    >
                      URLs
                    </FormLabel>
                    <FormDescription
                    // className={cn(index !== 0 && "sr-only")}
                    >
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
      <Link href={`/${userdata?.uid}`}>
      <GhostButton text="View Live Profile" />
      </Link>
    </section>
  );
};
// };
// };
export default LinksForm;
/**
{
  links: [
    { provider: 'Twitter', link: 'https://shadcn.comdsdsd' },
    { provider: 'Linkedin', link: 'https://dev.to' }
  ],
  user: {
    image: 
      'http://localhost:9199/v0/b/copy-cats.appspot.com/o/users%2Fehsanshahid787%40gmail.com%2Fimages%2F2nd-tab.jpg?alt=media&token=c19eed12-7ff6-46e6-b941-4e7c2a5f2266',
    name: 'ehsanshahid787gmail.com',
    email: 'ehsanshahid787@gmail.com'
  }
}
 */
