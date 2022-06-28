
const deleteText = document.querySelectorAll(".deleteThisBook")
const editText = document.querySelectorAll(".editThisBook")
const clickTitle = document.querySelectorAll(".bookListClass")
const checkGoodReads = document.querySelectorAll(".checkGoodReads")
const returnToList = document.querySelectorAll(".returnToList")



Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteBook)
})

Array.from(editText).forEach((element)=>{
    element.addEventListener('click', editScreen)
})

Array.from(clickTitle).forEach((element)=>{
    element.addEventListener('click', fullBook)
})

Array.from(checkGoodReads).forEach((element)=>{
    element.addEventListener('click', goToGoodReads)
})

Array.from(returnToList).forEach((element)=>{
    element.addEventListener('click', returnToListFunction)
})

function returnToListFunction () {
    location.reload()
 };

function goToGoodReads () {
   let bookTitle = this.parentNode.childNodes[1].innerText
    window.open(`https://www.goodreads.com/search?q=${bookTitle}`);
};


function fullBook () {

    const thisBook = this;
    const elements = document.getElementsByClassName("otherInfo");
    const deleteButton = document.querySelectorAll(".deleteThisBook");
    const editButton = document.querySelectorAll(".editThisBook");

    for (let i=0; i<elements.length; i++) {
            elements[i].style.display = "inline"
            elements[i].style.lineHeight = "3rem"
        // console.log(elements[i].innerHTML)
    }

    if (!this.childNodes[9].innerText){
        this.childNodes[9].style.display = "none";
        this.childNodes[10].style.display = "none";
    }

    if (!this.childNodes[14].innerText){
        this.childNodes[14].style.display = "none";
        this.childNodes[12].style.display = "none";
        this.childNodes[16].style.display = "none";
        this.childNodes[17].style.display = "none";
    }

    if (!this.childNodes[21].innerText){
        this.childNodes[19].style.display = "none";
        this.childNodes[23].style.display = "none";
        this.childNodes[24].style.display = "none";
    }

    if (!this.childNodes[28].innerText){
        this.childNodes[26].style.display = "none";
        this.childNodes[30].style.display = "none";
        this.childNodes[31].style.display = "none";
    }

    if (!this.childNodes[34].innerText){
        this.childNodes[33].style.display = "none";
        this.childNodes[34].style.display = "none";
        this.childNodes[35].style.display = "none";
    }

    if (!this.childNodes[38].innerText){
        this.childNodes[37].style.display = "none";
        this.childNodes[38].style.display = "none";
        this.childNodes[39].style.display = "none";
    }

    document.getElementById("space").appendChild(thisBook)
    document.querySelector("#bookList").style.display = "none";

    thisBook.style.width= "80%";
    thisBook.style.fontSize = "1.5rem";
    thisBook.style.padding = "5%";
}


function editScreen () {
    document.querySelector("#updateSection").style.display = "block"
    document.querySelector("#bookList").style.display = "none"
    document.querySelector("#space").style.display = "none"

    let bName = this.parentNode.childNodes[1].innerText;
    let aName = this.parentNode.childNodes[3].innerText;
    let ratingNum = this.parentNode.childNodes[6].innerText;
    let notes = this.parentNode.childNodes[9].innerText;
    let qOneText = this.parentNode.childNodes[14].innerText;
    let qTwoText = this.parentNode.childNodes[21].innerText;
    let qThreeText = this.parentNode.childNodes[28].innerText;
    let startDate = this.parentNode.childNodes[34].innerText;
    let endDate = this.parentNode.childNodes[38].innerText;

    const changeBookForm = document.querySelector("#editForm")

    changeBookForm.style.marginBottom = "5rem"

    let bNewName = changeBookForm.childNodes[3];
    let aNewName = changeBookForm.childNodes[7];
    let newNotes = changeBookForm.childNodes[11];
    let qOneNewText = changeBookForm.childNodes[15];
    let qTwoNewText = changeBookForm.childNodes[19];
    let qThreeNewText = changeBookForm.childNodes[23];
    let newStartDate = changeBookForm.childNodes[25].childNodes[3];
    let newEndDate = changeBookForm.childNodes[25].childNodes[7];
    let newRatingNum = changeBookForm.childNodes[25].childNodes[11];

    bNewName.value = bName
    aNewName.value = aName
    newRatingNum.value = ratingNum
    newNotes.value = notes
    qOneNewText.value = qOneText
    qTwoNewText.value = qTwoText
    qThreeNewText.value = qThreeText
    newStartDate.value = startDate
    newEndDate.value = endDate

    const finalEditText = document.querySelector(".finalEditThisBook")
    finalEditText.addEventListener('click', editBook)

   async function editBook(){
         try{
            const response = await fetch('editBook', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                'oldTitleS': bName,
                'oldAuthorS': aName,
                'oldRatingNumS': ratingNum,
                'oldNoteS': notes,
                'oldQuoteOneS': qOneText,
                'oldQuoteTwoS': qTwoText,
                'oldQuoteThreeS': qThreeText,
                'oldStartDateS': startDate,
                'oldFinishDateS': endDate,

                'titleS': bNewName.value,
                'authorS': aNewName.value,
                'ratingNumS': newRatingNum.value,
                'noteS': newNotes.value,
                'quoteOneS': qOneNewText.value,
                'quoteTwoS': qTwoNewText.value,
                'quoteThreeS': qThreeNewText.value,
                'startDateS': newStartDate.value,
                'finishDateS': newEndDate.value
                })
              })
            const data = await response.json()
            console.log(data)
            location.reload()

        }
        catch(err){
            console.error(err)
            // history.back()
            window.open("/bookList", "_self")
            window.close()
        }
    }
}

async function deleteBook(){
    const bName = this.parentNode.childNodes[1].innerText;
    const aName = this.parentNode.childNodes[3].innerText
    const qText = this.parentNode.childNodes[5].innerText

    if (confirm("Confirm that you'd like to delete?")) {
        try{
            const response = await fetch('deleteBook', {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                'titleS': bName,
                'authors': aName,
                'quoteS': qText
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
}