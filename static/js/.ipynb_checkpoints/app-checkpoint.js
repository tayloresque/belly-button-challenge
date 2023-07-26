// get endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log(dataPromise);

// // fetch the json data and console log it
d3.json(url).then(function(data) {
    console.log(data)
});

// // fetch the endpoint 
// const endpoint = "https://d3js.org/d3.v7.min.js"

// // fetch the json data and console log it
// d3.json(endpoint).then(function(data) {
//     console.log(data)
// })
