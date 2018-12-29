export function getProjects(account, callback) {
    console.log('getProjects');
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/projects", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            } else {
                // error here
                console.log("error", xhr.statusText);
            }

        }
    };
    xhr.send(null);
}