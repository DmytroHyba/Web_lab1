var useLocalStorage = false; //false  -  9

class LocalStorageProvider{
    constructor(){
    }


    add(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }
    get(key,callback){
        callback(JSON.parse(localStorage.getItem(key)))
    }
    remove(key){
        localStorage.removeItem(key);
    }
}
class IndexedDBProvider{
    constructor(){
        this._request=indexedDB.open("Appeals",1);

        this._request.onerror= ()=>{
            console.error("Error",this._request.error);
        };

        this._request.onsuccess=()=>{
            this._db = this._request.result
        };

        this._request.onupgradeneeded=()=>{
            this._db=this._request.result;
            this._db.createObjectStore("appeals",{keyPath:"id",autoIncrement:true});
            this._db.createObjectStore("news",{keyPath:"id",autoIncrement:true});
        };
    }
    add(key,value){
        if(this._db){
            let transaction = this._db.transaction(key,"readwrite");
            let objStore = transaction.objectStore(key);
            objStore.clear();
            value.forEach(val=>objStore.add(val));
        }
    }
    get(key,callback){
        if(this._db){
            let transaction = this._db.transaction(key,"readwrite");
            let objStore=transaction.objectStore(key);
            let request = objStore.getAll();

            request.onsuccess=function(){
                callback(request.result);
            };
        }
    }
    remove(key){
        if(this._db){
            let transaction = this._db.transaction(key,"readwrite");
            let objStore = transaction.objectStore(key);
            objStore.clear();
        }
    }
}
class Provider{
    constructor(){
        this._provider = useLocalStorage ? new LocalStorageProvider(): new IndexedDBProvider()
    }
    get provider(){
        return this._provider
    }
}
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

function isOnline() {
    return window.navigator.onLine;
}

const provider = new Provider().provider;