(function($) {
	$.fn.gallery = function(numberOfColumns) {
		var $this = $(this.selector);
		numberOfColumns = numberOfColumns || 4;
		$this.addClass('gallery');

		$('.selected').css('display', 'none');


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
			curDataInfo = Number($('#current-image').attr('data-info')),
			nextCur = curDataInfo + 1;
			$currentImageNextNode = $('.image-container img[data-info="' + nextCur + '"]');
			$('#current-image').attr('src', $currentImageNextNode.attr('src'));
		});

	};
})(jQuery);