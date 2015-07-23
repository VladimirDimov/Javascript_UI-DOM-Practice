(function($) {
	$.fn.accord = function() {
		var $this = $(this);
		var $nestedUl = $this.find('li ul');
		$nestedUl.hide();
		$expandable = $nestedUl.prev();
		$expandable.on('click', function() {
			var $this = $(this);
			$this.next().delay(1000).toggle();
		});

		// CSS
		$('li').css('list-style', 'none');
		$('p').css('width', '150px');
		$('p').css('border', '1px solid black');
		$('p').each(function() {
			var $this = $(this)
			var red = 255 - $this.parents().length * 10;
			$this.css('background-color', 'rgb(' + red + ', 0,0)');
		});


	}
})(jQuery);

var container = $("div");

container.accord();