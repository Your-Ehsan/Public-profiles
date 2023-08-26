import * as z from "zod";

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
});

export { linkValidation };
