function createImagesPreviewer(selector, items) {
	var container = document.querySelector(selector);

	// Preview box
	var previewBox = document.createElement('div');
	previewBox.setAttribute('id', 'preview-box');
	container.appendChild(previewBox);
	previewBox.style.width = '650px';
	previewBox.style.height = '600px';
	previewBox.style.display = 'inline-block';
	previewBox.style.position = 'relative';
	previewBox.style.border = '1px solid black';

	var previewTitle = document.createElement('strong');
	previewTitle.setAttribute('id', 'preview-title');
	previewBox.appendChild(previewTitle);
	previewBox.appendChild(document.createElement('br'));
	previewTitle.style.display = 'inline-block';
	previewTitle.style.margin = 'auto';

	var previewPicture = document.createElement('img');
	previewPicture.setAttribute('id', 'preview-picture');
	previewPicture.setAttribute('src', items[0].url);
	previewBox.appendChild(previewPicture);
	previewPicture.style.width = '90%';
	previewPicture.style.height = '90%';

	// SideBar
	var sideBar = document.createElement('div');
	sideBar.setAttribute('id', 'side-bar');
	container.appendChild(sideBar);
	sideBar.style.display = 'inline-block';
	sideBar.style.position = 'relative';
	sideBar.style.border = '1px solid black';
	sideBar.style.width = '200px';
	sideBar.style.height = '600px';
	sideBar.style.overflowY = 'scroll';

	var lableForSearchBox = document.createElement('label');
	lableForSearchBox.setAttribute('for', 'search-box');
	lableForSearchBox.innerHTML = 'Filter';
	sideBar.appendChild(lableForSearchBox);
	sideBar.appendChild(document.createElement('br'));

	var searchTextBox = document.createElement('input');
	searchTextBox.setAttribute('type', 'text-box');
	searchTextBox.setAttribute('id', 'search-box');
	sideBar.appendChild(searchTextBox);

	searchTextBox.addEventListener('change', function() {
		var substring = this.value.toLowerCase();
		var iconsHolder = document.getElementById('pictures-container');
		while (iconsHolder.childNodes[0]) {
			iconsHolder.childNodes[0].parentNode.removeChild(iconsHolder.childNodes[0]);
		}

		var filteredIcons = items.filter(function(item){
			return item.title.toLowerCase().indexOf(substring) !== -1;
		});

		addIcons(filteredIcons);
	});

	var iconsContainer = document.createElement('div');
	iconsContainer.setAttribute('id', 'pictures-container');
	sideBar.appendChild(iconsContainer);

	function addIcons(filteredIcons) {
		for (var i = 0; i < filteredIcons.length; i++) {
			var currentPicture = filteredIcons[i],
				pictureContainer = document.createElement('div');
			pictureContainer.setAttribute('image-title', currentPicture.title);

			var titleContainer = document.createElement('strong');
			titleContainer.innerHTML = currentPicture.title;
			pictureContainer.appendChild(titleContainer);
			titleContainer.style.display = 'block';

			var picture = document.createElement('img');
			picture.setAttribute('src', currentPicture.url);
			picture.className = 'icon';
			pictureContainer.appendChild(picture);
			iconsContainer.appendChild(pictureContainer);

			// styles
			picture.style.width = '150px';

			pictureContainer.addEventListener('mouseover', function() {
				this.style.backgroundColor = 'gray';
			});

			pictureContainer.addEventListener('mouseout', function() {
				this.style.backgroundColor = '';
			});

			pictureContainer.addEventListener('click', function() {
				var clickedPicture = this.getElementsByTagName('img')[0];
				var previewImage = document.getElementById('preview-picture');
				previewImage.setAttribute('src', clickedPicture.getAttribute('src'));

				document.getElementById('preview-title').innerHTML = this.getAttribute('image-title');

			});
		}
	};

	addIcons(items);

	sideBar.appendChild(iconsContainer);
}