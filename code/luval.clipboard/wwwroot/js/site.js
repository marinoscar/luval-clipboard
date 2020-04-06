// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


const cardTemplate = `
<div class="card">
    <img class="card-img-top" src="<%= source %>">
    <div class="card-body">
        <% for(var line in lines) { %>
           <p class="card-text" ><%= lines[line] %></p>
       <% } %>
        <a href="#" class="card-link" onClick="copyTheContentToClipboard($(this).parent().find('p'));">Copy text</a>
        <a href="#" class="card-link" onClick="$(this).parent().parent().remove();" >Remove</a>
    </div>
</div>
`;

const cardTemplateNoImage = `
<div class="card">
    <div class="card-body">
        <% for(var line in lines) { %>
           <p class="card-text" ><%= lines[line] %></p>
       <% } %>
        <a href="#" class="card-link" onClick="copyTheContentToClipboard($(this).parent().find('p'));">Copy text</a>
        <a href="#" class="card-link" onClick="$(this).parent().parent().remove();" >Remove</a>
    </div>
</div>
`;

const cardTemplateNoText = `
<div class="card">
    <img class="card-img-top" src="<%= source %>">
    <div class="card-body">
        <a href="#" class="card-link" onClick="$(this).parent().parent().remove();" >Remove</a>
    </div>
</div>
`;

function copyTheContentToClipboard(elements) {
    var text = '';
    var i;
    for (i = 0; i < elements.length; i++) {
        text += $(elements[i]).text() + "\r\n";
    }
    var $txtArea = $('#clip-text');
    $txtArea.show();
    $txtArea.empty();
    $txtArea.val(text);
    $txtArea.select();
    document.execCommand('copy');
    $txtArea.hide();
}