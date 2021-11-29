document.addEventListener("DOMContentLoaded", function () {
	
  	const data2 = {
            labels: [
              'Intentional',
              'Unintentional',
              'Others'
            ],
            datasets: [{
              data: [6, 64, 30],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
        };
      	const config2 = {
          type: 'doughnut',
          data: data2,
          options: {
          	  plugins: {
          	    title: {
                  display: true,
                  text: 'Intentional & Unintentional Injury',
                  font: {
                	  size: 20
                  },
                  padding: 20
                }
              }
          }
        };
      	var myChart = new Chart(
            document.getElementById('Chart2'),
            config2
        );
})