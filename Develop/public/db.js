let db;

// create db request for budget database
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(e) {
    // create "pending" obj and set autoIncrement
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};

request.onsuccess = function(e) {
    db = event.target.result;
    if (navigator.onLine) {
        checkDatabase();
    }
}

request.onerror = function(e) {
    console.log("Error:" + e.target.errorCode);
};

function checkDatabase() {
    // open transaction on current db
    let transaction = db.transaction(['pending'], 'readwrite')
    // access current object store
    const store = transaction.objectStore("pending")
    // pull all information from store set it to a variable
    const getAll = store.getAll();
}