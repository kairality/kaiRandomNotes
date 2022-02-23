function collectFruits(fruit) {
    let count = 0;
	function pickFruit() {
        msg = `${count} ${fruit}${count === 1 ? '' : "s"}`;
		console.log(msg)
        count++;
	}

	return pickFruit;
}

let arr = ["tangerine","banana"];
let nami = collectFruits("tangerine");
nami();
nami();
nami();
nami();
nami();
