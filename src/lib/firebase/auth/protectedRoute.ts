// import { saveUser } from "../databases/saveUsers";
// import { currentUser } from "./currentUser";

//   const protectedRoute = async () => {
//     try {
//       const _userdata = await currentUser();
//       // console.log(_userdata);
//       if (_userdata) {
//         console.log("User is signed in:", _userdata.uid);
//         await saveUser(_userdata);
//         return _userdata;
//       } else {
//         console.log("User is signed out");
//       }
//     } catch (error) {
//       console.error("Error checking auth state:", error);
//     }
//   };