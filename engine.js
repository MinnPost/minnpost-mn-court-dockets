var url='https://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=minnesota_us_district_courts&query=SELECT%20*%0AFROM%20swdata%0AORDER%20BY%20Start%20DESC%0ALIMIT%2010';

var myd;

function formatDate(date) {
    var ampm = 'a.m.';
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    if (hours > 11) {
        if (hours > 12) {
            hours = hours - 12;
        }
        ampm = 'p.m.';
    }
    minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = minutes + '0';
    }
    return month + '/' + day + ' ' + hours + ':' + minutes + ' ' + ampm;
}

function getData(limit, searchTerm) {
    url = formatURL(limit, searchTerm);
    $.getJSON(url + '&callback=?', function(data) {
        myd = data;
        if (myd.length > 0) {
        var h = '<ul class="cd_dockets-list">';
    	for (i in data) {
    	    // JavaScript needs time in milliseconds
    	    var start = new Date(parseInt(data[i].Start) * 1000);
    	    var end = new Date(parseInt(data[i].End) * 1000);
    	    h += '<li class="cd_docket">';
    	    h += '<div class="cd_court cd_item">' + data[i].Court + '</div>';
    	    h += '<div class="cd_time cd_item">' + formatDate(start) + ' to ' + formatDate(end) + '</div>';
    	    h += '<div class="cd_description cd_item">' + data[i].Description + '</div>';
    	    h += '</li>';
    	}
    	h += '</ul>';
    	$('#cd_dockets-div').html(h);
    	} else {
    	    $('#cd_dockets-div').html('Error - no data receieved. Your search term may be invalid, or has returned nothing.');
    	}
    });
}

function formatURL(limit, searchTerm) {
    var baseUrl = 'https://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=minnesota_us_district_courts&query='
    var url = 'SELECT * from swdata';
    url += ' WHERE Description LIKE \'%' + searchTerm + '%\'';
    url += ' ORDER BY Start DESC';
    url += ' LIMIT ' + limit;
    return baseUrl + encodeURIComponent(url);
}

$(document).ready(function() {
    getData(10, '');
    $('#search').submit(function() {
        var query = $('#search-text').val();
        getData(10, query);
        return false;
    });
});