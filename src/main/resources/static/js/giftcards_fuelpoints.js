$(document).ready(function(){
    debugger;
    $.ajax({
        type: "GET", url: "/giftCardList", success: function(result){
        let giftCardTotal = 0.00;
        let fuelPointTotal = 0;
            $.each(result, function(i, giftCard){
                $('#giftCardTableBody').append('<tr><td>' + giftCard.vendor + '</td><td>' + giftCard.amount + '</td><td>' + giftCard.datePurchased + '</td><td>' + giftCard.fuelPointsEarned + '</td><td>' + giftCard.location + '</td><td>' + giftCard.used + '</td><td>' + '<button style="margin-right:20px;" "type="button" id="'+giftCard.id+'"class="btn btn-warning edit">Edit</button>' + '<button id="'+giftCard.id+'" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"class="btn btn-danger delete">Delete</button>' + '</td></tr>');
                    //Remove the non-numeric values from the gift card value
                    let formattedValue = giftCard.amount.replace(/[&\/\\#+()$~%'":,*?<>{}]/g, '');

                    let newNum = parseFloat(formattedValue);
                    let newFuelPointNum = parseInt(giftCard.fuelPointsEarned);
                    giftCardTotal += newNum;
                    fuelPointTotal += newFuelPointNum;
            });
                let addCurrency = giftCardTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
                let addFuelPoints = fuelPointTotal.toLocaleString();
                $('#giftCardTotal').text(addCurrency);
                $('#totalFuelPoints').text(addFuelPoints);
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

$('#giftCardFormSubButton').click(function (event) {
    let basePrice = $('#cardAmount').val();
    let formattedValue = basePrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    let addCurrency = Number(formattedValue).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    let test = $('#used').val();

    var formData = {
            vendor : $('#vendor').val(),
            amount: addCurrency,
            datePurchased: $('#datePurchased').val(),
            fuelPointsEarned: $('#fuelPtsEarned').val(),
            location: $('#location').val(),
            used: $('#used').val()
    };
    event.preventDefault();
    if ($('#giftCardForm')[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
       $.ajax({
           type : "POST",
           contentType : "application/json",
           url : "/giftCard/save",
           data : JSON.stringify(formData),
           dataType : 'json',
           success : function(result) {
               if (result.status == "success") {
                   $("#postResultDiv").html(
                    '<div class="alert alert-success d-flex align-items-center alert-dismissible" role="alert">' +
                    ' <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>' +
                    '<div>Successfully added gift card!</div></div>');
                    location.reload();
               } else {
                   $("#postResultDiv").html('<div class="alert alert-danger d-flex align-items-center alert-dismissible" role="alert">' +
                    '<svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>' +
                    '<div>There was an error adding the gift card!</div></div>');
               }
               location.reload();
           },
           error : function(e) {
               console.log("ERROR: ", e);
               location.reload();
           }
       });
    }
    $('#giftCardForm').addClass('was-validated');
});


// Logic for deleting a gift card
$(document).delegate('.delete', 'click', function() {

    //Save gift card id
    var id = $(this).attr('id');
    var parent = $(this).parent().parent();

    //Open Modal
    $('#deleteModal').modal('show');

    //Delete gift card
    $(document).delegate('#deleteModalBtn', 'click', function() {
        $.ajax({
            type: "DELETE",
            url: "/giftCard/delete/" + id,
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


// Logic for editing a gift card
$(document).delegate('.edit', 'click', function() {
    var id = $(this).attr('id');
    $.ajax({
        type: "GET",
        url: "/giftCard/" + id,
        cache: false,
        success: function(giftCard) {

        //Remove the $ from the gift card value
        let formattedValue = giftCard.amount.replace(/[&\/\\#+()$~%'":*?<>{}]/g, '');

            $('#editVendor').val(giftCard.vendor);
            $('#editCardAmount').val(giftCard.amount);
            $('#editFuelPtsEarned').val(giftCard.fuelPointsEarned);
            $('#editLocation').val(giftCard.location);
            $('#editDatePurchased').val(giftCard.datePurchased);
            $('#editUsed').val(giftCard.used);
            $('#updateGiftCardModal').modal('show');
        },
        error: function() {
            $('#err').html('<span style=\'color:red; font-weight: bold; font-size: 30px;\'>Error deleting record').fadeIn().fadeOut(4000, function() {
                $(this).remove();
            });
        }})
        $('#giftCardFormSaveButton').click(function (event) {
            let basePrice = $('#editCardAmount').val();
            let formattedValue = basePrice.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
            let addCurrency = Number(formattedValue).toLocaleString('en-US', {style: 'currency', currency: 'USD'});

            var formData = {
                vendor : $('#editVendor').val(),
                amount: addCurrency,
                datePurchased: $('#editDatePurchased').val(),
                fuelPointsEarned: $('#editFuelPtsEarned').val(),
                location: $('#editLocation').val(),
                used: $('#editUsed').val()
            };
            event.preventDefault();
            if ($('#editGiftCardForm')[0].checkValidity() === false) {
                event.stopPropagation();
            } else {
               $.ajax({
                   type : "POST",
                   contentType : "application/json",
                   url : "/giftCard/save",
                   data : JSON.stringify(formData),
                   dataType : 'json',
                   success : function(result) {
                       if (result.status == "success") {
                           $("#postResultDiv").html(
                            '<div class="alert alert-success d-flex align-items-center alert-dismissible" role="alert">' +
                            ' <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>' +
                            '<div>Successfully added gift card!</div></div>');
                            deleteOldGiftCard(id);
                            location.reload();
                       } else {
                           $("#postResultDiv").html('<div class="alert alert-danger d-flex align-items-center alert-dismissible" role="alert">' +
                            '<svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>' +
                            '<div>There was an error adding the gift card!</div></div>');
                       }
                   },
                   error : function(e) {
                       console.log(formData);
                       console.log("ERROR: ", e);
                       deleteOldGiftCard(id);
                       location.reload();
                   }
               });
            }
            $('#giftCardForm').addClass('was-validated');
        });

        });

function deleteOldGiftCard(id){
    $.ajax({
        type: "DELETE",
        url: "/giftCard/delete/" + id,
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
};