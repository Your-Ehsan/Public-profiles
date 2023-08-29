"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Control,
  FieldValues,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User } from "firebase/auth";
import { valuesFromFirestore } from "@/lib/firebase/databases/profileData";
import { linkValidation } from "@/lib/validations/linkValidation";
import { FormValues } from "@/types";
import { linksSubmit } from "@/lib/actions/linksSubmit";
import { handleUploadImage } from "@/lib/firebase/upload/handleUploadImage";
import {
  EnvelopeClosedIcon,
  Link2Icon,
  ListBulletIcon,
  PersonIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const FormHeading = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="w-full my-8">
      <h2 className="text-3xl">{heading}</h2>
      <p className="text-xs leading-relaxed text-slate-500 ml-4">
        {description}
      </p>
    </div>
  );
};
type FormLinksProps = {
  formControl: UseFormReturn<
    {
      links: { link: string; provider: string }[];
      user: { image: string; name: string; email: string };
    },
    any,
    undefined
  >;
  formName:
    | "links"
    | "user"
    | `links.${number}`
    | `links.${number}.link`
    | `links.${number}.provider`
    | "user.image"
    | "user.name"
    | "user.email";
  formLabel: string;
  formDescription: string;
  formIcon: ReactNode;
  formPlaceholder: string;
};

const FormLinks = ({
  formControl,
  formName,
  formLabel,
  formDescription,
  formIcon,
  formPlaceholder,
}: FormLinksProps) => {
  return (
    <FormField
      control={formControl.control}
      name={formName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={"text-[.70rem]"}>{formLabel}</FormLabel>
          <FormDescription className="sr-only">
            {formDescription}
          </FormDescription>
          <FormControl>
            <div className="flex items-center peer border-input border rounded-md px-4">
              <span>{formIcon}</span>
              {/* @ts-ignore */}
              <Input
                placeholder={formPlaceholder}
                className="border-none  focus-visible:ring-0 peer-focus-within:border"
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const LinksForm = ({ userdata }: { userdata: User | undefined }) => {
  const form = useForm<FormValues>({
      //@ts-ignore
      resolver: zodResolver(linkValidation),
      //@ts-ignore
      defaultValues: async () =>
        (await valuesFromFirestore(userdata?.uid)) || {
          user: {
            image: userdata?.photoURL || "/vercel.svg",
            name: userdata?.displayName || "",
            email: userdata?.email || "",
          },
          links: [{ link: "", provider: "" }],
        },
      mode: "onSubmit",
    }),
    { fields, append, remove } = useFieldArray({
      name: "links",
      control: form.control,
    }),
    watch = form.watch();
  localStorage.setItem("links", JSON.stringify(watch));

  return (
    <section className="h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => linksSubmit(e, userdata))}
          className="space-y-8 grid h-full"
        >
          <Tabs defaultValue="links" className="w-auto md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger className="" value="links">
                links
              </TabsTrigger>
              <TabsTrigger value="profile">profile</TabsTrigger>
            </TabsList>
            <TabsContent value="links">
              <FormHeading
                heading="Customize your links"
                description={
                  "Add/edit/remove links below and then share all your profiles with the world"
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="my-2 w-full border-primary/80 text-primary/80 hover:text-primary"
                onClick={() => append({ link: "", provider: "" })}
              >
                Add URL
                <PlusIcon className="mx-2" />
              </Button>
              <div className="">
                {fields.map((field, index) => (
                  <div key={field.id} className="my-8">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-600 flex">
                        <ListBulletIcon className="mx-2" />
                        {`Link #${index + 1}`}
                      </span>
                      <span
                        className="cursor-pointer text-xs flex duration-300 hover:text-destructive/70 font-semibold text-slate-500"
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className="mx-1 font-semibold" />
                        Remove
                      </span>
                    </div>
                    <ComboboxForm
                      form={form}
                      name={`links.${index}.provider`}
                    />
                    <FormLinks
                      formControl={form}
                      formDescription={
                        "Add links to your website, blog, or social media profiles."
                      }
                      formIcon={
                        <Link2Icon className=" text-primary/80 font-semibold" />
                      }
                      formLabel="URLs"
                      formName={`links.${index}.link`}
                      formPlaceholder={"https://github.com/"}
                    />
                    {/* <FormField
                      control={form.control}
                      name={`links.${index}.link`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={"text-[.70rem]"}>
                            URLs
                          </FormLabel>
                          <FormDescription className="sr-only">
                            Add links to your website, blog, or social media
                            profiles.
                          </FormDescription>
                          <FormControl>
                            <div className="flex items-center peer border-input border rounded-md px-4">
                              <span>
                                <Link2Icon className=" text-primary/80 font-semibold" />
                              </span>
                              <Input
                                placeholder="https://github.com/"
                                className="border-none  focus-visible:ring-0 peer-focus-within:border"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="profile">
              <FormHeading
                heading="Profile Details"
                description="Add your details to create a personal touch to your profile"
              />
              {/* <div className="w-full my-8">
                <h2 className="text-3xl"></h2>
                <p className="text-xs leading-relaxed text-slate-500 ml-4">
                  
                </p>
              </div> */}
              {/* <div className="w-full">
                <h2></h2>
                <p>

                </p>
              </div> */}
              <FormField
                control={form.control}
                name="user.image"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="flex justify-between">
                      <div className="">
                        Profile Image
                        <FormDescription className="my-4 leading-relaxed text-xs">
                          Image must below 1024x1024 Use PNG, JPG, or BMP format
                        </FormDescription>
                      </div>
                      <div
                        title="upload photo"
                        className="flex justify-center items-center cursor-pointer m-4 rounded-2xl duration-300 bg-black w-60"
                      >
                        {field.value ? (
                          <Image
                            src={field.value}
                            alt="Profile photo"
                            width={200}
                            height={200}
                            className="rounded-2xl flex items-center w-full h-full peer-hover:opacity-50 peer hover:opacity-50"
                          />
                        ) : (
                          <Image
                            src={userdata?.photoURL || "/vercel.svg"}
                            alt="Profile photo"
                            width={200}
                            height={200}
                            className="rounded-2xl flex items-center w-full h-full peer-hover:opacity-50 peer hover:opacity-50"
                          />
                        )}
                        <div className="opacity-0 absolute text-slate-200 hover:opacity-100 z-10 duration-300 peer peer-hover:opacity-100 flex">
                          upload photo <PlusIcon className="ml-2" />
                        </div>
                      </div>
                    </FormLabel>
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="Add profile photo"
                        className="cursor-pointer border-none bg-transparent outline-none file:text-blue hidden"
                        onChange={async (e) =>
                          await handleUploadImage(e, field.onChange, userdata)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="my-8">
                <FormLinks
                  formControl={form}
                  formDescription={
                    "Add links to your website, blog, or social media profiles."
                  }
                  formIcon={
                    <PersonIcon className=" text-primary/80 font-semibold" />
                  }
                  formLabel="Name"
                  formName={`user.name`}
                  formPlaceholder={"Your name"}
                />
                {/* <FormField
                  control={form.control}
                  name={`user.name`}
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel className={"text-[.70rem]"}>Name</FormLabel>
                      <FormDescription className="sr-only">
                        Add links to your website, blog, or social media
                        profiles.
                      </FormDescription>
                      <FormControl>
                        <div className="flex items-center peer border-input border rounded-md px-4">
                          <span>
                            <PersonIcon className=" text-primary/80 font-semibold" />
                          </span>
                          <Input
                            placeholder="https://github.com/"
                            className="border-none  focus-visible:ring-0 peer-focus-within:border"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormLinks
                  formControl={form}
                  formDescription={
                    "Add links to your website, blog, or social media profiles."
                  }
                  formIcon={
                    <EnvelopeClosedIcon className=" text-primary/80 font-semibold" />
                  }
                  formLabel="Email"
                  formName={`user.email`}
                  formPlaceholder={"Your email"}
                />
                {/* <FormField
                  control={form.control}
                  name={`user.email`}
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel className={"text-[.70rem]"}>Email</FormLabel>
                      <FormDescription className="sr-only">
                        Add links to your website, blog, or social media
                        profiles.
                      </FormDescription>
                      <FormControl>
                        <div className="flex items-center peer border-input border rounded-md px-4">
                          <span>
                            <EnvelopeClosedIcon className=" text-primary/80 font-semibold" />
                          </span>
                          <Input
                            placeholder="https://github.com/"
                            className="border-none  focus-visible:ring-0 peer-focus-within:border"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </TabsContent>
          </Tabs>
          <div className="w-full inline-flex justify-evenly flex-wrap content-end m-0">
            <Link href={`/${userdata?.uid}`}>
              <Button variant="outline">View live</Button>
            </Link>
            <Button className="bg-primary/70">Update Profile</Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default LinksForm;
