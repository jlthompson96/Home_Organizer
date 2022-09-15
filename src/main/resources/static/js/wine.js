function loadWineTable(){
    $.ajax({
        type: "GET", url: "/all", success: function(result){
            $.each(result, function(i, wine){
                $('#wineTableBody').append('<tr><td>' + wine.wineBrand + '</td><td>' + wine.wineType + '</td><td>' + wine.wineValue + '</td><td>' + wine.location + '</td><td>' + wine.datePurchased + '</td><td>' + '<button type="button" class="btn btn-danger">Edit</button>' + '</td></tr>');
            });
        }
    });
}