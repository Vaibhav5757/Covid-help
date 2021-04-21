var cityList;
var params = '';

function buildTable(callback) {
    cityList.forEach(el => {
        var rowHtml =
            '<th scope="row">' +
            '<div class="sign-no">' +
            '</div>' +
            '</th>' +
            '<td>' +
            '<a class="city-name" href="#' +
            '">' +
            '<span>' + el + '</span>' +
            '</a>' +
            '</td>';
        var row = document.createElement('tr');
        row.innerHTML = rowHtml;
        $(".table-body").append(row);
    });
    if (callback != null) callback();
}

function buildParamString() {
    params = '';
    $(".quick-links .checkbox input").each(function() {
        if ($(this).prop("checked")) {
            if (params === '') {
                params = $(this).attr("val-attr");
            } else {
                params += "+OR+" + $(this).attr("val-attr");
            }
        }
    });
}

function verifiedCheck() {
    return $(".small-cities input").prop("checked") ? "verified" : "";
}

function redirect() {
    $(".city-name").click(function(event) {
        window.location = 'https://twitter.com/search?q=' + verifiedCheck() + '+%28+' + $(this).text() + '+%28' + params + '%29+-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22required%22&f=live';
    });
}

$.getJSON('./assests/in.json', function(data) {
    cityList = data.map(val => val.name);
    buildParamString();
    buildTable(redirect);
    $("#table").DataTable({
        "paging": false,
        "ordering": false,
        "info": false
    });
    $("#table").removeClass('d-none');
    $(".spinner").addClass('d-none');
});

$(document).ready(function() {
    $(".quick-links .checkbox input").change(function() {
        buildParamString();
    });
});