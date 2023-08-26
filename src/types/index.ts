import { linkValidation } from "@/lib/validations/linkValidation";
import { User } from "firebase/auth";
import { z } from "zod";

export interface AuthData {
  user: User | null;
  uid: string | null;
}

export interface ImgUploadResult {
  progress: number | null;
  downloadURL: string | null;
}

export type FormValues = z.infer<typeof linkValidation>

// export interface linkValidationInterface {
//   form: UseFormReturn<{
//     links: {
//         link: string;
//         provider: string;
//     }[];
//     user?: string | undefined;
// }, any, undefined>
// }
