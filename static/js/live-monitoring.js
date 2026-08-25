/**
 * ===========================
 * LIVE MONITORING - Real-time sensor gauges
 * ===========================
 */

const LiveMonitoring = {
    
    // Configuration
    config: {
        updateInterval: 2000, // Update every 2 seconds
        maxDataRows: 10,
        thresholds: {
            gas: { warning: 50, critical: 80 },
            pressure: { warning: 2.5, critical: 3.0 },
            temperature: { warning: 35, critical: 40 }
        }
    },

    // State
    state: {
        updateTimer: null,
        isRunning: false
    },

    /**
     * Initialize Live Monitoring
     */
    init() {
        console.log("🎯 Initializing Live Monitoring...");
        
        if (!this.state.isRunning) {
            this.startLiveUpdates();
            this.state.isRunning = true;
        }
    },

    /**
     * Start periodic updates
     */
    startLiveUpdates() {
        // Fetch immediately
        this.fetchAndUpdateData();

        // Then set interval
        this.state.updateTimer = setInterval(() => {
            this.fetchAndUpdateData();
        }, this.config.updateInterval);

        console.log("📡 Live updates started - updating every " + this.config.updateInterval + "ms");
    },

    /**
     * Fetch data from API and update gauges
     */
    fetchAndUpdateData() {
        fetch('/api/live-data')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Get latest data point
                    const latest = data[0];
                    
                    // Update gauges
                    this.updateGauge('gas', latest.gas);
                    this.updateGauge('pressure', latest.pressure);
                    this.updateGauge('temperature', latest.temperature);
                    
                    // Update data table
                    this.updateDataTable(data);
                    
                    // Update timestamp
                    this.updateTimestamp();
                }
            })
            .catch(error => console.error("❌ Error fetching live data:", error));
    },

    /**
     * Update a gauge with new value
     */
    updateGauge(sensorType, value) {
        // Map sensor type to max value for percentage calculation
        const maxValues = {
            gas: 100,
            pressure: 4.0,
            temperature: 50
        };

        const maxValue = maxValues[sensorType];
        const percentage = Math.min((value / maxValue) * 100, 100);

        // Update SVG circle progress
        const selector = `.${sensorType}-gauge-progress`;
        const circle = document.querySelector(selector);
        
        if (circle) {
            // Calculate circumference and offset for CSS animation
            const circumference = 2 * Math.PI * 50; // r=50
            const offset = circumference - (percentage / 100) * circumference;
            
            circle.style.strokeDashoffset = offset;
            circle.setAttribute('data-value', percentage.toFixed(1));
        }

        // Update value text
        const valueElement = document.getElementById(`${sensorType}-value`);
        if (valueElement) {
            valueElement.textContent = value.toFixed(1);
        }

        // Update status indicator
        this.updateStatus(sensorType, value);
    },

    /**
     * Update status indicator based on thresholds
     */
    updateStatus(sensorType, value) {
        const thresholds = this.config.thresholds[sensorType];
        const statusElement = document.getElementById(`${sensorType}-status`);
        
        if (!statusElement) return;

        let status = "NORMAL";
        let statusClass = "status-normal";

        if (value >= thresholds.critical) {
            status = "🔴 CRITICAL";
            statusClass = "status-critical";
        } else if (value >= thresholds.warning) {
            status = "⚠ WARNING";
            statusClass = "status-warning";
        }

        statusElement.textContent = status;
        statusElement.className = `gauge-status ${statusClass}`;
    },

    /**
     * Update the live data table with latest readings
     */
    updateDataTable(data) {
        const tbody = document.getElementById('live-data-tbody');
        if (!tbody) return;

        // Clear existing rows
        tbody.innerHTML = '';

        // Add new rows (limit to maxDataRows)
        const displayData = data.slice(0, this.config.maxDataRows);
        
        displayData.forEach((row, index) => {
            const tr = document.createElement('tr');
            const timeObj = new Date(row.time);
            const timeStr = timeObj.toLocaleTimeString();

            // Determine status
            let status = "●";
            const gasOk = row.gas < this.config.thresholds.gas.critical;
            const pressureOk = row.pressure < this.config.thresholds.pressure.critical;
            const tempOk = row.temperature < this.config.thresholds.temperature.critical;
            
            if (!gasOk || !pressureOk || !tempOk) {
                status = "🔴 ALERT";
            } else if (row.gas >= this.config.thresholds.gas.warning || 
                       row.pressure >= this.config.thresholds.pressure.warning || 
                       row.temperature >= this.config.thresholds.temperature.warning) {
                status = "⚠ WARNING";
            } else {
                status = "✓ SAFE";
            }

            tr.innerHTML = `
                <td>${timeStr}</td>
                <td>${row.gas.toFixed(1)}</td>
                <td>${row.pressure.toFixed(2)}</td>
                <td>${row.temperature.toFixed(1)}</td>
                <td><span class="status-badge">${status}</span></td>
            `;

            tbody.appendChild(tr);
        });
    },

    /**
     * Update the last update timestamp
     */
    updateTimestamp() {
        const updateElement = document.getElementById('update-time');
        if (updateElement) {
            updateElement.textContent = "Just now";
        }
    },

    /**
     * Stop live updates
     */
    stop() {
        if (this.state.updateTimer) {
            clearInterval(this.state.updateTimer);
            this.state.updateTimer = null;
            this.state.isRunning = false;
            console.log("⏹ Live updates stopped");
        }
    }
};
