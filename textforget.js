function forgetit(){
  var input = document.getElementById("txt-input").value;
  input = input.replace(/\r?\n|\r/g, " "); //replace new lines with blank spaces
  var intext = input.split(" ");
  var len = intext.length;
  var thirdlen = len/3;
  var numtimes = Math.ceil(Math.random()*thirdlen); //calculate a random number between 1 and a third of the words 
  var archive =[];
  
  for(i=0;i<numtimes;i++){
    var item = Math.ceil(Math.random()*len-1); //get a random word from the text
	var maybe = false;
	var archlen = archive.length;
	
	//check if the word has already been forgotten
	
	while (archlen--) {
		if (archive[archlen] == item) {
			maybe = true;
		}
	}
	
	//if the word hasn't been forgotten, forget it
	
	if (maybe == false){
	
	//check for punctuation at start and end and save it
	
		var wordlen = intext[item].length;
		var startbit = [];
		var endbit = [];
		if (wordlen >= 2){	
			for(n=0;n<2;n++){
			if(intext[item][n] == "“" || intext[item][n] == "\"" || intext[item][n] == "(" || intext[item][n] == "'" || intext[item][n] == "["){
				startbit.push(intext[item][n]);
			}
		}
	}
	if(wordlen >=3){
		for(m=wordlen-3;m<wordlen;m++){
			if(intext[item][m] == "”" || intext[item][m] == "\"" || intext[item][m] == ")" || intext[item][m] == "(" || intext[item][m] == "'" || intext[item][m] == "." || intext[item][m] == "," || intext[item][m] == ";" || intext[item][m] == ":" || intext[item][m] == "?" || intext[item][m] == "!" || intext[item][m] == "]" || intext[item][m] == "["){
				endbit.push(intext[item][m]);
			}
		}
	}
	
	//choose between dropping and erasing
	
	var which = Math.ceil(Math.random()*2);
	
	//drop
	
	if(which%2 == 0){
		var bitz ="";
		if(startbit.length > 0){
			bitz += startbit.join("");
		}
		if(endbit.length > 0){
			bitz += endbit.join("");
		}
		intext[item] = bitz;
	}
	
	//erase
	
	else{
		var blankword = "";
		if(startbit.length >0){
			blankword += startbit.join("");
			}
		else {
			blankword += "&nbsp;";
		}
		for (j=0;j<wordlen;j++){
			blankword += "&nbsp;";
		}
		if(endbit.length > 0){
			blankword += endbit.join("");
		}
		else {
			if(wordlen != 4){
				blankword += "&nbsp;";
			}
		}
		intext[item] = blankword;
	}
	archive.push(item);
	}
  }
  
  //rejoin text and remove spaces before end punctuation
  
  outtext = intext.join(" ");
  outtext = outtext.replace(/\s\./,".");
  outtext = outtext.replace(/\s\?/,"?");
  outtext = outtext.replace(/\s,/,",");
  outtext = outtext.replace(/\s:/,":");
  outtext = outtext.replace(/\s;/,";");
  outtext = outtext.replace(/\s!/,"!");
  
  //create newline after each period if periods exist
  
  var partext = outtext.split(".");
  var parlen = partext.length;
  var parags = "";
  
  if(parlen >1){
	for(y=0;y<parlen-1;y++){
		parags += '<p>' + partext[y] + '.</p>'; 
	}
  }
  else{
	parags += '<p>' + outtext + '</p>'; 
  }
  
  document.getElementById("text-display").innerHTML = parags;
  document.getElementById("printbut").style.display="block";  
}
