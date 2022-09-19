$(document).ready(function(){
    $.ajax({
        type: "GET", url: "/all", success: function(result){
            $.each(result, function(i, wine){
                $('#wineTableBody').append('<tr><td>' + wine.wineBrand + '</td><td>' + wine.wineType + '</td><td>' + wine.wineValue + '</td><td>' + wine.location + '</td><td>' + wine.datePurchased + '</td><td>' + wine.quantity + '</td><td>' + '<button style="margin-right:20px;" "type="button" class="btn btn-warning">Edit</button>' + '<button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"class="btn btn-danger">Delete</button>' + '</td></tr>');
            });
        }
    });
});


function getCurrentDateButton(){
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = d.getFullYear() + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day;

    $('#datePurchased').val(output);
}

$('#wineFormSubButton').click(function (event) {
    let basePrice = $('#wineValue').val();
    let formattedValue = basePrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    let addCurrency = Number(formattedValue).toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    var formData = {
            wineType : $('#wineType').val(),
            wineValue: addCurrency,
            wineBrand: $('#wineBrand').val(),
            location: $('#location').val(),
            datePurchased: $('#datePurchased').val(),
            quantity: $('#quantity').val()
    };
    event.preventDefault();
    if ($('#wineForm')[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
       $.ajax({
           type : "POST",
           contentType : "application/json",
           url : "/add",
           data : JSON.stringify(formData),
           dataType : 'json',
           success : function(result) {
               if (result.status == "success") {
                   $("#postResultDiv").html(
                    '<div class="alert alert-success d-flex align-items-center alert-dismissible" role="alert">' +
                    ' <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>' +
                    '<div>Successfully added wine!</div></div>');
                    location.reload();
               } else {
                   $("#postResultDiv").html('<div class="alert alert-danger d-flex align-items-center alert-dismissible" role="alert">' +
                    '<svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>' +
                    '<div>There was an error adding the wine!</div></div>');
               }
               loadWineTable();
           },
           error : function(e) {
               alert("Error!")
               console.log("ERROR: ", e);
           }
       });
    }
    $('#wineForm').addClass('was-validated');
});