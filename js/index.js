let statusColors = new Map();
statusColors.set("not done", "var(--status-not-done)");
statusColors.set("in progress", "var(--status-in-progress)");
statusColors.set("done", "var(--status-done)");

var itemModal;
var itemModalText;

var editingListItem;

function onLoad() {
    itemModal = document.getElementById("item-modal");
    itemModalText = document.getElementById("item-modal-text");

    var listItems = document.getElementsByClassName("list-item");

    Array.prototype.forEach.call(listItems, function (element) {
        setStatus(element, "not done");
        setText(element, "");

        element.addEventListener("click", function (onClickEvent) {
            openItemModal(onClickEvent.target);
        });
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

window.onload = onLoad();