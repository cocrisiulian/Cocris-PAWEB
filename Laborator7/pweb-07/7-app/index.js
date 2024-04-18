// let v = [`bread`, `eggs`, `milk`];
let v = [
  ["bread", 4],
  ["eggs", 3],
  ["milk", 2],
];
let food = document.querySelector(`#food`);
let selectedItem;

food.addEventListener(`click`, onFoodClick);
document.getElementById(`delete`).addEventListener(`click`, onDeleteClick);
document.getElementById("create-new-food").addEventListener(`click`, onCreateClick);

for (item of v) {
  let itemAsHtmlObject = document.createElement("tr");
  let itemAsHtmlObject2 = document.createElement("td");
  let itemAsHtmlObject3 = document.createElement("td");
  itemAsHtmlObject2.innerText = item[0];
  itemAsHtmlObject3.innerText = item[1];
  itemAsHtmlObject.appendChild(itemAsHtmlObject2);
  itemAsHtmlObject.appendChild(itemAsHtmlObject3);
  food.appendChild(itemAsHtmlObject);
}

function onFoodClick(event) {
  if (selectedItem && selectedItem.className == "selected") {
    selectedItem.className = "unselected";
  } else {
    for (child of event.target.parentElement.parentElement.children) {
      child.className = "unselected";
    }
    selectedItem = event.target.parentElement;
    selectedItem.className = "selected";
  }
}

function onDeleteClick() {
  if (selectedItem) {
    selectedItem.remove();
  }
}

function onCreateClick() {
  var item1 = document.getElementById("name-input");
  var item2 = document.getElementById("quantity-input");
  if (validateText(item1) && validateQuantity(item2)) {
    let itemAsHtmlObject = document.createElement("tr");
    let itemAsHtmlObject2 = document.createElement("td");
    let itemAsHtmlObject3 = document.createElement("td");
    itemAsHtmlObject2.innerText = item1.value;
    itemAsHtmlObject3.innerText = parseInt(item2.value);
    itemAsHtmlObject.appendChild(itemAsHtmlObject2);
    itemAsHtmlObject.appendChild(itemAsHtmlObject3);
    food.appendChild(itemAsHtmlObject);
    item1.value = "";
    item2.value = "";
  } else {
    alert("Continutul este gresit");
  }
}

function validateText(item) {
  var text = item.value;
  console.log(text);
  if (text.length >= 2) return true;
  return false;
}
function validateQuantity(item) {
  var number = parseInt(item.value);
  if (number > 0) return true;
  return false;
}
