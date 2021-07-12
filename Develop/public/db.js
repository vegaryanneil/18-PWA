let db;

// create db request for budget database
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(e) {
    // create "pending" obj and set autoIncrement
    const db = e.target.result;
    db.createObjectStore("pending", { autoIncrement: true});
};

request.onsuccess = function(e) {
    db = e.target.result;
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
    
    getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        // if successful, open a transaction on your pending db
        const transaction = db.transaction(["pending"], "readwrite");
        // access your pending object store
        const store = transaction.objectStore("pending");
        // clear all items in your store
        store.clear();
      });
    }
  };
}
// listen for app coming back online
window.addEventListener("online", checkDatabase);