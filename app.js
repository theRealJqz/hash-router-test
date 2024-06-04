function debounce(func, wait = 300, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
};
// const rootName = "/hash-router-test"
const rootName = ""
const routes = {
    "home": {
        title: "home page",
        location: rootName + "/templates/home.html",
    },
    "about": {
        title: "about page",
        location: rootName + "/templates/about.html",
    },
    "skills": {
        title: "skills page",
        location: rootName + "/templates/skills.html",
    },
    "projects": {
        title: "projects page",
        location: rootName + "/templates/projects.html",
    },
    "contact": {
        title: "contact page",
        location: rootName + "/templates/contact.html",
    },
};
function handleNavBarDisplay(position){
    const nav = document.querySelector("#navTop");
    if(position > 2){
        nav.classList.add("roaming");
    }
    else nav.classList.remove("roaming");
}
function handleTitle(location){
    document.title = routes[location].title;
}
function handleScrollEvent(){//handle scrolls. Changes nav bar. load adjacent cards
    handleNavBarDisplay(window.scrollY);
}
async function router(){
    let endpoint = window.location.hash.replace("#", "");
    if(endpoint.length === 0){
        endpoint = "home"
    }
    if(!routes[endpoint] && window.location.hash.length > 0){
        return window.location.assign(
            "https://therealjqz.github.io/hash-router-test/404.html"
          );          
    }
    const html = await fetch(routes[endpoint].location).then(data => data.text());
    //note only populate section when near
    const card = document.querySelector(`#${endpoint}`);
    card.innerHTML = html;
    handleTitle(endpoint)
};

window.addEventListener("hashchange", router);
document.addEventListener('scroll', ()=>{
    debounce(handleScrollEvent())
})

router();