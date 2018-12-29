import {getProjects} from "./requests.js";

let dict = {};

function updateMainMenu() {
    getProjects('admin', function (resp) {
        if (resp.length > 0) {
            // StorageArea.clear();
            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({
                id: "parent-menu",
                title: "Insert Your Projects",
                contexts: ["editable"],
                visible: false
            });
            chrome.contextMenus.update("parent-menu", {visible: true}, updateSubMenu(resp));
        }
    })
}

const onProjectClicked = function(info, tab) {
    let tArea = document.createElement('textarea'), _frame = null;
    document.body.appendChild(tArea);
    tArea.value = dict[info.menuItemId];
    tArea.focus();
    tArea.select();
    document.execCommand('copy');

    if (info.frameId) _frame = info.frameId;

    chrome.tabs.executeScript(tab.id, {
        frameId: _frame, matchAboutBlank: true, code:
            "document.execCommand('paste');"
    }, function () {
        if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);
        document.body.removeChild(tArea);
    });
};

function updateSubMenu(resp) {
    resp.forEach(function(item) {
        chrome.contextMenus.create({
            id: item.id,
            title: item.name,
            parentId: "parent-menu",
            contexts: ["all"],
            onclick: onProjectClicked,
            visible: true
        });

        dict[item.id] = item.info.text;
    });
}


chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.type === "page-load") {
            updateMainMenu()
        }
    }
);