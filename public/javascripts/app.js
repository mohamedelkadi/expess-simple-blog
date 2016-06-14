/**
 * Created by molhm on 6/10/16.
 */
//$(document).ready(function () {
var notices = [];
var templates = [];
var routes = [];
//////////////////////////////TEMPLATES//////////////////////////////////
console.log('cook', document.cookie);
templates['posts'] = Handlebars.compile($("#list-posts-template").html());
templates['post'] = Handlebars.compile($("#show-post-template").html());
templates['create'] = Handlebars.compile($("#create-post-template").html());
templates['home'] = Handlebars.compile($("#home-template").html());
templates['edit'] = Handlebars.compile($("#edit-post-template").html());
templates['login'] = Handlebars.compile($("#login-template").html());
templates['redirect'] = Handlebars.compile($("#redirect-template").html());

//////////////////////////// ROUTES //////////////////////////////////////

routes["posts"] = {
    template: "posts",
};
routes["posts/new"] = {
    template: "create",
    action: "createPost",
    auth: true
};
routes["posts/:params"] = {
    template: "post",
};
routes["posts/delete/:params"] = {
    template: "post",
    action: "deletePost",
    auth: true
};
routes["posts/edit/:params"] = {
    template: "edit",
    action: "editPost",
    auth: true
};

routes["login"] = {
    template: "login",
    action: 'Login'
}
routes["users/logout"] = {
    template: "redirect",
    action: "logout",
    auth: true

}
routes["redirect"] = {
    template: "redirect",
    action: "redirect"
}


//////////////////////// main functions /////////////////////////////////
/**
 * get the data from the server and display it
 * @param url
 * @param selector
 * @param template
 */
function fetchAndShow(url, selector, template) {
    console.log(url, selector, template);
    $.ajax({
        'url': url,
        'method': 'GET',
        'accepts': 'application/json'
    }).then(function (data) {
        var context = {}
        data["logged"] = isLogged();
        console.log("data", data);
        if (Array.isArray(data)) {
            context[template] = data;

        } else {
            context = data;
        }

        var html = templates[template](context);
        $(selector).html(html);
    }).fail(function () {

        $('#content').html("<p class='alert-danger text-center' style='font-size:larger'>" +
            "something wrong happened " +
            "</p>");
    });

}

/**
 * display template that doesn't need data from the server
 * @param selector
 * @param template
 */
function showOnly(selector, template) {
    var html = templates[template]();
    $(selector).html(html);

}

function isLogged() {
    var key = document.cookie.split('=')[0];
    var val = document.cookie.split('=')[1];
    if (key == 'login' && val == 1)
        return true
    else
        return false;
}

function redirect(location) {
    window.location.hash = location;
}

function showNotice() {
    if (notices.length < 1) {
        $("#notice").html("");

        return;
    }

    var templates = Handlebars.compile($("#notice-template").html());
    var type = notices[0]["type"];
    var msg = notices[0]["msg"];
    var html = templates({'type': type, 'msg': msg});
    $("#notice").html(html);
    notices = [];
}

function pushNotice(type, msg) {
    notices.push({
        "type": type,
        "msg": msg
    })
}

/**
 * route the hash to its action
 * @param event
 */
function hashRouter(event) {

    var template;
    var routeInfo;
    var url = (window.location.hash || '').replace(/^#/, '');
    if (url == '') {
        showOnly('#content', 'home');
        showNotice();

        return;

    }

    console.log("url is ", url);

    if ((routeInfo = routes[url]) ||
        (routeInfo = routes[url.slice(0, url.lastIndexOf('/')) + "/:params"])
    ) {
        console.log("route info ", routeInfo);
        template = routeInfo["template"];
        var selector = routeInfo['selector'] || "#content";
        var action = routeInfo['action'];
        if (routeInfo['auth'] && !isLogged()) {
            pushNotice('alert-danger',"you aren't authorized ");
            redirect("#redirect");
            return;
        }
        if (action)
            Actions[action](url, selector, template);
        else
            Actions["defaultAction"](url, selector, template);

        showNotice();

    } else {

        throw  Error("no route ");
    }

}

$(window).on('load', hashRouter);

$(window).on('hashchange',
    hashRouter
);

//////////////////////////////////////////Actions///////////////////////////////////
var Actions =
{
    //delete post from db
    deletePost: function (url, selector, template) {
        $.ajax({
            method: "DELETE",
            url: url
        }).done(function () {
            pushNotice('alert-success', "posts successfully deleted ")
            redirect('#posts');
        });


    }
    ,
    // show form to edit post
    editPost: function (url, selector, template) {
        var parts = url.split('/');
        url = parts[0] + "/" + parts[2];
        fetchAndShow(url, selector, template);
    },
    //show form to create new post
    createPost: function (url, selector, template) {
        showOnly('#content', template);
    }
    ,
    //if there is no action defined take this
    defaultAction: function (url, selector, template) {
        fetchAndShow(url, selector, template);

    },
    Login: function (url, selector, template) {
        showOnly('#content', template);
    },
    logout: function (url, selector, template) {
        pushNotice('alert-info', "logout now and redirecting..")
        fetchAndShow(url, selector, template);
        setTimeout(function () {
            window.location = "/"
        }, 1000);

    }
    ,
    redirect: function (url, selector, template) {
        showOnly('#content', template);
    }
}

////////////////////////////////// events //////////////////////

$('#content').delegate('input[type=submit]', 'click', function (event) {
    console.log("submit clicked");
    event.preventDefault();
    var data = {};
    var url = '';
    var method = '';
    var formId;
    var msgs = {
        "edit_post": "Update post done",
        "create_post": "Create post done",
        'login': "logged in successfully redirecting ..."
    };
    $(event.target).parents('form').serializeArray().forEach(function (obj, k) {
        if (obj.name == "action")
            url = obj.value
        else if (obj.name == "_method")
            method = obj.value
        else if (obj.name == "form_id")
            formId = obj.value;
        else
            data[obj.name] = obj.value
    });
    $.ajax({
        url: url,
        method: method,
        data: data
    }).success(function () {
            pushNotice('alert-success', msgs[formId]);
            console.log("url", url);
            if (formId == 'login') {
                redirect("#redirect");
                setTimeout(function () {
                    window.location = "/"
                }, 1000);
            } else {
                redirect("#posts");
            }
        })
        .fail(function () {
            pushNotice('alert-danger', "Some thing bad happened");
            redirect("#");
        })
})
//})
//;