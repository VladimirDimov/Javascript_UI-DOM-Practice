var templateHtml = document.getElementById('table-template').innerHTML;
var template = Handlebars.compile(templateHtml);

document.getElementById('container').innerHTML = (template({
    listOfRows: [{
        number: 1,
        title: 'Title 1',
        firstDate: 'First date 1',
        secondDate: 'Second date 1'
    }, {
        number: 2,
        title: 'Title 2',
        firstDate: 'First date 2',
        secondDate: 'Second date 2'
    }, {
        number: 3,
        title: 'Title 3',
        firstDate: 'First date 3',
        secondDate: 'Second date 3'
    }]
}));

debugger;