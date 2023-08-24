import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../init";
import { AuthData } from "@/types";

const currentUser = async (): Promise<AuthData> => {
  return new Promise<AuthData>((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in
          const uid = user.uid;
          resolve({ user, uid });
        } else {
          // User is signed out
          resolve({ user: null, uid: null });
        }
      },
      (error) => {
        reject(error);
      },
    );
  });
};

// async function currentUser() {
//   try {
//     const authData: AuthData = await checkAuthState();
//     if (authData?.user) {
//       console.log("User is signed in:", authData.uid);
//       return authData
//     } else {
//       console.log("User is signed out");
//     }
//   } catch (error) {
//     console.error("Error checking auth state:", error);
//   }
// }
export { currentUser };
// const currentUser = () => {
//   const _userdata =  onAuthStateChanged(auth, (user)=> {
//     try {

//         return user
//     } catch (error) {
//         console.log(error);

//         return error
//     }
//   });
//   return _userdata;
// };
// export {currentUser}

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
