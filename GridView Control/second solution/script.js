var controls = (function(){
	var gridView = (function(){
		var gridView = {
			init: function(selector){
				this.container = document.querySelector(selector);
				this.headerTitles = [];
				this.rows = [];
				this.sorted = null;
				
				return this;
			},
			addHeader: function(args){
				for (var i = 0; i < arguments.length; i++) {
					this.headerTitles.push(arguments[i]);					
				}
			},
			addRow: function(args){
				var rowToAdd = Object.create(row).init(Array.prototype.slice.call(arguments));							
				this.rows.push(rowToAdd);
				
				return rowToAdd;
			},
			render: function(){
				var tableNode = document.createElement('table');
				var headerNode = document.createElement('tr');
				var th = document.createElement('th');
				for (var i = 0; i < this.headerTitles.length; i++) {
					var curTh = th.cloneNode(false);
					curTh.innerHTML = this.headerTitles[i];
					headerNode.appendChild(curTh);					
				}
				tableNode.appendChild(headerNode);		
				
				for (var i = 0; i < this.rows.length; i++) {
					tableNode.appendChild(this.rows[i].render());			
				}
				
				this.container.appendChild(tableNode);
				return tableNode;
			}			
		};
		
		return gridView;
	}());
	
	var row = (function(){
		var row = {
			init: function(rowTitles){
				this.titles = [];
				for (var i = 0; i < rowTitles.length; i++) {
						this.titles = rowTitles.slice();			
				}
				this.nestedGridView = null;
				return this;
			},
			getNestedGridView: function(){
				var nestedGridView = Object.create(gridView).init();
				this.nestedGridView = nestedGridView;
				return this.nestedGridView;
			},
			render: function(){
				var fragment = document.createDocumentFragment();
				
				var rowNode = document.createElement('tr');
				var tdNode = document.createElement('td');
				for (var i = 0; i < this.titles.length; i++) {
					var curTd = tdNode.cloneNode(false);
					curTd.innerHTML = this.titles[i];
					rowNode.appendChild(curTd);				
				}
				rowNode.addEventListener('click', function(){
					var nextSibling = this.nextSibling;
					if (!nextSibling) {
						return;
					}
					if (nextSibling.className.indexOf('nestedGridView-container') !== -1) {
						if (nextSibling.style.display !== 'none') {
							nextSibling.style.display = 'none';
						}else{
							nextSibling.style.display = '';
						}
					}
				});
				fragment.appendChild(rowNode);
				if (this.nestedGridView !== null) {
					var nestedGridViewRow = document.createElement('tr');
					nestedGridViewRow.className +=  'nestedGridView-container';
					var nestedGridViewCell = document.createElement('td');
					nestedGridViewCell.setAttribute('colspan', this.titles.length);
					this.nestedGridView.container = nestedGridViewCell;
					this.nestedGridView.className += ' nested-gridView';
					this.nestedGridView.render();
					nestedGridViewRow.style.display = 'none';
					nestedGridViewRow.appendChild(nestedGridViewCell);
					fragment.appendChild(nestedGridViewRow);
				}				
				
				return fragment;
			}
		};
		
		return row;
	}());
	
	return {
		getGridView: function(selector){
			return Object.create(gridView).init(selector);
		}
	}			
}());		

var schoolsGrid = controls.getGridView("#grid-view-holder");
schoolsGrid.addHeader("Name", "Location", "Total Students", "Specialty");
schoolsGrid.addRow("PMG", "Burgas", 400, "Math");
schoolsGrid.addRow("TUES", "Sofia", 500, "IT");
schoolsGrid.addRow("Telerik Academy", "Sofia", 5000, "IT");

var academyRow = schoolsGrid.addRow("Telerik Academy", "Sofia", "5000", "IT");
 var academyGrid = academyRow.getNestedGridView();
  academyGrid.addHeader("Title", "Start Date", "Total Students");
  academyGrid.addRow("JS 2", "11-april-2013", 400);
  academyGrid.addRow("SEO", "15-may-2013", 1300);
  academyGrid.addRow("Slice and Dice", "05-april-2013", 500);
  
  schoolsGrid.render();

debugger;