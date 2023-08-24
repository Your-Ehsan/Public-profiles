import { User } from "firebase/auth";
import { UseFormReturn } from "react-hook-form";

export interface AuthData {
  user: User | null;
  uid: string | null;
}

export interface ImgUploadResult {
  progress: number | null;
  downloadURL: string | null;
}
// export interface linkValidationInterface {
//   form: UseFormReturn<{
//     links: {
//         link: string;
//         provider: string;
//     }[];
//     user?: string | undefined;
// }, any, undefined>
// }
