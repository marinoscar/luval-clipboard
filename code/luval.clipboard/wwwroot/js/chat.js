"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

const form = document.getElementById("mainForm");
const fileInput = document.getElementById("imageData");

fileInput.addEventListener('change', () => {
    console.log('message')
});

window.addEventListener('paste', e => {
    if (e.clipboardData.items === null || e.clipboardData.items.lenght <= 0) return;
    //fileInput.files[0] = e.clipboardData.items[0].getAsFile();
    fileInput.files = e.clipboardData.files;

});

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (data) {
    console.log(data);

    var msg = data.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = data.group + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    var form = document.getElementById('mainForm');
    var formData = new FormData(form);
    $.ajax({
        url: $(form).attr("action"),
        type: 'POST',
        data: formData,
        success: function (data) {
            console.log(data);
        },
        cache: false,
        contentType: false,
        processData: false
    });
});