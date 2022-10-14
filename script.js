let ITEMS = [
    {
        name: "Caramel Donuts",
        price: 8,
        image: "https://foodish-api.herokuapp.com/images/dessert/dessert19.jpg",
        status:"new"
    },
    {
        name: "Shrimps Rice",
        price: 12,
        image: "https://foodish-api.herokuapp.com/images/rice/rice33.jpg",
        status:"new"

    },
    {
        name: "Vegetable Pizza",
        price: 17,
        image: "https://foodish-api.herokuapp.com/images/pizza/pizza8.jpg",
        status:"new"

    },
    {
        name: "Cheese Burger",
        price: 35,
        image: "https://foodish-api.herokuapp.com/images/burger/burger3.jpg",
        status:"new"

    },
    {
        name: "Italian Pasta",
        price: 23,
        image: "https://foodish-api.herokuapp.com/images/pasta/pasta2.jpg",
        status:"new"

    },
    {
        name: "Beef Samosa",
        price: 14,
        image: "https://foodish-api.herokuapp.com/images/samosa/samosa20.jpg",
        status:"new"

    }
];
let addedItems=[];
let add ="+";
let minus="-";
const loadItems = () => {
    if(window.localStorage.items===undefined){
        addedItems=[];
    }else{
        addedItems = JSON.parse(window.localStorage.items);
        calcValues();

    }
    console.log(addedItems);
    drawAllItems();
}
const drawItem=(i)=>{
    document.getElementById("cards").innerHTML+=`  <div  class="card" id="card-${i}">
    <img src="${ITEMS[i].image}" alt="image">
    <div class="info">
        <span>${ITEMS[i].name}</span>
        <span>${ITEMS[i].price}$</span>
    </div>
    <div class="payment">
        <div class="custom-input" >
        <button id="up-b-${i}">
        <i id="up-${i}" class="fa-duotone fa-angle-up up-arrow"  onclick="displayItemsCounter(${i},add)"></i>
        </button>
            <input class="input-num" type="number" min="0" max="15" value="1" id="input-value-${i}">
            <button id="down-b-${i}"><i id="down-${i}" class="fa-duotone fa-angle-down down-arrow"  onclick="displayItemsCounter(${i},minus)"></i></button>
            
        </div>
        <button onclick="addItem(${i})"  id="add-${i}" >
        <i class="fa-duotone fa-cart-plus"  ></i>
     </button>    </div>
</div>`;
checkCounter(i);

}
const drawAllItems=()=>{
    for (let i = 0; i < ITEMS.length; i++) {
        drawItem(i);
    }
    checkIfAdded();
}
const displayItemsCounter=(i,operation)=>{
    let counter = document.getElementById(`input-value-${i}`);
    let temp=counter.value;
    operation==="+"?temp++:temp--;  
    counter.value=temp;
    checkCounter(i);
}
const checkCounter=(i)=>{
    let counter = document.getElementById(`input-value-${i}`);
    if(counter.value-1==0){
        document.getElementById(`down-${i}`).style.display="none";
    }else{
        document.getElementById(`down-${i}`).style.display="block";
    }
}
const addItem=(i)=>{
    let quantity= document.getElementById(`input-value-${i}`).value;
    disableProperties(i);
    const item ={title:ITEMS[i].name,quantity:quantity,image:ITEMS[i].image,id:i,price:ITEMS[i].price,status:"added"};
    const oldItems = JSON.parse(window.localStorage.getItem("items")) || [];
    const itemsArr = [...oldItems, item];
    localStorage.setItem("items", JSON.stringify(itemsArr));
    alert(`${quantity} items of ${ITEMS[i].name} has been added successfully`);
    calcValues();
}
const calcValues=()=>{
    const calc = document.getElementById("items-counter");
    let temp=0;
    let totalPrice=0;
    addedItems=JSON.parse(window.localStorage.getItem("items"));
    for (let i = 0; i < addedItems.length; i++) {
        temp+=parseInt(addedItems[i].quantity);
        totalPrice+=parseInt(addedItems[i].quantity)*parseInt(addedItems[i].price);
    }
    console.log(temp,totalPrice);
    calc.innerHTML=temp;
}
const checkIfAdded=()=>{
   if(window.localStorage.items!==undefined){
    addedItems=JSON.parse(window.localStorage.getItem("items"));
    console.log(addedItems);

    for (let i = 0; i < addedItems.length; i++) {
        if(addedItems[i].status==="added"){
            for (let j = 0; j < ITEMS.length; j++) {
               addedItems[i].title===ITEMS[j].name? disableProperties(j):"";
            }
        }
    }
   }else{
    console.log("sara");
   }
    
}
const disableProperties=(i)=>{
    document.getElementById(`add-${i}`).disabled = true;
    document.getElementById(`down-b-${i}`).disabled = true;
    document.getElementById(`up-b-${i}`).disabled = true;
    document.getElementById(`card-${i}`).classList.add("disabled");
}

loadItems();
