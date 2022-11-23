// console.log(document.getElementsByClassName("contact"));
import contacts from "./contacts.json" assert { type: "json"}

import messages from "./messages.json"assert{type: "json"}

// Create an empty array for input messages
const inputArray = []

const loggedInUserId = "0"
let chatArea = document.querySelector(".chat-area");
let sideBar = document.querySelector(".sidebar")
let smartPhones = window.matchMedia('(max-width: 600px)')
let tablets = window.matchMedia(' (max-width: 900px) ')
let backArrowOne = document.querySelector(".back-arrow-one")
let contact = document.querySelector(".contact")

let contactDetails = document.querySelector(".contact-details")
let resizeHandle = document.querySelector(".resize-handle")

resizeHandle.addEventListener("mousedown", (event) => {
    document.addEventListener("mousemove", resize, false);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resize, false);
    }, false);
});

function resize(e) {
    const size = `${e.x}px`;
    sideBar.style.flexBasis = size;

}

function tabletFunction(tablets){
    if (tablets.matches){
        resizeHandle.addEventListener('touchstart', (event) => {
            document.addEventListener('touchmove', resize, false);
            document.addEventListener('touchend', () => {
                document.removeEventListener('touchmove', resize, false);
            }, false);
        });
    }
}
tabletFunction(tablets)

// back btn
backArrowOne.addEventListener("click", function (e){
    chatArea.style.display = 'none'
    sideBar.style.display = 'block'
})

// backArrowTwo.addEventListener("click", function (e){
//     chatArea.style.display = 'block'
//     sideBar.style.display = 'block'
//     contactDetails.style.display ='none'
// })


function smartFunction(smartPhones) {
    if (smartPhones.matches){
            document.body.addEventListener("click", function (e) {
     
            // let contact;
                if (e.target.className !== "contact") {
                    return false;
                }
                else { 
                    contact = e.target;
        
                    const id = contact.dataset.id

                    sideBar.style.display = 'none'
                    chatArea.style.display ='block'
                    backArrowOne.style.display = 'block'           
                    // chatArea.style.width ='100%'
                    renderUserMessages(getUserMessage(id))
        
                    renderUserInfo(getUserInfo(id))
                    console.log(id);
                    // renderGetContactDetails(id)
                }
            })
    }
    else{
        return false;
    }
 
}
smartFunction(smartPhones)



document.body.addEventListener("click", function (e) {
     
    let contact;
    if (e.target.className !== "contact") {
        return false;
    }
    else { 
        contact = e.target;

        // get contact id

        const id = contact.dataset.id

        // console.log(typeof id)

        // console.log(getUserMessage(id))
        renderUserMessages(getUserMessage(id))

        // console.log(getUserInfo(id));
        renderUserInfo(getUserInfo(id))

        renderGetContactDetails(id)
    }

    
    // console.log(chatArea);
    let defaultPage = document.querySelector(".default-page")
    defaultPage .style.display = 'none'
    chatArea.style.display ='block'
    
    if (tablets.matches){
        if (contactDetails.style.display === 'block'){
            chatArea.style.display = 'none'
            
        }
        else{
            return false
        }
    }
    
})

// get id from contacts for the contact info
const getUserInfo = (id) => {
    const {myContact} = contacts
    const userInfo = myContact.filter(value => value.id === id)
    if (userInfo) return userInfo
    return null
} 

let contactInfo = document.querySelector(".contact-info")
const renderUserInfo = (userInfo) => {
    let contactsString = ""
   
    for (let i = 0; i < userInfo.length; i++) {
        contactsString+=`
        <div>
        <div class="contact-info">
        <div class="img">
          <img src="${userInfo[i].image}" data-id=${userInfo[i].id} alt="rachael">
        </div>
        <p class="contact-name">
        ${userInfo[i].name}
        </p>
        </div>
        </div>
        `   
    } 

    if(contactsString){
        console.log(contactsString)
        console.log(contactInfo)
        contactInfo.innerHTML=contactsString
    }  
}


// get messages from json data
const getUserMessage = (id) => {
    const { myMessages } = messages

    const userMessages = myMessages.filter(item => 
        (item.from === id && item.to === loggedInUserId)||(item.from === loggedInUserId && item.to === id))

    if(userMessages) return userMessages
    return null
}

let msgContainer = document.querySelector("#msg-container")

const renderUserMessages = (usersMessages) => {
 console.log(usersMessages);
    let messagesString = ""

    // loop through filtered messages and dynamically create the dom element for each message

    for (let i = 0; i < usersMessages.length; i++) {
        const msg = usersMessages[i];
        //where from is my id then use the sent-msg class
        // where from is contact id then use the received-msg class
        messagesString+= `
        <div class="chat-msg">
        <p class=${msg.from === loggedInUserId ? "sent-msg" : "received-msg"}>${usersMessages[i].message}</p>
       
        </div>
        `
    }

   
    msgContainer.innerHTML = messagesString
    

}



let btn = document.querySelector(".btn");

btn.addEventListener("click", function (e){
    e.preventDefault()
    // submitMe()
    getSentMessage()
    // renderSentMessage()
    
})
    
// make the input msgs dynamic
// clear the text after clicking on send
// input text should be connected to contact ids



// function to push input message into the array
function getSentMessage() {
    const textBox = document.getElementById("user-input");
    if(!textBox.value.trimStart()) alert("please type a message");
    else {
        //  inputArray.push(textBox.value)
        renderSentMessage(textBox.value)
        textBox.value = ""
    }
}

// const showMsg = document.getElementById("show-msg")

const renderSentMessage = (message) => {
    let inputString = `
    <div class="chat-msg">
    <p class="sent-msg">${message}</p></div>
    `
    msgContainer.innerHTML += inputString
    inputString=""
}






// making the contacts dynamic
let contactContainer = document.querySelector(".contact-container")

const renderContacts = () => {
    let contactsString = ""
    // to take the name of the array from the name of the file.
    const { myContact } = contacts
    // const age = 26
    // let name = "Chima Elefue"
    // const stateMent = `my name is ${name} and I am ${age} years old`
    // console.log(stateMent)
    
    for (let index = 0; index < myContact.length; index++) {
        
        contactsString+= `<div data-id=${myContact[index].id} class="contact">

        <div class="img">
            <img src="${myContact[index].image}" alt="image1">
        </div>

        <div class="paragraph-text">
            <h3>${myContact[index].name}</h3>
            
            <p>${getUserLastMsg(myContact[index].id)}</p>
        </div>
        
    </div>   `
    }

    if(contactsString){
        contactContainer.innerHTML=contactsString
    }

}
//Ternary Operations

// get the last message
const getUserLastMsg = (id) => {
// assign the new array to a variable
     
    const filteredMsg = getUserMessage(id)
    if (filteredMsg && filteredMsg.length) {
        const lastMsg = filteredMsg[filteredMsg.length - 1]
        return lastMsg.message
    } 
    return  ""
    
    }

    
renderContacts()






// Contact Details
const GetContactDetails = (id) => {
    const {myContact} = contacts
    const contactMenu = myContact.filter(value => value.id === id)
    // console.log(contactMenu)
    
    if (contactMenu) return contactMenu[0]
    return null
} 


const infoBar = document.querySelector(".info-bar")
 const renderGetContactDetails = (id) => {
    let detailsString  = ""

    console.log(GetContactDetails(id))

        detailsString = `
        <div class="menu-img">
            <img src="${GetContactDetails(id).image}"> </img>
        </div>

        <div class="details-text">
            <h3 class="user-name">${GetContactDetails(id).name}</h3>
            <p class="user-number">${GetContactDetails(id).pNumber}</p>
        </div>
        `
    
    if (detailsString){
        console.log(detailsString)
        infoBar.innerHTML= detailsString
    }
   
 }

 let mainPage = document.querySelector("main-page")

 //  event listener for the contact info
contactInfo.addEventListener("click", function (e){
    const id = e.target.dataset.id
     
    contactDetails.style.display ='block'
    
    if(tablets.matches){
        
        //  mainPage.style.display = 'none'
        chatArea.style.display = 'none'
        // contactDetails.style.width = 'calc(100%-250px)'
        
    }
    renderGetContactDetails(id)

})
 

// Close button
let closeBtn = document.querySelector(".close-btn")
closeBtn.addEventListener("click", function (e){
   
    contactDetails.style.display ='none'

    if (tablets.matches){
        chatArea.style.display ='block'
    }
})
 


