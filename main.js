let items = document.querySelector(".items");
let input = document.querySelector("input");
let addBtn = document.querySelector("#add-item");

window.onload = () =>{
    input.focus();
}
let arrayOfItems = [];
if(window.localStorage.getItem("items")){
    arrayOfItems = JSON.parse(window.localStorage.getItem("items"));
    // display content of array to page 
    display(arrayOfItems);
}
addBtn.onclick = ()=>{
    if(input.value !==""){
        // add value to array
        addToArray(input.value);
        // set value of input 
        input.value="";
    }else{
        window.alert("please enter value");
    }
}

function addToArray(value){
    let item = {
        id: Date.now(),
        itemContent : value ,
        check: false,
    }
    // add item to array 
    arrayOfItems.push(item);
    // display content of array to page 
    display(arrayOfItems);
    // add array to localStorage 
    addToLocalStorage(arrayOfItems);
}

// display content of array in page 
function display(arrayOfItems){
    // delete content of page 
    items.innerHTML="";
    // add content to pages 
    arrayOfItems.forEach(item => {
        let p = document.createElement("p");
        p.innerText = item.itemContent;
        let btn = document.createElement("button");
        btn.classList.add("delete");
        btn.innerText="delete";
        let itm = document.createElement("div");
        itm.classList.add("item");
        itm.setAttribute("data-id", item.id);
        if(item.check){
            itm.classList.add("succ");
        }
        itm.append(p,btn)
        items.appendChild(itm);
    });

}
function addToLocalStorage(arrayOfItems){
    window.localStorage.setItem("items",JSON.stringify(arrayOfItems));
}

function removeFromLocalStorage(id){
    arrayOfItems = arrayOfItems.filter((item) => {
        return item.id != id;
    })
    addToLocalStorage(arrayOfItems);
}

function togleFromLocalStorage(itemId){
    for(let i=0; i < arrayOfItems.length; i++){
        if(arrayOfItems[i].id == itemId){
            (arrayOfItems[i].check) ? arrayOfItems[i].check = false : arrayOfItems[i].check = true;
        }
    }
    addToLocalStorage(arrayOfItems);
}
items.addEventListener("click", (e)=>{
    if(e.target.classList.contains("delete")){
        // remove item from page 
        e.target.parentElement.remove();
        // remove item from localStorage 
        removeFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    }
    if(e.target.classList.contains("item")){
        // togle item  
        e.target.classList.toggle("succ");
        // toggle item from localStorage 
        let itemId = e.target.getAttribute("data-id");
        console.log(itemId);
        togleFromLocalStorage(itemId);
    }
});
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
    event.preventDefault();
      // Trigger the button element with a click
    addBtn.click();
    }
});