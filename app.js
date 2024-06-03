async function router(){
    const rootName = "/hash-router-test"
    const routes = {
        "about": {
            title: "about page",
            location: rootName + "/templates/about.html",
            description: "This is the about"
        }
    };
    let endpoint = window.location.hash.replace("#", "");
    if(!routes[endpoint] && window.location.hash.length > 0){
        return window.location.assign(
            "https://therealjqz.github.io/hash-router-test/404"
          );          
    }
    const html = await fetch(routes[endpoint].location).then(data => data.text());
    document.querySelector("#content").innerHTML = html;
    document.title = routes[endpoint].title;
    //if route is valid find corresponding file
};

window.addEventListener("hashchange", router);