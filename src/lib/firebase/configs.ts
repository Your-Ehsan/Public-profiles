import { firebaseEnv } from "@/env/firebase.env";
import { FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: firebaseEnv.apiKey,
  appId: firebaseEnv.appId,
  authDomain: firebaseEnv.authDomain,
  messagingSenderId: firebaseEnv.messagingSenderId,
  projectId: firebaseEnv.projectId,
  storageBucket: firebaseEnv.storageBucket,
};

export { firebaseConfig };
