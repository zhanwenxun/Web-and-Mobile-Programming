document.addEventListener("DOMContentLoaded", function () {
	
  	const labels = ["Boys 0-4 years", "Girls 0-4 years", "Boys 10-14 years", "Boys 15-19 years"]
  	const data1 = {
            labels: labels,
            datasets: [{
                // label: 'My First Dataset',
                data: [10725, 8990, 8399, 8219],
                backgroundColor: [
                    // 'rgb(255, 99, 132)',
                    // 'rgb(255, 159, 64)',
                    // 'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderColor: [
                    // 'rgb(255, 99, 132)',
                    // 'rgb(255, 159, 64)',
                    // 'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }],
        };
      	const config1 = {
            type: 'bar',
            data: data1,
            options: {
              	indexAxis: 'y',
              	scales: {
                    x: {
                        title: {
                            display: true,
                            text: "per 100,000 children",
                            font: {
                                size: 14
                            },
                            padding: 20
                        }
                    }
                },
              	plugins: {
                    title: {
                        display: true,
                        text: 'Vulnerable Groups for Tai Po District',
                        font: {
                            size: 20
                        },
                        padding: 20
                    },
                    legend: {
                        display: false
                    }
                }
            }
        };
  	var myChart1 = new Chart(
        document.getElementById('Chart1'),
        config1
    );
})