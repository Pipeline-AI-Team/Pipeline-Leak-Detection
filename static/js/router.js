/**
 * ===========================
 * SPA ROUTER - Client-side routing
 * ===========================
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
        this.init();
    }

    /**
     * Register a route
     */
    register(path, handler) {
        this.routes[path] = handler;
    }

    /**
     * Navigate to a route
     */
    navigate(path) {
        if (!this.routes[path]) {
            console.error(`Route not found: ${path}`);
            return;
        }

        // Hide all pages
        this.hideAllPages();

        // Show target page
        const pageElement = document.getElementById(path);
        if (pageElement) {
            pageElement.style.display = "block";
        }

        // Update active nav item
        this.updateActiveNav(path);

        // Call route handler
        if (this.routes[path]) {
            this.routes[path]();
        }

        // Update window history
        window.history.pushState({ page: path }, null, `#${path}`);
        this.currentPage = path;
    }

    /**
     * Hide all page sections
     */
    hideAllPages() {
        const pages = document.querySelectorAll(".page-section");
        pages.forEach(page => {
            page.style.display = "none";
        });
    }

    /**
     * Update active nav item styling
     */
    updateActiveNav(path) {
        const navItems = document.querySelectorAll(".nav-item");
        navItems.forEach(item => {
            item.classList.remove("active");
            // Match nav item data attribute with page path
            if (item.dataset.page === path) {
                item.classList.add("active");
            }
        });
    }

    /**
     * Initialize router - set up listeners
     */
    init() {
        // Handle navigation clicks
        document.addEventListener("click", (e) => {
            const navItem = e.target.closest(".nav-item");
            if (navItem && navItem.dataset.page) {
                e.preventDefault();
                this.navigate(navItem.dataset.page);
            }
        });

        // Handle browser back/forward
        window.addEventListener("popstate", (e) => {
            if (e.state && e.state.page) {
                this.navigate(e.state.page);
            }
        });

        // Don't auto-navigate here - let main.js handle it after routes are registered
    }
}

// Initialize router globally
const router = new Router();
