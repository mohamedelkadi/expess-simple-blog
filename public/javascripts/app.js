/**
 * Created by molhm on 6/10/16.
 */
var templates = [];
var routes = [];
templates['posts'] = Handlebars.compile($("#list-posts-template").html());
templates['post'] = Handlebars.compile($("#show-post-template").html());
templates['create'] = Handlebars.compile($("#create-post-template").html());

routes["posts"] = {
    template: "posts",
    remote: true
};
routes["posts/new"] = {
    template: "create",
    remote: false
};
routes["posts/:params"] = {
    template: "post",
    remote: true
};

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
function showOnly(selector, template) {
    var html = templates[template]();
    $(selector).html(html);
}
function hashRouter(event) {
    var template;
    var routeInfo;
    var url = (window.location.hash || '').replace(/^#/, '');
    if (url == '')
        return;
    var parts = url.split('/');
    var selector = '#' + parts[0];

    if (routeInfo = routes[url]) {
        template = routeInfo["template"];
    } else if (parts[1]) {
        console.log(parts[0] + "/:params");
        if (routeInfo = routes[parts[0] + "/:params"]) {
            template = routeInfo['template'];

        } else {
            throw  Error("no route ");
        }
    } else {

        throw  Error("no route ");
    }
    if (routeInfo['remote'] == true)
        fetchAndShow(url, selector, template);
    else
        showOnly(selector, template);
}
$(window).on('load', hashRouter);

$(window).on('hashchange',
    hashRouter
);

fetchAndShow('/posts', '#posts', 'posts');
