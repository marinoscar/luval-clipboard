// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


const cardTemplate = `
<div class="card">
    <img class="card-img-top" src="<%= source %>">
        <div class="card-body">
            <p class="card-text"><%= content %></p>
        </div>
        <a href="#" class="btn btn-danger" onClick="$(this).parent().remove();" ><i class="im im-trash-can"></i></a>
    </div>
`;