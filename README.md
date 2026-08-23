# Pipeline AI - Gas Leak Detection and Monitoring System

An IoT and Machine Learning based real-time gas pipeline leak detection and monitoring system using ESP32, gas sensors, pressure and temperature sensors, and a Random Forest machine learning model.

The system continuously collects pipeline parameters, analyzes the sensor data using machine learning, and provides real-time monitoring and leak alerts through a Flask-based web dashboard.

---

## 📌 Project Overview

Pipeline leakage is a major safety and environmental concern in industrial gas transportation systems.

This project aims to develop a low-cost IoT-based monitoring system capable of detecting abnormal pipeline conditions and identifying potential gas leakage using sensor data and machine learning.

The system combines:

- IoT-based sensor monitoring
- Real-time data acquisition
- Machine Learning
- Flask web application
- Data visualization
- Leak detection and alerts

---

## 🎯 Objectives

- Monitor gas concentration in real time.
- Monitor pipeline pressure and temperature.
- Detect abnormal pipeline conditions.
- Classify pipeline conditions as **Safe** or **Leak** using Machine Learning.
- Provide real-time monitoring through a web dashboard.
- Generate alerts when a potential leak is detected.
- Store and visualize historical sensor data.
- Develop a low-cost prototype suitable for academic and research purposes.

---

## 🏗️ System Architecture

```text
Gas / Pressure / Temperature Sensors
                │
                ▼
              ESP32
                │
                ▼
        Sensor Data Transmission
                │
                ▼
             Flask
          Backend / API
                │
        ┌───────┴────────┐
        │                │
        ▼                ▼
 Machine Learning    Web Dashboard
  Random Forest      Real-Time Data
        │                │
        ▼                ▼
 Leak Prediction     Monitoring &
  SAFE / LEAK          Alerts

  🔧 Hardware Components

The planned hardware components include:

ESP32
Gas Sensor
Pressure Sensor
Temperature Sensor
Buzzer
LED indicators
Connecting wires
Breadboard
Power supply

Final component specifications will be updated after hardware procurement and testing.

💻 Software Technologies
Frontend / Dashboard
HTML
CSS
JavaScript
Jinja2
Flask
Backend
Python
Flask
Machine Learning
Python
Scikit-learn
Random Forest Classifier
Pandas
NumPy
Hardware / IoT
ESP32
Arduino IDE
Development Tools
Visual Studio Code
Git
GitHub
📊 Input Parameters

The Machine Learning model is planned to use sensor parameters such as:

Parameter	Description
Gas Concentration	Detects gas presence/concentration
Pressure	Monitors pipeline internal pressure
Temperature	Monitors pipeline/environment temperature

These parameters will be used to classify the pipeline condition.

🤖 Machine Learning

A Random Forest classification model will be developed to classify pipeline conditions into:

SAFE
LEAK

The model will be trained using labelled sensor data collected during controlled experiments.

Planned ML Workflow
Sensor Data
     ↓
Data Collection
     ↓
Data Cleaning
     ↓
Feature Selection
     ↓
Dataset Creation
     ↓
Train/Test Split
     ↓
Random Forest Training
     ↓
Model Evaluation
     ↓
Real-Time Prediction
🌐 Web Dashboard

The Flask-based dashboard will provide:

Real-time gas concentration
Pipeline pressure
Temperature
System status
Machine Learning prediction
Prediction confidence
Sensor graphs
Historical readings
Leak alerts
📁 Project Structure
Pipeline-Leak-Detection/
│
├── app.py
│
├── templates/
│   └── base.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   └── images/
│
├── venv/
│
├── .gitignore
├── README.md
└── requirements.txt

The project structure will be expanded as backend, ML, database, and hardware integration are implemented.

👥 Team

Pipeline AI Team

This project is developed as a Final Year Project.

📜 License

This project is developed for academic and research purposes.