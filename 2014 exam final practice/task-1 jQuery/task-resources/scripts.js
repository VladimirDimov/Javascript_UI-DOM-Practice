function createImagesPreviewer(selector, items) {
	var $container = $(selector);

	var $mainContainer = $('<div>');

	// leftContainer
	var $leftContainer = $('<div>');
	$mainContainer.append($leftContainer);
	$leftContainer.css('width', '500px');
	$leftContainer.css('float', 'left');

	var $previewContainer = $('<div>');
	$leftContainer.append($previewContainer);

	var $previewTitle = $('<p>');
	$previewContainer.append($previewTitle);
	$previewTitle.html(items[0].title);

	var $previewImage = $('<img>');
	$previewContainer.append($previewImage);
	$previewImage.attr('src', items[0].url);
	$previewImage.css('width', '90%');

	// rightContainer
	var $rightContainer = $('<div>');
	$mainContainer.append($rightContainer);
	$rightContainer.css('width', '200px');
	$rightContainer.css('float', 'left');	

	var $labelForSearchbar = $('<label>');
	$rightContainer.append($labelForSearchbar);
	$labelForSearchbar.html('Search');

	var $searchbar = $('<input>');
	$rightContainer.append($searchbar);
	$searchbar.attr('type', 'text');
	var searchbarId = 'searchbar' + Math.random()
	$searchbar.attr('id', searchbarId);
	$labelForSearchbar.attr('for', searchbarId);

	var $iconsContainer = $('<div>');
	$rightContainer.append($iconsContainer);
	$iconsContainer.css('height', '500px');
	$iconsContainer.css('overflowY', 'scroll');

	for (var i = 0; i < items.length; i++) {
		var $iconContainer = $('<div>');
		$iconsContainer.append($iconContainer);

		var $iconTitle = $('<p>');
		$iconContainer.append($iconTitle);
		$iconTitle.html(items[i].title);

		var $iconImage = $('<img>');
		$iconContainer.append($iconImage);
		$iconImage.attr('src', items[i].url);
		$iconImage.css('width', '90%');
	};

	$iconsContainer.children('div').on('mouseover', function(){
		var $this = $(this);
		$this.css('background-color', '#ccc');
	});

	$iconsContainer.children('div').on('mouseout', function(){
		var $this = $(this);
		$this.css('background-color', '');
	});

	$iconsContainer.children('div').on('click', function(){
		var $this = $(this);
		$previewImage.attr('src', $this.children('img').attr('src'));
		$previewTitle.html($this.children('p').html());
	});

	$searchbar.on('change', function(){
		var $this = $(this);
		var substring = $this.val().toLowerCase();

		var $iconContainers = $iconsContainer.children('div');

		for (var i = 0; i < $iconContainers.length; i++) {
			if ($iconContainers.eq(i).children('p').html().toLowerCase().indexOf(substring) === -1) {
				$iconContainers.eq(i).hide();
			}else{
				$iconContainers.eq(i).show();
			}
		};

	});

	$container.append($mainContainer);
}