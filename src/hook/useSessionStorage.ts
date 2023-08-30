import { Dispatch, SetStateAction, useState, useCallback } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useSessionStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        setStoredValue((prevValue: T) => {
          const nextValue = value instanceof Function ? setStoredValue(prevValue) : value;
          sessionStorage.setItem(key, JSON.stringify(nextValue));
          return nextValue;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
};

export default useSessionStorage;
