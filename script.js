let subscriptionName = document.getElementById("subscriptionName");
let date = document.getElementById("expiryDate");
let addBtn = document.getElementById("addBtn");

// Add a new subscription item with date
let box = document.getElementById("boxContainer")

const addSubscription = () => {
    let subName = subscriptionName.value;
    let inputDate = date.value
    if (subName && inputDate) {
        let itemBox = document.createElement("div")
        let itemName = document.createElement("p");
        let itemDate = document.createElement("p");
        let daysContainer = document.createElement("div");
        let daysSpan = document.createElement("span");
        daysSpan.innerText = " Days";
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        // Counter for days
        // let countDate = new Date(inputDate);
        // let nowDate = new Date();
        // let gap = countDate - nowDate;
        // let gapInDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
        // let gapInDaysCounter = setInterval(gapInDays, 1000);
        // let counterDay = document.createElement("p")
        // counterDay.innerText = `${gapInDays} Days`;

        let countDate = new Date(inputDate);
        let updateCounter = () => {
            // localStorage.getItem("data")
            let nowDate = new Date();
            let gap = countDate - nowDate;
            let gapInDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
            counterDay.innerText = gapInDays;
            console.log(gapInDays);
        };
        let counterDay = document.createElement("p");
        updateCounter();

        let intervalId = setInterval(updateCounter, 1000);

        itemBox.classList.add("itemBox");

        box.classList.add("boxWrapper")
        itemName.classList.add("subName");
        itemDate.classList.add("subDate");
        counterDay.classList.add("countDay");
        deleteBtn.classList.add("deleteBtn");
        daysSpan.classList.add("daysSpan");
        daysContainer.classList.add("daysContainer");
        daysContainer.append(counterDay, daysSpan);
        itemBox.append(itemName, itemDate, daysContainer, deleteBtn);
        itemName.innerText = subName;
        itemDate.innerText = inputDate
        box.append(itemBox);
        // document.body.append(box)

        deleteBtn.addEventListener("click", function () {
            clearInterval(intervalId);
            // Remove the parent element of the delete button
            itemBox.remove();
            // Save updated data to localStorage
            saveData();
        });

    } else {
        console.log("You need to add both fields")
    }
    subscriptionName.value = "";
    date.value = "";
    saveData();
};



addBtn.addEventListener("click", addSubscription);

// Save the imputed data to localStorage
function saveData() {
    localStorage.setItem("data", box.innerHTML);
}
// Load the data when refresh
function loadData() {
    box.innerHTML = localStorage.getItem("data");

}

loadData();

// 

// function updateCounterAtLoad() {
//     let countDayUpdate = document.getElementsByClassName("countDay");
//     for (let i = 0; i < countDayUpdate.length; i++) {

//         let nowDate = new Date();
//         let previousSibling = countDayUpdate[i].previousElementSibling;
//         if (previousSibling && previousSibling.innerText) {
//             let expDateText = previousSibling.innerText;
//             let expDate = new Date(expDateText);
//             let gap = expDate - nowDate;
//             let gapInDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
//             countDayUpdate[i].innerText = gapInDays;
//             console.log(gapInDays);
//             console.log(countDayUpdate);
//         }

//     }
// }
// function updateCounterAtLoad() {
//     let countDayUpdate = document.getElementsByClassName("countDay");
//     for (let i = 0; i < countDayUpdate.length; i++) {
//         let nowDate = new Date();
//         let expDateText = countDayUpdate[i].previousElementSibling.innerText; // Get expiration date text
//         let expDate = new Date(expDateText);
//         let gap = expDate - nowDate;
//         let gapInDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
//         countDayUpdate[i].innerText = gapInDays;
//     }
// }

// function updateCounterAtLoad() {


//     // Get all the countdowns and the expiry dates in the list 

//     let countDayText = document.getElementsByClassName("countDay");

//     let subDateText = document.getElementsByClassName("subDate");


//     // Loop over the list of data

//     for (let i = 0; i < countDayText.length; i++) {

//         // Get current date

//         let nowDate = new Date();

//         // Get text from the day count 

//         let dayCount = countDayText[i].innerText;

//         // Get text from the expiry date

//         let expDate = subDateText[i].innerText;

//         // Create new date from expiry date

//         let updatedDate = new Date(expDate);

//         // Calculate the gap

//         let gap = updatedDate - nowDate;

//         // Format the gap

//         let gapInDays = Math.ceil(gap / (1000 * 60 * 60 * 24));

//         // Update the text element to current gap

//         dayCount = gapInDays;

//     }

// }

function updateCounterAtLoad() {


    // Get all the countdowns and the expiry dates in the list 
    let countDayText = document.getElementsByClassName("countDay");
    let subDateText = document.getElementsByClassName("subDate");


    // Loop over the list of data
    for (let i = 0; i < countDayText.length; i++) {
        // Get current data
        let nowDate = new Date();
        // Get text from the expiry date
        let expDate = subDateText[i].innerText;
        // Create new date from expiry date
        let updatedDate = new Date(expDate);
        // Calculate the gap
        let gap = updatedDate - nowDate;
        // Format the gap
        let gapInDays = Math.ceil(gap / (1000 * 60 * 60 * 24));
        // Update the text element to current gap
        countDayText[i].innerText = gapInDays;
    }
}

updateCounterAtLoad();


function attachDeleteButtonListeners() {

    let deleteButtons = document.querySelectorAll(".deleteBtn");


    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", function () {
            let itemBox = deleteButton.parentElement;
            clearInterval(itemBox.intervalId);
            itemBox.remove();
            saveData();
        });
    });
}

attachDeleteButtonListeners();

