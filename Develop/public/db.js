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