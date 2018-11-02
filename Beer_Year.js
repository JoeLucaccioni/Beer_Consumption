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
    
    var year = $("#year").val();
    var type = $("#type").val();
    
    content = year + " " + type;
    
    var d = beerXML.getElementsByTagName("date");
    
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
			}
			
			if(type != "all"){
				for (var j = 0; j < z.childNodes.length; j++) {
  					// Process only element nodes (type 1)
  					if (a.nodeType == 1){
  						if(a.nodeName == type)
    						content +=  "<br/>" + s + ": "  + a.childNodes[0].nodeValue;
    				}
  					a = a.nextSibling;
				}
			}
		}
	}
    $('#searchresults').append(content);
}