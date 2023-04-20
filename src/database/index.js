async function DB(TableDB) {
  const openRequest = indexedDB.open(TableDB, 2);
  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains(TableDB)) {
      db.createObjectStore(TableDB, { keyPath: "id" });
    }
  };

  function createObjectStore(db, data) {
    const transaction = db.transaction(TableDB, "readwrite");
    const store = transaction.objectStore(TableDB);

    data.forEach((item) => {
      store.add({ ...item, created: new Date() });
    });

    store.onsuccess = () => {
      console.log("thanh cong them");
    };
    store.onerror = () => {
      console.log("khoong them thanh cong");
    };

    transaction.commit();
  }
  function reloadStore(db, data) {
    const transaction = db.transaction(TableDB, "readwrite");
    const store = transaction.objectStore(TableDB);
    const clearStore = store.clear();

    transaction.commit();
    clearStore.onsuccess = () => {
      console.log("đã cập nhật");
      createObjectStore(db, data);
    };
    clearStore.onerror = () => {
      console.log("ko cập nhật được");
    };
  }
  function getAllstore(db) {
    const transactionGet = db.transaction(TableDB, "readonly");
    const storeGet = transactionGet.objectStore(TableDB);
    const request = storeGet.getAll();
    const promise = new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const data = event.target.result;
        resolve(data);
      };
    });

    return promise;
  }

  return {
    openRequest,
    createObjectStore,
    getAllstore,
    reloadStore,
  };
}

export default DB;
