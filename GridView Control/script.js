var controls = (function() {
	var GridView = (function() {
		var GridView = {
			init: function(container) {
				this.container = document.querySelector(container);
				this.header = null;
				this.rows = [];
				return this;
			},
			addHeader: function() {
				var headerTitles = Array.prototype.slice.call(arguments);
				if (this.header === null) {
					this.header = headerTitles;
				}
			},
			addRow: function() {
				var columnTitles = Array.prototype.slice.call(arguments);
				var newRow = Row.get(columnTitles);
				this.rows.push(newRow);
				return newRow;
			},
			render: function() {
				var mainTable = document.createElement('table');
				mainTable.className = 'gridview-table';

				if (this.header !== null) {
					var tableHeader = document.createElement('thead');
					mainTable.appendChild(tableHeader);
					var numberOfColumns = this.header.length;
					var headerRow = document.createElement('tr');
					tableHeader.appendChild(headerRow);
					for (var i = 0; i < numberOfColumns; i++) {
						var curCol = document.createElement('th');
						curCol.innerHTML = this.header[i];
						headerRow.appendChild(curCol);
					}
				}

				var numberOfRows = this.rows.length;
				if (numberOfRows > 0) {
					var tableBody = document.createElement('tbody');
					mainTable.appendChild(tableBody);

					for (var j = 0; j < numberOfRows; j++) {
						var curRowNode = document.createElement('tr');
						tableBody.appendChild(curRowNode);
						curRowElement = this.rows[j];
						var numberOfCols = curRowElement.columns.length;

						for (var col = 0; col < numberOfCols; col++) {
							var curCol = document.createElement('td');
							curCol.innerHTML = curRowElement.columns[col];
							curRowNode.appendChild(curCol);
						}

						if (curRowElement.nestedGridView !== null) {
							curRowNode = document.createElement('tr');
							curRowNode.className = 'nested-table-container';
							tableBody.appendChild(curRowNode);
							var nestedTableCol = document.createElement('td');
							nestedTableCol.colSpan = this.rows[0].columns.length;
							curRowNode.appendChild(nestedTableCol);
							curRowElement.nestedGridView.container = nestedTableCol;
							curRowElement.nestedGridView.render();
						}
					}
				}

				this.container.appendChild(mainTable);
			}
		};

		return {
			get: function(container) {
				return Object.create(GridView).init(container);
			}
		};
	})();

	var Row = (function() {
		var Row = {
			init: function(columns) {
				this.columns = columns;
				this.nestedGridView = null;
				return this;
			},
			getNestedGridView: function() {
				this.nestedGridView = GridView.get();
				return this.nestedGridView;
			}
		};

		return {
			get: function(columns) {
				return Object.create(Row).init(columns);
			}
		};
	})();

	return {
		getGridView: function(container) {
			return GridView.get(container);
		}
	};
})();



var schoolsGrid = controls.getGridView("#grid-view-holder");
schoolsGrid.addHeader("Name", "Location", "Total Students", "Specialty");
schoolsGrid.addRow("PMG", "Burgas", 400, "Math");
schoolsGrid.addRow("TUES", "Sofia", 500, "IT");
schoolsGrid.addRow("Telerik Academy", "Sofia", 5000, "IT");
// schoolsGridview .render();

var academyRow = schoolsGrid.addRow("Telerik Academy", "Sofia", "5000", "IT");
var academyGrid = academyRow.getNestedGridView();
academyGrid.addHeader("Title", "Start Date", "Total Students");
academyGrid.addRow("JS 2", "11-april-2013", 400);
academyGrid.addRow("SEO", "15-may-2013", 1300);
academyGrid.addRow("Slice and Dice", "05-april-2013", 500);

schoolsGrid.render();

// debugger;