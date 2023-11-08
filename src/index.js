// fetch("http://localhost:3000/current-exhibits")
//     .then(res => res.json())
//     .then(data => {
//         renderImage(data[0]);
//     })

// function renderImage(museumObject) {
//     let title = document.querySelector("#exhibit-title");
//     title.textContent = museumObject.title;

//     let image = document.querySelector("#exhibit-image");
//     image.src = museumObject.image;

//     let hThrees = document.getElementsByTagName("h3")
//     let artist = hThrees[0];
//     artist.textContent = `Currently Featuring: ${museumObject["artist_name"]}`;

//     let description = document.querySelector("#exhibit-description");
//     description.textContent = museumObject.description;

//     let ticketsBought = document.querySelector("#tickets-bought");
//     ticketsBought.textContent = `${museumObject["tickets_bought"]} Tickets Bought`;

//     let comments = document.querySelector("#comments-section");
//     let commentList = museumObject.comments;
//     for (let i = 0; i < commentList.length; i++) {
//         let newComment = document.createElement("p");
//         newComment.textContent = commentList[i];
//         comments.append(newComment);
//     }
// }

// let form = document.querySelector("#comment-form");
// form.addEventListener("submit", newComment);

// function newComment(e) {
//     e.preventDefault();
//     let newComment = e.target["comment-input"].value;
//     let comments = document.querySelector("#comments-section");
//     let commentSubmission = document.createElement("p");
//     commentSubmission.textContent = newComment;
//     comments.append(commentSubmission);
//     form.reset();
// };

// let button = document.querySelector("#buy-tickets-button");
// button.addEventListener("click", ticketCounter);

// function ticketCounter() {
//     let ticketsBought = document.querySelector("#tickets-bought");

//     let words = ticketsBought.textContent.split(" ");
//     console.log(words);

//     let currentCount = parseInt(words[0]);
//     console.log(currentCount);

//     currentCount = currentCount + 1;
//     console.log(currentCount);

//     if (currentCount < 2) {
//         ticketsBought.textContent = `${currentCount} Ticket Bought`;
//     } else {
//         ticketsBought.textContent = `${currentCount} Tickets Bought`;
//     };


// }


let id = null;

fetch("http://localhost:3000/current-exhibits")
    .then(res => res.json())
    .then(data => {
        renderImage(data[0]);
})

function renderImage(museumObject) {
    let id = museumObject.id;

    let title = document.querySelector("#exhibit-title");
    title.textContent = museumObject.title;

    let image = document.querySelector("#exhibit-image");
    image.src = museumObject.image;

    let hThrees = document.getElementsByTagName("h3")
    let artist = hThrees[0];
    artist.textContent = `Currently Featuring: ${museumObject["artist_name"]}`;

    let description = document.querySelector("#exhibit-description");
    description.textContent = museumObject.description;

    let ticketsBought = document.querySelector("#tickets-bought");
    ticketsBought.textContent = `${museumObject["tickets_bought"]} Tickets Bought`;

    let button = document.querySelector("#buy-tickets-button");
    let counter = museumObject["tickets_bought"]

    button.addEventListener("click", ticketCounter);

    function ticketCounter() {
        let ticketsBought = document.querySelector("#tickets-bought");
        counter ++;
        ticketsBought.textContent = counter + " Tickets Bought";

        let updatedMuseumObject = {
            tickets_bought: counter
        }
        // BONUS 1
        fetch(`http://localhost:3000/current-exhibits/${museumObject.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type" : "application/json"
        },
            body: JSON.stringify(updatedMuseumObject)
        })
            .then (res => res.json())
            .then(data => {
            console.log(data)
            })
        
    }

    let comments = document.querySelector("#comments-section");
    let commentList = museumObject.comments;
    for (let i = 0; i < commentList.length; i++) {
        let newComment = document.createElement("p");
        newComment.textContent = commentList[i];
        comments.append(newComment);
    }

    let form = document.querySelector("#comment-form");
    form.addEventListener("submit", newComment);

    function newComment(e) {
        e.preventDefault();
        let newComment = e.target["comment-input"].value;
        let comments = document.querySelector("#comments-section");
        let commentSubmission = document.createElement("p");
        commentSubmission.textContent = newComment;
        comments.append(commentSubmission);

        //BONUS 2 //
        commentList.push(newComment);

        form.reset();

        let updateComment = {
            comments : [...commentList]
        }

    //BONUS 2
        fetch(`http://localhost:3000/current-exhibits/${id}`, {
            method: "PATCH",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(updateComment)
        })
            .then(res => res.json())
            .then(data => console.log(data));
};
    
    
}   

// let form = document.querySelector("#comment-form");
// form.addEventListener("submit", newComment);

// function newComment(e) {
//     e.preventDefault();
//     let newComment = e.target["comment-input"].value;
//     let comments = document.querySelector("#comments-section");
//     let commentSubmission = document.createElement("p");
//     commentSubmission.textContent = newComment;
//     comments.append(commentSubmission);
//     form.reset();

// };




















































