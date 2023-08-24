"user client";

// import { ReactNode, useEffect, useState } from "react";
import Header from "./navigations/Header";
import { currentUser } from "@/lib/firebase/auth/currentUser";
import { AuthData } from "@/types";
import { redirect } from "next/navigation";
import MobilePreview from "./MobilePreview";
import LinksForm from "./forms/LinksForm";
import { saveUser } from "@/lib/firebase/databases/saveUsers";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

const MainWrapper = () => {
  // const [CurrentUser, setCurrentUser] = useState<AuthData>();
  // const userdata = currentUser()
  // const _router = useRouter();
  // console.log(userdata);

  // const valuesFromFirestore = async (username: string | null | undefined) => {
  //   const docRef = doc(db, "profiles", username || '');
  //   // console.log(JSON.stringify(username));

  //   // Get a document, forcing the SDK to fetch from the offline cache.
  //   try {
  //     const doc = await getDoc(docRef);

  //     // Document was found in the cache. If no cached document exists,
  //     // an error will be returned to the 'catch' block below.
  //     // console.log("document data:", doc.data());
  //     return doc.data();
  //   } catch (e) {
  //     console.log("error getting data", e);
  //   }
  // };

  // useEffect(() => {
  const { data, isLoading, isLoadingError, isSuccess, isFetching } = useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUser,
    cacheTime: 0.5 * 60 * 1000, // 30sec cache time
    // initialData: ,
    // refetchInterval: 1500
  });
  // console.log(data);

  // const savedFormValues = useQuery({
  //   queryKey: ["formData"],
  //   enabled: data?.user !== null,
  //   queryFn: () => valuesFromFirestore(data?.uid),
  //   retryOnMount: false,
  //   retry: false,
  //   // initialData: initdata,
  //   // refetchInterval: 1500
  // });

  if (isLoading) return <h1>looading...</h1>;
  if (data?.uid === null) redirect("/login");

  // (async () => {
  //   try {
  //     const _userdata = await currentUser();
  //     // console.log(_userdata);
  //     if (_userdata?.uid === null) _router.push("/login");
  //     if (_userdata.uid) {
  //       console.log("User is signed in:", _userdata?.uid);
  //       setCurrentUser(_userdata);
  //       await saveUser(_userdata);
  //       // return _userdata;
  //     } else {
  //       console.log("User is signed out");
  //       _router.push("/login");
  //     }
  //   } catch (error) {
  //     console.error("Error checking auth state:", error);
  //   }
  // })();
  // }, [_router]);

  if (data?.user !== null) {
    return (
      <>
        <Header userdata={data?.user} />
        <main className="h-screen overflow-hidden flex items-center">
          <section className="flex flex-row max-h-screen pt-16 w-full">
            <div className="flex justify-center w-full p-4 h-auto items-center ">
              <MobilePreview backgroundStyles="url('/phone_modal.png')" />
            </div>
            <div className="flex justify-center w-full p-4 overflow-x-auto">
              <LinksForm
                userdata={data?.user}
                // savedFormValues={savedFormValues}
                // currentUserData={data?.user}
              />
              {/* {formComponent} */}
            </div>
          </section>
        </main>
      </>
    );
  } else {
    return <h1> You are not sign in </h1>;
  }
};

export default MainWrapper;
/**
{
  user: UserImpl {
    providerId: 'firebase',
    proactiveRefresh: ProactiveRefresh {
      user: UserImpl {...},
      isRunning: true,
      timerId: 11,
      errorBackoff: 30000
    },
    reloadUserInfo: {
      localId: 'zVhUMkv0wJq63iJik6xRjqmPVOXS',
      displayName: 'Panda Panda',
      screenName: 'panda_panda',
      email: 'panda.panda.213@example.com',
      emailVerified: true,
      createdAt: '1692861094192',
      lastLoginAt: '1692861175354',
      providerUserInfo: [
        {
          providerId: 'google.com',
          rawId: '2718373911868245503271448264163128041254',
          federatedId: '2718373911868245503271448264163128041254',
          displayName: 'Panda Panda',
          email: 'panda.panda.213@example.com',
          screenName: 'panda_panda'
        }
      ],
      lastRefreshAt: '2023-08-24T16:32:55.846Z'
    },
    reloadListener: null,
    uid: 'zVhUMkv0wJq63iJik6xRjqmPVOXS',
    auth: AuthImpl {
      app: FirebaseAppImpl {
        _isDeleted: false,
        _options: {
          apiKey: 'AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y',
          authDomain: 'copy-cats.firebaseapp.com',
          projectId: 'copy-cats',
          storageBucket: 'copy-cats.appspot.com',
          messagingSenderId: '490619769432',
          appId: '1:490619769432:web:7687d28ed7b2e5ce97302d'
        },
        _config: {
          name: '[DEFAULT]',
          automaticDataCollectionEnabled: false
        },
        _name: '[DEFAULT]',
        _automaticDataCollectionEnabled: false,
        _container: ComponentContainer {
          name: '[DEFAULT]',
          providers: Map {
            platform-logger: Provider {
              name: 'platform-logger',
              container: ComponentContainer {...},
              component: Component {
                name: 'platform-logger',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: PlatformLoggerServiceImpl {
                  container: ComponentContainer {...}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            heartbeat: Provider {
              name: 'heartbeat',
              container: ComponentContainer {...},
              component: Component {
                name: 'heartbeat',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: HeartbeatServiceImpl {
                  container: ComponentContainer {...},
                  _heartbeatsCache: {
                    lastSentHeartbeatDate: '2023-08-24',
                    heartbeats: []
                  },
                  _storage: HeartbeatStorageImpl {
                    app: FirebaseAppImpl {...},
                    _canUseIndexedDBPromise: Promise {...}
                  },
                  _heartbeatsCachePromise: Promise {...}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-core-version: Provider {
              name: 'fire-core-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-core-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-core', version: '0.9.16' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-core-esm2017-version: Provider {
              name: 'fire-core-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-core-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-core-esm2017', version: '0.9.16' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-js-version: Provider {
              name: 'fire-js-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-js-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map { [DEFAULT]: { library: 'fire-js', version: '' } },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            auth: Provider {
              name: 'auth',
              container: ComponentContainer {...},
              component: Component {
                name: 'auth',
                type: 'PUBLIC',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'EXPLICIT'
              },
              instances: Map { [DEFAULT]: AuthImpl {...} },
              instancesDeferred: Map {},
              instancesOptions: Map {
                [DEFAULT]: {
                  persistence: [
                    0: λ:IndexedDBLocalPersistence,
                    1: λ:BrowserLocalPersistence,
                    2: λ:BrowserSessionPersistence
                  ]
                }
              },
              onInitCallbacks: Map {}
            },
            auth-internal: Provider {
              name: 'auth-internal',
              container: ComponentContainer {...},
              component: Component {
                name: 'auth-internal',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'EXPLICIT',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: AuthInterop {
                  auth: AuthImpl {...},
                  internalListeners: Map {
                    () => {
            this.i++, this.currentUser = this.u(), r.resolve(), r = new __PRIVATE_Deferred, ...: λ
                  }
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map { [DEFAULT]: Set { 0: λ } }
            },
            fire-auth-version: Provider {
              name: 'fire-auth-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-auth-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-auth', version: '1.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-auth-esm2017-version: Provider {
              name: 'fire-auth-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-auth-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-auth-esm2017', version: '1.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-js-all-app-version: Provider {
              name: 'fire-js-all-app-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-js-all-app-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-js-all-app', version: '10.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            firestore: Provider {
              name: 'firestore',
              container: ComponentContainer {...},
              component: Component {
                name: 'firestore',
                type: 'PUBLIC',
                multipleInstances: true,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                (default): Firestore {
                  _authCredentials: __PRIVATE_FirebaseAuthCredentialsProvider {
                    t: Provider {...},
                    currentUser: User {...},
                    i: 1,
                    forceRefresh: false,
                    auth: AuthInterop {...}
                  },
                  _appCheckCredentials: __PRIVATE_FirebaseAppCheckTokenProvider {
                    A: Provider {...},
                    forceRefresh: false,
                    appCheck: null,
                    R: null
                  },
                  _databaseId: DatabaseId {
                    projectId: 'copy-cats',
                    database: '(default)'
                  },
                  _app: FirebaseAppImpl {...},
                  type: 'firestore',
                  _persistenceKey: '[DEFAULT]',
                  _settings: FirestoreSettingsImpl {
                    host: 'localhost:8080',
                    ssl: false,
                    credentials: undefined,
                    ignoreUndefinedProperties: false,
                    localCache: undefined,
                    cacheSizeBytes: 41943040,
                    experimentalForceLongPolling: false,
                    experimentalAutoDetectLongPolling: true,
                    experimentalLongPollingOptions: {...},
                    useFetchStreams: true
                  },
                  _settingsFrozen: true,
                  _queue: __PRIVATE_AsyncQueueImpl {
                    Ga: Promise {...},
                    za: [],
                    ja: false,
                    Ha: [],
                    Ja: null,
                    Ya: false,
                    Za: false,
                    Xa: [],
                    '$o': __PRIVATE_ExponentialBackoff {...}
                  },
                  _firestoreClient: FirestoreClient {
                    authCredentials: __PRIVATE_FirebaseAuthCredentialsProvider {...},
                    appCheckCredentials: __PRIVATE_FirebaseAppCheckTokenProvider {...},
                    asyncQueue: __PRIVATE_AsyncQueueImpl {...},
                    databaseInfo: DatabaseInfo {...},
                    user: User {...},
                    clientId: '8KFQMU80EAUayNWieBiL',
                    _offlineComponents: MemoryOfflineComponentProvider {...},
                    _onlineComponents: OnlineComponentProvider {...}
                  }
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { (default): {} },
              onInitCallbacks: Map {}
            },
            fire-fst-version: Provider {
              name: 'fire-fst-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-fst-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-fst', version: '4.1.1' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-fst-esm2017-version: Provider {
              name: 'fire-fst-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-fst-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-fst-esm2017', version: '4.1.1' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            storage: Provider {
              name: 'storage',
              container: ComponentContainer {...},
              component: Component {
                name: 'storage',
                type: 'PUBLIC',
                multipleInstances: true,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: FirebaseStorageImpl {
                  app: FirebaseAppImpl {...},
                  _authProvider: Provider {
                    name: 'auth-internal',
                    container: ComponentContainer {...},
                    component: Component {...},
                    instances: Map {...},
                    instancesDeferred: Map {...},
                    instancesOptions: Map {...},
                    onInitCallbacks: Map {...}
                  },
                  _appCheckProvider: Provider {
                    name: 'app-check-internal',
                    container: ComponentContainer {...},
                    component: null,
                    instances: Map {...},
                    instancesDeferred: Map {...},
                    instancesOptions: Map {...},
                    onInitCallbacks: Map {...}
                  },
                  _url: undefined,
                  _firebaseVersion: '10.2.0',
                  _bucket: Location { bucket: 'copy-cats.appspot.com', path_: '' },
                  _host: 'localhost:9199',
                  _protocol: 'http',
                  _appId: null,
                  _deleted: false,
                  _maxOperationRetryTime: 120000,
                  _maxUploadRetryTime: 600000,
                  _requests: Set {}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-gcs-version: Provider {
              name: 'fire-gcs-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-gcs-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-gcs', version: '0.11.2' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-gcs-esm2017-version: Provider {
              name: 'fire-gcs-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-gcs-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-gcs-esm2017', version: '0.11.2' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            app: Provider {
              name: 'app',
              container: ComponentContainer {...},
              component: Component {
                name: 'app',
                type: 'PUBLIC',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map { [DEFAULT]: FirebaseAppImpl {...} },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            app-check-internal: Provider {
              name: 'app-check-internal',
              container: ComponentContainer {...},
              component: null,
              instances: Map {},
              instancesDeferred: Map {},
              instancesOptions: Map {},
              onInitCallbacks: Map { [DEFAULT]: Set { 0: λ } }
            }
          }
        }
      },
      heartbeatServiceProvider: Provider {
        name: 'heartbeat',
        container: ComponentContainer {
          name: '[DEFAULT]',
          providers: Map {
            platform-logger: Provider {
              name: 'platform-logger',
              container: ComponentContainer {...},
              component: Component {
                name: 'platform-logger',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: PlatformLoggerServiceImpl {
                  container: ComponentContainer {...}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            heartbeat: Provider {...},
            fire-core-version: Provider {
              name: 'fire-core-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-core-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-core', version: '0.9.16' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-core-esm2017-version: Provider {
              name: 'fire-core-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-core-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-core-esm2017', version: '0.9.16' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-js-version: Provider {
              name: 'fire-js-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-js-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map { [DEFAULT]: { library: 'fire-js', version: '' } },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            auth: Provider {
              name: 'auth',
              container: ComponentContainer {...},
              component: Component {
                name: 'auth',
                type: 'PUBLIC',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'EXPLICIT'
              },
              instances: Map { [DEFAULT]: AuthImpl {...} },
              instancesDeferred: Map {},
              instancesOptions: Map {
                [DEFAULT]: {
                  persistence: [
                    0: λ:IndexedDBLocalPersistence,
                    1: λ:BrowserLocalPersistence,
                    2: λ:BrowserSessionPersistence
                  ]
                }
              },
              onInitCallbacks: Map {}
            },
            auth-internal: Provider {
              name: 'auth-internal',
              container: ComponentContainer {...},
              component: Component {
                name: 'auth-internal',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'EXPLICIT',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: AuthInterop {
                  auth: AuthImpl {...},
                  internalListeners: Map {
                    () => {
            this.i++, this.currentUser = this.u(), r.resolve(), r = new __PRIVATE_Deferred, ...: λ
                  }
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map { [DEFAULT]: Set { 0: λ } }
            },
            fire-auth-version: Provider {
              name: 'fire-auth-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-auth-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-auth', version: '1.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-auth-esm2017-version: Provider {
              name: 'fire-auth-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-auth-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-auth-esm2017', version: '1.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-js-all-app-version: Provider {
              name: 'fire-js-all-app-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-js-all-app-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-js-all-app', version: '10.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            firestore: Provider {
              name: 'firestore',
              container: ComponentContainer {...},
              component: Component {
                name: 'firestore',
                type: 'PUBLIC',
                multipleInstances: true,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                (default): Firestore {
                  _authCredentials: __PRIVATE_FirebaseAuthCredentialsProvider {
                    t: Provider {...},
                    currentUser: User {...},
                    i: 1,
                    forceRefresh: false,
                    auth: AuthInterop {...}
                  },
                  _appCheckCredentials: __PRIVATE_FirebaseAppCheckTokenProvider {
                    A: Provider {...},
                    forceRefresh: false,
                    appCheck: null,
                    R: null
                  },
                  _databaseId: DatabaseId {
                    projectId: 'copy-cats',
                    database: '(default)'
                  },
                  _app: FirebaseAppImpl {
                    _isDeleted: false,
                    _options: {...},
                    _config: {...},
                    _name: '[DEFAULT]',
                    _automaticDataCollectionEnabled: false,
                    _container: ComponentContainer {...}
                  },
                  type: 'firestore',
                  _persistenceKey: '[DEFAULT]',
                  _settings: FirestoreSettingsImpl {
                    host: 'localhost:8080',
                    ssl: false,
                    credentials: undefined,
                    ignoreUndefinedProperties: false,
                    localCache: undefined,
                    cacheSizeBytes: 41943040,
                    experimentalForceLongPolling: false,
                    experimentalAutoDetectLongPolling: true,
                    experimentalLongPollingOptions: {...},
                    useFetchStreams: true
                  },
                  _settingsFrozen: true,
                  _queue: __PRIVATE_AsyncQueueImpl {
                    Ga: Promise {...},
                    za: [],
                    ja: false,
                    Ha: [],
                    Ja: null,
                    Ya: false,
                    Za: false,
                    Xa: [],
                    '$o': __PRIVATE_ExponentialBackoff {...}
                  },
                  _firestoreClient: FirestoreClient {
                    authCredentials: __PRIVATE_FirebaseAuthCredentialsProvider {...},
                    appCheckCredentials: __PRIVATE_FirebaseAppCheckTokenProvider {...},
                    asyncQueue: __PRIVATE_AsyncQueueImpl {...},
                    databaseInfo: DatabaseInfo {...},
                    user: User {...},
                    clientId: '8KFQMU80EAUayNWieBiL',
                    _offlineComponents: MemoryOfflineComponentProvider {...},
                    _onlineComponents: OnlineComponentProvider {...}
                  }
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { (default): {} },
              onInitCallbacks: Map {}
            },
            fire-fst-version: Provider {
              name: 'fire-fst-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-fst-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-fst', version: '4.1.1' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-fst-esm2017-version: Provider {
              name: 'fire-fst-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-fst-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-fst-esm2017', version: '4.1.1' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            storage: Provider {
              name: 'storage',
              container: ComponentContainer {...},
              component: Component {
                name: 'storage',
                type: 'PUBLIC',
                multipleInstances: true,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: FirebaseStorageImpl {
                  app: FirebaseAppImpl {
                    _isDeleted: false,
                    _options: {...},
                    _config: {...},
                    _name: '[DEFAULT]',
                    _automaticDataCollectionEnabled: false,
                    _container: ComponentContainer {...}
                  },
                  _authProvider: Provider {
                    name: 'auth-internal',
                    container: ComponentContainer {...},
                    component: Component {...},
                    instances: Map {...},
                    instancesDeferred: Map {...},
                    instancesOptions: Map {...},
                    onInitCallbacks: Map {...}
                  },
                  _appCheckProvider: Provider {
                    name: 'app-check-internal',
                    container: ComponentContainer {...},
                    component: null,
                    instances: Map {...},
                    instancesDeferred: Map {...},
                    instancesOptions: Map {...},
                    onInitCallbacks: Map {...}
                  },
                  _url: undefined,
                  _firebaseVersion: '10.2.0',
                  _bucket: Location { bucket: 'copy-cats.appspot.com', path_: '' },
                  _host: 'localhost:9199',
                  _protocol: 'http',
                  _appId: null,
                  _deleted: false,
                  _maxOperationRetryTime: 120000,
                  _maxUploadRetryTime: 600000,
                  _requests: Set {}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-gcs-version: Provider {
              name: 'fire-gcs-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-gcs-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-gcs', version: '0.11.2' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-gcs-esm2017-version: Provider {
              name: 'fire-gcs-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-gcs-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-gcs-esm2017', version: '0.11.2' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            app: Provider {
              name: 'app',
              container: ComponentContainer {...},
              component: Component {
                name: 'app',
                type: 'PUBLIC',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: FirebaseAppImpl {
                  _isDeleted: false,
                  _options: {
                    apiKey: 'AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y',
                    authDomain: 'copy-cats.firebaseapp.com',
                    projectId: 'copy-cats',
                    storageBucket: 'copy-cats.appspot.com',
                    messagingSenderId: '490619769432',
                    appId: '1:490619769432:web:7687d28ed7b2e5ce97302d'
                  },
                  _config: {
                    name: '[DEFAULT]',
                    automaticDataCollectionEnabled: false
                  },
                  _name: '[DEFAULT]',
                  _automaticDataCollectionEnabled: false,
                  _container: ComponentContainer {...}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            app-check-internal: Provider {
              name: 'app-check-internal',
              container: ComponentContainer {...},
              component: null,
              instances: Map {},
              instancesDeferred: Map {},
              instancesOptions: Map {},
              onInitCallbacks: Map { [DEFAULT]: Set { 0: λ } }
            }
          }
        },
        component: Component {
          name: 'heartbeat',
          type: 'PRIVATE',
          multipleInstances: false,
          serviceProps: {},
          instantiationMode: 'LAZY',
          onInstanceCreated: null
        },
        instances: Map {
          [DEFAULT]: HeartbeatServiceImpl {
            container: ComponentContainer {
              name: '[DEFAULT]',
              providers: Map {
                platform-logger: Provider {
                  name: 'platform-logger',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'platform-logger',
                    type: 'PRIVATE',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: PlatformLoggerServiceImpl {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                heartbeat: Provider {...},
                fire-core-version: Provider {
                  name: 'fire-core-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-core-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                fire-core-esm2017-version: Provider {
                  name: 'fire-core-esm2017-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-core-esm2017-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                fire-js-version: Provider {
                  name: 'fire-js-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-js-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                auth: Provider {
                  name: 'auth',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'auth',
                    type: 'PUBLIC',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'EXPLICIT'
                  },
                  instances: Map { [DEFAULT]: AuthImpl {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                auth-internal: Provider {
                  name: 'auth-internal',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'auth-internal',
                    type: 'PRIVATE',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'EXPLICIT',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: AuthInterop {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map { [DEFAULT]: Set {...} }
                },
                fire-auth-version: Provider {
                  name: 'fire-auth-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-auth-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                fire-auth-esm2017-version: Provider {
                  name: 'fire-auth-esm2017-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-auth-esm2017-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                fire-js-all-app-version: Provider {
                  name: 'fire-js-all-app-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-js-all-app-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                firestore: Provider {
                  name: 'firestore',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'firestore',
                    type: 'PUBLIC',
                    multipleInstances: true,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { (default): Firestore {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { (default): {...} },
                  onInitCallbacks: Map {}
                },
                fire-fst-version: Provider {
                  name: 'fire-fst-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-fst-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                fire-fst-esm2017-version: Provider {
                  name: 'fire-fst-esm2017-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-fst-esm2017-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                storage: Provider {
                  name: 'storage',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'storage',
                    type: 'PUBLIC',
                    multipleInstances: true,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: FirebaseStorageImpl {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                fire-gcs-version: Provider {
                  name: 'fire-gcs-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-gcs-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                fire-gcs-esm2017-version: Provider {
                  name: 'fire-gcs-esm2017-version',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'fire-gcs-esm2017-version',
                    type: 'VERSION',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                app: Provider {
                  name: 'app',
                  container: ComponentContainer {...},
                  component: Component {
                    name: 'app',
                    type: 'PUBLIC',
                    multipleInstances: false,
                    serviceProps: {...},
                    instantiationMode: 'LAZY',
                    onInstanceCreated: null
                  },
                  instances: Map { [DEFAULT]: FirebaseAppImpl {...} },
                  instancesDeferred: Map {},
                  instancesOptions: Map { [DEFAULT]: {...} },
                  onInitCallbacks: Map {}
                },
                app-check-internal: Provider {
                  name: 'app-check-internal',
                  container: ComponentContainer {...},
                  component: null,
                  instances: Map {},
                  instancesDeferred: Map {},
                  instancesOptions: Map {},
                  onInitCallbacks: Map { [DEFAULT]: Set {...} }
                }
              }
            },
            _heartbeatsCache: { lastSentHeartbeatDate: '2023-08-24', heartbeats: [] },
            _storage: HeartbeatStorageImpl {
              app: FirebaseAppImpl {
                _isDeleted: false,
                _options: {
                  apiKey: 'AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y',
                  authDomain: 'copy-cats.firebaseapp.com',
                  projectId: 'copy-cats',
                  storageBucket: 'copy-cats.appspot.com',
                  messagingSenderId: '490619769432',
                  appId: '1:490619769432:web:7687d28ed7b2e5ce97302d'
                },
                _config: {
                  name: '[DEFAULT]',
                  automaticDataCollectionEnabled: false
                },
                _name: '[DEFAULT]',
                _automaticDataCollectionEnabled: false,
                _container: ComponentContainer {
                  name: '[DEFAULT]',
                  providers: Map {
                    platform-logger: Provider {...},
                    heartbeat: Provider {...},
                    fire-core-version: Provider {...},
                    fire-core-esm2017-version: Provider {...},
                    fire-js-version: Provider {...},
                    auth: Provider {...},
                    auth-internal: Provider {...},
                    fire-auth-version: Provider {...},
                    fire-auth-esm2017-version: Provider {...},
                    fire-js-all-app-version: Provider {...},
                    firestore: Provider {...},
                    fire-fst-version: Provider {...},
                    fire-fst-esm2017-version: Provider {...},
                    storage: Provider {...},
                    fire-gcs-version: Provider {...},
                    fire-gcs-esm2017-version: Provider {...},
                    app: Provider {...},
                    app-check-internal: Provider {...}
                  }
                }
              },
              _canUseIndexedDBPromise: Promise {...}
            },
            _heartbeatsCachePromise: Promise {...}
          }
        },
        instancesDeferred: Map {},
        instancesOptions: Map { [DEFAULT]: {} },
        onInitCallbacks: Map {}
      },
      appCheckServiceProvider: Provider {
        name: 'app-check-internal',
        container: ComponentContainer {
          name: '[DEFAULT]',
          providers: Map {
            platform-logger: Provider {
              name: 'platform-logger',
              container: ComponentContainer {...},
              component: Component {
                name: 'platform-logger',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: PlatformLoggerServiceImpl {
                  container: ComponentContainer {...}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            heartbeat: Provider {
              name: 'heartbeat',
              container: ComponentContainer {...},
              component: Component {
                name: 'heartbeat',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: HeartbeatServiceImpl {
                  container: ComponentContainer {...},
                  _heartbeatsCache: {
                    lastSentHeartbeatDate: '2023-08-24',
                    heartbeats: []
                  },
                  _storage: HeartbeatStorageImpl {
                    app: FirebaseAppImpl {...},
                    _canUseIndexedDBPromise: Promise {...}
                  },
                  _heartbeatsCachePromise: Promise {...}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-core-version: Provider {
              name: 'fire-core-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-core-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-core', version: '0.9.16' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-core-esm2017-version: Provider {
              name: 'fire-core-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-core-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-core-esm2017', version: '0.9.16' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-js-version: Provider {
              name: 'fire-js-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-js-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map { [DEFAULT]: { library: 'fire-js', version: '' } },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            auth: Provider {
              name: 'auth',
              container: ComponentContainer {...},
              component: Component {
                name: 'auth',
                type: 'PUBLIC',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'EXPLICIT'
              },
              instances: Map { [DEFAULT]: AuthImpl {...} },
              instancesDeferred: Map {},
              instancesOptions: Map {
                [DEFAULT]: {
                  persistence: [
                    0: λ:IndexedDBLocalPersistence,
                    1: λ:BrowserLocalPersistence,
                    2: λ:BrowserSessionPersistence
                  ]
                }
              },
              onInitCallbacks: Map {}
            },
            auth-internal: Provider {
              name: 'auth-internal',
              container: ComponentContainer {...},
              component: Component {
                name: 'auth-internal',
                type: 'PRIVATE',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'EXPLICIT',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: AuthInterop {
                  auth: AuthImpl {...},
                  internalListeners: Map {
                    () => {
            this.i++, this.currentUser = this.u(), r.resolve(), r = new __PRIVATE_Deferred, ...: λ
                  }
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map { [DEFAULT]: Set { 0: λ } }
            },
            fire-auth-version: Provider {
              name: 'fire-auth-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-auth-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-auth', version: '1.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-auth-esm2017-version: Provider {
              name: 'fire-auth-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-auth-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-auth-esm2017', version: '1.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-js-all-app-version: Provider {
              name: 'fire-js-all-app-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-js-all-app-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-js-all-app', version: '10.2.0' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            firestore: Provider {
              name: 'firestore',
              container: ComponentContainer {...},
              component: Component {
                name: 'firestore',
                type: 'PUBLIC',
                multipleInstances: true,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                (default): Firestore {
                  _authCredentials: __PRIVATE_FirebaseAuthCredentialsProvider {
                    t: Provider {...},
                    currentUser: User {...},
                    i: 1,
                    forceRefresh: false,
                    auth: AuthInterop {...}
                  },
                  _appCheckCredentials: __PRIVATE_FirebaseAppCheckTokenProvider {
                    A: Provider {...},
                    forceRefresh: false,
                    appCheck: null,
                    R: null
                  },
                  _databaseId: DatabaseId {
                    projectId: 'copy-cats',
                    database: '(default)'
                  },
                  _app: FirebaseAppImpl {
                    _isDeleted: false,
                    _options: {...},
                    _config: {...},
                    _name: '[DEFAULT]',
                    _automaticDataCollectionEnabled: false,
                    _container: ComponentContainer {...}
                  },
                  type: 'firestore',
                  _persistenceKey: '[DEFAULT]',
                  _settings: FirestoreSettingsImpl {
                    host: 'localhost:8080',
                    ssl: false,
                    credentials: undefined,
                    ignoreUndefinedProperties: false,
                    localCache: undefined,
                    cacheSizeBytes: 41943040,
                    experimentalForceLongPolling: false,
                    experimentalAutoDetectLongPolling: true,
                    experimentalLongPollingOptions: {...},
                    useFetchStreams: true
                  },
                  _settingsFrozen: true,
                  _queue: __PRIVATE_AsyncQueueImpl {
                    Ga: Promise {...},
                    za: [],
                    ja: false,
                    Ha: [],
                    Ja: null,
                    Ya: false,
                    Za: false,
                    Xa: [],
                    '$o': __PRIVATE_ExponentialBackoff {...}
                  },
                  _firestoreClient: FirestoreClient {
                    authCredentials: __PRIVATE_FirebaseAuthCredentialsProvider {...},
                    appCheckCredentials: __PRIVATE_FirebaseAppCheckTokenProvider {...},
                    asyncQueue: __PRIVATE_AsyncQueueImpl {...},
                    databaseInfo: DatabaseInfo {...},
                    user: User {...},
                    clientId: '8KFQMU80EAUayNWieBiL',
                    _offlineComponents: MemoryOfflineComponentProvider {...},
                    _onlineComponents: OnlineComponentProvider {...}
                  }
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { (default): {} },
              onInitCallbacks: Map {}
            },
            fire-fst-version: Provider {
              name: 'fire-fst-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-fst-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-fst', version: '4.1.1' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-fst-esm2017-version: Provider {
              name: 'fire-fst-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-fst-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-fst-esm2017', version: '4.1.1' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            storage: Provider {
              name: 'storage',
              container: ComponentContainer {...},
              component: Component {
                name: 'storage',
                type: 'PUBLIC',
                multipleInstances: true,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: FirebaseStorageImpl {
                  app: FirebaseAppImpl {
                    _isDeleted: false,
                    _options: {...},
                    _config: {...},
                    _name: '[DEFAULT]',
                    _automaticDataCollectionEnabled: false,
                    _container: ComponentContainer {...}
                  },
                  _authProvider: Provider {
                    name: 'auth-internal',
                    container: ComponentContainer {...},
                    component: Component {...},
                    instances: Map {...},
                    instancesDeferred: Map {...},
                    instancesOptions: Map {...},
                    onInitCallbacks: Map {...}
                  },
                  _appCheckProvider: Provider {...},
                  _url: undefined,
                  _firebaseVersion: '10.2.0',
                  _bucket: Location { bucket: 'copy-cats.appspot.com', path_: '' },
                  _host: 'localhost:9199',
                  _protocol: 'http',
                  _appId: null,
                  _deleted: false,
                  _maxOperationRetryTime: 120000,
                  _maxUploadRetryTime: 600000,
                  _requests: Set {}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-gcs-version: Provider {
              name: 'fire-gcs-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-gcs-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-gcs', version: '0.11.2' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            fire-gcs-esm2017-version: Provider {
              name: 'fire-gcs-esm2017-version',
              container: ComponentContainer {...},
              component: Component {
                name: 'fire-gcs-esm2017-version',
                type: 'VERSION',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: { library: 'fire-gcs-esm2017', version: '0.11.2' }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            app: Provider {
              name: 'app',
              container: ComponentContainer {...},
              component: Component {
                name: 'app',
                type: 'PUBLIC',
                multipleInstances: false,
                serviceProps: {},
                instantiationMode: 'LAZY',
                onInstanceCreated: null
              },
              instances: Map {
                [DEFAULT]: FirebaseAppImpl {
                  _isDeleted: false,
                  _options: {
                    apiKey: 'AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y',
                    authDomain: 'copy-cats.firebaseapp.com',
                    projectId: 'copy-cats',
                    storageBucket: 'copy-cats.appspot.com',
                    messagingSenderId: '490619769432',
                    appId: '1:490619769432:web:7687d28ed7b2e5ce97302d'
                  },
                  _config: {
                    name: '[DEFAULT]',
                    automaticDataCollectionEnabled: false
                  },
                  _name: '[DEFAULT]',
                  _automaticDataCollectionEnabled: false,
                  _container: ComponentContainer {...}
                }
              },
              instancesDeferred: Map {},
              instancesOptions: Map { [DEFAULT]: {} },
              onInitCallbacks: Map {}
            },
            app-check-internal: Provider {...}
          }
        },
        component: null,
        instances: Map {},
        instancesDeferred: Map {},
        instancesOptions: Map {},
        onInitCallbacks: Map { [DEFAULT]: Set { 0: λ } }
      },
      config: {
        apiKey: 'AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y',
        authDomain: 'copy-cats.firebaseapp.com',
        clientPlatform: 'Browser',
        apiHost: 'identitytoolkit.googleapis.com',
        tokenApiHost: 'securetoken.googleapis.com',
        apiScheme: 'https',
        sdkClientVersion: 'Chrome/JsCore/10.2.0/FirebaseCore-web',
        emulator: { url: 'http://localhost:9099/' }
      },
      currentUser: UserImpl {...},
      emulatorConfig: {
        host: 'localhost',
        port: 9099,
        protocol: 'http',
        options: { disableWarnings: false }
      },
      operations: Promise {...},
      authStateSubscription: Subscription {
        auth: AuthImpl {...},
        observer: ObserverProxy {
          observers: Array(15) [
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
          ],
          unsubscribes: [],
          observerCount: 0,
          task: Promise {...},
          finalized: false,
          onNoObservers: undefined
        }
      },
      idTokenSubscription: Subscription {
        auth: AuthImpl {...},
        observer: ObserverProxy {
          observers: [ {} ],
          unsubscribes: [],
          observerCount: 0,
          task: Promise {...},
          finalized: false,
          onNoObservers: undefined
        }
      },
      beforeStateQueue: AuthMiddlewareQueue { auth: AuthImpl {...}, queue: [] },
      redirectUser: null,
      isProactiveRefreshEnabled: true,
      EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION: 1,
      _canInitEmulator: false,
      _isInitialized: true,
      _deleted: false,
      _initializationPromise: Promise {...},
      _popupRedirectResolver: BrowserPopupRedirectResolver {
        eventManagers: {},
        iframes: {},
        originValidationPromises: {}
      },
      _errorFactory: ErrorFactory {
        service: 'auth',
        serviceName: 'Firebase',
        errors: {
          'dependent-sdk-initialized-before-auth': 
            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.'
        }
      },
      _agentRecaptchaConfig: null,
      _tenantRecaptchaConfigs: {},
      _projectPasswordPolicy: null,
      _tenantPasswordPolicies: {},
      lastNotifiedUid: 'zVhUMkv0wJq63iJik6xRjqmPVOXS',
      languageCode: null,
      tenantId: null,
      settings: {
        appVerificationDisabledForTesting: true
      },
      frameworks: [],
      name: '[DEFAULT]',
      clientVersion: 'Chrome/JsCore/10.2.0/FirebaseCore-web',
      persistenceManager: PersistenceUserManager {
        persistence: IndexedDBLocalPersistence {
          type: 'LOCAL',
          _shouldAllowMigration: true,
          listeners: {
            'firebase:authUser:AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y:[DEFAULT]': Set { 0: λ:bound _onStorageEvent }
          },
          localCache: {
            'firebase:authUser:AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y:[DEFAULT]': {
              uid: 'zVhUMkv0wJq63iJik6xRjqmPVOXS',
              email: 'panda.panda.213@example.com',
              emailVerified: true,
              displayName: 'Panda Panda',
              isAnonymous: false,
              photoURL: undefined,
              phoneNumber: undefined,
              tenantId: undefined,
              providerData: [
                {
                  providerId: 'google.com',
                  uid: '2718373911868245503271448264163128041254',
                  displayName: 'Panda Panda',
                  email: 'panda.panda.213@example.com',
                  phoneNumber: null,
                  photoURL: null
                }
              ],
              stsTokenManager: {
                refreshToken: 
                  'eyJfQXV0aEVtdWxhdG9yUmVmcmVzaFRva2VuIjoiRE8gTk9UIE1PRElGWSIsImxvY2FsSWQiOiJ6VmhVTWt2MHdKcTYzaUppazZ4UmpxbVBWT1hTIiwicHJvdmlkZXIiOiJnb29nbGUuY29tIiwiZXh0cmFDbGFpbXMiOnt9LCJwcm9qZWN0SWQiOiJjb3B5LWNhdHMifQ==',
                accessToken: 
                  'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiUGFuZGEgUGFuZGEiLCJlbWFpbCI6InBhbmRhLnBhbmRhLjIxM0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2OTI4NjExNzUsInVzZXJfaWQiOiJ6VmhVTWt2MHdKcTYzaUppazZ4UmpxbVBWT1hTIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwYW5kYS5wYW5kYS4yMTNAZXhhbXBsZS5jb20iXSwiZ29vZ2xlLmNvbSI6WyIyNzE4MzczOTExODY4MjQ1NTAzMjcxNDQ4MjY0MTYzMTI4MDQxMjU0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9LCJpYXQiOjE2OTI4OTQ3NzUsImV4cCI6MTY5Mjg5ODM3NSwiYXVkIjoiY29weS1jYXRzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvcHktY2F0cyIsInN1YiI6InpWaFVNa3Ywd0pxNjNpSmlrNnhSanFtUFZPWFMifQ.',
                expirationTime: 1692898375854
              },
              _redirectEventId: undefined,
              createdAt: '1692861094192',
              lastLoginAt: '1692861175354',
              apiKey: 'AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y',
              appName: '[DEFAULT]'
            }
          },
          pollTimer: 9,
          pendingWrites: 0,
          receiver: null,
          sender: null,
          serviceWorkerReceiverAvailable: false,
          activeServiceWorker: null,
          _workerInitializationPromise: Promise {...},
          db: IDBDatabase {
            name: 'firebaseLocalStorageDb',
            version: 1,
            objectStoreNames: DOMStringList { 0: 'firebaseLocalStorage', length: 1 },
            onabort: null,
            onclose: null,
            onerror: null,
            onversionchange: null
          }
        },
        auth: AuthImpl {...},
        userKey: 'authUser',
        fullUserKey: 
          'firebase:authUser:AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y:[DEFAULT]',
        fullPersistenceKey: 
          'firebase:persistence:AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y:[DEFAULT]'
      },
      redirectPersistenceManager: PersistenceUserManager {
        persistence: BrowserSessionPersistence { type: 'SESSION' },
        auth: AuthImpl {...},
        userKey: 'redirectUser',
        fullUserKey: 
          'firebase:redirectUser:AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y:[DEFAULT]',
        fullPersistenceKey: 
          'firebase:persistence:AIzaSyCx3FzxqNaYy6ZetzHwrr1ToxH-ORiza8Y:[DEFAULT]'
      }
    },
    stsTokenManager: StsTokenManager {
      refreshToken: 
        'eyJfQXV0aEVtdWxhdG9yUmVmcmVzaFRva2VuIjoiRE8gTk9UIE1PRElGWSIsImxvY2FsSWQiOiJ6VmhVTWt2MHdKcTYzaUppazZ4UmpxbVBWT1hTIiwicHJvdmlkZXIiOiJnb29nbGUuY29tIiwiZXh0cmFDbGFpbXMiOnt9LCJwcm9qZWN0SWQiOiJjb3B5LWNhdHMifQ==',
      accessToken: 
        'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiUGFuZGEgUGFuZGEiLCJlbWFpbCI6InBhbmRhLnBhbmRhLjIxM0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2OTI4NjExNzUsInVzZXJfaWQiOiJ6VmhVTWt2MHdKcTYzaUppazZ4UmpxbVBWT1hTIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwYW5kYS5wYW5kYS4yMTNAZXhhbXBsZS5jb20iXSwiZ29vZ2xlLmNvbSI6WyIyNzE4MzczOTExODY4MjQ1NTAzMjcxNDQ4MjY0MTYzMTI4MDQxMjU0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9LCJpYXQiOjE2OTI4OTQ3NzUsImV4cCI6MTY5Mjg5ODM3NSwiYXVkIjoiY29weS1jYXRzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvcHktY2F0cyIsInN1YiI6InpWaFVNa3Ywd0pxNjNpSmlrNnhSanFtUFZPWFMifQ.',
      expirationTime: 1692898375854
    },
    accessToken: 
      'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiUGFuZGEgUGFuZGEiLCJlbWFpbCI6InBhbmRhLnBhbmRhLjIxM0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2OTI4NjExNzUsInVzZXJfaWQiOiJ6VmhVTWt2MHdKcTYzaUppazZ4UmpxbVBWT1hTIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwYW5kYS5wYW5kYS4yMTNAZXhhbXBsZS5jb20iXSwiZ29vZ2xlLmNvbSI6WyIyNzE4MzczOTExODY4MjQ1NTAzMjcxNDQ4MjY0MTYzMTI4MDQxMjU0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9LCJpYXQiOjE2OTI4OTQ3NzUsImV4cCI6MTY5Mjg5ODM3NSwiYXVkIjoiY29weS1jYXRzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NvcHktY2F0cyIsInN1YiI6InpWaFVNa3Ywd0pxNjNpSmlrNnhSanFtUFZPWFMifQ.',
    displayName: 'Panda Panda',
    email: 'panda.panda.213@example.com',
    emailVerified: true,
    phoneNumber: null,
    photoURL: null,
    isAnonymous: false,
    tenantId: null,
    providerData: [
      {
        providerId: 'google.com',
        uid: '2718373911868245503271448264163128041254',
        displayName: 'Panda Panda',
        email: 'panda.panda.213@example.com',
        phoneNumber: null,
        photoURL: null
      }
    ],
    metadata: UserMetadata {
      createdAt: '1692861094192',
      lastLoginAt: '1692861175354',
      lastSignInTime: 'Thu, 24 Aug 2023 07:12:55 GMT',
      creationTime: 'Thu, 24 Aug 2023 07:11:34 GMT'
    }
  },
  uid: 'zVhUMkv0wJq63iJik6xRjqmPVOXS'
}
 */
