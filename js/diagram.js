var data_V1 = [{
  "Type": "Audio",
  "Amount": 55,
  "Description": "112Gb"
}, {
  "Type": "Video",
  "Amount": 23,
  "Description": "47Gb"
}, {
  "Type": "Photo",
  "Amount": 17,
  "Description": "35Gb"
}, {
  "Type": "Other",
  "Amount": 5,
  "Description": "10Gb"
}];

var data_V2 = [{
  "Type": "Audio",
  "Amount": 33,
  "Description": "67Gb"
}, {
  "Type": "Video",
  "Amount": 43,
  "Description": "88Gb"
}, {
  "Type": "Photo",
  "Amount": 9,
  "Description": "18Gb"
}, {
  "Type": "Other",
  "Amount": 15,
  "Description": "30Gb"
}];

data = [{
  "key": "data_V1",
  "values": data_V1
}, {
  "key": "data_V2",
  "values": data_V2
}]

var width = parseInt(d3.select('#pieChart').style('width'), 12);
var height = width;
var radius = (Math.min(width, height) - 10) / 2;

var type = function getObject(obj) {
  types = [];
  for (var i = 0; i < obj.length; i++) {
    types.push(obj[i].Type);
  }
  return types
};

var pie = d3.layout.pie()
  .value(function(d) {
    return d.Amount;
  })
  .sort(null);

var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(80);

var arcOver = d3.svg.arc()
  .outerRadius(radius + 1)
  .innerRadius(80);

var svg = d3.select("#pieChart").append("svg")
  .attr("width", '100%')
  .attr("height", '100%')
  .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
  .attr('preserveAspectRatio', 'xMinYMin')
  .append("g")
  .attr("transform", "translate(" + radius + "," + height / 2 + ")");

var path = svg.selectAll("path");

var label = d3.select("#dataSelection")
  .data(data)
  .on("change", changeData)
  .filter(function(d, i) {
  console.log(!i)
    return !i;
  })
  .each(changeData)

changeText = function(text, textID) {
  d3.select(textID)
    .text(text)
};

change = function(d, i) {
  var angle = 90 - ((d.startAngle * (180 / Math.PI)) + ((d.endAngle - d.startAngle) * (180 / Math.PI) / 2))
  svg.transition()
    .duration(1000)
    .attr("transform", "translate(" + radius + "," + height / 2 + ") rotate(" + angle + ")")
  d3.selectAll("path")
    .transition()
    .attr("d", arc)
  d3.select(i)
    .transition()
    .duration(1000)
    .attr("d", arcOver)
};

function changeData() {
  var selectedData = data[this.selectedIndex]
  var color = d3.scale.ordinal()
  .domain(type(selectedData.values))
  .range(["#4daf7b", "#e25734", "#ebc85e", "#f4ede7", "#BF4539"]);
  
  var data1 = pie(selectedData.values);
  var dataText = [selectedData.key];

  path = path.data(data1)

  path.enter().append("path")
    .each(function(d) {
      this._current = {
        startAngle: d.endAngle,
        endAngle: d.endAngle
      };
    })
    .attr("fill", function(d) {
      return color(d.data.Type);
    })
    .on("click", function(d) {
      var titleText = d.data.Type + ": " + d.data.Amount + "%";
      var blockText = d.data.Description;

      changeText(titleText, "#segmentTitle");
      changeText(blockText, "#segmentText");
      change(d, this);
    });
  path.exit()
    .datum(function(d, i) {
      return {
        startAngle: d.endAngle,
        endAngle: d.endAngle
      };
    })
    .transition()
    .duration(750)
    .attrTween("d", arcTween)
    .remove();
  path.transition()
    .duration(750)
    .attrTween("d", arcTween);

  $('.text-container').hide();
  $('#segmentTitle').replaceWith('<p id="segmentTitle">Select <br /> segment</p>');
  $('#')
  $('#segmentText').replaceWith('<p id="segmentText"> </p>');
  $('.text-container').fadeIn(400);

};

function key(d) {
  return d.data.Type;
}

function arcTween(d) {
  var i = d3.interpolate(this._current, d);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

