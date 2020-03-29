function onLoad() {
    var listItems = document.getElementsByClassName("list-item");
    Array.prototype.forEach.call(listItems, function (element) {
        setStatus(element, "not done");
    });
}

function setStatus(listItem, status) {
    listItem.setAttribute("status", status);
}

window.onload = onLoad();