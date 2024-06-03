async function router(){
    const routes = {
        "/": {
            title: "home",
            location: "/templates/index.html",
            description: "This is the home"
        },
        "about": {
            title: "about page",
            location: "/templates/about.html",
            description: "This is the about"
        }
    };
    let endpoint = window.location.hash.replace("#", "");
    if(endpoint.length === 0){
        endpoint = "/"
    }
    if(!routes[endpoint]){
        return window.location.assign(
            "https://developer.mozilla.org/en-US/",
          );          
    }
    const html = await fetch(routes[endpoint].location).then(data => data.text());
    document.querySelector("#content").innerHTML = html;
    document.title = routes[endpoint].title;
    //if route is valid find corresponding file
};

window.addEventListener("hashchange", router);
router();