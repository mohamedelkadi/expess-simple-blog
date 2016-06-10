/**
 * Created by molhm on 6/10/16.
 */
var source = $("#list-posts-template").html();
var template = Handlebars.compile(source);

$.ajax({
    'url': '/posts',
    'method': 'GET',
    'accepts': 'application/json'
}).then(function (data) {
    var context = {
        "posts": data
    }
    var html = template(context);
    $('#posts').html(html);
})