var Event = (function() {
	var Event = {
		init: function(startDate, endDate, location, description) {
			this.startDate = startDate;
			this.endDate = endDate;
			this.location = location;
			this.description = description;

			return this;
		},
		set startDate(value) {
			// if (!(value instanceof Date)) {
			// 	throw new Error('Invalid start date format');
			// }
			this._startDate = value;
		},
		get startDate() {
			return this._startDate;
		},
		set endDate(value) {
			// if (!(value instanceof Date)) {
			// 	throw new Error('Invalid end date format');
			// }
			this._endDate = value;
		},
		get endDate() {
			return this._endDate;
		},
		getHtmlElement: function() {
			var container = document.createElement('div');
			var table = document.createElement('table');
			table.appendChild(createTr('Start date:', document.getElementById('start-date').value));
			table.appendChild(createTr('End date:', document.getElementById('end-date').value));
			table.appendChild(createTr('Location:', document.getElementById('location').value));
			table.appendChild(createTr('Description:', document.getElementById('description').value));

			var removeButton = document.createElement('button');
			removeButton.textContent = 'Remove';
			removeButton.className = 'btn-remove-element';
			removeButton.addEventListener('click', removeEvent );
			table.appendChild(createTr(removeButton));

			container.appendChild(table);
			return container;
		}
	};

	function createTr() {
		var args = Array.prototype.slice.call(arguments);
		var row = document.createElement('tr');
		for (var i in args) {
			var col = document.createElement('td');
			if (args[i] instanceof HTMLElement) {
				col.appendChild(args[i]);
			} else {
				col.innerHTML = args[i];
			}
			row.appendChild(col);
		}
		return row;
	}

	return {
		get: function(startDate, endDate, location, description) {
			return Object.create(Event).init(startDate, endDate, location, description);
		}
	};
})();

var createButton = document.getElementById('submit-new-event');
createButton.addEventListener("click", createNewEvent, true);

function createNewEvent(e) {
	var startDate = document.getElementById('start-date').value;
	var endDate = document.getElementById('end-date').value;
	var location = document.getElementById('location').value;
	var description = document.getElementById('description').value;
	var newEvent = Event.get(startDate, endDate, location, description);
	document.getElementById('created-events').appendChild(newEvent.getHtmlElement());
}

function removeEvent(e){
	var target = e.target;
	var targetEvent = target.parentNode.parentNode.parentNode;
	targetEvent.parentNode.removeChild(targetEvent);
}


// debugger;