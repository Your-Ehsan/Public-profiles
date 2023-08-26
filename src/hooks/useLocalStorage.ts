import { useState } from "react";

type SetValueAction<T> = T | ((prevState: T) => T);

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: SetValueAction<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? (value as Function)(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue] as const;
};

export default useLocalStorage;

// import { useState } from "react";

// type SetValueAction<T> = T | ((prevState: T) => T);

// const useLocalStorage = <T>(key: string, initialValue: T) => {
//   const [state, setState] = useState<T>(() => {
//     try {
//       const value = window.localStorage.getItem(key);
//       return value ? JSON.parse(value) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value: SetValueAction<T>) => {
//     try {
//       const valueToStore = value instanceof Function ? (value as Function)(state) : value;
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       setState(valueToStore)
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   return [state, setValue] as const;
// };

// export default useLocalStorage;

// // import { useState } from "react";

// // function useLocalStorage(key, initialValue) {
// //   // Get initial value from localStorage if it exists, otherwise use initialValue
// //   const storedValue = localStorage.getItem(key);
// //   const initial = storedValue ? JSON.parse(storedValue) : initialValue;

// //   const [value, setValue] = useState(initial);

// //   // Set the value to localStorage and update the state
// //   const setStoredValue = (newValue) => {
// //     setValue(newValue);
// //     localStorage.setItem(key, JSON.stringify(newValue));
// //   };

// //   return [value, setStoredValue];
// // }

// // export default useLocalStorage;
