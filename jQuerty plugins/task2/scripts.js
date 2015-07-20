(function($) {
	$.fn.tabs = function() {
		var $this = $(this.selector);
		$this.addClass('tabs-container');
		var innerDivs = $this.find('.tab-item-content');
		innerDivs.css('display', 'none');
		innerDivs.first().css('display', 'block');

		$this.find('.tab-item-title').on('click', function() {
			innerDivs = $this.find('.tab-item-content');
			innerDivs.css('display', 'none');
			$this.find('.tab-item').removeClass('current');
			var parent = $(this).parent('div');
			parent.addClass('current');
			$(this).siblings('.tab-item-content').css('display', 'block');
		});
	};
})(jQuery);