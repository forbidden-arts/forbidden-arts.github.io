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


function loadContent() {
	const hash = window.location.hash.slice(2); // Remove leading '#/'
	const contentDiv = document.getElementById('content');

	let filePath = '';
	if (hash === '' || hash === '#home') {
	  filePath = './pages/home.html';
	} else {
	  filePath = `./pages/${hash}.html`;
	}

	fetch(filePath)
	  .then(response => {
		if (!response.ok) {
		  throw new Error('Page not found');
		}
		return response.text();
	  })
	  .then(html => {
		contentDiv.innerHTML = html;
		window.history.pushState({}, '', `/${hash}`);
	  })
	  .catch(error => {
		contentDiv.innerHTML = `<p>${error.message}</p>`;
	  });
  }

  initializeNavigation();

  // Load content when the page loads and whenever the hash changes
  window.addEventListener('DOMContentLoaded', loadContent);
  window.addEventListener('hashchange', loadContent);
