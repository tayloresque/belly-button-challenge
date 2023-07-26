// READ IN THE DATA

// get endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log(dataPromise);

// // fetch the json data and console log it
d3.json(url).then(function(data) {
    console.log(data)
});

// // fetch the json data and console log it
d3.json(url).then(data => {
    namesData = data.names;
    metaData = data.metadata;
    samplesData = data.samples;

    // create an initial bar chart with the first individual's data
    updatePlotly(0);
    updateBubbleChart(0);
    displayMetadata(0);

    // Populate the dropdown menu with test subject IDs
  d3.select('#selDataset')
    .selectAll('option')
    .data(namesData)
    .enter()
    .append('option')
    .text(name => name)
    .property('value', name => name);

    //metadata chart
//    d3.selectAll('#sample-metadata')
//     .selectAll('div')
//     .data(metadata[0])
//     .enter()
//     .append('div')
//     .text(id => id)

    function displayMetadata(index) {
        const metadataData = metaData[index];

        // Select the panel body and clear its content
        const panelBody = d3.select('#sample-metadata');
        panelBody.html('');

        // Append a new paragraph for each key-value pair in the metadata
        Object.entries(metadataData).forEach(([key, value]) => {
        panelBody.append('p').text(`${key}: ${value}`);
        });
    }
    
    // print
    console.log(data)
});

// CREATE HORIZONTAL BAR CHART OF TOP 10 OTUs


// This function 'updatePlotly' is called when a dropdown menu item is selected
function updatePlotly(index) {
    const sampleValues = samplesData[index].sample_values.slice(0, 10).reverse();
    const otuIds = samplesData[index].otu_ids.map(id => `OTU ${id}`).slice(0, 10).reverse();
    const otuLabels = samplesData[index].otu_labels.slice(0, 10).reverse();

    const trace = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: 'bar',
        orientation: 'h',
        marker: {
          color: 'rgb(31, 119, 180)' 
        }
      };

      const layout = {
        title: `Top 10 OTUs for Test Subject ID ${namesData[index]}`,
        xaxis: {
          title: 'Sample Values'
        },
        yaxis: {
          tickfont: { size: 14 }
        }
      };

      Plotly.newPlot('bar', [trace], layout);
    }

// CREATE BUBBLE CHART
function updateBubbleChart(index) {
    const sampleValues = samplesData[index].sample_values;
    const otuIds = samplesData[index].otu_ids;
    const otuLabels = samplesData[index].otu_labels;

    const trace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: 'Earth' 
      }
    };

    const layout = {
      title: `Bubble Chart for Test Subject ID ${namesData[index]}`,
      xaxis: {
        title: 'OTU IDs'
      },
      yaxis: {
        title: 'Sample Values'
      }
     };

     Plotly.newPlot('bubble', [trace], layout);
    }


// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly); 



// This function is called when a dropdown menu item is selected
function dropdownChanged() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
};


// Initial event listener for the dropdown menu
d3.select('#selDataset').on('change', dropdownChanged);