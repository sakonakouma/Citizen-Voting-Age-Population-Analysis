function ageDataset(education) {
    d3.json("static/data/ages_nico.json").then(function(ageData) {

        var resultArray = ageData.filter(districtObj => districtObj.Congressional_district == age);
        // var result = resultArray[0];
        // console.log("++++++=====")
        // console.log(resultArray)
        var list = d3.select("#bar");
        list.html("");

        buildCharts(resultArray[0]);
       
    })
    
}

function buildCharts(data) {

    educationGroups = ["0-9","9-12","13-14","15-16", "16-17"]
    educationValues = [data.lessthannine_etimate,data.ninteto_twelve_estimate,data.thirteen_to_fourtine_estimate,data.fifteen_to_sixteen_estimate, data.sixteen_to_seventeen_estimate]
    
    // add charts
    var barData = [{
    x: ageGroups,
    y: ageValues,
    type: 'bar',
    marker: {
        color: 'rgb(142, 124, 195)'    }}];



    var barLayout = {
        hovermode: 'closest',
        yaxis: {title: 'Number of Voters'},
        xaxis: {title: 'Age Ranges of Voters'},
        bargap: 0.05
    };

    Plotly.newPlot('barnico', barData, barLayout);   


}

function init() {
    var selector = d3.select("#selDataset");

    d3.json("static/data/education.json").then(
        (districtData) => {
        var districts = districtData;
        console.log(districts)

        districts.forEach((location) => {
            selector.append("option")
                .text(location.Congressional_district)
                .property("value", location.Congressional_district);
        });
    
    const districtOne = districtData[0];

    buildCharts(districtOne);
    // educationDataset(districtOne);

    }
    );
}



function optionChanged(districtNew) {

   educationDataset(districtNew);
   
}

init();



