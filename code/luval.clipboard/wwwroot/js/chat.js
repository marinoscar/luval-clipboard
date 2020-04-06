"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById('channel-btn').addEventListener('click', function (e) {
    $('#work-area').removeClass('invisible');
    $('#channel-btn').prop("disabled", true);
    var channelName = $('#channelName').val();
    //Start connection
    connection.start().then(function () {
        console.log('Connection Established');
    }).catch(function (err) {
        return console.error(err.toString());
    });

    //Bind channel
    connection.on(channelName, function (data) {
        console.log(data);

        var tmpl = '';
        var cardItems = {};
        var msg = data.message;
        var lines = msg.split("\n");
        var imgSrc = '#';
        if (data.imageData != null && data.imageData != undefined) {
            imgSrc = data.imageHeaders + data.imageData;
            tmpl = cardTemplate;
            cardItems = { source: imgSrc, lines: lines };
        }
        else {
            tmpl = cardTemplateNoImage;
            cardItems = { lines: lines };
        }
        var compiled = _.template(tmpl);
        var newHtml = compiled(cardItems);
        $('#mainContent').prepend(newHtml);

    });

});

document.getElementById('tosCheck').addEventListener('change', (event) => {
    if (event.target.checked) {
        $('#submit').prop("disabled", false);
    } else {
        $('#submit').prop("disabled", true);
    }
})

document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    var form = document.getElementById('mainForm');
    var formData = getFormData();
    $.ajax({
        url: $(form).attr("action"),
        type: 'POST',
        data: formData,
        success: function (data) {
            $('#collapseTwo').collapse('show');
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

function getFormData() {
    var formData = new FormData();
   
    formData.append('Group', $('#channelName').val());
    formData.append('Message', $('#message').val());
    formData.append("ImageData", document.getElementById('imageData').files[0]);

    return formData;
}

function getText(elementId) {
    return document.getElementById(elementId).textContent;
}