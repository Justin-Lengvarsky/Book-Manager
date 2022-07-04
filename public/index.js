
// Creates a list of objects containing all the quotes in MongoDB.
let qList = document.querySelector("#storeQuotes")
let totalQuotes = qList.childElementCount

if (totalQuotes <= 0) {
    document.querySelector("#quoteSpace").innerHTML = "No saved books, get to adding!"
    document.querySelector("#quoteSpace").style.opacity = "1"
} 

// Loops through data to create objects and assigns each one a unique key.

let quotesObj = new Object;
let q=1

for (let i=1; i<= totalQuotes * 2 -1; i+= 2) {
    if (qList.childNodes[i].childNodes[5].innerText) {
        quotesObj[`key`+q] = {
            title: qList.childNodes[i].childNodes[1].innerText,
            author: qList.childNodes[i].childNodes[3].innerText,
            quote1: qList.childNodes[i].childNodes[5].innerText,
        }
        if (qList.childNodes[i].childNodes[7].innerText) {
        quotesObj[`key`+q].quote2 = qList.childNodes[i].childNodes[7].innerText
        }
        if (qList.childNodes[i].childNodes[9].innerText) {
        quotesObj[`key`+q].quote3 = qList.childNodes[i].childNodes[9].innerText
        }
    } else {
        q--
    }
        q++
    } 

// Below function creates a random quote generator which will randomly pick a quote from the above objects and display it on the front page. The page will then show a new quote continuously every 5 seconds.

let objSize = Object.keys(quotesObj).length;
let titleSpace = document.querySelector("#titleSpace")

window.onload = newQuoteFunc;

function newQuoteFunc () {
    let randomNumKeys = Math.ceil(Math.random()*objSize)
    let randomNumKeyQuote = quotesObj[`key`+randomNumKeys]
    let randomNumKeyQuoteLength = Object.keys(randomNumKeyQuote).length - 2;
    let thisIsTheQuote = randomNumKeyQuote[`quote`+ Math.ceil(Math.random() * randomNumKeyQuoteLength)]

    quoteSpace.innerHTML = thisIsTheQuote;
    titleSpace.innerHTML = randomNumKeyQuote.title + ' by ' + randomNumKeyQuote.author

    $(quoteSpace).animate({ opacity: 0 }, 0, function () {
        $(this).animate({ opacity: 1 }, 1000);
    });

    $(leftQuote).animate({ opacity: 0 }, 0, function () {
        $(this).animate({ opacity: 1 }, 1000);
    });

    $(rightQuote).animate({ opacity: 0 }, 0, function () {
        $(this).animate({ opacity: 1 }, 1000);
    });

    $(titleSpace).animate({ opacity: 0 }, 0, function () {
        setTimeout(() => {
            $(this).animate({ opacity: 1 }, 1000);
        }, 1000)
    });
}
window.setInterval(newQuoteFunc, 5000)