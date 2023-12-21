// Step 1: 
const ITEMS_CONTAINER = document.getElementById("items"); 
const ITEM_TEMPLATE = document.getElementById("itemTemplate"); 
const ADD_BUTTON = document.getElementById("add"); 
// All three (items, itemTemplate, and "add" button are referenced in out JavaScript file)


//Step 3: When the page first loads up...
let items = getItems(); 

//Step 2: fetch the existing items from local storage.
function getItems() {
    //this function will look at local storage and get the items out if there are already
    const value = localStorage.getItem("todo-test") || "[]";  //<----const value serves to get a specific value from local storage using "todo-test" as a pass, which refers to the key of the local storage key value pair (you can name it whatever you like really...)
                                                             //<---However, because we have no content from local storage after passing "todo-list" we can use solve this by adding an empty array by using  "||" followed by "[]". Great fallback to default in case it is first time user is opening up the page...

    return JSON.parse(value); //<-----we need to convert that JSON string into an actual JavaScript array
}

//Step 4: The next function to define is going to be to set the items..
//Once the user has added an item or changed an item, we want to actually set the item back. Therefore, we essentially want to refresh what we just saved..
function setItems(items){
    const itemsJson = JSON.stringify(items); //<----Taking the items array and converting it back to JSON, so it can be saved against local storage.

    localStorage.setItem("todo-test", itemsJson);//<----we're resetting that Json back
}

//Step 5: We can now define the logic for adding a new item

function addItem(){ 
    items.unshift({ //<---unshift means to add a new element at the start of an array..
        description: "",
        completed: false //<----completed status of false (that is our default)
    });

    //once an item has been added, we can setitems and pass in there those items..
    setItems(items); //<-- saves new item to our local storage.
    //next step is going to be to refresh the list once the item has been added 
    refreshList();
}


//we then console.log the items variable..(part of step 3.)
console.log(items); 