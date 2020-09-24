function ageDataset(age) {
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

    ageGroups = ["18-29","30-44","45-64","65+"]
    ageValues = [data.Eighteen_to_twenty_nine_year_olds_estimate,data.Thirty_to_forty_four_year_olds_estimate,data.Forty_five_to_sixty_four_year_olds_estimate,data.Sixty_five_and_older_estimate]
    
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

    d3.json("static/data/ages_nico.json").then(
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
    // ageDataset(districtOne);

    }
    );
}



function optionChanged(districtNew) {

   ageDataset(districtNew);
   
}

init();

