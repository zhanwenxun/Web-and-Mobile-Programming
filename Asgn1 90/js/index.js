const labels1 = ["Covered Spaces", "Open Spaces"]

const data1 = {
  labels: labels1,
  datasets: [{
    data: [60, 20],
    backgroundColor: [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)'
    ],
    borderColor: [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)'
    ],
    borderWidth: 1
  }],
};

const config1 = {
  type: 'bar',
  data: data1,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Space Type",
          font: {
            size: 18
          },
          padding: 10
        }
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        title: {
          display: true,
          text: "Num",
          font: {
            size: 18
          },
          padding: 10
        },
        ticks: {
          stepSize: 10
        }
      }
    },
    plugins: {
      datalabels: {
        display: true
      },
      title: {
        display: true,
        text: "Carparking (Yellow Border)",
        font: {
          size: 24
        },
        padding: 10
      },
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }
};

var myChart1 = new Chart(
  document.getElementById('carParking'),
  config1
);

const labels2 = ["100㎡ (2 rooms)", "135㎡ (3 rooms)", "150㎡ (3 rooms)", "170㎡ (4 rooms)"]

const data2 = {
  labels: labels2,
  datasets: [{
    data: [3, 28, 30, 7],
    backgroundColor: [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderColor: [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }],
};

const config2 = {
  type: 'bar',
  data: data2,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Apartment Type",
          font: {
            size: 14
          },
          padding: 10
        }
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 50,
        title: {
          display: true,
          text: "Number",
          font: {
            size: 14
          },
          padding: 10
        },
        ticks: {
          stepSize: 10
        }
      }
    },
    plugins: {
      datalabels: {
        display: true
      },
      title: {
        display: true,
        text: "Apartment Numbers",
        font: {
          size: 18
        },
        padding: 10
      },
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }
};

var myChart1 = new Chart(
  document.getElementById('ApartmentsChart'),
  config2
);

var $navs = $('nav a'),                    
    $sections = $('.section'),             
    $window = $(window),
    navLength = $navs.length - 1;
    
window.onload = function(){
  setTimeout(function(){$(window).scrollTop(0)},5);
}

$window.on('scroll', function() {
    var scrollTop = $window.scrollTop(),
        len = navLength;

    for (; len > -1; len--) {
        var that = $sections.eq(len);
        if (scrollTop >= that.offset().top - 35) {
             $navs.removeClass('current').eq(len).addClass('current');
             break;
        }
    }
});

$navs.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({
    'scrollTop': $($(this).attr('href')).offset().top - 30
  }, 400);
});