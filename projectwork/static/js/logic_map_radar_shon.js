// Store our API endpoint inside queryUrl

var ohioData = "static/data/Ohio16_new2.geojson";




// add a poverty
function addpoverty(){
  var data = [
    {
      type: 'bar',
      x: ['District 01','District 02','District 03','District 04','District 05','District 06','District 07','District 08','District 09','District 10','District 11','District 12','District 13','District 14','District 15','District 16'],
      y: [61323,65318,87584,53877,49753,78256,55197,53264,89928,71539,107065,49050,80108,36742,61556,33622],
      base: [-61323,-65318,-87584,-53877,-49753,-78256,-55197,-53264,-89928,-71539,-107065,-49050,-80108,-36742,-61556,-33622],
      hovertemplate: '%{base}',
      marker: {
        color: 'grey'
      },
      name: 'Poverty'
    },
    {
      type: 'bar',
      x: ['District 01','District 02','District 03','District 04','District 05','District 06','District 07','District 08','District 09','District 10','District 11','District 12','District 13','District 14','District 15','District 16'],
      y: [84809,78750,55036,57538,74193,46510,67204,69031,49311,71775,53372,112681,48855,91948,97714,93407],
      base: 0,
      marker: {
        color: 'gold'
      },
      name: 'income(household) > $100,000'
    }]

    var layout = {
      title: 'Summary of economy'
    };
  
  Plotly.newPlot('poverty2018', data,layout);

}
addpoverty()



// Perform a GET request to the query URL
d3.json(ohioData, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature2(feature, layer) {
    layer.bindPopup("<h3 style='color:#2e1aa1'>" + "DISTRICT "+feature.properties.DISTRICT +
      "</h3><hr><p>" +"The Voting Rate(2018) : "+ feature.properties.voting_rate + "</p>");

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: fliterdata

  });
  }

  // add some color
  function getColor2(d) {
    if(d == 1){
      return '#e63232'
    }else(d == 0)
    {
      return '#2a3aeb'
    }

  }

  function styleblock2(feature) {
    console.log("can you read rateC?")
    console.log(feature.properties.rate_C)
    console.log("end")
    return {
        fillColor: getColor2(feature.properties.now_party),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
  };

  // Adding Interaction

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }
  // var earthquakes;

  function resetHighlight(e) {
    earthquakes.resetStyle(e.target);
  }
  // show result in 2018 
  // function showresults(number){
  //   var fliteredData = result2018.filter(result => result.district == number);
  //
  //   // the winning party is
  //   var result = fliteredData[0].party
  //   d3.select("div.result2018").html("");
  //
  //
  //   if(result == "Republican Party"){
  //     d3.select('.result2018').html(' <h5>Republican Party</h5><hr><img src="static/images/R.png" class="result2018" alt = "static/images/B.png" style="width:160px; height: auto;display:block; margin:15px  auto;">')
  //
  //
  //   }else if(result == "Democratic Party"){
  //     d3.select('.result2018').html(' <h5>Democratic Party</h5><hr><img src="static/images/D.png" class="result2018" alt = "static/images/B.png" style=" width:160px; height: auto;display:block; margin:15px  auto; ">')
  //   }else{
  //     d3.select('.result2018').html(' <h5>Other Party</h5><hr><img src="static/images/B.png" class="result2018" alt = "static/images/B.png" style=" width:160px; height: auto;display:block; margin:15px auto; ">')
  //
  //   }
  //
  //
  //
  // }
  function showradar(number){
    var groupnumber = number;
    d3.select("div.radar2018").html("");
    console.log("the radar number is "+ groupnumber)

    var fliteredData = result2018.filter(result => result.district == groupnumber);
    console.log("#")
    console.log(fliteredData[0].party)
    var this_med_inc = fliteredData[0].rate_med_income
    var this_paid_emp =  fliteredData[0].rate_paid_emp
    var this_coll = fliteredData[0].rate_college
    var this_ann_pay = fliteredData[0].rate_payroll
    var this_est = fliteredData[0].rate_establish
    console.log(this_coll)

    data = [{
      type: 'scatterpolar',
      r: [this_med_inc, this_paid_emp, this_coll, this_ann_pay, this_est],
      theta: ['Median Income Ranking','Paid Employees Ranking for Pay Period including March 12','College or graduate school Ranking', 'Annual Payroll Ranking', 'Total establishments Ranking'],
      fill: 'toself'
    }]
    
    layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [17, 0]
        }
      },
      showlegend: false
    }
    
    Plotly.newPlot("radar2018", data, layout)




  }

  


  // add click events
  function fliterdata(e) {
    // console.log("fliterdata at district: ")
    // console.log(e.target.feature.properties.DISTRICT)
    var clickat = e.target.feature.properties.DISTRICT
    var fliteredData = finance.filter(finance => finance.District == clickat);
    console.log(fliteredData)
    d3.select("tbody").html("");

    d3.select("tbody")
    .selectAll("tr")
    .data(fliteredData)
    .enter()
    .append("tr")
    .html(function (d) {
      return `<td>${d.Name}</td><td>${d.Party}</td><td>${d.Receipts}</td><td>${d.Disbursements}</td><td>${d.Cash_on_hand}</td><td>${d.Date}</td><td>${d.District}</td>`;
    });
    
    showradar(clickat)

  }
  

  

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var map_party = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature2,
    style: styleblock2
      });

  // Sending our earthquakes layer to the createMap function
  createMap(map_party);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})


  var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJ0cGVya2l0bnkiLCJhIjoiY2tlYzJ6a2gzMDN4cTJ1czUwdjloZDIzYSJ9.WDgGSZK0DbPksCA47bnNNQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "On charge party": earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      40.1733, -82.653
    ],
    zoom: 7,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


