const getRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = "json";

        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject("Error occurred.");
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
}

const getAllGraduates = () => {
    console.log("Connected");
    getRequest("GET", "http://localhost:3000/routes/api/graduates", true)
        .then(responseData => {
            console.log(responseData);

            const showArticles = responseData.map(element => {
                return (
                    "<li>" +
                    "Name: " +
                    element.title +
                    " , " +
                    "Role: " +
                    element.poster +
                    " , " +
                    "Company: " +
                    element.description +
                    " , " +
                    "Date of Graduation: " +
                    element.dateOfGraduation +
                    "</li>"
                )
            })
            document.getElementById("results").innerHTML =
                "<ul>" + showArticles.join("\n") + "</ul>";
        }
        )
}


function addGraduate() {
    let article = {
        title: document.getElementById("name").value,
        poster: document.getElementById("role").value,
        description: document.getElementById("company").value,
        dateOfGraduation: document.getElementById("dateOfGraduation").value
    };
    let xhrPost = new window.XMLHttpRequest();
    xhrPost.open("OPEN", "http://localhost:3000/routes/api/graduates");
    xhrPost.setRequestHeader("Content-Type", "application/json");
    xhrPost.send(JSON.stringify(article));
}

function removeGraduate() {
    let xhrDelete = new XMLHttpRequest();
    console.log(xhrDelete);

    var deletedData = JSON.parse(xhrDelete.responseText);

    for (var i = 0; i < deletedData.length; i++){
            const id = deletedData[i].id;
            xhrDelete.open("DELETE", `http://localhost:3000/routes/api/graduates/${id}`, true);
                xhrDelete.onload = function() {
                    if(xhrDelete.status == 200) {
                        console.log("Success");
                    } else {
                        console.log("Error");
                    }
                }

                xhrDelete.send();
            }
    }
