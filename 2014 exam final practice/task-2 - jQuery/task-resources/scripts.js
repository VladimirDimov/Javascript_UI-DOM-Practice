/* globals $ */
$.fn.gallery = function(columns) {
	var $this = $(this);
	columns = columns || 4;
	$this.addClass('gallery');

	var $imageContainers = $this.find('.image-container');

	for (var i = 0; i < $imageContainers.length; i++) {
		if ((i + 1) % columns === 0) {
			$('<br>').insertAfter($imageContainers[i]);
		};
	};

	var $selected = $this.children('.selected');
	$selected.hide();

	$imageContainers.on('click', function() {
		$('.gallery-list').addClass('blurred');
		$('.gallery-list').addClass('disabled-background');
		$('.gallery-list').css('pointer-events', 'none');

		var $this = $(this);
		var thisIndex = Number($this.children('img').attr('data-info')) - 1;
		var prevIndex;
		if (thisIndex - 1 < 0) {
			prevIndex = $imageContainers.length - 1;
		} else {
			prevIndex = thisIndex - 1;
		}

		var nextIndex;
		if (thisIndex + 1 > $imageContainers.length - 1) {
			nextIndex = 0;
		} else {
			nextIndex = thisIndex + 1;
		}


		$selected.show();
		var $currentImage = $selected.children('.current-image');
		var $previousImage = $selected.children('.previous-image');
		var $nextImage = $selected.children('.next-image');

		$currentImage.children('img').attr('src', $imageContainers.eq(thisIndex).children('img').attr('src'));
		$currentImage.children('img').attr('data-info', $imageContainers.eq(thisIndex).children('img').attr('data-info'));

		$previousImage.children('img').attr('src', $imageContainers.eq(prevIndex).children('img').attr('src'));
		$previousImage.children('img').attr('data-info', $imageContainers.eq(prevIndex).children('img').attr('data-info'));

		$nextImage.children('img').attr('src', $imageContainers.eq(nextIndex).children('img').attr('src'));
		$nextImage.children('img').attr('data-info', $imageContainers.eq(nextIndex).children('img').attr('data-info'));

		$currentImage
	});

	$('.next-image').on('click', function() {
		var $this = $(this);
		var thisIndex = Number($this.children('img').attr('data-info')) - 1;
		var prevIndex;
		if (thisIndex - 1 < 0) {
			prevIndex = $imageContainers.length - 1;
		} else {
			prevIndex = thisIndex - 1;
		}

		var nextIndex;
		if (thisIndex + 1 > $imageContainers.length - 1) {
			nextIndex = 0;
		} else {
			nextIndex = thisIndex + 1;
		}


		$selected.show();
		var $currentImage = $selected.children('.current-image');
		var $previousImage = $selected.children('.previous-image');
		var $nextImage = $selected.children('.next-image');

		$currentImage.children('img').attr('src', $imageContainers.eq(thisIndex).children('img').attr('src'));
		$currentImage.children('img').attr('data-info', $imageContainers.eq(thisIndex).children('img').attr('data-info'));

		$previousImage.children('img').attr('src', $imageContainers.eq(prevIndex).children('img').attr('src'));
		$previousImage.children('img').attr('data-info', $imageContainers.eq(prevIndex).children('img').attr('data-info'));

		$nextImage.children('img').attr('src', $imageContainers.eq(nextIndex).children('img').attr('src'));
		$nextImage.children('img').attr('data-info', $imageContainers.eq(nextIndex).children('img').attr('data-info'));

		$currentImage
	});

	$('.previous-image').on('click', function() {
		var $this = $(this);
		var thisIndex = Number($this.children('img').attr('data-info')) - 1;
		var prevIndex;
		if (thisIndex - 1 < 0) {
			prevIndex = $imageContainers.length - 1;
		} else {
			prevIndex = thisIndex - 1;
		}

		var nextIndex;
		if (thisIndex + 1 > $imageContainers.length - 1) {
			nextIndex = 0;
		} else {
			nextIndex = thisIndex + 1;
		}


		$selected.show();
		var $currentImage = $selected.children('.current-image');
		var $previousImage = $selected.children('.previous-image');
		var $nextImage = $selected.children('.next-image');

		$currentImage.children('img').attr('src', $imageContainers.eq(thisIndex).children('img').attr('src'));
		$currentImage.children('img').attr('data-info', $imageContainers.eq(thisIndex).children('img').attr('data-info'));

		$previousImage.children('img').attr('src', $imageContainers.eq(prevIndex).children('img').attr('src'));
		$previousImage.children('img').attr('data-info', $imageContainers.eq(prevIndex).children('img').attr('data-info'));

		$nextImage.children('img').attr('src', $imageContainers.eq(nextIndex).children('img').attr('src'));
		$nextImage.children('img').attr('data-info', $imageContainers.eq(nextIndex).children('img').attr('data-info'));

		$currentImage
	});

	$('.current-image').on('click', function() {
		$('.gallery-list').removeClass('blurred');
		$('.gallery-list').removeClass('disabled-background');
		$('.gallery-list').css('pointer-events', '');
		$('.selected').hide();
	});
};