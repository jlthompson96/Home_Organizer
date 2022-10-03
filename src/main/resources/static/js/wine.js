$(document).ready(function(){
    $.ajax({
        type: "GET", url: "/wineList", success: function(result){
            $.each(result, function(i, wine){
                $('#wineTableBody').append('<tr><td>' + wine.wineBrand + '</td><td>' + wine.wineType + '</td><td>' + wine.wineValue + '</td><td>' + wine.location + '</td><td>' + wine.datePurchased + '</td><td>' + wine.quantity + '</td><td>' + '<button style="margin-right:20px;" "type="button" id="'+wine.id+'" class="btn btn-warning edit">Edit</button>' + '<button type="button" id="'+wine.id+'" class="btn btn-danger delete">Delete</button>' + '</td></tr>');
            });
        }
    });
});


// Logic for the get current date button
function getCurrentDateButton(){
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = d.getFullYear() + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day;

    $('#datePurchased').val(output);
}


// Logic for adding a new wine
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
           url : "/wine/save",
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
               console.log(formData);
               console.log("ERROR: ", e);
               location.reload();
           }
       });
    }
    $('#wineForm').addClass('was-validated');
});


// Logic for deleting a wine
$(document).delegate('.delete', 'click', function() {

        //Save wine id
        var id = $(this).attr('id');
        var parent = $(this).parent().parent();

    //Open Modal
    $('#deleteModal').modal('show');

    //Delete wine
    $(document).delegate('#deleteModalBtn', 'click', function() {
        $.ajax({
            type: "DELETE",
            url: "/wine/delete/" + id,
            cache: false,
            success: function() {
                    $(this).remove();
                location.reload(true)
            },
            error: function() {
                $('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
                    $(this).remove();
                });
            }
        });
    });
});


// Logic for editing a wine
//$(document).delegate('.edit', 'click', function() {
//    var id = $(this).attr('id');
//    $.ajax({
//        type: "GET",
//        url: "/wine/" + id,
//        cache: false,
//        success: function(wine) {
//
//        //Remove the $ from the wine value
//        let formattedValue = wine.wineValue.replace(/[&\/\\#+()$~%'":*?<>{}]/g, '');
//
//            $('#editWineType').val(wine.wineType);
//            $('#editWineValue').val(formattedValue);
//            $('#editWineBrand').val(wine.wineBrand);
//            $('#editLocation').val(wine.location);
//            $('#editDatePurchased').val(wine.datePurchased);
//            $('#editQuantity').val(wine.quantity);
//};)));



