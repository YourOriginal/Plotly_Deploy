// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var filter_sample = samplesArray.filter(sampleObj => sampleObj.id == sample);
    console.log(filter_sample)

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var filter_sample2 = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var holdSample = filter_sample[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var holdSample2 = filter_sample2[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = holdSample.otu_ids
    var otu_labels = holdSample.otu_labels
    var sample_values = holdSample.sample_values
    console.log(otu_ids)
    console.log(otu_labels)
    console.log(sample_values)

    // 3. Create a variable that holds the washing frequency.
    var wfreq = parseFloat(result.wfreq)
    console.log(wfreq)

    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0, 10).map(ids => 'OTU ${ids}').reverse();
    console.log(yticks);

    // Create the trace for the bar chart. 
    var barData = [{
        x: sample_values.slice(0, 10).reverse(),
        y: yticks,
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }

    ];
    // Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures"
    };

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);

    // Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Blues"
      }
    }];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {
        title: "OTU ID"
      },
    };

    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);


    // Create the trace for the gauge chart.
    var gaugeData = [{
      domain: {
        x: [0, 1],
        y: [0, 1]
      },
      value: wfreq,
      type: "indicator",
      mode: "gauge+number",
      title: {
        text: "Belly Button Washing Frequency <br>Scrubs per Week "
      },
      gauge: {
        axis: {
          range: [null, 10],
          tickwidth: 2
        },
        steps: [{
            range: [0, 2],
            color: "gainsboro"
          },
          {
            range: [2, 4],
            color: "lightskyblue"
          },
          {
            range: [4, 6],
            color: "slategrey"
          },
          {
            range: [6, 8],
            color: "cornflowerblue"
          },
          {
            range: [8, 10],
            color: "royalblue"
          },
        ]

      }
    }];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 450,
      height: 445,
      margin: {
        t: 0,
        b: 0
      }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}