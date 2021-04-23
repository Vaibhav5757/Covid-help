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
            '<span>' + el.name + '</span>' +
            '</a>' +
            '</td>' +
            "<td>" +
            el.state +
            "</td>";
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

function getAdditionalSearchTerms() {
    return $("#additional-search").val().replace(" ", "+%20");
}

function redirect() {
    $(".city-name").click(function(event) {
        var url = 'https://twitter.com/search?q=' + verifiedCheck() + '+%28+' + $(this).text() + '+%28' + getAdditionalSearchTerms() + params + '%29+-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22required%22&f=live';
        window.open(url, "_blank");
    });
}

function numberOfRows() {
    return window.outerWidth < 768 ? [20] : [20, 50, 75, 100]
}

$.getJSON('./assests/in.json', function(data) {
    cityList = data;
    buildParamString();
    buildTable(redirect);
    $("#table").DataTable({
        "ordering": false,
        "info": false,
        "lengthMenu": numberOfRows(),
        "bLengthChange": window.outerWidth > 767,
        "paging": true,
        "pagingType": "simple",
        "language": {
            "search": "Enter City or State: ",
            // "searchPlaceholder": ""
        },
        "columnDefs": [{
            "targets": [2],
            "visible": false
        }],
        "bAutoWidth": false
    });
    $("#table").removeClass('d-none');
    $(".spinner").addClass('d-none');
});

$(document).ready(function() {
    $(".quick-links .checkbox input").change(function() {
        buildParamString();
    });
});