<<<<<<< HEAD
function ageDataset(data) {
    
        var selector = d3.select("#selDataset").property("value");
        Object.keys(data).forEach(([key, value]) => {
            console.log(key, data[key]);
            selector.append("#selDataset")
                .text(`${key}: ${value}`)
                .property("value", data);
        });
        // var congressional_district = data.Congressional_district;
        // var resultArray = congressional_district.filter(data => data.Congressional_district == selector);
        // console.log(resultArray);
        var result = selector[0];
}

function buildCharts(data) {
           
    var selector = d3.select("#bar").property("value");
    var ageGroups = ['Eighteen_to_twenty_nine_year_olds_estimate', 'Thirty_to_forty_four_year_olds',
                    'Forty_five_to_sixty_four_year_olds_estimate', 'Sixty_five_and_older_estimate'];   
                        
    // Object.keys(data).forEach(([key, value]) => {
    // console.log(key, data[key]);
    // resultArray.append("#bar")
    //     .text(`${key}: ${value}`)
    //     .property("value", data);
    // });

    // var resultArray = (data.Congressional_district == selector);
    // var result = resultArray[0];
    // console.log(resultArray);
    var age_id1 = [];
    var age_id2 = [];
    var age_id3 = [];
    var age_id4 = [];

    
    // Object.entries(data).forEach(([key, value]) => {
    //     if (key === "Eighteen_to_twenty_nine_year_olds_estimate") {
    //         age_id1.push(value);
    //     }
    //     else if (key === "Thirty_to_forty_four_year_olds_estimate") {
    //         age_id2.push(value);
    //     }
    //     else if (key === "Forty_five_to_sixty_four_year_olds_estimate") {
    //         age_id3.push(value);
    //     }
    //     else {
    //         age_id4.push(value);
    //     }
        
    // });
    var age_id1 = data.Eighteen_to_twenty_nine_year_olds_estimate;
    var age_id2 = data.Thirty_to_forty_four_year_olds_estimate;
    var age_id3 = data.Forty_five_to_sixty_four_year_olds_estimate;
    var age_id4 = data.Sixty_five_and_older_estimate;
    var ageValues = [age_id1, age_id2, age_id3, age_id4];
    console.log(ageValues);
        
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
}

function init() {
    var selector = d3.select("#selDataset");
    const url = "data/ages.json";
    d3.json(url).then(function(data) {
        console.log(data);

        var districts = data[0];
        console.log(districts);
        Object.keys(data).forEach(([key, value]) => {
            console.log(key, data[key]);

            selector.append("option")
                .text(`${key}: ${value}`)
                .property("value", data);
        });

    
    const districtOne = data[0];
    buildCharts(districtOne);
    ageDataset(districtOne);

    });
}

d3.selectAll("#selDataset").on("change", optionchanged);

function optionchanged(districtNew) {
    buildCharts(districtNew);
    ageDataset(districtNew);
}

init();

=======
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

>>>>>>> d1f2ce1ea84b96eca5fb729c214bc529d9b2b000
