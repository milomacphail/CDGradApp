var url  = "http://localhost:3000/api/graduates";
var xhrGetAll  = new XMLHttpRequest();
xhrGetAll.open('GET', url, true);
xhrGetAll.send();

xhrGetAll.onload = () => {
    console.log(xhrGetAll);
	var graduates = JSON.parse(xhrGetAll.response);
	if (xhrGetAll.readyState == 4 && xhrGetAll.status == "200") {
		console.table(graduates);
	} else {
		console.error("Error!");
	}
}



const getAllGraduates = () => {
    console.log("Connected");
    getRequest("GET", "http://localhost:3000/api/graduates")
        .then(responseData => {
            console.log(responseData);

            const renderGrads = responseData.map(element => {
                return (
                    "<li>" +
                    "Name: " +
                    element.name +
                    " , " +
                    "Role: " +
                    element.role +
                    " , " +
                    "Company: " +
                    element.company +
                    " , " +
                    "Date of Graduation: " +
                    element.yearOfGraduation +
                    "</li>"
                )
            })
            document.getElementById("results").innerHTML =
                "<ul>" + renderGrads.join("\n") + "</ul>";
        }
        )
}


function addGraduate(e) {
    e.preventDefault();
    console.log("Submit");
    let graduate = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        company: document.getElementById("company").value,
        yearOfGraduation: document.getElementById("yearOfGraduation").value
    };
    let xhrPost = new window.XMLHttpRequest();
    xhrPost.open("POST", "http://localhost:3000/api/graduates");
    xhrPost.setRequestHeader("Content-Type", "application/json");
    xhrPost.send(JSON.stringify(graduate));
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
                xhrDelete.send(null);
            }
    }
