function createImagesPreviewer(selector, items) {
	var container = document.querySelector(selector);
	
	if (container == null) {
		throw '';
	};

	var mainContainer = document.createElement('div');
	var leftContainer = document.createElement('div');
	var rightContainer = document.createElement('div');
	mainContainer.appendChild(leftContainer);
	mainContainer.appendChild(rightContainer);
	leftContainer.style.float = 'left';
	leftContainer.style.width = '50%';
	rightContainer.style.float = 'left';
	rightContainer.style.width = '20%';

	// left
	var leftTitleContainer = document.createElement('div');
	leftTitleContainer.className += ' title-preview';
	leftContainer.appendChild(leftTitleContainer);
	leftTitleContainer.innerHTML = items[0].title;

	previewImage = document.createElement('img');
	leftContainer.appendChild(previewImage);
	previewImage.className += ' preview-image';
	previewImage.setAttribute('src', items[0].url);
	previewImage.style.width = '300px';

	// right
	var labelForSearchbar = document.createElement('label');
	labelForSearchbar.innerHTML = 'Search';
	rightContainer.appendChild(labelForSearchbar);

	var searchbar = document.createElement('input');
	rightContainer.appendChild(searchbar);
	var searchbarId = 'searchbar ' + Math.random();
	searchbar.id = searchbarId;
	labelForSearchbar.setAttribute('for', searchbarId);

	var iconsContainer = document.createElement('div');
	rightContainer.appendChild(iconsContainer);
	iconsContainer.style.height = '300px';
	iconsContainer.style.overflowY = 'scroll';
	items.forEach(function(element){
		var iconContainer = document.createElement('div'),
			iconTitle = document.createElement('p');
			iconImage = document.createElement('img');
		iconTitle.innerHTML = element.title;
		iconImage.setAttribute('src', element.url);
		iconContainer.appendChild(iconTitle);
		iconContainer.appendChild(iconImage);
		iconsContainer.appendChild(iconContainer);
		iconImage.style.width = '100%';

		iconContainer.className += ' icon-container';
	});

	iconsContainer.addEventListener('mouseover', function(ev){
		var target = ev.target;
		if (target.parentNode.className.indexOf('icon-container') !== -1) {
			target.parentNode.style.backgroundColor = '#ccc';
		}else if (target.className.indexOf('icon-container') !== -1) {
			target.style.backgroundColor = '#ccc';
		};
	});

	iconsContainer.addEventListener('mouseout', function(ev){
		var target = ev.target;
		if (target.parentNode.className.indexOf('icon-container') !== -1) {
			target.parentNode.style.backgroundColor = '';
		}else if (target.className.indexOf('icon-container') !== -1) {
			target.style.backgroundColor = '';
		};
	});

	iconsContainer.addEventListener('click', function(ev){
		var target = ev.target;
		if (target.tagName.toLowerCase() === 'img') {
			mainContainer.getElementsByClassName('preview-image')[0].setAttribute('src', target.getAttribute('src'));
		};
	});

	searchbar.addEventListener('input', function(){
		var iconContainers = iconsContainer.getElementsByClassName('icon-container');
		for (var i = 0; i < iconContainers.length; i++) {
			var currentTitleContainer = iconContainers[i].getElementsByTagName('p')[0];
			if (currentTitleContainer.innerHTML.toLowerCase().indexOf(this.value) === -1) {
				currentTitleContainer.parentNode.style.display = 'none';
			}else{
				currentTitleContainer.parentNode.style.display = '';				
			}
		};
	});

	container.appendChild(mainContainer);
	debugger;
}