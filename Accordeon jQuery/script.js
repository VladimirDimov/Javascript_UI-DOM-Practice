(function($) {
	$.fn.accord = function() {
		var $this = $(this);
		var $nestedUl = $this.find('li ul');
		$nestedUl.hide();
		$expandable = $nestedUl.prev();
		$expandable.on('click', function() {
			var $this = $(this);
			$this.next().toggle(200);
		});

		$expandable.hover(function() {
			$(this).css('cursor', 'pointer');
			$(this).css('background-color', 'gray');
		}, function(){
			$(this).css('background-color', 'white');
		});

		// CSS
		$('li').css('list-style', 'none');
		$('p').css('width', '150px');
		$('p').css('border', '1px solid black');

		var $nestedTitle = $nestedUl.prev('p');
		$this.css('border', '1px solid gray');
		$this.css('width', '500px');
	}
})(jQuery);

var container = $("div");

container.accord();