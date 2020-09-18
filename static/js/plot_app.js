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
        // var ageGroups = ageData.ageGroups;
        var ageGroups = ["Eighteen_to_twenty_nine_year_olds_estimate", "Thirty_to_forty_four_year_olds_estimate",
                        "Forty_five_to_sixty_four_year_olds_estimate", "Sixty_five_and_older_estimate"];
        var resultArray = ageGroups.filter(districtObj => districtObj.Congressional_district == selector);
        var result = resultArray[0];
        console.log(resultArray);
        var 
        
    })
}

