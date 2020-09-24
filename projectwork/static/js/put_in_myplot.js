var svgWidth = 800;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".myplot")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "primaryvotes";
var chosencolor = "partycolor";

// function used for updating x-scale var upon click on axis label
function xScale(bdata, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(bdata, d => d[chosenXAxis]) * 0.6,
      d3.max(bdata, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);
  return xLinearScale;
}



// function used for updating circle's color

function partycolorscale() {
  var myData2 = ['Republican Party','Democratic Party', 'Green Party', 'Libertarian Party','NO Party']
  var ordinalScale = d3.scaleOrdinal()
  .domain(myData2)
  .range(['red','blue','green','yellow','black']);
  return ordinalScale
};


function successcolorscale() {
  var myData1 = ['yes', 'no']
  var ordinalScale = d3.scaleOrdinal()
  .domain(myData1)
  .range(['gold', 'grey']);
  return ordinalScale
};

function colorScale(chosencolor){

  if(chosencolor === "partycolor"){    
    console.log("we got partycolorscale() run!")
    return partycolorscale()
  }if(chosencolor === "successcolor"){    
    console.log("we got successcolorscale() run!")
    return successcolorscale()
  }
  
}


// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating color var upon click on buttons
function rendercolor(newcolorScale,chosencolor) {
  if(chosencolor === "partycolor"){
    chartGroup.selectAll("circle")
    .transition()
    .attr("fill", d => newcolorScale(d.party))
    .attr("candi", d =>d.party)
  

  }if(chosencolor === "successcolor"){
    chartGroup.selectAll("circle")
    .transition()
    .attr("fill", d => newcolorScale(d.success))
    .attr("candi", d =>d.success)
  }
  


}



// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// --------------------------my part start----------------
var bdata = cond2018;


// parse data
bdata.forEach(function(data) {
  data.district = +data.district;
  data.candidate = data.candidate;
  data.percent = +data.percent;
  data.votes = +data.votes;
  data.party = data.party;
  data.primaryvotes = +data.primaryvotes;
  data.primarytotal = +data.primarytotal;
  data.primaryrate = +data.primaryrate;
});


// xLinearScale function above csv import
var xLinearScale = xScale(bdata, chosenXAxis);
var bubblecolorScale = colorScale(chosencolor)


// colorscale 
// var bubblecolor = partycolorscale()


// Create y scale function
var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(bdata, d => d.votes)])
  .range([height, 0]);

// // Create y color scale function
// var ycolorScale = d3.scaleLinear()
//   .domain([0, d3.max(bdata, d => d.votes)])
//   .range(['slateblue', 'brown']);

// Create y range x^2 function
var ypowerScale = d3.scalePow()
  .exponent(0.3)
  .domain([0, d3.max(bdata, d => d.votes)])
  .range([0,height/10]);


// Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);
//d3.axisBottom() put in paramter scale

// append x axis
var xAxis = chartGroup.append("g")
  .classed("x-axis", true)
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

// append y axis
chartGroup.append("g")
  .call(leftAxis);


// append different color!HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
var partyscale = partycolorscale()
// append initial circles
var circlesGroup = chartGroup.selectAll("circle")
.data(bdata)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d[chosenXAxis]))
.attr("cy", d => yLinearScale(d.votes))
.attr("r", d => ypowerScale(d.votes))
.attr("fill", d => partyscale(d.party))
.attr("opacity", ".4")
.attr("stroke", "white");

// Create group for 3 x-axis labels
var labelsGroup = chartGroup.append("g")
.attr("transform", `translate(${width / 2}, ${height + 20})`);

var primaryvotesLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("value", "primaryvotes") // value to grab for event listener
.classed("active", true)
.text("primary votes for U.S. House Ohio");

var primarytotalLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "primarytotal") // value to grab for event listener
.classed("inactive", true)
.text("Party's total primary votes for U.S. House Ohio");

var primaryrateLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 60)
.attr("value", "primaryrate") // value to grab for event listener
.classed("inactive", true)
.text("share of the  primary vote(%)");





// append y axis
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text("General election for U.S. House Ohio");

// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "primaryvotes") {
    label = "Primary Votes:";
  }if(chosenXAxis === "primarytotal") {
    label = "Total Primary votes:";
  }else{
    label = "Primary votes share:"
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .style("padding", "1px")
    .html(function(d) {
      return (`${d.candidate}<hr>${d.party}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// x axis labels event listener
labelsGroup.selectAll("text")
.on("click", function() {
  // get value of selection
  var value = d3.select(this).attr("value");
  if (value !== chosenXAxis) {

    // replaces chosenXAxis with value
    chosenXAxis = value;

    // console.log(chosenXAxis)

    // functions here found above csv import
    // updates x scale for new data
    xLinearScale = xScale(bdata, chosenXAxis);

    // updates x axis with transition
    xAxis = renderAxes(xLinearScale, xAxis);

    // updates circles with new x values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

    // updates tooltips with new info
    circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // changes classes to change bold text
    if (chosenXAxis === "primaryvotes") {
      primaryvotesLabel
        .classed("active", true)
        .classed("inactive", false);
        primarytotalLabel
        .classed("active", false)
        .classed("inactive", true);
        primaryrateLabel
        .classed("active", false)
        .classed("inactive", true);
    }if(chosenXAxis === "primarytotal"){
        primaryvotesLabel
        .classed("active", false)
        .classed("inactive", true);
        primarytotalLabel
        .classed("active", true)
        .classed("inactive", false);
        primaryrateLabel
        .classed("active", false)
        .classed("inactive", true);
    }if((chosenXAxis === "primaryrate")) {
      primaryvotesLabel
        .classed("active", false)
        .classed("inactive", true);
        primarytotalLabel
        .classed("active", false)
        .classed("inactive", true);
        primaryrateLabel
        .classed("active", true)
        .classed("inactive", false);
    }
  }
});

d3.select(".buttonbox")
.selectAll("button")
.on("click", function() {
  // get value of selection
  var value = d3.select(this).attr("value");


  if (value !== chosencolor) {
    
    // replaces chosenXAxis with value
    chosencolor = value;

    


    console.log("@"+chosencolor)
    var newscalebub = colorScale(chosencolor)
    console.log("")

    // updates color with transition
    rendercolor(newscalebub,chosencolor);

    console.log("for success========")
    console.log(newscalebub("yes"))
    console.log("for party+++++++++++")
    console.log(newscalebub("Green Party"))
    console.log("for error###########")
    console.log(newscalebub("A"))



  }



  });

