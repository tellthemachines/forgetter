function forgetit(){
    var input = document.getElementById("txt-input").value;

    if (input == "") {
        return;
    }

    input = input.replace(/\s*\r?\n\s*|\s*\r\s*/g, " &parag& "); //replace new lines with stand-in string so they don't get lost
    var intext = input.split(" ");
    var len = intext.length;
    var thirdlen = len/3;
    var numtimes = Math.ceil(Math.random()*thirdlen); //calculate a random number between 1 and a third of the words
    var archive =[];

    for(i=0;i<numtimes;i++){
        var item = Math.ceil(Math.random()*len-1); //get a random word from the text
        var maybe = false;

        //check if the word has already been forgotten

        if (archive.indexOf(item) !== -1) {
            maybe = true;
        }

        // check if the word is a parag stand-in

        if(intext[item].indexOf("&parag&") > -1) {
            maybe = true;
        }

        //if the word hasn't been forgotten, forget it

        if (maybe == false){

            //check for punctuation and save it

            var punctuation = ["\u201c","\u201d","\u2018","\u2019","\u0028","\u0029","\u005b","\u005d","\u002e","\u002c","\u003b","\u003a","\u003f","\u0021","\u2026"];
            var charStorage = [];

            var wordlen = intext[item].length;

            for (n=0; n<wordlen; n++) {
                if(punctuation.indexOf(intext[item][n]) !== -1) {
                    charStorage.push(intext[item][n]);
                }
                else {
                    charStorage.push("&nbsp;");
                }
            }

            //choose between dropping and erasing

            var which = Math.ceil(Math.random()*2);

            //drop

            if(which%2 == 0){
                var dropped = charStorage.filter(function(char){
                    return char !== "&nbsp;";
                });
                intext[item] = dropped.join("");
            }

            //erase

            else{
                intext[item] = charStorage.join("");
                intext[item] += "&obliv&";
            }
            archive.push(item);
        }
    }

    outtext = intext.join(" ");

    // remove spaces after beginning and before end punctuation unless spaces are erased word

    outtext = outtext.replace(/\s+([\u002e\u003f\u002c\u003a\u003b\u0021\u2026\u201d\u2019\u0029\u005d]+)(?!&obliv&)/g,"$1");

    outtext = outtext.replace(/([\u201c\u2018\u0028\u005b])+\s+(?!&obliv&)/g, "$1");

    outtext = outtext.replace(/&obliv&/g, "");

    // sort out paragraphs

    outtext = outtext.replace(/&parag&/g, "</p><p>");
    var parags = "";

    parags += "<p>" + outtext + "</p>";

    // display! and make print button visible

    document.getElementById("text-display").innerHTML = parags;
    document.getElementById("printbut").style.display="block";
}
