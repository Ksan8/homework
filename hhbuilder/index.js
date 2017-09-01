var householdArray = [];
var form = document.forms[0];
var addButton = document.querySelector('button.add');
var submitButton = document.querySelector('button[type=submit]');
var ageValid = false;
var relationshipValid = false;
var deleteButton, age, relationship, checkbox, smoker, household;

init();

function init() {
	validateForm();
}

function validateForm() {
	// Clicking on the `Add` button triggers validation
	addButton.addEventListener('click', function(){
		validateAge();
		validateRelationship();
		// add household member if age and relationship are validated
		if (ageValid && relationshipValid) {
			addPerson();
		}
	});

	deleteButton = document.createElement('button');
	var deleteText = document.createTextNode('delete');
	deleteButton.appendChild(deleteText);
	// TODO: insert into DOM after `Add` button

	// console.log(submitButton);


	form.addEventListener('submit', function(e){
		// TODO: fill in JSON mock-server data
	 	e.preventDefault();
	});
}

function validateAge() {
	age = document.querySelector('input[name=age]').value;
	// Validate age if an input is entered and it is > 0
	if (age && age > 0) {
		ageValid = true;
		console.log('age validated');
	} else {
		ageValid = false;
		alert("Please enter a valid age");
	}
}

function validateRelationship() {
	// relationship = document.querySelector('[name=rel]').value;
	relationship = document.querySelector('[name=rel]').value;
	// Validate relationship if an option is chosen
	if (relationship) {
		relationshipValid = true;
		console.log('relationship validated');
	} else {
		relationshipValid = false;
		alert("Please select the relationship of this person to you");
	}
}

function addPerson() {
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
	household = document.querySelector('ol.household');
	var newEntry = document.createElement('li');
	// Add a checkbox to the beginning of the new entry
	var entryCheckbox = document.createElement('input');
  entryCheckbox.type = 'checkbox';
	newEntry.appendChild(entryCheckbox);
	// Add member's info
	newEntry.appendChild(document.createTextNode(
		"Age: " + age + ", Relationship: " + relationship + ", Smoker: " + smoker
	));
	household.appendChild(newEntry);
}

function removePerson() {
	console.log('person removed');

}

// TODO:
// Remove a previously added person from the list
// Serialize the household as JSON upon form submission as a fake trip to the server
