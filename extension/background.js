chrome.contextMenus.create({
    id: "parent-menu",
    title: "Insert Your Projects",
    contexts: ["editable"]
}, function () {
    //todo connect backend

    chrome.contextMenus.create({
        'title': 'ProjectA',
        'parentId': "parent-menu",
        "contexts": ["editable"]
    });
    chrome.contextMenus.create({
        'title': 'ProjectB',
        'parentId': "parent-menu",
        "contexts": ["editable"]
    });
    chrome.contextMenus.create({
        'title': 'ResearchA',
        'parentId': "parent-menu",
        "contexts": ["editable"]
    });
});

/* Register a listener for the `onClicked` event */
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    var tArea = document.createElement('textarea'), _frame = null;
    document.body.appendChild(tArea);
    tArea.value = '-\tA web application and Chrome extension to help applications like me to manage and record their web applications\n' +
        '-\tThe project/experience of the user can be managed and filled to the application page using the extension\n' +
        '-\tThe webpage can be tagged and saved as a todo list, the updates from the recruiter can be saved to a reminder\n';
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
});