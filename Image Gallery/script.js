var controls = (function() {
	HTMLCollection.prototype.applyStyle = function (property, value){
		var length = this.length;
		for (var i = 0; i < length; i++) {
			this[i].style[property] = value;
		}
	};

	var imageGallery = (function() {
		var imageGallery = {
			init: function(container) {
				this.container = document.querySelector(container);
				this.items = [];
				return this;
			},
			addImage: function(title, path) {
				var newImage = image.get(title, path);
				this.items.push(newImage);
				return newImage;
			},
			addAlbum: function(title) {
				var newAlbum = album.get(title);
				this.items.push(newAlbum);

				return newAlbum;
			},
			render: function(){
				var itemsLength = this.items.length;
				var galleryContainerNode = document.createElement('div');
				galleryContainerNode.className = 'gallery-container';

				for (var i = 0; i < itemsLength; i++) {
					var currentItem = this.items[i];
					galleryContainerNode.appendChild(currentItem.render());
				}

				// Applying styles
				this.container.style.width = '600px';
				var allImageHolders = galleryContainerNode.getElementsByClassName('image-container');
				allImageHolders.applyStyle('display', 'inline-block');
				allImageHolders.applyStyle('border', '1px solid black');
				allImageHolders.applyStyle('borderRadius', '5px');
				allImageHolders.applyStyle('margin', '10px');
				allImageHolders.applyStyle('position', 'relative');


				var allTitles = galleryContainerNode.getElementsByTagName('p');
				allTitles.applyStyle('margin', '0 auto');
				allTitles.applyStyle('width', '50%');
				allTitles.applyStyle('position', 'relative');

				var allAlbumContainers = galleryContainerNode.getElementsByClassName('album-container');
				allAlbumContainers.applyStyle('border', '1px solid black');
				allAlbumContainers.applyStyle('margin', '0 auto');
				allAlbumContainers.applyStyle('margin', '10px');

				var allAlbumContentHolders = galleryContainerNode.getElementsByClassName('album-content');
				allAlbumContentHolders.applyStyle('display', 'none');
				allAlbumContentHolders.applyStyle('margin', '0 auto');
				this.container.appendChild(galleryContainerNode);

				// Events
				var albums = document.getElementsByClassName('album-container');
				galleryContainerNode.addEventListener('click', function(ev){
					if (ev.target.className.indexOf('album-title') !== -1) {
						var albumContentHolder = ev.target.nextSibling;
						if (albumContentHolder.style.display === 'none') {
							albumContentHolder.style.display = 'block';
						}else{
							albumContentHolder.style.display = 'none';
						}
					}
				});
			}
		};

		return imageGallery;
	})();

	var image = (function() {
		var image = {
			init: function(title, path) {
				this.title = title;
				this.path = path;
				return this;
			},
			render: function(){
				var divContainer = document.createElement('div');
				divContainer.className = 'image-container';

				var imageTitle = document.createElement('p');
				imageTitle.innerHTML = this.title;

				var imageNode = document.createElement('img');
				imageNode.src = this.path;

				divContainer.appendChild(imageTitle);
				divContainer.appendChild(imageNode);
				return divContainer;		
			}
		};

		return {
			get: function(title, path) {
				return Object.create(image).init(title, path);
			}
		};
	})();

	var album = (function() {
		var album = {
			init: function(title) {
				this.title = title;
				this.items = [];

				return this;
			},
			addImage: function(title, path) {
				this.items.push(image.get(title, path));
			},
			addAlbum: function(title) {
				var newAlbum = Object.create(album).init(title);
				this.items.push(newAlbum);
				return newAlbum;
			},
			render: function(){
				var divContainer = document.createElement('div');
				divContainer.className = 'album-container';

				var albumTitleNode = document.createElement('p');
				albumTitleNode.className = 'album-title';
				albumTitleNode.innerHTML = this.title;

				var albumContentContainer = document.createElement('div');
				albumContentContainer.className = 'album-content';

				divContainer.appendChild(albumTitleNode);
				divContainer.appendChild(albumContentContainer);

				var itemsLength = this.items.length;
				for (var i = 0; i < itemsLength; i++) {
					var currentItem = this.items[i];

					albumContentContainer.appendChild(currentItem.render());
				}

				// Styles				
				return divContainer;
			}
		};

		return {
			get: function(title) {
				return Object.create(album).init(title);
			}
		};
	})();

	return {
		getImageGallery: function(container) {
			return Object.create(imageGallery).init(container);
		}
	};
})();

var gallery = controls.getImageGallery("#image-gallery-holder");
gallery.addImage("JS Ninja", "images/js-ninja.png");
gallery.addImage("JS Ninja", "images/js-ninja.png");
gallery.addImage("JS Ninja", "images/js-ninja.png");

var ninjasAlbum = gallery.addAlbum("Ninjas");
ninjasAlbum.addImage("JS Ninja 2", "images/js-ninja.png");
ninjasAlbum.addImage("JS Ninja 2", "images/js-ninja.png");
ninjasAlbum.addImage("JS Ninja 2", "images/js-ninja.png");

var kidsAlbum = ninjasAlbum.addAlbum("Kids Ninjas");
kidsAlbum.addImage("Kid Ninja", "images/js-ninja.png");
kidsAlbum.addImage("Kid Ninja", "images/js-ninja.png");

gallery.render();
// debugger;