var url='https://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=minnesota_us_district_courts&query=SELECT%20*%0AFROM%20swdata%0AORDER%20BY%20Start%20DESC%0ALIMIT%2010';

function formatDate(date) {
    month = date.getMonth() + 1;
    date = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    return month + '/' + date + ' ' + hours + ':' + minutes;
}

$.getJSON(url + '&callback=?', function(data) {
    myd = data;
    var h = '<ul class="cd_dockets-list">';
	for (i in data) {
	    // JavaScript needs time in milliseconds
	    var start = new Date(parseInt(data[i].Start) * 1000);
	    var end = new Date(parseInt(data[i].End) * 1000);
	    console.log(start);
	    h += '<li class="cd_docket">';
	    h += '<div class="cd_start cd_item">' + start + '</div>';
	    h += '<div class="cd_end cd_item">' + end + '</div>';
	    h += '<div class="cd_court cd_item">' + data[i].Court + '</div>';
	    h += '<div class="cd_description cd_item">' + data[i].Description + '</div>';
	    h += '</li>';
	}
	h += '</ul>';
	$('#cd_dockets-div').html(h);
});