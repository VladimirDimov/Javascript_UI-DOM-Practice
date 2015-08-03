function createCalendar(selector, events) {
    var daysOfWeek = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
	    allDays = [],
	    container = document.querySelector(selector),
        calendarContainer = document.createElement('div');


    var dayBox = (function () {
        var dayBox = {
            init: function (date) {
                this.date = date;
                this.dayOfWeek = daysOfWeek[(date + 5) % 7];
                this.month = 'June';
                this.events = null;
                return this;
            },
            render: function () {
                var dayBoxContainer = document.createElement('div');
                dayBoxContainer.style.display = 'inline-block';
                dayBoxContainer.style.width = '150px';
                dayBoxContainer.style.height = '250px';
                dayBoxContainer.style.position = 'relative';
                dayBoxContainer.style.border = '1px solid black';

                var titleContainer = document.createElement('p');
                dayBoxContainer.appendChild(titleContainer);
                titleContainer.innerHTML = this.dayOfWeek + ' ' +
                    this.date + ' ' +
                    this.month + ' ' +
                    '2014';
                titleContainer.style.borderBottom = '1px solid black';
                titleContainer.style.margin = 'auto';
                titleContainer.style.textAlign = 'center';
                titleContainer.style.fontWeight = '900';
                titleContainer.style.backgroundColor = '#ccc';
                titleContainer.addEventListener('mouseover', function () {
                    this.style.backgroundColor = 'gray';
                });
                titleContainer.addEventListener('mouseout', function () {
                    this.style.backgroundColor = '';
                });

                if (this.events !== null) {
                    var eventContainer = document.createElement('p');
                    dayBoxContainer.appendChild(eventContainer);
                    eventContainer.innerHTML = this.events.time + ' ' +
                        this.events.duration + ' ' +
                        this.events.title;
                    eventContainer.style.display = 'inline';
                    eventContainer.style.position = 'absolute';
                }

                return dayBoxContainer;
            }
        };

        return dayBox;
    }());

    for (var date = 1; date <= 30; date++) {
        allDays.push(Object.create(dayBox).init(date));
    }

    for (var event = 0; event < events.length; event++) {
        var dayIndex = Number(events[event].date) - 1;
        allDays[dayIndex].events = events[event];
    }

    // render

    for (var i = 0; i < allDays.length; i++) {
        calendarContainer.appendChild(allDays[i].render());
    }

    container.appendChild(calendarContainer);

    debugger;
}

createCalendar('#calendar-container', [
    {
        title: 'JavaScript UI & DOM exam',
        date: 17,
        time: '10:00',
        duration: 360
    },
    {
        title: 'JavaScript UI & DOM exam',
        date: 15,
        time: '10:00',
        duration: 360
    },
    {
        title: 'JavaScript UI & DOM exam',
        date: 3,
        time: '10:00',
        duration: 360
    }
]);