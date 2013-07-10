function openGameMenu() {
	$('#main-wrapper').hide();
	$('#new-game-modal').foundation('reveal', 'open');
    $('#new-game-modal-size').change(function() {
        var originalConsecutive = $('#new-game-modal-consecutive').val();
        $('#new-game-modal-consecutive').empty();
        for (i = 3; i <= $(this).val(); i++) {
            $('#new-game-modal-consecutive').append('<option value="' + i + '">' + i + '</option>');
        }
        /* consecutive can't be longer than grid size */
        if (parseInt($(this).val()) > originalConsecutive) {
            $('#new-game-modal-consecutive').val(originalConsecutive).attr('selected',true);
        } else {
            $('#new-game-modal-consecutive').val($(this).val()).attr('selected',true);
        }
    });
}
/* MVC model grabbed from leepoint.net */
function initNewGame(gridSize, consecutive) {
    $('#new-game-modal').foundation('reveal', 'close');
    $('#main-wrapper').show();
    $('#game-area').empty();
    
    var model = new Model(gridSize, consecutive);
    var view = new View(model);
    var controller = new Controller(view, model);
    view.draw();
    controller.init();
}
/* common to all classes */
function create2dArray(size) {
    var arr = new Array();
    for (var i = 0; i < size; i++) {
        arr[i] = new Array();
        for (var j = 0; j < size; j++) {
            arr[i][j] = null;
        }
    }
    return arr;
}