/**
 * ===========================
 * MAIN APPLICATION INITIALIZATION
 * ===========================
 */

// ===========================
// ROUTE HANDLERS
// ===========================

/**
 * Dashboard Route Handler
 */
function handleDashboard() {
    updateTopbar("Dashboard", "Real-time pipeline monitoring system");
    // Chart.js handles its own sizing
    // Chart will be initialized by dashboard.js after page load
}

/**
 * Live Monitoring Route Handler
 */
function handleLiveMonitoring() {
    updateTopbar("Live Monitoring", "Real-time sensor data stream");
    // Placeholder for Live Monitoring functionality
    // Will be populated in the next feature branch
}

/**
 * Analytics Route Handler
 */
function handleAnalytics() {
    updateTopbar("Analytics", "Detailed statistics and insights");
    // Placeholder for Analytics functionality
    // Will be populated in the next feature branch
}

/**
 * History Route Handler
 */
function handleHistory() {
    updateTopbar("History", "Historical logs and events");
    // Placeholder for History functionality
    // Will be populated in the next feature branch
}

/**
 * Alerts Route Handler
 */
function handleAlerts() {
    updateTopbar("Alerts", "Alert management and configuration");
    // Placeholder for Alerts functionality
    // Will be populated in the next feature branch
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Update the top navbar title and subtitle
 */
function updateTopbar(title, subtitle) {
    const topbar = document.querySelector(".topbar");
    if (topbar) {
        const titleElement = topbar.querySelector("h1");
        const subtitleElement = topbar.querySelector("p");
        
        if (titleElement) titleElement.textContent = title;
        if (subtitleElement) subtitleElement.textContent = subtitle;
    }
}

// ===========================
// INITIALIZE ROUTER
// ===========================

document.addEventListener("DOMContentLoaded", function() {
    // Register all routes
    router.register("dashboard", handleDashboard);
    router.register("live-monitoring", handleLiveMonitoring);
    router.register("analytics", handleAnalytics);
    router.register("history", handleHistory);
    router.register("alerts", handleAlerts);
    
    // Navigate to dashboard after all routes are registered
    router.navigate("dashboard");
    
    console.log("✅ Application initialized - SPA routing active");
    console.log("📄 Routes registered: dashboard, live-monitoring, analytics, history, alerts");
});
