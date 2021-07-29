window.onload = () =>
	//the function called when Calculate button is clicked.
	{
		/*calling a function calculateTip
		which will calculate the tip for the bill.*/
		document.querySelector('#calculate').onclick = calculateCost;
		document.querySelector('#add_person').onclick = addPerson;
	}

function calculateCost() {

    // clear any existing calculations
    var costs = document.getElementById('costs')
    while (costs.firstChild){
        costs.removeChild(costs.firstChild);
    }

	/*assing values of ID : amount, person and service to
	variables for further calculations.*/
	let tax = parseInt(document.getElementById('tax').value);
	let tip = parseInt(document.getElementById('tip').value);
	let persons = document.getElementsByClassName('person');

	console.log(tip);
	/*if statement will work when user presses
		calculate without entering values. */
	//so will display an alert box and return.
	if (tip === '' && tax === '') {
		alert("Please enter valid values");
		return;
	}

	// loop over and calculate cost for each person
	for (var i = 0; i < persons.length; i++){
	    var items = persons[i].getElementsByClassName('item');
        //var items = persons[person].getElementsByClassName('item');
        var cost = 0;
        for (var j = 0; j < items.length; j++){
            var price = items[j].getElementsByClassName('price');
            if (price.length != 0)
                cost += parseInt(price[0].value);
        }

        // final cost for person
        cost = cost * (1 + tax/100) * (1 + tip/100)
        cost = cost.toFixed(2)
        persons[i].setAttribute('cost', cost)

        // add costs to bottom of screen
        // create paragraph element
        let pElement = document.createElement('p');
        pElement.setAttribute('class', 'cost');

        // create text node PICK UP HERE
        let name = persons[i].getElementsByTagName('input')[0].value
        let text = name + ': $' + cost.toString()
        let pElementText = document.createTextNode(text);

        // append text node to paragraph
        pElement.appendChild(pElementText);

        // add elements to end of wrapper class container
        document.getElementsByClassName('costs')[0].append(pElement)
	}

}

// Define the addPerson function
// to be called through onclick()
function addPerson() {

    // create div element
    let dElement = document.createElement('div');
    dElement.setAttribute('class', 'gap');

    // create label element
    let lElement = document.createElement('label');
    // get current number of persons
    var p = document.getElementsByClassName('person').length
    lElement.setAttribute('class', 'person');
    lElement.setAttribute('id', p+1);


    // create text node
    let lElementText = document.createTextNode("Person");
    // append text node to paragraph
    lElement.appendChild(lElementText);

    // create input text element
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.placeholder = "Enter name here"

    // create input text element
    let btn = document.createElement("BUTTON");
    btn.setAttribute('id', 'add_item');
    btn.innerHTML = "Add Item";
    // When clicked, add another line for new item
    btn.addEventListener('click', function() {
        addItem((p+1).toString());}, false);


    // string elements together
    lElement.append(inputElement)
    lElement.appendChild(btn)

    // add elements to end of wrapper class container
    document.getElementsByClassName('wrapper')[0].append(dElement)
    document.getElementsByClassName('wrapper')[0].append(lElement)

}


// Define the addItem function
// to be called through onclick()
function addItem(num) {

    // create paragraph element
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'item');

    // create text node
    let pElementText = document.createTextNode("Item");
    // append text node to paragraph
    pElement.appendChild(pElementText);

    // create input text element
    let inputElement_name = document.createElement('input');
    inputElement_name.setAttribute('type', 'text');
    inputElement_name.placeholder = "Enter item name"

    // create input text element
    let inputElement_price = document.createElement('input');
    inputElement_price.setAttribute('type', 'text');
    inputElement_price.setAttribute('class', 'price');
    inputElement_price.placeholder = "Enter price"

    // string elements together
    pElement.append(inputElement_name)
    pElement.append(inputElement_price)

    // add item before "Add item" button
    var l = document.getElementById(num).children.length
    var c = document.getElementById(num).children
    document.getElementById(num).insertBefore(pElement, c[l-1])

}
