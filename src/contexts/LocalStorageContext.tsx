"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LocalStorageContext = createContext();

export const useLocalStorage = () => {
  return useContext(LocalStorageContext);
};

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(localStorage.getItem("links") || "");
const localdata = localStorage.getItem('links')
  // const updateData = (newData) => {
  //   localStorage.setItem("links", newData);
  //   setData(newData);
  // };
//   useEffect(() => {
// return () => setData(localStorage.getItem('links'))  
// }, []);

  return (
    <LocalStorageContext.Provider value={{ data  }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
