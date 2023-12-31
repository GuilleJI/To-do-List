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
    const value = localStorage.getItem("todo") || "[]";  //<----const value serves to get a specific value from local storage using "todo-test" as a pass, which refers to the key of the local storage key value pair (you can name it whatever you like really...)
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
    //next step is going to be to refresh the list once the item has been added ..
    refreshList();
}

//Step 9: We now create a new function to save our input data from the list

function updateItem(item, key, value){ //<--it'll take through an item, as well as the key which to update, and the value we wish to set that key to. 
    item[key] = value; //sets that key on that item to be the value that you pass in. 
    setItems(items); //once thats been set in, we're gonna say 'setItems' then pass through items 
    refreshList(); //<--- After that we simply refresh the list 
}


//Step 6: we now create refreshList function here, which is going to take our items list to the top, which then it is going to render that to the user..
function refreshList() {
    //firstly, we sort the items..
    
    //Step 11: FINAL: sorting todo items: 
    items.sort((a, b)=>{
        if (a.completed){
            return 1; 

        }

        if(b.completed){
            return -1;
        }

        return a.description < b.description ? -1 : 1; //<---this will sort the list alphabetically 
    });

    ITEMS_CONTAINER.innerHTML = ""; 

    for(const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true); //we're taking the template element, then we're saying get the content from div class "item". Then we're saying lets clone or make a copy of this div (<div class="item">). 
        const descriptionInput = itemElement.querySelector(".item-description"); //item description refers to the input class "item-description" because we're cloning it the new input for the description
        const completedInput = itemElement.querySelector(".item-completed");//same applies with the following, but this time we're refering to input class "item-completed".

        descriptionInput.value = item.description; //the value of that new input field is going to be the description of that item that came from our addItem() function. So, we're going to be making this thing work properly
        completedInput.checked = item.completed; // .checked is the boolean setter for check boxes, which will make it checked or not checked.

        //Step 10: we then hop down to our refreshList function and say: 
        descriptionInput.addEventListener ("change", () => { //<--- when the user changes the description input
            updateItem(item, "description", descriptionInput.value) //<---im going to simply say update item .Pass through here through the item. Then as a value the key its going to be description. Finally the value for that is going to be descriptionInput.value.   

        });

        //Step 11: copy and do the same (similar but different at the same time):
        completedInput.addEventListener ("change", () => { //<--- when the user changes the completed input
            updateItem(item, "completed", completedInput.checked) //<---im going to simply say update item, Pass through here through the item, Then as a value the key its going to be completed. Finally the value for that is going to be completedInput.checked.   

        });

        ITEMS_CONTAINER.append(itemElement);
    } 

}


//we then console.log the items variable..(part of step 3.)
// console.log(items); 

//Step 8: we're going to make the add button work
ADD_BUTTON.addEventListener("click", () => {

    addItem(); //<---We then call the addItem() function
});

//Step 7: replace console.log items variable (part of step 3) and replace it with refreshList() instead
refreshList(); //<---this will call the refreshList function. 
