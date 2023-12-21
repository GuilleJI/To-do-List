// Step 1: 
const ITEMS_CONTAINER = document.getElementById("items"); 
const ITEM_TEMPLATE = document.getElementById("itemTemplate"); 
const ADD_BUTTON = document.getElementById("add"); 
// All three (items, itemTemplate, and "add" button are referenced in out JavaScript file)

//Step 2: fetch the existing items from local storage.
function getItems() {
    //this function will look at local storage and get the items out if there are already
    const value = localStorage.getItem("todo-test") || "[]";  //<----const value serves to get a specific value from local storage using "todo-test" as a pass, which refers to the key of the local storage key value pair (you can name it whatever you like really...)
                                                             //<---However, because we have no content from local storage after passing "todo-list" we can use solve this by adding an empty array by using  "||" followed by "[]". Great fallback to default in case it is first time user is opening up the page...

    return JSON.parse(value); //<-----we need to convert that JSON string into an actual JavaScript array
}

//Once done, we call getItems functions 
getItems(); 
