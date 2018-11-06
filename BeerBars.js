//Based off Code from Jim Skon
//By Joe Lucaccioni

var beerXML, content ="Hello", c, year, type;

$(document).ready(function(){
	console.log("start!");

    $.ajax({
	url: 'Beer.xml', // name of file you want to parse
	dataType: "xml",
	success: getXML,
	error: function(){alert("Error: Something went wrong");}
	});
	$("#search-btn").click(lookup);
});


function getXML(results){
	beerXML = results;
}

//looks up the data based off year and type.
function lookup(){
	content = "";

    $('#searchresults').empty();
    
    //var year = $("#year").val();
    var type = $("#type").val();
    var state = $("#state").val();
    
    var data = [];
    var backupData = [];
    var yearData = [];
    
    //content = year + " " + type;
    
    var d = beerXML.getElementsByTagName("date");
    
    
    
for(var year=2007; year < 2017; year++){

	for(var i=0; i < d.length; i++){
		if(d[i].childNodes[0].nodeValue == year){
			var z = d[i].parentNode;
			var x = z.parentNode;
			var s = x.childNodes[1].childNodes[0].nodeValue;
			
			var a = z.firstChild;
			
			if(type == "all"){
				var t = 0;
				for (var j = 0; j < z.childNodes.length; j++) {
  					// Process only element nodes (type 1)
  					if (a.nodeType == 1){
  						if(a.nodeName != "date")
  							t += parseFloat(a.childNodes[0].nodeValue);
  					}
  					a = a.nextSibling;
  				}
  				content +=  "<br/>" + s + ": " + t;
  				data.push(t);
  				backupData.push(Math.log10(t));
  				console.log("0st entry: "+data[0]);
			}
			
			if(type != "all"){
				for (var j = 0; j < z.childNodes.length; j++) {
  					// Process only element nodes (type 1)
  					if (a.nodeType == 1){
  						if(a.nodeName == type)
    						content +=  "<br/>" + s + ": "  + a.childNodes[0].nodeValue;
    						data.push(a.childNodes[0].nodeValue);
  							backupData.push(Math.log10(a.childNodes[0].nodeValue));
    				}
  					a = a.nextSibling;
				}
			}
		yearData[year] = data;
		}

	}

}

		var finalOut = 0;
		for(var year=2007; year < 2017; year++){
			finalOut = (parseFloat(finalOut) + parseFloat(yearData[year][state]));
			console.log("yearData["+year+"]["+state+"] is: "+yearData[year][state]);
		}
	

	
	
    $('#searchresults').append(content);
    console.log("finalOut: "+finalOut);
    
    $(".chart").empty();

    
    
    
    var width = 1000,
    barHeight = 20;

var x = d3.scale.log()
    .domain([0.5, d3.max(data)])
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
    
    
    
}













