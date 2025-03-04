const DB_CONFIG = {
    NAME: 'RealEstateDB',
    VERSION: 3,
    STORE_NAME: 'properties'
};

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_CONFIG.NAME, DB_CONFIG.VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(DB_CONFIG.STORE_NAME)) {
                db.createObjectStore(DB_CONFIG.STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const addProperty = (property) => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            const transaction = db.transaction([DB_CONFIG.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(DB_CONFIG.STORE_NAME);
            const request = store.add(property);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        }).catch(error => {
            reject(error);
        });
    });
};

const getProperties = () => {
    return new Promise((resolve, reject) => {
        openDatabase().then((db) => {
            const transaction = db.transaction([DB_CONFIG.STORE_NAME], 'readonly');
            const store = transaction.objectStore(DB_CONFIG.STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        }).catch(error => {
            reject(error);
        });
    });
};

export { addProperty, getProperties };
