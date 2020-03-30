let statusColors = new Map();
statusColors.set("not done", "var(--status-not-done)");
statusColors.set("in progress", "var(--status-in-progress)");
statusColors.set("done", "var(--status-done)");

var itemModal;
var itemModalText;

var editingListItem;
var editingList;

function onLoad() {
    itemModal = document.getElementById("item-modal");
    itemModalText = document.getElementById("item-modal-text");

    var listItems = document.getElementsByClassName("list-item");

    Array.prototype.forEach.call(listItems, function (element) {
        initializeListItem(element);
    });

    var lists = document.getElementsByClassName("list");
    Array.prototype.forEach.call(lists, function (element) {
        initializeList(element);
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

    var statusBar = getFirstChildWithClass(listItem, "item-status");
    statusBar.style.backgroundColor = color;
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
}

function closeItemModal() {
    itemModal.style.display = "none";
}

function setTextModal() {
    setText(editingListItem, itemModalText.value);
}

function setStatusModal(status) {
    setStatus(editingListItem, status);
}

function addListItem() {
    var newListItem = document.createElement("div");
    newListItem.setAttribute("class", "list-item");

    var newListItemStatus = document.createElement("div");
    newListItemStatus.setAttribute("class", "item-status");
    newListItem.appendChild(newListItemStatus);

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

    listItem.addEventListener("click", function (onClickEvent) {
        openItemModal(onClickEvent.target);
    });
}

function initializeList(list) {
    var addItemButton = document.createElement("div");
    addItemButton.setAttribute("class", "add-list-item");
    addItemButton.innerHTML = "+";

    addItemButton.addEventListener("click", function (onClickEvent) {
        editingList = onClickEvent.target.parentNode;
        addListItem();
    });

    var deleteList = document.createElement("div");
    deleteList.setAttribute("class", "delete-list");
    deleteList.innerHTML = "-";

    deleteList.addEventListener("click", function (onClickEvent) {
        onClickEvent.target.parentNode.remove();
    });

    list.appendChild(addItemButton);
    list.appendChild(deleteList);
}

window.onload = onLoad();