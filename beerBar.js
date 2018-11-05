/*
*The purpose of this code is: JS for Beer Bar Graph
*Last modified on: 11/4/18
*This code written by Benjamin Gross.
*        ___  _   _   _    _   _ _____ _   _ __  __ ____    _    _   _ ______        _____ ____ _   _   ____   ____ __  __    _    ___ _       ____ ___  __  __ 
*       / _ \| | | | / \  | \ | |_   _| | | |  \/  / ___|  / \  | \ | |  _ \ \      / /_ _/ ___| | | | / __ \ / ___|  \/  |  / \  |_ _| |     / ___/ _ \|  \/  |
*      | | | | | | |/ _ \ |  \| | | | | | | | |\/| \___ \ / _ \ |  \| | | | \ \ /\ / / | | |   | |_| |/ / _` | |  _| |\/| | / _ \  | || |    | |  | | | | |\/| |
*      | |_| | |_| / ___ \| |\  | | | | |_| | |  | |___) / ___ \| |\  | |_| |\ V  V /  | | |___|  _  | | (_| | |_| | |  | |/ ___ \ | || |___ | |__| |_| | |  | |
*       \__\_\\___/_/   \_\_| \_| |_|  \___/|_|  |_|____/_/   \_\_| \_|____/  \_/\_/  |___\____|_| |_|\ \__,_|\____|_|  |_/_/   \_\___|_____(_)____\___/|_|  |_|
*                                                                                                      \____/                                                   
*/


$(window).load(function() {


var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
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




	//Declare variables
  var xmlDoc;
  var results;

  
  letsGo();	//Grabs the xml document and saves it
  
  var symbol = "AK";
  
  results = $(xmlDoc).find("state symbol:contains('"+symbol+"')").each(function(){
  		results = $(this).parent().find('tavern').text();
  
  });
  console.log(results);
  
  
  
  
  
  function recordThis(results){		//Called by letsGo
  		xmlDoc=results;	//Keep this saved globally.
  }
  
	function letsGo(){		//Called at the beginning to pull in the XML
    $.ajax({
	url: 'Beer.xml',
	dataType: 'xml',
	success: recordThis,
	error: function(){alert("Error: Something went wrong");}
    });
  }
  
  
  
  
});



























