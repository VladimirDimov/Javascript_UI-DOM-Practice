/* globals $ */
function createGallery(selector, columns) {
	var container = document.querySelector(selector);
	columns = columns || 4;
	container.className += ' gallery';
	var selected = container.getElementsByClassName('selected')[0];
	selected.style.display = 'none';
	var galleryList = document.getElementsByClassName('gallery-list')[0];

	var galleryImages = galleryList.getElementsByTagName('img');

	for (var i = 1; i < galleryList.children.length; i++) {
		if ((i+1) % columns === 0) {
			galleryList.children[i].parentNode.insertBefore(document.createElement('br'), galleryList.children[i]);
		};
	};


	galleryList.addEventListener('click', function(ev) {
		var target = ev.target;
		while (target.className.indexOf('image-container') === -1) {
			target = target.parentNode;
		}

		this.className += ' blurred';
		this.className += ' disabled-background';

		var currentIndex = Number(target.getElementsByTagName('img')[0].getAttribute('data-info')) - 1;

		var prevIndex;
		if (currentIndex - 1 < 0) {
			prevIndex = galleryImages.length - 1;
		} else {
			prevIndex = currentIndex - 1;
		}

		var nextIndex;
		if (currentIndex + 1 > galleryImages.length - 1) {
			nextIndex = 0;
		} else {
			nextIndex = currentIndex + 1;
		}

		var selected = container.getElementsByClassName('selected')[0];

		var selectedImages = selected.getElementsByTagName('img');
		var currentImage = document.getElementById('current-image')
		var previousImage = document.getElementById('previous-image')
		var nextImage = document.getElementById('next-image')


		currentImage.setAttribute('src', galleryImages[currentIndex].getAttribute('src'));
		currentImage.setAttribute('data-info', galleryImages[currentIndex].getAttribute('data-info'));

		previousImage.setAttribute('src', galleryImages[prevIndex].getAttribute('src'));
		previousImage.setAttribute('data-info', galleryImages[prevIndex].getAttribute('data-info'));

		nextImage.setAttribute('src', galleryImages[nextIndex].getAttribute('src'));
		nextImage.setAttribute('data-info', galleryImages[nextIndex].getAttribute('data-info'));

		selected.style.display = '';
	});

	selected.addEventListener('click', function(ev) {
		var target = ev.target;


		if (target.getAttribute('id') === 'current-image') {
			this.style.display = 'none';
			galleryList.className = galleryList.className.replace('blurred', '');
			galleryList.className = galleryList.className.replace('disabled-background', '');

			return;
		};

		var galleryImages = galleryList.getElementsByTagName('img');

		var currentIndex = Number(target.getAttribute('data-info')) - 1;

		var prevIndex;
		if (currentIndex - 1 < 0) {
			prevIndex = galleryImages.length - 1;
		} else {
			prevIndex = currentIndex - 1;
		}

		var nextIndex;
		if (currentIndex + 1 > galleryImages.length - 1) {
			nextIndex = 0;
		} else {
			nextIndex = currentIndex + 1;
		}

		var selected = container.getElementsByClassName('selected')[0];

		var selectedImages = selected.getElementsByTagName('img');
		var currentImage = document.getElementById('current-image')
		var previousImage = document.getElementById('previous-image')
		var nextImage = document.getElementById('next-image')


		currentImage.setAttribute('src', galleryImages[currentIndex].getAttribute('src'));
		currentImage.setAttribute('data-info', galleryImages[currentIndex].getAttribute('data-info'));

		previousImage.setAttribute('src', galleryImages[prevIndex].getAttribute('src'));
		previousImage.setAttribute('data-info', galleryImages[prevIndex].getAttribute('data-info'));

		nextImage.setAttribute('src', galleryImages[nextIndex].getAttribute('src'));
		nextImage.setAttribute('data-info', galleryImages[nextIndex].getAttribute('data-info'));
	});
}