var Accordeon = (function() {
	NodeList.prototype.toArray = Array.prototype.slice;
	var globalContainer;

	var Accordeon = {
		init: function(container) {
			this.items = [];
			this.container = document.createElement('ul');
			globalContainer = this.container;
			document.querySelector(container).appendChild(this.container);
			return this;
		},
		add: function(itemTitle) {
			var itemToAdd = Item.get(itemTitle);
			this.items.push(itemToAdd);
			return itemToAdd;
		},
		render: function() {
			var items = this.items;
			var fragment = document.createDocumentFragment();

			for (var i in items) {
				var subitem = items[i].render();
				fragment.appendChild(subitem);
			}

			this.container.appendChild(fragment);

			function closeAllSubitems() {
				var hiddenSubItems = document.querySelectorAll('.subitem-box').toArray();
				hiddenSubItems.forEach(function(element, index) {
					element.style.display = 'none';
				});
			}

			function openAllSelected() {
				var hiddenSubItems = document.querySelectorAll('.selected').toArray();
				hiddenSubItems.forEach(function(element, index) {
					element.style.display = 'block';
				});
			}

			closeAllSubitems();
			var titles = document.querySelectorAll('.title').toArray();
			titles.forEach(function(element, index) {
				element.addEventListener('click', function() {
					if (element.parentNode.parentNode === globalContainer) {
						closeAllSubitems();
					};
					openAllSelected();
					var parents = element.parentNode;
					var subitemsContainer = element.nextSibling;
					if (subitemsContainer !== null) {
						if (subitemsContainer.style.display === 'none') {
							subitemsContainer.style.display = 'block';
						} else {
							subitemsContainer.style.display = 'none';
						}
					};
				});
			});

			var liElements = document.getElementsByTagName('li');
		}
	};

	return {
		get: function(container) {
			return Object.create(Accordeon).init(container);
		}
	}
})();

var Item = (function() {
	var Item = {
		init: function(title) {
			this.title = title;
			this.subitems = [];
			return this;
		},
		add: function(title) {
			var itemToAdd = Object.create(Item).init(title);
			this.subitems.push(itemToAdd);
			return itemToAdd;
		},
		render: function() {
			var liItem = document.createElement('li');
			var titleContainer = document.createElement('a');
			titleContainer.className = 'title';
			titleContainer.innerHTML = this.title;
			liItem.appendChild(titleContainer);
			if (this.subitems.length > 0) {
				var subitemsUl = document.createElement('ul');
				subitemsUl.className = 'subitem-box';
				for (var i in this.subitems) {
					var subitemLi = document.createElement('li');
					subitemLi.appendChild(this.subitems[i].render());
					subitemsUl.appendChild(subitemLi);
				}
				liItem.appendChild(subitemsUl);
			}

			return liItem;
		}
	};

	return {
		get: function(title) {
			return Object.create(Item).init(title);
		}
	}
})();

var acc = Accordeon.get(".accordeon");
var firstItem = acc.add('item 1');
var subFirstItem = firstItem.add('item 1.1');
subFirstItem.add('item 1.1.1');
acc.add('item 2');
acc.add('item 3');
var item4 = acc.add('item 4');
item4.add('item 4.1');
acc.render();
// debugger;