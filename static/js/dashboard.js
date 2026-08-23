const ctx = document.getElementById("sensorChart");

const sensorChart = new Chart(ctx, {
    type: "line",

    data: {
        labels: [
            "10:00",
            "10:01",
            "10:02",
            "10:03",
            "10:04",
            "10:05",
            "10:06",
            "10:07"
        ],

        datasets: [
            {
                label: "Gas (ppm)",

                data: [
                    38,
                    41,
                    42,
                    40,
                    43,
                    45,
                    42,
                    44
                ],

                borderWidth: 2,

                tension: 0.4,

                fill: false
            },

            {
                label: "Pressure (bar)",

                data: [
                    2.1,
                    2.2,
                    2.3,
                    2.4,
                    2.3,
                    2.4,
                    2.5,
                    2.4
                ],

                borderWidth: 2,

                tension: 0.4,

                fill: false
            },

            {
                label: "Temperature (°C)",

                data: [
                    27.8,
                    28.0,
                    28.2,
                    28.5,
                    28.3,
                    28.7,
                    28.6,
                    28.5
                ],

                borderWidth: 2,

                tension: 0.4,

                fill: false
            }
        ]
    },

    options: {
        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index"
        },

        plugins: {
            legend: {
                position: "top"
            }
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time"
                }
            },

            y: {
                title: {
                    display: true,
                    text: "Sensor Value"
                }
            }
        }
    }
});