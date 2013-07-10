function Model(size, consecutive) {
	var grid = create2dArray(size);
	this.getSize = function () {
		return size;
		}
	this.setMarker = function (row, col, marker) {
		grid[row][col] = marker;
	}
	this.checkConsecutive = function (amount) {
		if (checkHorizontal() || checkVertical() || checkDiagonalSW() || checkDiagonalSE()) {
			return true;
		} else {
			return false;
		}
	}
	var checkHorizontal = function () {
		var amount;
		for (i = 0; i < grid.length; i++) {
			amount = 1;
			for (j = 1; j < grid.length; j++) {
				if (grid[i][j] == grid[i][j-1] && grid[i][j] != null) {
					amount++;
					if (amount == consecutive) {
						return true;
					}
				} else {
					amount = 1;
				}
			}
		}
	}
	var checkVertical = function () {
		var amount;
		for (j = 0; j < grid.length; j++) {
			amount = 1;
			for (i = 1; i < grid.length; i++) {
				if (grid[i][j] == grid[i-1][j] && grid[i][j] != null) {
					amount++;
					if (amount == consecutive) {
						return true;
					}
				} else {
					amount = 1;
				}
			}
		}
	}	 
	var checkDiagonalSW = function () {
		var k;
		var l;
		var amount;
		for (i = 0; i < grid.length; i++) {
			for (j = 0; j < grid.length; j++) {
				if (grid[i][j] != null) {
					k = i;
					l = j;
					amount = 1;
					/* when non-null is encountered, south-west direction is checked from that point 
                     * first two conditions make sure we keep inside array boundaries
                     * last one breaks loop if null is encountered
                     */
					while (k < grid.length - 1 && l > 0 && grid[k + 1][l - 1] != null) {
						if (grid[k + 1][l - 1] == grid[k][l]) {
							amount++;
							if (amount== consecutive) {
								return true;
							}
						}
						k++;
						l--;
					}
				}
			}
		}
	}
	var checkDiagonalSE = function () {
		var k;
		var l;
		var amount;
		for (i = 0; i < grid.length; i++) {
			for (j = 0; j < grid.length; j++) {
				if (grid[i][j] != null) {
					k = i;
					l = j;
					amount = 1;
					/* when non-null is encountered, south-east direction is checked from that point */
					while (k < grid.length - 1 && l < grid.length && grid[k + 1][l + 1] != null) {
						if (grid[k + 1][l + 1] == grid[k][l]) {
							amount++;
							if (amount== consecutive) {
								return true;
							}
						}
						k++;
						l++;
					}
				}
			}
		}
	}
	this.checkIfUnset = function (row, column) {
		if (grid[row][column] == null) {
			return true;
		} else {
			return false;
		}
	}
}