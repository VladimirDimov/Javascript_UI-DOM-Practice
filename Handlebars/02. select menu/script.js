var selectPattern = document.getElementById('pattern-select').innerHTML;
var handlebarsPattern = Handlebars.compile(selectPattern);

var options = {
	id: 'options-numbers',
	name: 'numbers',
	listOfOptions: [{
		value: 1,
		text: 'one'
	}, {
		value: 2,
		text: 'two'
	}, {
		value: 3,
		text: 'three'
	}]
};

document.body.innerHTML += handlebarsPattern(options);

var createdSelect = document.getElementById('options-numbers');

createdSelect.addEventListener('change', function(){
document.getElementById('selectedValue').innerHTML = createdSelect.value;

});

debugger;