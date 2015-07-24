function CreateCalendar(selector, events) {
	var daysOfWeek = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

	var container = document.querySelector(selector);
	var selectedBox = null;

	var day = (function() {
		var day = {
			init: function(date) {
				this.date = date;
				this.event = null;
				return this;
			},
			addEvent: function(event) {
				this.event = event;
			},
			render: function() {
				var month = 'June',
					year = 2014,
					date = this.date;
					var day = daysOfWeek[((date + 5) % 7)];

				var dayBox = document.createElement('div');
				dayBox.className = 'day-box';
				dayBox.style.display = 'inline-block';
				dayBox.style.position = 'float-left';
				dayBox.style.width = '150px';
				dayBox.style.height = '200px';
				dayBox.style.border = '1px solid black';

				var titleBox = document.createElement('strong');
				titleBox.className = 'title-box';
				dayBox.appendChild(titleBox);
				titleBox.innerHTML = day + ' ' + date + ' ' + month + ' ' + year;
				titleBox.style.borderBottom = '1px solid black';
				titleBox.style.display = 'block';

				var eventBox = document.createElement('div');
				dayBox.appendChild(eventBox);
				dayBox.style.position = 'relative';			
				eventBox.style.display = 'table-cell';

				if (this.event !== null) {
					eventBox.innerHTML = this.event.time + ' ' +
						this.event.duration + ' ' +
						this.event.title;
				};

				titleBox.addEventListener('mouseover', function(ev){
					ev.target.style.backgroundColor = 'red';
				});

				titleBox.addEventListener('mouseout', function(ev){
					ev.target.style.backgroundColor = '';
				});

				dayBox.addEventListener('click', function(ev){					
					if (!selectedBox) {
						selectedBox = this;
						this.style.backgroundColor = 'gray';
					};
					if (selectedBox !== this) {
						selectedBox.style.backgroundColor = '';
						this.style.backgroundColor = 'gray';
						selectedBox = this;
					};
				});

				return dayBox;
			}
		};

		return day;
	})();

	var calendar = [];

	for (var i = 1; i <= 30; i++) {
		var newDay = Object.create(day).init(i);

		calendar.push(newDay);
	};

	for (var i = 0; i < events.length; i++) {
		var event = events[i];
		calendar[event.date - 1].event = event;
	}

	for (var i = 0; i < calendar.length; i++) {
		container.appendChild(calendar[i].render());
	};

	// styles
	// debugger;
}

CreateCalendar('#calendar-container', [{
	title: 'JavaScript UI & DOM exam',
	date: 17,
	time: '10:00',
	duration: 360
}]);