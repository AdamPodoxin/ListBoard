let statusColors = new Map();
statusColors.set("not done", "var(--status-not-done)");
statusColors.set("in progress", "var(--status-in-progress)");
statusColors.set("done", "var(--status-done)");

var itemModal;
var itemModalText;
var itemModalStatusButtons;

var board;

var editingListItem;
var editingList;

var lists = [];

function onLoad() {
    //UI setup
    itemModal = document.getElementById("item-modal");
    itemModalText = document.getElementById("item-modal-text");
    itemModalStatusButtons = Array.from(document.getElementById("item-modal-status-buttons").childNodes).filter(element => element.tagName == "BUTTON");

    board = document.getElementById("board");

    var listItems = document.getElementsByClassName("list-item");

    Array.prototype.forEach.call(listItems, function (element) {
        initializeListItem(element);
    });

    var lists = document.getElementsByClassName("list");
    Array.prototype.forEach.call(lists, function (element) {
        initializeList(element);
    });

    //Update inputs response to enter key pressed
    var inputs = Array.from(document.getElementsByTagName("input")).filter(element => element.type == "text");
    inputs.forEach(input => {
        updateInputResponse(input);
    });
}

function updateInputResponse(inputField) {
    inputField.addEventListener("keydown", event => {
        if (event.keyCode == 13 /* if enter key is pressed */) {
            inputField.blur();
        }
    });
}

function setText(listItem, text) {
    listItem.setAttribute("text", text);
    displayText(listItem);
}

function displayText(listItem) {
    var text = listItem.getAttribute("text");

    var textElement = getFirstChildWithClass(listItem, "item-text");
    textElement.innerHTML = text;
}

function setStatus(listItem, status) {
    listItem.setAttribute("status", status);
    displayStatus(listItem);
}

function displayStatus(listItem) {
    var status = listItem.getAttribute("status");
    var color = statusColors.get(status);

    listItem.style.borderColor = color;
}

function getFirstChildWithClass(element, childClass) {
    var child = null;

    Array.prototype.forEach.call(element.childNodes, function (element) {
        if (element.className == childClass)
            child = element;
    });

    return child;
}

function openItemModal(listItem) {
    editingListItem = listItem;

    itemModal.style.display = "block";
    itemModalText.value = listItem.getAttribute("text");

    updateModalStatusButtons();
}

function updateModalStatusButtons() {
    Array.prototype.forEach.call(itemModalStatusButtons, function (button) {
        if (button.innerText.toLowerCase() == editingListItem.getAttribute("status")) {
            button.style.boxShadow = "none";
        } else {
            button.style.boxShadow = "2px 4px rgba(0.5, 0.5, 0.5, 0.2)";
        }
    });
}

function closeItemModal() {
    itemModal.style.display = "none";
}

function setTextModal() {
    setText(editingListItem, itemModalText.value);
}

function setStatusModal(status) {
    setStatus(editingListItem, status);
    updateModalStatusButtons();
}

function addListItem() {
    var newListItem = document.createElement("div");
    newListItem.setAttribute("class", "list-item");

    var newListItemText = document.createElement("div");
    newListItemText.setAttribute("class", "item-text");
    newListItem.appendChild(newListItemText);

    initializeListItem(newListItem);

    var addButton = editingList.childNodes[editingList.childNodes.length - 2];
    editingList.insertBefore(newListItem, addButton);

    openItemModal(newListItem);
}

function deleteListItem() {
    editingListItem.remove();
    closeItemModal();
}

function initializeListItem(listItem) {
    setStatus(listItem, "not done");
    setText(listItem, "List item");

    listItem.addEventListener("click", event => {
        openItemModal(event.target);
    });
}

function createList() {
    var newList = document.createElement("div");
    newList.setAttribute("class", "list");
    newList.setAttribute("title", "List");

    var newListTitle = document.createElement("input");
    newListTitle.setAttribute("type", "text");
    newListTitle.setAttribute("class", "list-title");
    newListTitle.setAttribute("value", "List");
    newList.appendChild(newListTitle);
    updateInputResponse(newListTitle);
    lists.push(newList);

    newListTitle.addEventListener("change", event => {
        event.target.parentNode.setAttribute("title", event.target.value);
    });

    board.insertBefore(newList, board.childNodes[board.childNodes.length - 2]);

    initializeList(newList);
}

function initializeList(list) {
    var addItemButton = document.createElement("div");
    addItemButton.setAttribute("class", "add-list-item");
    addItemButton.innerHTML = "+";

    addItemButton.addEventListener("click", event => {
        editingList = event.target.parentNode;
        addListItem();
    });

    var deleteList = document.createElement("div");
    deleteList.setAttribute("class", "delete-list");
    deleteList.innerHTML = "-";

    deleteList.addEventListener("click", event => {
        editingList = event.target.parentNode;
        lists.remove(editingList);
        editingList.remove();
    });

    list.appendChild(addItemButton);
    list.appendChild(deleteList);
}

window.onload = onLoad();