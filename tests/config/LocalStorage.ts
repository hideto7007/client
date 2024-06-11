type EmptyObject = Record<string, any>;

const localStorageMock = (() => {
    let store: EmptyObject = {};
  
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();


  export default localStorageMock