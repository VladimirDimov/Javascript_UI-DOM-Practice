var controls = (function () {
    var gridView = (function () {
        var gridView = {
            init: function (selector) {
                this.$container = $(selector);
                this.header = null;
                this.rows = [];

                return this;
            },
            addHeader: function (args) {
                this.header = Array.prototype.slice.call(arguments);
            },
            addRow: function () {
                var rowCells = Array.prototype.slice.call(arguments);
                var rowToAdd = Object.create(row).init(rowCells);
                this.rows.push(rowToAdd);
                return rowToAdd;
            },
            
            render: function () {
                var $table = $('<table>');
                var $headerRow = $('<tr>'),
                    $headerCell = $('<th>');
                for (var i = 0; i < this.header.length; i++) {
                    var $currentCell = $headerCell.clone();
                    $currentCell.html(this.header[i]);
                    $headerRow.append($currentCell);
                }
                $table.append($headerRow);

                for (var i = 0; i < this.rows.length; i++) {
                    var currentRow = this.rows[i].render();
                    for (var j = 0; j < currentRow.length; j++) {
                        $table.append(currentRow[j]);
                    }
                }

                //styles
                $table.css('margin', '0');
                $table.css('padding', '10px');
                $table.find('td, th').css('border', '1px solid black');
                $table.find('td, th').css('margin', '0');
                $table.find('td, th').css('padding', '5px');
                $table.find('table').css('margin', 'auto');

                this.$container.empty();
                this.$container.append($table);
            }
        };

        return gridView;
    }());

    var row = (function () {
        var row = {
            init: function (rowCells) {
                this.rowCells = rowCells;
                this.$nestedGridView = null;
                return this;
            },
            getNestedGridView: function () {
                this.$nestedGridView = Object.create(gridView).init();
                return this.$nestedGridView;
            },
            render: function () {
                var result = [];
                var $row = $('<tr>');
                var $cell = $('<td>');
                for (var i = 0; i < this.rowCells.length; i++) {
                    var $cellToAdd = $cell.clone();
                    $cellToAdd.html(this.rowCells[i]);
                    $row.append($cellToAdd);
                }
                result.push($row);
                if (this.$nestedGridView !== null) {
                    var $nestedGridViewRow = $('<tr>');
                    $nestedGridViewRow.hide();
                    $nestedGridViewRow.addClass('nestedGridview-container');
                    var $nestedGridViewCell = $('<td>');
                    $nestedGridViewCell.attr('colspan', this.rowCells.length);
                    this.$nestedGridView.$container = $nestedGridViewCell;
                    $nestedGridViewCell.append(this.$nestedGridView.render());

                    $nestedGridViewRow.append($nestedGridViewCell);
                    result.push($nestedGridViewRow);

                    $row.on('click', function () {
                        var $this = $(this);
                        $this.next().toggle();
                    });

                    $row.on('mouseover', function () {
                        var $this = $(this);
                        $this.css('background-color', 'gray');
                        $this.css('cursor', 'pointer');
                    });

                    $row.on('mouseout', function () {
                        var $this = $(this);
                        $this.css('background-color', '');
                        $this.css('cursor', '');
                    });
                }

                return result;
            }
        };

        return row;
    }());

    return {
        getGridView: function (selector) {
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
var nestedGridRow = academyGrid.addRow("Slice and Dice", "05-april-2013", 500);
var academyGrid2 = nestedGridRow.getNestedGridView();
academyGrid2.addHeader("Title", "Start Date", "Total Students");
academyGrid2.addRow("JS 2", "11-april-2013", 400);
academyGrid2.addRow("SEO", "15-may-2013", 1300);
academyGrid2.addRow("Slice and Dice", "05-april-2013", 500);


schoolsGrid.render();

//debugger;
