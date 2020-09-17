// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

var ohioData = "static/data/Ohio16_new2.geojson";





// Perform a GET request to the query URL
d3.json(ohioData, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3 style='color:#2e1aa1'>" + "DISTRICT "+feature.properties.DISTRICT +
      "</h3><hr><p>" +"The Voting Rate(2018) : "+ feature.properties.voting_rate + "</p>");

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: fliterdata

  });
  }

  // add some color
  function getColor(d) {
    if(d == -3){
      return '#2166ac'
    }else if(d == -2){
      return '#67a9cf'
    }else if(d == -1){
      return '#d1e5f0'
    }else if(d == 0){
      return '#f7f7f7'
    }else if(d == 1){
      return '#fddbc7'
    }else if(d == 2){
      return '#ef8a62'
    }else if(d == 3){
      return '#b2182b'
    }

  }

  function styleblock(feature) {
    console.log(feature.properties.rate_C)
    return {
        fillColor: getColor(feature.properties.rate_C),
        // fillColor: '#d73027',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
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
  var earthquakes;

  function resetHighlight(e) {
    // console.log("reset!")
    earthquakes.resetStyle(e.target);
  }
  // show result in 2018 
  function showresults(number){
    var fliteredData = result2018.filter(result => result.district == number);

    // the winning party is
    var result = fliteredData[0].party
    d3.select("div.result2018").html("");

    
    if(result == "Republican Party"){
      d3.select('.result2018').html(' <h5>Republican Party</h5><hr><img src="static/images/R.png" class="result2018" alt = "static/images/B.png" style="width:160px; height: auto;display:block; margin:15px  auto;">')
      

    }else if(result == "Democratic Party"){
      d3.select('.result2018').html(' <h5>Democratic Party</h5><hr><img src="static/images/D.png" class="result2018" alt = "static/images/B.png" style=" width:160px; height: auto;display:block; margin:15px  auto; ">')
    }else{
      d3.select('.result2018').html(' <h5>Other Party</h5><hr><img src="static/images/B.png" class="result2018" alt = "static/images/B.png" style=" width:160px; height: auto;display:block; margin:15px auto; ">')

    }



  }
  function showhuman(number){
    var photonumber = number
    d3.select("div.human2018").html("");
    if(photonumber<10){
      var pname = "shon_"+ "0"+String(photonumber)
      d3.select('.human2018').html(' <img src="static/images/'+pname+'.jpg" class="human2018" alt = "static/images/B.png" style="width:150px; height: auto; display:block; margin:100px auto;">')
    }else{
      var pname = "shon_"+ +String(photonumber)
      d3.select('.human2018').html(' <img src="static/images/'+pname+'.jpg" class="human2018" alt = "static/images/B.png" style="width:150px; height: auto; display:block; margin:100px auto;">')
    }
    // the elected officer is
    var fliteredData = winners2018.filter(result => result.district == number);
    var result = fliteredData[0]

    
    // the elected officer's information
    d3.select("div.winnerslist")
    .text(function(){
      return result.info
    })
    .append("ul")
    .append("li")
    .text(function(){
      return "Has been in this position for " +result.Years_in_position+ " years"
    })
    .append("li")
    .text(function(){
      return "Highest degree is " +result.degree +" degree"
    })
    .append("li")
    .text(function(){
      return "Graduate from: " +result.school
    })






  }
  // add a bar chart to know the propotion
  function showcond(number){
    var groupnumber = number;
    d3.select("div.cond2018").html("");
    console.log("the click number is "+ groupnumber)

    var fliteredData = cond2018.filter(result => result.district == groupnumber);

    // Trace1 for the election in 2018
    var data = [{
    values: fliteredData.map(row => row.votes),    
    labels: fliteredData.map(row => row.candidate),
    textinfo: "label+percent",
    textposition: "outside",
    automargin: true,
    type: "pie",
    hole: 0.2,

    }];
 
    var layout = {
      height:400,
      width: 500,
      title:"Ohio's Congressional District election, 2018",
      showlegend: false,
      annotations: [
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'Results have been certified',
          x: 0.17,
          y: 0.5
        }]
    }

    Plotly.newPlot('cond2018', data, layout);




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
    
    showresults(clickat)
    showhuman(clickat)
    showcond(clickat)
  }
  

  

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: styleblock
      });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
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
    "The Cook Political Report": earthquakes
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


