import { CountUp } from './countUp.min.js';

document.addEventListener('DOMContentLoaded', () => {
	initializeNavigation();  // Initialize navigation links
	initializeCounter();     // Initialize counters on the page
	handleLocation();        // Handle initial page load based on the URL
	const toggleButton = document.querySelector('.mobile-nav-toggle');
	toggleButton.addEventListener('click', toggleNav);
});

// Function to toggle navigation visibility
function toggleNav() {
	const primaryNav = document.getElementById("primary-navigation");
	const visibility = primaryNav.getAttribute("data-visible");
	primaryNav.setAttribute("data-visible", visibility === "true" ? "false" : "true");
	primaryNav.setAttribute("aria-expanded", visibility === "true" ? "false" : "true");
	primaryNav.classList.toggle('nav-expanded');
}

// Initialize navigation items
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
			if (activeNavItem) {
				activeNavItem.setAttribute('data-active', 'false');
			}
			activeNavItem = item;
			toggleNav(); // Close the navigation when a link is clicked
		});
	});
}

function initializeCounter() {
	const counterElements = document.querySelectorAll('.counter');
	counterElements.forEach(element => {
		const endValue = element.getAttribute('data-count-to');
		const counter = new CountUp(element, endValue);
		if (!counter.error) {
			counter.start();
		} else {
			console.error('CountUp error:', counter.error);
		}
	});
}

// Router functionality
const routes = {
	"404": './pages/404.html',
	"/": './pages/home.html',
	"/home": './pages/home.html',
	"/about": './pages/about.html',
	"/projects": './pages/projects.html',
	"/contact": './pages/contact.html'
};

// Function to handle routing
const route = (event) => {
	event = event || window.event;
	if (event.preventDefault) {
		event.preventDefault();
	}
	const destination = event.target && event.target.href ? event.target.href : event;
	window.history.pushState({}, "", destination);
	handleLocation();
}

// Function to update the content based on the route
const handleLocation = async () => {
	const path = window.location.pathname;
	const route = routes[path] || routes["404"];
	const html = await fetch(route).then(data => data.text());
	document.getElementById("content").innerHTML = html;
	initializeCounter(); // Initialize counters on the new page
}

window.onpopstate = handleLocation;
