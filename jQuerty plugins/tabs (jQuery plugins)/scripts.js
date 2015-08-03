$.fn.tabs = function() {
	var $this = $(this);
	$this.addClass('tabs-container');
	$('.tab-item-content').css('display', 'none');
	$('.tab-item:first-child .tab-item-content').css('display', '');

	$('.tab-item-title').on('click', function() {
		var $this = $(this);
		$('.tab-item-title').css('background-color', '');
		$('.tab-item-title').css('border-bottom', '');

		$('.tab-item-content').css('display', 'none');
		$this.next('.tab-item-content').css('display', '');
		$this.css('background-color', '#ccc');
		$this.css('border-bottom', 'none');
	});
};