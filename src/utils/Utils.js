let Utils = {
	QueryUrl:function(key){
		var search = location.search.slice(1); 
		  	var arr = search.split("&"); 
		  	for (var i = 0; i < arr.length; i++) { 
		  		var ar = arr[i].split("="); 
		  		if (ar[0] == key) { 
		  			return ar[1]; 
		  		} 
		 } 
	}
}

export default Utils;