var controls = (function() {
	var gallery = (function() {
		var gallery = {
			init: function(selector) {
				this.container = $(selector);
				this.images = [];
				this.albums = [];

				return this;
			},
			addImage: function(title, path) {
				this.images.push(Object.create(image).init(title, path));
			},
			addAlbum: function(title) {
				var albumToAdd = Object.create(album).init(title);
				this.albums.push(albumToAdd);
				return albumToAdd;
			},
			render: function() {
				var galleryContainer = $('<div>');
				galleryContainer.addClass('gallery-container');
				galleryContainer.css('width', '500px');
				galleryContainer.css('padding', '10px');
				galleryContainer.css('border', '1px solid black');

				for (var i = 0; i < this.images.length; i++) {
					galleryContainer.append(this.images[i].render());
				}

				for (var i = 0; i < this.albums.length; i++) {
					galleryContainer.append(this.albums[i].render());
				}

				this.container.empty();
				(this.container).append(galleryContainer);

				appendPreview(galleryContainer);
			}
		};

		function appendPreview($container) {
			var imagePreviewContainer = $('<div>');
			imagePreviewContainer.addClass('preview-container');
			imagePreviewContainer.css('position', 'fixed');
			imagePreviewContainer.css('display', 'none');
			imagePreviewContainer.css('top', '100px');
			imagePreviewContainer.css('left', '50%');
			imagePreviewContainer.css('border', '3px solid gray');
			imagePreviewContainer.on('click', function(){
				$(this).hide();
			});


			var titleContainer = $('<p>');

			var imageContainer = $('<img>');

			imagePreviewContainer.append(titleContainer);
			imagePreviewContainer.append(imageContainer);

			$container.append(imagePreviewContainer);
		}

		return gallery;
	})();

	var album = (function() {
		var album = {
			init: function(title) {
				this.title = title;
				this.images = [];
				this.nestedAlbums = [];

				return this;
			},
			addImage: function(title, path) {
				var imageToAdd = Object.create(image).init(title, path);
				this.images.push(imageToAdd);
				return imageToAdd;
			},
			addAlbum: function(title) {
				var albumToAdd = Object.create(album).init(title);
				this.nestedAlbums.push(albumToAdd);
				return albumToAdd;
			},
			render: function() {
				var albumContainer = $('<div>');
				albumContainer.addClass('album-container');
				albumContainer.css('border', '1px solid black');
				albumContainer.css('margin', '10px');
				albumContainer.css('padding', '10px');

				var albumTitleContainer = $('<strong>');
				albumTitleContainer.html(this.title);
				albumTitleContainer.css('padding', 'auto');
				albumTitleContainer.css('display', 'block');
				albumTitleContainer.css('width', '100%');
				albumTitleContainer.css('backgroundColor', 'gray');
				albumTitleContainer.on('click', function() {
					$(this).next().toggle();
				});

				var albumContentContainer = $('<div>');
				albumContentContainer.addClass('album-content');
				albumContentContainer.css('display', 'none');

				var imagesContainer = $('<div>');
				imagesContainer.addClass('images-container');
				for (var i = 0; i < this.images.length; i++) {
					imagesContainer.append(this.images[i].render());
				}
				// imagesContainer.css('display', 'none');

				var nestedAlbumsContainer = $('<div>');
				nestedAlbumsContainer.addClass('nested-albums-container');
				for (var i = 0; i < this.nestedAlbums.length; i++) {
					nestedAlbumsContainer.append(this.nestedAlbums[i].render());
				}

				albumContainer.append(albumTitleContainer);
				albumContentContainer.append(imagesContainer);
				albumContentContainer.append(nestedAlbumsContainer);
				albumContainer.append(albumContentContainer);

				return albumContainer;
			}
		};

		return album;
	})();

	var image = (function() {
		var image = {
			init: function(title, path) {
				this.title = title;
				this.path = path;
				return this;
			},
			render: function() {
				var imageContainer = $('<div>');
				imageContainer.addClass('image-container');
				imageContainer.css('display', 'inline-block');
				imageContainer.css('margin', '10px');
				imageContainer.css('width', '100px');
				imageContainer.css('border', '2px solid gray');
				imageContainer.css('border-radius', '5px');				
				imageContainer.on('click', function() {
					var $this = $(this);
					var $a = $this.parents('.gallery-container');
					var $previewContainer = $a.find($('.preview-container'));
					$previewContainer.children('img').attr('src', $this.children('img').attr('src'));
					$previewContainer.children('p').html($this.children('strong').html());
					$previewContainer.show();
				});

				var imagetTitleContainer = $('<strong>');
				imagetTitleContainer.html(this.title);
				imagetTitleContainer.css('display', 'block');

				var imageItem = $('<img>');
				imageItem.attr('src', this.path);
				imageItem.css('width', '100px');

				imageContainer.append(imagetTitleContainer);
				imageContainer.append(imageItem);

				return imageContainer;
			}
		};

		return image;
	})();

	function viewImage(path, title) {

	}

	return {
		getImageGallery: function(selector) {
			return Object.create(gallery).init(selector);
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