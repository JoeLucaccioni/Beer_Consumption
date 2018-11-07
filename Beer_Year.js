//Based off Code from Jim Skon
//By Joe Lucaccioni

var beerXML, content ="Hello", c, year, type;

var State = [];

$(document).ready(function(){
	console.log("start!");

    $.ajax({
	url: 'Beer.xml', // name of file you want to parse
	dataType: "xml",
	success: getXML,
	error: function(){alert("Error: Something went wrong");}
	});
	//waits for the user to hit the search button
	$("#search-btn").click(lookup);
});


function getXML(results){
	beerXML = results;
}

//looks up the data based off year and type.
//Returns an array of objects that contain the state symbol and the value of the consumed beer.
function lookup(){
    $('#searchresults').empty();
    
    year = $("#year").val();//gets the year
    type = $("#type").val();//gets the type
    
    var data = [];
    
    var d = beerXML.getElementsByTagName("date");
    
	for(var i=0; i < d.length; i++){
		//This if statement makes sure only the selected year data is pulled
		if(d[i].childNodes[0].nodeValue == year){
			var z = d[i].parentNode;
			var x = z.parentNode;
			
			var s = x.childNodes[1].childNodes[0].nodeValue;
			//gets the symbol of the state, e.g. AZ, IL, WI...
			State.push(x.childNodes[1].childNodes[0].nodeValue);
			
			//gets the population of the state
			var population = parseFloat(x.childNodes[3].childNodes[0].nodeValue)
			
			var a = z.firstChild;
			
			//if all types are calles, this is the search run.
			if(type == "all"){
				var t = 0;
				for (var j = 0; j < z.childNodes.length; j++) {
  					// Process only element nodes (type 1)
  					if (a.nodeType == 1){
  						if(a.nodeName != "date")
  							//changes the string into numbers and adds the data from all types together
  							t += parseInt(a.childNodes[0].nodeValue);
  					}
  					a = a.nextSibling;
  				}
  				t *= 31;//a barrel = 31 gallons
  				t = t/population;
  				var b = t.toFixed(3).toString();
  				data.push(b);
			}
			
			//if a specific type is called, this is the search run
			if(type != "all"){
				for (var j = 0; j < z.childNodes.length; j++) {
  					// Process only element nodes (type 1)
  					if (a.nodeType == 1){
  						if(a.nodeName == type){
  							var t = parseInt(a.childNodes[0].nodeValue);		
  							t *= 31;//a barrel = 31 gallons
  							t = t/population;
  							var b = t.toFixed(3).toString();
  							data.push(b);
  						}
    				}
  					a = a.nextSibling;
				}
			}
		}
	}
	//sends the array of objects called data.
	makeChart(data);
}

function makeChart(Data){
	var y;
	var width = 1000;
	var height = width;
	
	var svg = d3.select("#searchresults")//creates the svg in search results
		.append("svg")
		.attr("width", width)
		.attr("height", height);
    
	var g = svg.selectAll("g")//creates the nodes for each state
		.data(Data)
		.enter()
		.append("g")
		.attr("transform", function(d, i) {
      		return "translate(0,0)";
   		})

	g.append("circle")//sets the nodes to circles
   		.attr("cx", function(d, i) {//sets the x location of the circle
   			if(i<9)
            	return i*100 + 50;
            if(i>=9)
            	return (i%9)*100 + 50;
         })
         
         .attr("cy", function(d, i) {//sets the y location of the circle
         	if(i<9)
            	return 100;
            if(i>=9){
            	if((i%9 == 0)&&(i!=0))
            		y = i/9;
            	return 125*(y+1);}
         })
  
         .attr("r", function(d) {//sets the radius of the circle
         	if(d<=2)
         		return 2;
         	if((d>2)&&(d<80))
         		return d;
         	if(d>=80)
         		return 80;
         })
         
         .attr("fill", "orange")//sets the color to orange
            
	g.append("text")
		.attr("x", function(d, i) {//sets x location of the text
            if(i<9)
            	return i*100 + 25;
            if(i>=9)
            	return (i%9)*100 + 25;
         })
         
         .attr("y", function(d, i) {//sets y location of the text
         	if(i<9)
            	return 100;
            if(i>=9){
            	if(i%9 == 0)
            		y = i/9;
            	return 125*(y+1)+5;}
         })
         .attr("stroke", "teal")//sets color of text
         .attr("font-size", "12px")//sets size of text
         .attr("font-family", "sans-serif")//sets font of text
         .text(function (d, i) {//creates the text
            console.log("d: " + d);
            console.log("i: " + i);
            return State[i]+": "+d;
         });
}
}*/