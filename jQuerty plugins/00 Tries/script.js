var elements = $('#sortable');

(function($){
	$.fn.zoom = function(){
		var $this = $(this.selector);
		$this.on('mouseover', function(){
			$this = $(this);
			$this.css('font-size', 30);
		});
	};
})(jQuery);

elements.zoom();