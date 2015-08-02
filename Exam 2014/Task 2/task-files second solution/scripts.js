(function($) {
	$.fn.gallery = function(numberOfColumns) {
		var $this = $(this);
		numberOfColumns = numberOfColumns || 4;
		$this.addClass('gallery');

		$('.selected').css('display', 'none');
		var $imageContainers = $('.gallery-list .image-container');
		var numberOfImages = $imageContainers.length;
		for (var i = 0; i < numberOfImages; i += numberOfColumns) {
			$('<br/>').insertAfter($imageContainers[i]);
		};

		$imageContainers.on('click', function() {
			var $this = $(this);
			$('.selected').css('display', 'block');
			var $selectedImage = $this.children('img');
			var currentDataInfo = Number($selectedImage.attr('data-info'));

			$('.gallery-list').addClass('blurred');

			fillSelectedByCentralDataInfo(currentDataInfo);
		});

		$('.previous-image').on('click', function() {
			var dataInfo = Number($(this).children('img').attr('data-info'));
			fillSelectedByCentralDataInfo(dataInfo);
		});

		$('.next-image').on('click', function() {
			var dataInfo = Number($(this).children('img').attr('data-info'));
			fillSelectedByCentralDataInfo(dataInfo);
		});

		$('.current-image').on('click', function() {
			$('.selected').css('display', 'none');
			$('.gallery-list').removeClass('blurred');
		});

		function fillSelectedByCentralDataInfo(dataInfo) {
			var $selectedImage = getImageByDataInfo(dataInfo);

			$nextImage = getImageByDataInfo(getNextDataInfo(dataInfo));
			$previousImage = getImageByDataInfo(getPrevDataInfo(dataInfo));

			$('.current-image img').attr('src', $selectedImage.attr('src'));
			$('.current-image img').attr('data-info', $selectedImage.attr('data-info'));

			$('.previous-image img').attr('src', $previousImage.attr('src'));
			$('.previous-image img').attr('data-info', $previousImage.attr('data-info'));

			$('.next-image img').attr('src', $nextImage.attr('src'));
			$('.next-image img').attr('data-info', $nextImage.attr('data-info'));
		}

		function getImageByDataInfo(dataInfo) {
			return $('.image-container img[data-info = "' + dataInfo + '"]');
		}

		function getPrevDataInfo(dataInfo) {
			var prev = dataInfo - 1;
			if (prev <= 0) {
				return numberOfImages;
			} else {
				return prev;
			}
		}

		function getNextDataInfo(dataInfo) {
			var prev = dataInfo + 1;
			if (prev > numberOfImages) {
				return 1;
			} else {
				return prev;
			}
		}
	};
})(jQuery);