import { firebaseConfig } from "./configs";
import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp,
} from "firebase/app";
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";
import {
  FirebaseStorage,
  connectStorageEmulator,
  getStorage,
} from "firebase/storage";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";

/**
 * --> initialize services on every function call
 */

const InitServices = (configs: FirebaseOptions) => {
    try {
      const app = getApp();
      return app;
    } catch (err) {
      return initializeApp(configs);
    }
  },
  initializeServices = () => {
    const isConfigured: boolean = getApps().length > 0, // return true||false
      app: FirebaseApp = InitServices(firebaseConfig),
      firestore: Firestore = getFirestore(app),
      storage: FirebaseStorage = getStorage(app),
      auth: Auth = getAuth(app);

    return { app, firestore, auth, storage, isConfigured };
  },
  connectToEmulaters = ({
    auth,
    firestore,
    storage,
  }: {
    auth: Auth;
    firestore: Firestore;
    storage: FirebaseStorage;
  }) => {
    if (
      process.env.NODE_ENV !== "production"
    ) {
      try {
        connectAuthEmulator(auth, "http://localhost:9099");
        connectFirestoreEmulator(firestore, "localhost", 8080);
        connectStorageEmulator(storage, "localhost", 9199);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  },
  getFirebase = () => {
    const { app, auth, firestore, isConfigured, storage } =
      initializeServices();
    if (!isConfigured) {
      connectToEmulaters({ auth, firestore, storage });
    }
    return { auth, firestore, storage, app };
  };

const db = getFirebase().firestore,
  auth = getFirebase().auth,
  storage = getFirebase().storage,
  app = getFirebase().app;

export { db, auth, storage, app };