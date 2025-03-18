class IndexedDBRepository {
  constructor(dbName, version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  async init(storeNames) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        storeNames.forEach(storeName => {
          if (!this.db.objectStoreNames.contains(storeName)) {
            this.db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          }
        });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject(`Erro ao abrir o IndexedDB: ${event.target.errorCode}`);
      };
    });
  }

  async add(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(`Erro ao adicionar item: ${request.error}`);
    });
  }

  async update(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(`Erro ao atualizar item: ${request.error}`);
    });
  }

  async delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(`Erro ao deletar item: ${request.error}`);
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(`Erro ao buscar todos os itens: ${request.error}`);
    });
  }

  async getById(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(`Erro ao buscar item: ${request.error}`);
    });
  }

  async search(storeName, criteria) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.openCursor();
      const results = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const match = Object.keys(criteria).every((key) => {
            if (typeof cursor.value[key] === "string") {
              return cursor.value[key].includes(criteria[key]);
            }
            return cursor.value[key] === criteria[key];
          });

          if (match) {
            results.push(cursor.value);
          }

          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => reject(`Erro na busca: ${request.error}`);
    });
  }
}