var controls = (function() {
	var accordeon = (function() {
		var accordeon = {
			init: function(container) {
				this.container = document.querySelector(container);
				this.items = [];
				return this;
			},
			add: function(itemTitle) {
				var itemToAdd = Object.create(item).init(itemTitle);
				this.items.push(itemToAdd);
				return itemToAdd;
			},
			render: function() {
				var numberOfItems = this.items.length;
				var fragment = document.createDocumentFragment();

				for (var i = 0; i < numberOfItems; i++) {
					var upperItem = this.items[i].render();
					upperItem.className = 'main-item';
					fragment.appendChild(upperItem);
					upperItem.style.width = '200px';
				}

				this.container.appendChild(fragment);
			}
		};

		return accordeon;
	})();

	var item = (function() {
		var item = {
			init: function(title) {
				this.title = title;
				this.nestedItems = [];
				return this;
			},
			add: function(itemTitle) {
				var itemToAdd = Object.create(item).init(itemTitle);
				this.nestedItems.push(itemToAdd);
				return itemToAdd;
			},
			render: function() {
				var numberOfNestedItems = this.nestedItems.length;

				var container = document.createElement('div');
				container.className = 'nested-item';
				container.style.border = '1px solid black';
				container.style.margin = '5px';
				container.style.backgroundColor = 'gray';

				var titleContainer = document.createElement('p');
				titleContainer.innerHTML = this.title;
				titleContainer.className = 'title-container';
				container.appendChild(titleContainer);
				titleContainer.style.padding = '0 5px';
				titleContainer.addEventListener('click', function() {
					var nestedContainer = this.nextSibling;
					if (nestedContainer.style.display !== 'none') {
						nestedContainer.style.display = 'none';
					} else {
						nestedContainer.style.display = 'block';
					}

					var parentContainer = this.parentNode;
					var nextSiblingContainer = parentContainer.nextSibling;
					while (nextSiblingContainer) {
						close(nextSiblingContainer);
						nextSiblingContainer = nextSiblingContainer.nextSibling;
					}

					var prevSiblingContainer = parentContainer.previousSibling;
					while (prevSiblingContainer) {
						close(prevSiblingContainer);
						prevSiblingContainer = prevSiblingContainer.previousSibling;
					}
				});

				function close(item){
					var nestedContainer = item.querySelector('.nested-items-container');
					nestedContainer.style.display = 'none';
				}

				var nestedItemsContainer = document.createElement('div');
				nestedItemsContainer.className = 'nested-items-container';
				container.appendChild(nestedItemsContainer);
				nestedItemsContainer.style.display = 'none';

				for (var i = 0; i < numberOfNestedItems; i++) {
					nestedItemsContainer.appendChild(this.nestedItems[i].render());
				}

				titleContainer.addEventListener('click', function() {

				});

				return container;
			}
		};

		return item;
	})();

	return {
		getAccordeon: function(container) {
			return Object.create(accordeon).init(container);
		}
	};
})();



var accordion = controls.getAccordeon("#accordeon-container");
var webItem = accordion.add("Web");
var nestedwebItem = webItem.add("HTML");
nestedwebItem.add("CSS");
webItem.add("JavaScript");
webItem.add("jQuery");
webItem.add("ASP.NET MVC");
var webItem2 = accordion.add("Web");
webItem2.add("HTML");
webItem2.add("CSS");
webItem2.add("JavaScript");
webItem2.add("jQuery");
webItem2.add("ASP.NET MVC");
accordion.add("Desktop");
accordion.add("Mobile");
accordion.add("Embedded");

accordion.render();


debugger;