const tableBody = document.getElementById("table-body");
const itemId = document.getElementById("item-id");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
let conflictIndex;
let itemArr = [];
if(localStorage.getItem("items") != null) {
    itemArr = JSON.parse(localStorage.getItem("items"));
}

function clearStorage() {
    localStorage.clear();
    itemArr = [];
    tableBody.innerHTML = "";
}

function clearForm() {
    itemId.value = "";
    itemName.value = "";
    itemPrice.value = "";
}

function idIsUnique() {
    let numberOfItems = itemArr.length;
    for (let i = 0; i < numberOfItems; i++) {
        if (itemArr[i].item_id == itemId.value) {
            conflictIndex = i;
            return false;
        }
    }
    return true;
}

function storeItem() {
    if (itemId.value == "" || itemName.value == "" || itemPrice.value == "") {
        alert("No field should be left empty (price should be a number)");
    }
    else if (idIsUnique()) {
        itemArr.push({
            item_id: itemId.value,
            item_name: itemName.value,
            item_price: itemPrice.value
        })
        localStorage.setItem("items", JSON.stringify(itemArr));
        addTableRecord(itemId.value, itemName.value, itemPrice.value);
    }
    else {
        updateRecord();
    }
}

function addTableRecord(id, name, price) {
    let newRow = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");
    cell1.textContent = id;
    cell2.textContent = name;
    cell3.textContent = price;
    cell4.innerHTML = (
        `<button onclick="initiateEdit(this);">Edit</button>
        <button onclick="deleteRow(this);">Delete</button>`
    );
    newRow.append(cell1, cell2, cell3, cell4);
    tableBody.appendChild(newRow);
    clearForm();
}

(function populateTableOnLoad() {
    let numberOfItems = itemArr.length;
    for (let i = 0; i < numberOfItems; i++) {
        addTableRecord(itemArr[i].item_id, itemArr[i].item_name, itemArr[i].item_price);
    }
})()

function deleteRow(deleteButton) {
    let rowToDelete = deleteButton.parentElement.parentElement;
    let deletionIndex = rowToDelete.rowIndex - 1;
    itemArr.splice(deletionIndex, 1);
    localStorage.setItem("items", JSON.stringify(itemArr));
    rowToDelete.remove();
}

function initiateEdit(editButton) {
    let rowToEdit = editButton.parentElement.parentElement;
    let editIndex = rowToEdit.rowIndex - 1;
    itemId.value = itemArr[editIndex].item_id;
    itemName.value = itemArr[editIndex].item_name;
    itemPrice.value = itemArr[editIndex].item_price;
}

function updateRecord() {
    if (confirm("ID exists, update this record?")) {
        itemArr[conflictIndex].item_id = itemId.value;
        itemArr[conflictIndex].item_name = itemName.value;
        itemArr[conflictIndex].item_price = itemPrice.value;
        localStorage.setItem("items", JSON.stringify(itemArr));
        let tableRowToEdit = tableBody.childNodes[conflictIndex + 1];
        tableRowToEdit.childNodes[0].textContent = itemId.value;
        tableRowToEdit.childNodes[1].textContent = itemName.value;
        tableRowToEdit.childNodes[2].textContent = itemPrice.value;
        clearForm();
    }
}

document.addEventListener("keypress", e => {
    if (e.keyCode == 13) {
        storeItem();
    }
})