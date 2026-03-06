const sendBtn = document.getElementById("sendBtn");
const promptInput = document.getElementById("prompt");
const messages = document.getElementById("messages");

const plusBtn = document.getElementById("plusBtn");
const popup = document.getElementById("popupMenu");

const uploadBtn = document.getElementById("uploadImage");
const uploader = document.getElementById("imageUploader");

const preview = document.getElementById("imagePreview");

/* Toggle popup */

plusBtn.onclick = () => {

popup.style.display =
popup.style.display === "flex"
? "none"
: "flex";

};

/* Upload images */

uploadBtn.onclick = () => uploader.click();

uploader.onchange = () => {

preview.innerHTML = "";

const files = [...uploader.files].slice(0,7);

files.forEach(file => {

const img = document.createElement("img");
img.src = URL.createObjectURL(file);

preview.appendChild(img);

});

};

/* Send message */

sendBtn.onclick = sendMessage;

async function sendMessage(){

const text = promptInput.value;

if(!text) return;

addMessage(text,"user");

promptInput.value="";

const response = await fetch(
"http://localhost:3000/chat",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:text})
}
);

const data = await response.json();

addMessage(data.reply,"ai");

}

function addMessage(text,type){

const div=document.createElement("div");

div.classList.add("message");
div.classList.add(type);

div.innerText=text;

messages.appendChild(div);

messages.scrollTop=messages.scrollHeight;

}

/* Voice Input */

const voiceBtn = document.getElementById("voiceInput");

voiceBtn.onclick = () => {

const recognition = new webkitSpeechRecognition();

recognition.start();

recognition.onresult = e => {

promptInput.value =
e.results[0][0].transcript;

};

};
