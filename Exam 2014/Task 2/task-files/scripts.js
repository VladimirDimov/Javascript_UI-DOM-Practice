(function($) {
	$.fn.gallery = function(numberOfColumns) {
		var $this = $(this.selector);
		var numberOfPictures = $('.gallery-list img').length;
		numberOfColumns = numberOfColumns || 4;
		$this.addClass('gallery');

		$('.selected').css('display', 'none');

		var $pictures = $('.image-container');

		for (var i = numberOfColumns - 1; i < $pictures.length; i += numberOfColumns) {
			$(document.createElement('br')).insertAfter($($pictures[i]));
		}

		//Events
		$('.image-container').on('click', function() {
			var $this = $(this),
				$selectedImg = $(this).children('img').first(),
				$nextImg = $this.next().children('img').first(),
				$prevImg = $this.prev().children('img').first();

			$('#previous-image').attr('src', $prevImg.attr('src'));
			$('#previous-image').attr('data-info', $prevImg.attr('data-info'));
			$('#current-image').attr('src', $selectedImg.attr('src'));
			$('#current-image').attr('data-info', $selectedImg.attr('data-info'));
			$('#next-image').attr('src', $nextImg.attr('src'));
			$('#next-image').attr('data-info', $nextImg.attr('data-info'));

			$('.gallery-list').addClass('blurred');
			$('.selected').css('display', 'block');
		});

		$('#next-image').on('click', function() {
			nextPicture($(this), 1);
			nextPicture($('#current-image'), 1);
			nextPicture($('#previous-image'), 1);
		});

		$('#previous-image').on('click', function() {
			nextPicture($(this), -1);
			nextPicture($('#current-image'), -1);
			nextPicture($('#next-image'), -1);
		});

		$('#current-image').on('click', function() {
			$('.gallery .blurred').removeClass('blurred');
			$('.gallery .selected').css('display', 'none');
		});

		function nextPicture(pictureNode, direction) {
			var dataInfo = (Number(pictureNode.attr('data-info')) + direction);
			if (dataInfo === numberOfPictures + 1) {
				dataInfo = 1;
			}
			if (dataInfo === -1 + 1) {
				dataInfo = numberOfPictures;
			}
			var $nextPicture = $('.gallery-list img[data-info=' + dataInfo + ']');
			pictureNode.attr('src', $nextPicture.attr('src'));
			pictureNode.attr('data-info', $nextPicture.attr('data-info'));
		}
	};
})(jQuery);