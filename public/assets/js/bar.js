       var barParsedData = [];
       // constructor function for points
       function Bar(feature, value) {
           this.feature = feature;
           this.value = value;
       }

       function getBarNames(data) {
           var domainArray = [];
           for (var i in data) {
               domainArray.push(i);

           }

           return domainArray;
       }

       function getValuesAsArray(data) {
           var valueArray = [];
           for (var i in data) {
               valueArray.push(data[i]);

           }

           return valueArray;

       }

       function formatBarData(data) {

           for (var i in data) {
               var tempBar = new Bar(i, data[i]);
               barParsedData.push(tempBar);
           }

       }
       var margin = {
               top: 20,
               right: 20,
               bottom: 70,
               left: 40
           },
           width = 600 - margin.left - margin.right,
           height = 400 - margin.top - margin.bottom;



       var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);

       var y = d3.scale.linear().range([height, 5]);

       var xAxis = d3.svg.axis()
           .scale(x)
           .orient("bottom");

       var yAxis = d3.svg.axis()
           .scale(y)
           .orient("left")
           .ticks(5);

       var chart3 = d3.select("body").append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform",
               "translate(" + margin.left + "," + margin.top + ")");

       d3.json("data/sample_bar.json", function(error, data) {
           formatBarData(data);
           x.domain(getBarNames(data));
           console.error(barParsedData)

           // clean up maxValue function using formatted bar data
           var maxValue = d3.max(getValuesAsArray(data));
           var domainStructure = maxValue + (maxValue / 10);
           y.domain([0, domainStructure]);

           chart3.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis)
               .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-.8em")
               .attr("dy", "-.55em")
               .attr("transform", "rotate(-90)");

           chart3.append("g")
               .attr("class", "y axis")
               .call(yAxis)
               .append("text")
               .attr("transform", "rotate(-90)")
               .attr("y", 6)
               .attr("dy", ".71em")
               .style("text-anchor", "end")
               .text("Value");

           chart3.selectAll("bar")
               .data(barParsedData)
               .enter().append("rect")
               .style("fill", "steelblue")
               .attr("x", function(d) {
                   return x(d.feature);
               })
               .attr("width", x.rangeBand())
               .attr("y", function(d) {

                   return y(d.value);
               })
               .attr("height", function(d) {
                   return height - y(d.value);
               });

       });