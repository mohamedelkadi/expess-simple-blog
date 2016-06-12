/**
 * Created by molhm on 6/10/16.
 */
var templates = [];
var routes = [];
templates['posts'] = Handlebars.compile($("#list-posts-template").html());
templates['post'] = Handlebars.compile($("#show-post-template").html());
templates['create'] = Handlebars.compile($("#create-post-template").html());
templates['home'] = Handlebars.compile($("#home-template").html());
templates['edit'] = Handlebars.compile($("#edit-post-template").html());

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
routes["posts/delete/:params"] = {
    template: "post",
    remote: true
};
routes["posts/edit/:params"] = {
    template: "edit",
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
    }).fail(function () {

        $('#posts').html("<p class='alert-danger text-center' style='font-size:larger'>" +
            "something wrong happened " +
            "</p>");
    });

}
function showOnly(selector, template) {
    var html = templates[template]();
    $(selector).html(html);

}

function deletePost(url) {
    $.ajax({
        method: "DELETE",
        url: url
    });
    showOnly('#main', 'home');

}
function hashRouter(event) {
    console.log("hash router called");
    var template;
    var routeInfo;
    var url = (window.location.hash || '').replace(/^#/, '');
    if (url == '') {
        showOnly('#main', 'home');
        return;

    }
    console.log("url is ", url);
    var parts = url.split('/');

    if (routeInfo = routes[url]) {
        template = routeInfo["template"];
    } else if (parts[1]) {
        console.log(parts[0] + "/:params");
        if (routeInfo = routes[parts[0] + "/:params"]) {
            template = routeInfo['template'];
            if (parts[1] == 'delete') {
                deletePost(url);
                return;
            }
            if (parts[1] == 'edit') {
                routeInfo = routes[parts[0] + "/" + parts[1] + "/:params"]
                console.log(routeInfo);
                template = 'edit';

                url = parts[0] + "/" + parts[2];
            }
        } else {
            throw  Error("no route ");
        }
    } else {

        throw  Error("no route ");
    }
    var selector = routeInfo['selector'] || "#main";

    if (routeInfo['remote'] == true)
        fetchAndShow(url, selector, template);
    else
        showOnly(selector, template);
}
$(window).on('load', hashRouter);

$(window).on('hashchange',
    hashRouter
);

