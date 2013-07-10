function Controller(view, model) {
    var marker = "x";
    var game = true;
    var changeTurn = function() {
        if (marker == "x") {
            marker = "o";
        } else {
            marker = "x";
        }
    }
    this.clickHandler = function() {
        var row = view.getRow(this);
        var column = view.getColumn(this);
        console.log(row + " " + column);	
        if (model.checkIfUnset(row, column) && game) {
            model.setMarker(row, column, marker);
            view.setMarker(marker, this);
            if (model.checkConsecutive()) {
                game = false;
                view.setWinner(marker);
            } else {
                changeTurn();
                view.setTurn(marker);
            }
        }
    }
    this.init = function() {
        view.setTurn(marker);
        view.addClickEventHandlers(this.clickHandler);
    }
}