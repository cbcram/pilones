$('.close').on('click', function () {
    $('#myModal').hide();
});

$('body').on('click', function () {
    $('#myModal').hide();
});

$('.modal-content').on('click', function (event) {
    event.stopPropagation();
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('#myModal').hide();
    }
});

$('#afegirusuaricancelar').on('click', function () {
    $('#myModal').hide();
});
