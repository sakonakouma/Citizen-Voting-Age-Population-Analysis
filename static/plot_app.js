function ageDataset(ages) {
    d3.json("data/ages.json").then(function(ageData) {
        console.log(ageData);

        var selector = d3.select("#selDataset").property("value");
        var resultArray = ageData.filter(districtObj => districtObj.Congressional_district == selector);
        var result = resultArray[0];

    })
}

function buildCharts(data) {
    d3.json("data/ages.json").then((ageData) => {
        
        var selector = d3.select("#selDataset").property("value");
        var ageGroups = ageData.ageGroups;   
        var resultArray = ageGroups.filter(districtObj => districtObj.Congressional_district == selector);
        var result = resultArray[0];
        console.log(resultArray);
        var age_id1 = result.Eighteen_to_twenty_nine_year_olds_estimate;
        var age_id2 = result.Thirty_to_forty_four_year_olds_estimate;
        var age_id3 = result.Forty_five_to_sixty_four_year_olds_estimate;
        var age_id4 = result.Sixty_five_and_older_estimate;
        var ageValues = result.ageValues;
        
        var barData = [{
            x: ageGroups,
            y: ageValues,
            type: 'bar',
            marker: {
                color: 'rgb(142, 124, 195)'
            }
        }];

        var barLayout = {
            hovermode: 'closest',
            yaxis: {title: 'Number of Voters'},
            xaxis: {title: 'Age Ranges of Voters'},
            bargap: 0.05
        };

        Plotly.newPlot('bar', barData, barLayout);       
        
    });
}

function init() {
    var selector = d3.select("#selDataset");

    d3.json("data/ages.json").then((districtData) => {
        var districts = districtData.districts;
        districts.forEach((location) => {
            selector.append("option")
                .text(location)
                .property("value", location);
        });
    
    const districtOne = districtData[0];
    buildCharts(districtOne);
    ageDataset(districtOne);

    });
}

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(districtNew) {
    buildCharts(districtNew);
    ageDataset(districtNew);
}

init();

