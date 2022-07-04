import { ref, watch } from "vue";

export function useLocalStorage<T>(key: string, initialValue: T) {
  function read() {
    let readValue = window.localStorage.getItem(key);

    return !readValue ? "" : JSON.parse(readValue);
  }

  function write(newValue: T) {
    if (!newValue) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
  }

  let storedValue = read();
  let value;

  if (storedValue) {
    value = ref(storedValue);
  } else {
    value = ref(initialValue);
    write(initialValue);
  }

  watch(value, write);

  return value;
}
