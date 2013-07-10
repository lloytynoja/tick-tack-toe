function View(model) {
	var canvas = $("#game-area")[0];
	var gameAreaWidth = $("#game-area").width(); 
	var grid;
	var gameSize = model.getSize();
	var svgContainer;
	var margin = 0.06;
	
	this.addClickEventHandlers = function(handler) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid.length; j++) {
				grid[i][j].onclick = handler;
			}
		}
	}
	this.createGrid = function() {
		var margin = 6;
		grid = create2dArray(gameSize);
		for (i = 0; i < gameSize; i++) {
			for (j = 0; j < gameSize; j++) {
				var x = j * (gameAreaWidth / gameSize);
				var y = i * (gameAreaWidth / gameSize);
				var dim = gameAreaWidth / gameSize - margin / 2;
				grid[i][j] = getRectangle(x, y, dim, dim);
				svgContainer.appendChild(grid[i][j]);
			}
		}
	}
	this.setTurn = function(marker){
		$("#turn-text").text("TURN:");
		$("#turn-symbol").text(marker.toUpperCase());
	}
	this.setWinner = function(marker){
		$("#turn-text").text("WINNER:");
		$("#turn-symbol").text(marker.toUpperCase());
	}
	this.draw = function() {
		svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgContainer.setAttribute("version", "1.2");
		svgContainer.setAttribute("baseProfile", "tiny");
		svgContainer.setAttribute("width", gameAreaWidth);
		svgContainer.setAttribute("height", gameAreaWidth);	
		this.createGrid();
		canvas.appendChild(svgContainer);
	}
	this.getRow = function(rectangle) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid.length; j++) {
				if (grid[i][j] === rectangle) return i;
			}
		}
	}
	this.getColumn = function(rectangle) {
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid.length; j++) {
				if (grid[i][j] === rectangle) return j;
			}
		}
	}
	var getRectangle = function(x, y, width, height) {
		var rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectangle.setAttribute("x", x);
		rectangle.setAttribute("y", y);
		rectangle.setAttribute("width",  width);
		rectangle.setAttribute("height", height);
		rectangle.setAttribute("fill", "#EDEDED");
		rectangle.onmouseover = function() { this.setAttribute("fill", "#D6D4D4"); }
		rectangle.onmouseout = function() { this.setAttribute("fill", "#EDEDED"); }
		return rectangle;
	}
	var getX1 = function(dim, x, y) {
		var shapeX1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		var padding = dim * margin;
		shapeX1.setAttributeNS(null, "x1", x + padding);
		shapeX1.setAttributeNS(null, "y1", y + padding);
		shapeX1.setAttributeNS(null, "x2", x + dim - padding);
		shapeX1.setAttributeNS(null, "y2", y + dim - padding);
		shapeX1.setAttributeNS(null, "stroke-width", (dim / 2) - (dim / 3));
		shapeX1.setAttributeNS(null, "stroke", "green");
		return shapeX1;
	}
	var getX2 = function(dim, x, y) {
		var shapeX2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		var padding = dim * margin;
		shapeX2.setAttributeNS(null, "x1", x + dim - padding);
		shapeX2.setAttributeNS(null, "y1", y + padding);
		shapeX2.setAttributeNS(null, "x2", x + padding);
		shapeX2.setAttributeNS(null, "y2", y + dim - padding);
		shapeX2.setAttributeNS(null, "stroke-width", (dim / 2) - (dim / 3));
		shapeX2.setAttributeNS(null, "stroke", "green");
		return shapeX2;
	}
	var getO1 = function(dim, x, y) {
		var shapeO1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		shapeO1.setAttribute("cx", x + (dim / 2));       
		shapeO1.setAttribute("cy", y + (dim / 2));       
		shapeO1.setAttribute("r",  dim / 2);       
		shapeO1.setAttribute("fill", "green");
		return shapeO1;
	}	
	var getO2 = function(dim, x, y) {
		var shapeO2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		shapeO2.setAttribute("cx", x + (dim / 2));       
		shapeO2.setAttribute("cy", y + (dim / 2));     
		shapeO2.setAttribute("r",  dim / 3);       
		shapeO2.setAttribute("fill", "#ededed");
		return shapeO2;
	}		
	this.setMarker = function(marker, rectangle) {
		rectangle.onmouseover = null;
		if (marker == "x") {
			svgContainer.appendChild(getX1(parseFloat(rectangle.getAttribute("width")), 
											parseFloat(rectangle.getAttribute("x")), 
											parseFloat(rectangle.getAttribute("y"))));
			svgContainer.appendChild(getX2(parseFloat(rectangle.getAttribute("width")), 
											parseFloat(rectangle.getAttribute("x")), 
											parseFloat(rectangle.getAttribute("y"))));
		} else if (marker == "o") {
			svgContainer.appendChild(getO1(parseFloat(rectangle.getAttribute("width")), 
											parseFloat(rectangle.getAttribute("x")), 
											parseFloat(rectangle.getAttribute("y"))));
            svgContainer.appendChild(getO2(parseFloat(rectangle.getAttribute("width")), 
											parseFloat(rectangle.getAttribute("x")), 
											parseFloat(rectangle.getAttribute("y"))));		
		}
	}
}