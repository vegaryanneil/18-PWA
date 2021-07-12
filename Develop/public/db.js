let db;

// create db request for budget database
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function() {
    // create "pending" obj and set autoIncrement
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};