const out = [];
let chart;
let text="line";
window.addEventListener("load",async()=>{
    const response = await fetch("https://api.coinranking.com/v2/coin/Qwsogvtv82FCd/history");
    const result = await response.json();
    let data = (result.data.history);
    // console.log(data);
   data.forEach(element => {
      out.push(element.price);
   });

   chartShow();
})




function chartShow(){
    const ctx = document.getElementById('myChart').getContext('2d');

const initialData = {
    labels: [],
    datasets: [{
        label: 'Bitcoin Price',
         data: [],
         backgroundColor :'#800080',
        borderColor: '#800080',
        borderWidth: 2,
        fill: false,
    }],
};


const chartConfig = {
    type: text,
    data: initialData,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                     display: false,
                     text: "Timestamp",
                },
            },
            y: {
                title: {
                     display: true,
                     text: "Price",
                },
                beginAtZero: true,
            },
        },
    },
};

chart = new Chart(ctx, chartConfig);

let i=0;
function addData() {
    if(out.length>i){
    let newData = out[i];
     chart.data.labels.push(chart.data.labels.length);
      chart.data.datasets[0].data.push(Math.ceil(newData));
     chart.update();
    //  console.log(out);
     i++;
    }
    else{
        return;
    }
}

setInterval(addData, 1000);
}

const btn = document.querySelector(".change");

btn.addEventListener("click",()=>{
  const selectedOption = document.querySelector("select").value;
  console.log(selectedOption);

 text = selectedOption;
chartShow();
}
);



anime({
    targets: ctx.canvas,
    opacity: [0, 1],
    duration: 5000,
    easing: 'easeInOutQuad',
  });
  
  anime({
    targets: ctx.data.datasets[0].data,
    scale: [0, 2],
    duration: 1000,
    easing: 'easeOutElastic',
    update: function() {
      ctx.update();
    }
  });

 