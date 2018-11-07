//Based off Code from Jim Skon
//By Joe Lucaccioni

var beerXML, content ="Hello", c, year, type;
var state = [];

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
//Returns an array of objects that contain the state symbol and the value of the consumed beer.
function lookup(){
    $('#searchresults').empty();
    
    var year = $("#year").val();
    var type = $("#type").val();
    
    var data = [];
    var content = [];
    
    var d = beerXML.getElementsByTagName("date");
    
	for(var i=0; i < d.length; i++){
		//This if statement makes sure only the selected year data is pulled
		if(d[i].childNodes[0].nodeValue == year){
			var z = d[i].parentNode;
			var x = z.parentNode;
			
			//gets the symbol of the state, e.g. AZ, IL, WI...
			state.push(x.childNodes[1].childNodes[0].nodeValue);
			
			var a = z.firstChild;
			
			//if all types are calles, this is the search run.
			if(type == "all"){
				var t = 0;
				for (var j = 0; j < z.childNodes.length; j++) {
  					// Process only element nodes (type 1)
  					if (a.nodeType == 1){
  						if(a.nodeName != "date")
  							//changes the string into numbers and adds the data from all types together
  							t += parseFloat(a.childNodes[0].nodeValue);
  					}
  					a = a.nextSibling;
  				}
  				data.push(t);
  				console.log("0st entry: "+data[0]);
			}
			
			//if a specific type is called, this is the search run
			if(type != "all"){
				for (var j = 0; j < z.childNodes.length; j++) {
  					// Process only element nodes (type 1)
  					if (a.nodeType == 1){
  						if(a.nodeName == type){
  							data.push(a.childNodes[0].nodeValue);
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

function makeChart(data){
    	var paragraph = "";
    	paragraph = d3.select('#searchresults')
         .selectAll("p")
         .data(data)
         .enter()
         .append("p")
         .text(function (d, i) {
            console.log("d: " + d);
            console.log("i: " + i);
            console.log("this: " + this);
            return "The state is " + state[i] + " and the data is " + d;
         });s
}