$.getJSON('./assests/in.json', function(data) {
    var cityList = data.map(val => val.name);
    cityList.forEach(el => {
        var rowHtml =
            '<th scope="row">' +
            '<div class="sign-no">' +
            '</div>' +
            '</th>' +
            '<td>' +
            '<a class="city-name" href="' +
            'https://twitter.com/search?q=verified+' + el + '+%28bed+OR+beds+OR+oxygen+OR+ventilator+OR+ventilators+OR+fabiflu%29+-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22required%22&f=live' +
            '">' +
            '<span>' + el + '</span>'
        '</a>' +
        '</td>';
        var row = document.createElement('tr');
        row.innerHTML = rowHtml;
        $(".table-body").append(row);
    });
    $("#table").DataTable({
        "paging": false,
        "ordering": false,
        "info": false
    });
});