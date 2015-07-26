function createImagesPreviewer(selector, items) {
	var container = document.querySelector(selector);

	// Sidebar
	var sidebar = document.createElement('div');

	var filterTextBox = document.createElement('input');
	filterTextBox.setAttribute('type', 'text');
	filterTextBox.className = 'search-box';

	var filterLabel = document.createElement('label');
	filterLabel.setAttribute('for', 'search-box');

	var iconsContainer = document.createElement('div');

	function updateIcons(filteredItems) {
		removeChilds(iconsContainer);
		for (var i = 0; i < filteredItems.length; i++) {
			var iconContainer = document.createElement('div'),
				title = document.createElement('strong');
			title.innerHTML = filteredItems[i].title;
			iconContainer.className += ' icon-container';
			var image = document.createElement('img');
			image.setAttribute('src', filteredItems[i].url);

			iconContainer.appendChild(title);
			iconContainer.appendChild(image);
			iconsContainer.appendChild(iconContainer);

			// Styles
			image.style.width = '150px';

			// Events - iconContainer
			iconContainer.addEventListener('mouseover', function() {
				this.style.backgroundColor = 'gray';
			});

			iconContainer.addEventListener('mouseout', function(ev) {
				this.style.backgroundColor = '';
			});

			iconContainer.addEventListener('click', function() {
				var picturePath = this.lastChild.getAttribute('src'),
					pictureTitle = this.firstChild.innerHTML;

				previewImage.setAttribute('src', picturePath);
				previewTitle.innerHTML = pictureTitle;
			});
		}
	}

	function removeChilds(node){
		var childs = node.childNodes	;
		while(childs[0]){
			childs[0].parentNode.removeChild(childs[0]);
		}
	}

	updateIcons(items);

	sidebar.appendChild(filterLabel);
	sidebar.appendChild(filterTextBox);
	sidebar.appendChild(iconsContainer);

	// Previewbar
	var previewbar = document.createElement('div');
	var previewTitle = document.createElement('strong');
	var previewImage = document.createElement('img');

	previewbar.appendChild(previewTitle);
	previewbar.appendChild(previewImage);

	// Appending elements to container
	container.appendChild(previewbar);
	container.appendChild(sidebar);

	// Styles-previewbar
	previewbar.style.width = '500px';
	previewbar.style.height = '400px';
	previewbar.style.border = '1px solid black';
	previewbar.style.float = 'left';

	// Styles-previewImage
	previewImage.style.width = '100%';

	// Styles-sidebar
	sidebar.style.float = 'left';
	sidebar.style.width = '180px';
	sidebar.style.border = '1px solid black';
	sidebar.style.height = '400px';
	sidebar.style.overflowY = 'scroll';

	// Styles-searchbox
	filterTextBox.style.width = '150px';

	// Events
	filterTextBox.addEventListener('change', function() {
		var filteredItems = items.slice().filter(function(item){
			return item.title.toLowerCase().indexOf(filterTextBox.value) !== -1;
		});

		updateIcons(filteredItems);
	});
}