var householdArray = [];
var form = document.forms[0];
var household = document.querySelector('ol.household');
var addButton = document.querySelector('button.add');
var submitButton = document.querySelector('button[type=submit]');
var jsonDiv = document.querySelector('pre.debug');
var ageValid = false;
var relationshipValid = false;
var memberCount = 0; // used as id when creating new member `li` item
var deleteButton, age, relationship, checkbox, smoker, selectBoxes, toDelete;

init();

function init() {
	// Create `delete` button and insert in DOM after `add` button
	deleteButton = document.createElement('button');
	var deleteText = document.createTextNode('delete');
	deleteButton.className = 'delete';
	deleteButton.appendChild(deleteText);
	var parentDiv = addButton.parentNode;
	parentDiv.insertBefore(deleteButton, addButton.nextSibling);
	// Add all event listeners for form elements
	validateForm();
}

function validateForm() {
	// Clicking on the `Add` button triggers validation
	addButton.addEventListener('click', function(){
		validateAge();
		validateRelationship();
		// Add household member if age and relationship are validated
		if (ageValid && relationshipValid) {
			addPerson();
		}
	});

	// Clicking on the `delete` button deletes selected members
	deleteButton.addEventListener('click', removePerson);
	// Prevent default action for `submit` button
	form.addEventListener('submit', function(e){
	 	e.preventDefault();
	});
	// Clicking on the `submit` button returns mock-server JSON data
	submitButton.addEventListener('click', createMockData);
}

function validateAge() {
	age = document.querySelector('input[name=age]').value;
	// Validate age if an input is entered and it is > 0
	if (age && age > 0) {
		ageValid = true;
	} else {
		ageValid = false;
		alert("Please enter a valid age");
	}
}

function validateRelationship() {
	relationship = document.querySelector('[name=rel]').value;
	// Validate relationship if an option is chosen
	if (relationship) {
		relationshipValid = true;
	} else {
		relationshipValid = false;
		alert("Please select the relationship of this person to you");
	}
}

function addPerson() {
	memberCount++;
	var newMember = {
		age: age,
		relationship: relationship
	};
	// Check if smoker checkbox is checked
	checkbox = document.querySelector('input[name=smoker]').checked;
	if (checkbox) {
		newMember.smoker = true;
		smoker = 'yes';
	} else {
		newMember.smoker = false;
		smoker = 'no';
	}
	// Add new household member to array
	householdArray.push(newMember);
	// Add list item for new member
	var newEntry = document.createElement('li');
	newEntry.id = memberCount;
	// Add a checkbox to the beginning of the new entry
	var entryCheckbox = document.createElement('input');
  entryCheckbox.type = 'checkbox';
  entryCheckbox.name = 'select-box';
	newEntry.appendChild(entryCheckbox);
	// Add member's info
	newEntry.appendChild(document.createTextNode(
		"Age: " + age + ", Relationship: " + relationship + ", Smoker: " + smoker
	));
	household.appendChild(newEntry);
}

function removePerson() {
	console.log('removePerson triggered');
	selectBoxes = document.getElementsByName('select-box');
	// If box is checked when `delete` is clicked, list item will be removed
	for (var i = 0; i < selectBoxes.length; i++) {
		if (selectBoxes[i].checked) {
			// Get id of `li` item and use as index (need to subtract 1)
			var index = selectBoxes[i].parentNode.id - 1;
			// Remove `li` item
			household.removeChild(selectBoxes[i].parentNode);
			// Use id to remove correct member from `householdArray`
			householdArray.splice(index,1);
		}
	}
}

function createMockData() {
	// Go through `householdArray` and stringify each element; add to `jsonDiv`
	for (var i = 0; i < householdArray.length; i++) {
		var text = JSON.stringify(householdArray[i]);
		var mockJSON = document.createElement('p');
		var mockText = document.createTextNode(text);
		mockJSON.appendChild(mockText);
		jsonDiv.appendChild(mockJSON);
	}
	jsonDiv.style.display = 'block';
}