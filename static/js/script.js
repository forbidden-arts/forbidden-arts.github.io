const primaryNav = document.getElementById("primary-navigation")
const navToggle = document.querySelector(".mobile-nav-toggle")


navToggle.addEventListener('click', () => {
	const visibility =  primaryNav.getAttribute("data-visible");
	primaryNav.setAttribute("data-visible", visibility === "true" ? "false" : "true")
	primaryNav.setAttribute("aria-expanded", visibility === "true" ? "false" : "true")
})


function initializeNavigation() {
	const navItems = document.querySelectorAll('[data-active]');

	let activeNavItem;
	navItems.forEach(item => {
	  if (item.getAttribute('data-active') === 'true') {
		activeNavItem = item;
		activeNavItem.setAttribute('data-active', 'false');
	  }
	});

	navItems.forEach(item => {
	  item.addEventListener('click', () => {
		item.setAttribute('data-active', 'true');
		activeNavItem.setAttribute('data-active', 'false');
		activeNavItem = item;
	  });
	});
  }

  // Call the function to initialize the navigation
  initializeNavigation();


const routes = {
    "404": `./pages/404.html`,
    "/": "./pages/home.html",
    "/home": "./pages/home.html",
	"/about": "./pages/about.html",
    "/projects": "./pages/projects.html",
    "/contact": "./pages/contact.html"
};


const route = (event) => {
	  event = event || window.event;
	  if (event.preventDefault){
		  event.preventDefault();
	  };
	  const destination = event.target && event.target.href ?  event.target.href : event;
	  window.history.pushState({}, "", destination);
	  handleLocation();
  }

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["404"];
	console.log("path", path);
	console.log("Route", route);
    const html = await fetch(route)
	.then(data => {
		console.log(data);
		return data.text()});
    console.log(html);
	document.getElementById("content").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;
handleLocation();

// document.addEventListener("DOMContentLoaded", function() {
// 	var header = document.querySelector('header'); // Select the header element
// 	var headerHeight = header.offsetHeight; // Get the height of the header

// 	// Set the translateY transformation to the negative value of the header's height
// 	header.style.transform = 'translateY(-' + headerHeight + 'px)';
// });
