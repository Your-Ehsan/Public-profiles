// const ISSERVER = typeof window === "undefined";
// if (!ISSERVER) localStorage.setItem(key, value);
// const localStorageData = localStorage.getItem('links')

//@ts-ignore
 const localdata = () => JSON.parse(localStorage.getItem("links"));


export {localdata}
