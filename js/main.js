var player = "A",
	row, column, diagonal, anti_diagonal,
	$cell = $(".cell"), 
    $status = $(".status"),
    n = 3,
    totalMoves = Math.abs(n*n);

$cell.off("click");

$(".start").click(function(e){
	e.preventDefault();
	$cell.empty();
	$(this).text("Reset the game");
	init();
	$cell.on("click", setMove).removeClass("redBG");
});

function init () {
	player = "A";
	totalMoves = Math.abs(n*n);
	row = {};
	column = {};
	for (var i=0; i<n; i++){
		row[i] = 0;
		column[i] = 0;
	}
	diagonal = 0; 
	anti_diagonal = 0;
	$status.text("It's Player " + player + "'s term");
}

function setMove() {
	var x, y;
	if($(this).text()!="") {
		return;
	}
	isPlayerA = (player == "A");
	circle_cross = (isPlayerA)? "O" : "X";
	$(this).text(circle_cross);
	x = $(this).data("x");
	y = $(this).data("y");

	if(hasWon(x, y, isPlayerA)){
		$status.text("Winner: Player " + player);
		$cell.off("click");

	} else {
		player = (isPlayerA)? "B" : "A";
		$status.text("It's Player " + player + "'s term");
		totalMoves --;
	}
	if(totalMoves == 0) {
		$status.text("Draw");
		$cell.off("click");
	}
}

function hasWon (x, y, isPlayerA) {
	var goal;
	if(isPlayerA) {
		updateCounts(x, y, increment);
	} else {
		updateCounts(x, y, decrement);
	}	
	goal = returnGoal(x, y); 
	if(goal) {
		highlightGoal(goal);
		return true;
	}
	return false;
}

function updateCounts(x, y, ops) {
	column[x] = ops(column[x]);
	row[y] = ops(row[y]);
	if(x == y) {
		diagonal = ops(diagonal);
	}
	if((x+y)==(n-1)){
		anti_diagonal = ops(anti_diagonal);
	}
}

function returnGoal(x, y) {
	if (Math.abs(column[x]) == n){
		return {type: "column", index: x};
	} else if (Math.abs(row[y]) == n) {
		return {type: "row", index: y };
	} else if (Math.abs(diagonal) == n) {
		return {type: "diagonal"};
	} else if (Math.abs(anti_diagonal) == n) {
		return {type: "anti_diagonal"};
	} else {
		return false;
	}
}

function highlightGoal(goal) {
	var $highlightDom, 
	    type = goal["type"];
	if(type == "column"){
		$highlightDom = $("[data-x='" + goal["index"] + "']");
	} else if (type == "row"){
		$highlightDom = $("[data-y='" + goal["index"] + "']");
	} else if (type == "diagonal") {
		$highlightDom = $(".diagonal");
	} else if (type == "anti_diagonal") {
		$highlightDom = $(".antiDiagonal");
	}
	$highlightDom.addClass("redBG");
}

function increment(count) {
	count++;
	return count;
}

function decrement(count) {
	count--;
	return count;
}

