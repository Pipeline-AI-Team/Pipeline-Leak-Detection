from flask import Flask, render_template, jsonify
from datetime import datetime, timedelta
import random

app = Flask(__name__)


# ===========================
# MAIN ROUTE
# ===========================
@app.route("/")
def home():
    return render_template("dashboard.html")


# ===========================
# API ENDPOINTS
# ===========================

# Dashboard Data
@app.route("/api/dashboard-data")
def get_dashboard_data():
    """Get current sensor readings and AI predictions"""
    return jsonify({
        "gas": 42,
        "pressure": 2.4,
        "temperature": 28.5,
        "status": "SAFE",
        "confidence": 96.4,
        "timestamp": datetime.now().isoformat()
    })


# Live Monitoring Data
@app.route("/api/live-data")
def get_live_data():
    """Get real-time sensor stream data"""
    data_points = []
    for i in range(20):
        data_points.append({
            "time": (datetime.now() - timedelta(minutes=i)).isoformat(),
            "gas": random.randint(35, 50),
            "pressure": round(random.uniform(2.0, 2.6), 2),
            "temperature": round(random.uniform(25, 32), 1)
        })
    return jsonify(data_points)


# Analytics Data
@app.route("/api/analytics-data")
def get_analytics_data():
    """Get statistical and analytical data"""
    return jsonify({
        "statistics": {
            "gas": {"min": 30, "max": 55, "avg": 42.5},
            "pressure": {"min": 1.9, "max": 2.7, "avg": 2.35},
            "temperature": {"min": 22, "max": 35, "avg": 28.2}
        },
        "model_accuracy": 96.8,
        "total_predictions": 1247,
        "leak_detections": 3,
        "false_positives": 1
    })


# History/Logs Data
@app.route("/api/history-data")
def get_history_data():
    """Get historical logs and events"""
    logs = []
    for i in range(20):
        logs.append({
            "id": 1000 + i,
            "timestamp": (datetime.now() - timedelta(hours=i)).isoformat(),
            "gas": random.randint(35, 55),
            "pressure": round(random.uniform(2.0, 2.6), 2),
            "temperature": round(random.uniform(25, 32), 1),
            "status": random.choice(["SAFE", "WARNING", "LEAK"]),
            "action": "Logged" if random.random() > 0.7 else "Monitored"
        })
    return jsonify(logs)


# Alerts Data
@app.route("/api/alerts-data")
def get_alerts_data():
    """Get active and historical alerts"""
    return jsonify({
        "active_alerts": [
            {
                "id": 1,
                "severity": "warning",
                "title": "High Gas Concentration",
                "message": "Gas level approaching threshold",
                "timestamp": datetime.now().isoformat()
            }
        ],
        "thresholds": {
            "gas": {"warning": 50, "critical": 80},
            "pressure": {"warning": 2.5, "critical": 3.0},
            "temperature": {"warning": 35, "critical": 40}
        }
    })


if __name__ == "__main__":
    app.run(debug=True)