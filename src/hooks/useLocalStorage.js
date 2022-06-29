import React, { useEffect, useState } from "react";

const getLocalValue = (key, initalValue) => {
  // for SSR
  if (typeof window === "undefined") return initalValue;

  // if a value is already store

  const localValue = JSON.parse(localStorage.getItem(key));

  if (localValue) return localValue;

  // return result of a function

  if (initalValue instanceof Function) return initalValue;

  return initalValue;
};

const useLocalStorage = (key, initalValue) => {
  const [value, setValue] = useState(() => getLocalValue(key, initalValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
