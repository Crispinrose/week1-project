const itemId = document.getElementById("item-id");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const tableBody = document.getElementById("table-body");
let localData = localStorage.getItem("items");
let selectedRow;
let currentId = 1;
let itemArr = [];
if (localData != null) {
    itemArr = JSON.parse(localData);
    currentId = itemArr.length + 1;
}
itemId.value = currentId.toString().padStart(3, "0");

function addItem(id, name, price) {
    if(name == "" || price == "") {
        alert("Item name and price are required");
    }
    else if(id < currentId) {
        let rowId = parseInt(selectedRow.childNodes[0].textContent);
        itemArr[rowId - 1].item_name = itemName.value;
        itemArr[rowId - 1].item_price = itemPrice.value;
        localStorage.setItem("items", JSON.stringify(itemArr));
        selectedRow.childNodes[1].textContent = itemName.value;
        selectedRow.childNodes[2].textContent = itemPrice.value;
        itemId.value = currentId.toString().padStart(3, "0");
        itemName.value = "";
        itemPrice.value = "";
    }
    else {
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        row.append(cell1, cell2, cell3, cell4);
        cell1.textContent = id.toString().padStart(3, "0");
        cell2.textContent = name;
        cell3.textContent = price;
        cell4.innerHTML = (
            `<button onclick="onEdit(this);">Edit</button>
            <button onclick="onDelete(this);">Delete</button>`
        );
        tableBody.appendChild(row);
        itemId.value = (++currentId).toString().padStart(3, "0");
        itemName.value = "";
        itemPrice.value = "";
    }
}

function displayOnLoad() {
    currentId = 1;
    for (let i = 0; i < itemArr.length; i++) {
        addItem(itemArr[i].item_id, itemArr[i].item_name, itemArr[i].item_price);
    }
}

function storeItem() {
    if (itemName.value && itemPrice.value && parseInt(itemId.value) == currentId){
        itemArr.push({
            item_id: currentId,
            item_name: itemName.value,
            item_price: itemPrice.value
        })
        localStorage.setItem("items", JSON.stringify(itemArr));
    }
    addItem(parseInt(itemId.value), itemName.value, itemPrice.value);
}

function updateRowsAfterDelete(n) {
    for (let i = n; i < itemArr.length; i++) {
        itemArr[i].item_id--;
    }
    tableBody.innerHTML = "";
}

function onDelete(button) {
    if(confirm("Do you want to delete this record?")) {
        selectedRow = button.parentElement.parentElement;
        let rowId = parseInt(selectedRow.childNodes[0].textContent);
        itemArr.splice(rowId - 1, 1);
        updateRowsAfterDelete(rowId - 1);
        localStorage.setItem("items", JSON.stringify(itemArr));
        displayOnLoad();
    }
}

function onEdit(button) {
    selectedRow = button.parentElement.parentElement;
    itemId.value = parseInt(selectedRow.childNodes[0].textContent).toString().padStart(3, "0");
    itemName.value = selectedRow.childNodes[1].textContent;
    itemPrice.value = selectedRow.childNodes[2].textContent;
}

function cancelEdit() {
    itemId.value = currentId;
    itemName.value = "";
    itemPrice.value = "";
}

function editId() {
    alert("Custom ID is not supported in demo, subscribe to enable.");
}

function clearStorage() {
    localStorage.clear();
    itemArr = [];
    tableBody.innerHTML = "";
}

window.onload = displayOnLoad;
document.addEventListener("keypress", e => {
    if (e.keyCode == 13) {
        storeItem();
    }
})