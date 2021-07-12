let db;

// create db request for budget database

const req = indexedDB.open("budget", 1);

req.onupgradeneeded = function() {
    
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};