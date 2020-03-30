let statusColors = new Map();
statusColors.set("not done", "var(--status-not-done)");
statusColors.set("in progress", "var(--status-in-progress)");
statusColors.set("done", "var(--status-done)");

function onLoad() {
    var listItems = document.getElementsByClassName("list-item");
    Array.prototype.forEach.call(listItems, function (element) {
        setStatus(element, "not done");
    });
}

function setStatus(listItem, status) {
    listItem.setAttribute("status", status);
    displayStatus(listItem);
}

function displayStatus(listItem) {
    var status = listItem.getAttribute("status");
    var color = statusColors.get(status);

    var statusBar = getStatusElement(listItem);
    statusBar.style.backgroundColor = color;
}

function getStatusElement(listItem) {
    var statusElement = null;

    Array.prototype.forEach.call(listItem.childNodes, function (element) {
        if (element.className == "item-status")
            statusElement = element;
    });

    return statusElement;
}

window.onload = onLoad();