const primaryNav = document.getElementById("primary-navigation");

const toggleNav = () => {
	const nav = document.querySelector('nav');
	nav.classList.toggle('nav-expanded');
	const visibility =  primaryNav.getAttribute("data-visible");
	primaryNav.setAttribute("data-visible", visibility === "true" ? "false" : "true");
	primaryNav.setAttribute("aria-expanded", visibility === "true" ? "false" : "true");
}

document.addEventListener('DOMContentLoaded', () => {
	const toggleButton = document.querySelector('.mobile-nav-toggle');
	toggleButton.addEventListener('click', toggleNav );
});

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
		toggleNav();
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
	  console.log(destination)
	  window.history.pushState({}, "", destination);
	  handleLocation();
  }

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["404"];
	const html = await fetch(route)
	.then(data => {
		return data.text()});
		document.getElementById("content").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;
handleLocation();

