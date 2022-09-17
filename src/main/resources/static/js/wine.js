function loadWineTable(){
    $.ajax({
        type: "GET", url: "/all", success: function(result){
            $.each(result, function(i, wine){
                $('#wineTableBody').append('<tr><td>' + wine.wineBrand + '</td><td>' + wine.wineType + '</td><td>' + wine.wineValue + '</td><td>' + wine.location + '</td><td>' + wine.datePurchased + '</td><td>' + '<button style="margin-right:20px;" "type="button" class="btn btn-warning">Edit</button>' + '<button type="button" class="btn btn-danger">Delete</button>' + '</td></tr>');
            });
        }
    });
};

$(document).ready(function(){
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

			$("#wineForm").submit(function(event) {
				// Prevent the form from submitting via the browser.
				event.preventDefault();
				submitWineForm();
			});


function submitWineForm(){
debugger;
    let basePrice = $('#wineValue').val();
    let formattedValue = basePrice.replace(/\D/g, '');
    let addCurrency = formattedValue.toLocaleString("en-US", {style:"currency", currency:"USD",});

    var formData = {
            wineType : $('#wineType').val(),
            wineValue: addCurrency,
            wineBrand: $('#wineBrand').val(),
            location: $('#location').val(),
            datePurchased: $('#datePurchased').val()
    };
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
});