import * as z from "zod";

const linkValidation = z.object({
  links: z.array(
    z.object({
      link: z.string().url({ message: "Please enter a valid link" }).min(2, {
        message: "Username must be at least 2 characters.",
      }),
      provider: z.string({
        required_error: "Please select a language.",
      }),
    }),
  ),
  user: z.string().email({ message: "email is not valid" }),
});

export { linkValidation };
