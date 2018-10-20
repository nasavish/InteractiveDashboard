function buildMetadata(newSample) {

  var selector = d3.select("#sample-metadata");



  d3.json(`/metadata/${newSample}`).then((jsonResponse) => {

    // selector.html("")
 
    var sample = jsonResponse.sample;
    var age = jsonResponse.AGE;
    var eth = jsonResponse.ETHNICITY;
    var gen = jsonResponse.GENDER;
    var loc = jsonResponse.LOCATION;
    var bb = jsonResponse.BBTYPE;
    var wf = jsonResponse.WFREQ;

    var htmlCode = `<h1>age</h1>${age}` + `<h1>gender</h1>${gen}` + `<h1>eth</h1>${eth}` + `<h1>loc</h1>${loc}` + `<h1>bb</h1>${bb}` + `<h1>wf</h1>${wf}`;

    selector.html(htmlCode);
})

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.


}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // function optionChanged(newSample) {
    var sampURL = `/samples/${newSample}`;
    var metaURL = `/metadata/${newSample}`;
    // New data
    Plotly.d3.json(sampURL, function(error, response) {
      if (error) return console.warn(error);
      var vals = [];
      var labs = [];
      for (var i = 0; i < 50; i++){
        vals.push(response.sample_values[i]);
        labs.push(response.otu_ids[i]);
      }
      newdata = {values: vals, labels: labs};
      updatePie(newdata);
      updateBub(newdata);
    });

  
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

//Function for dropdowlist option change
