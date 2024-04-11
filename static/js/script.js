const primaryNav = document.getElementById("primary-navigation")
const navToggle = document.querySelector(".mobile-nav-toggle")


navToggle.addEventListener('click', () => {
	const visibility =  primaryNav.getAttribute("data-visible");
	primaryNav.setAttribute("data-visible", visibility === "true" ? "false" : "true")
	primaryNav.setAttribute("aria-expanded", visibility === "true" ? "false" : "true")
})


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
		window.history.pushState({}, '', `${hash}`);
	  })
	  .catch(error => {
		contentDiv.innerHTML = `<p>${error.message}</p>`;
	  });
  }

  // Load content when the page loads and whenever the hash changes
  window.addEventListener('DOMContentLoaded', loadContent);
  window.addEventListener('hashchange', loadContent);
