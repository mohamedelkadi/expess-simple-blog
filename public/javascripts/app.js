/**
 * Created by molhm on 6/10/16.
 */
var templates = [];
templates['posts'] = Handlebars.compile($("#list-posts-template").html());
templates['post'] = Handlebars.compile($("#show-post-template").html());

function fetchAndShow(url, selector, template) {
    console.log(url, selector, template);
    $.ajax({
        'url': url,
        'method': 'GET',
        'accepts': 'application/json'
    }).then(function (data) {
        var context = {}
        if (Array.isArray(data)) {
            context[template] = data;

        } else {
            context = data;
        }
        var html = templates[template](context);
        $('#posts').html("");
        $(selector).html(html);
    })

}
function hashRouter(event) {

    var url = (window.location.hash || '').replace(/^#/, '');
    if (url == '')
        return;
    var parts = url.split('/');
    var selector = '#' + parts[0];
    if (parts[1])
        template = 'post';
    else
        template = 'posts';
    fetchAndShow(url, selector, template);
}
$(window).on('load', hashRouter);

$(window).on('hashchange',
    hashRouter
);

fetchAndShow('/posts', '#posts', 'posts');
