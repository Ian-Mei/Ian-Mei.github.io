var i = 0;
var j = 0;
var words = [" a student", " an athlete", " a fullstack developer", " a hard worker"];
var speed = 50;


typeWriter();


function typeWriter() {
    if(i == 0 ){
        writeWord();
    }else{
        deleteWord();
    }
}


function deleteWord(){
    if(document.getElementById("changingText").innerHTML != " "){
        document.getElementById("changingText").innerHTML = document.getElementById("changingText").innerHTML.slice(0,-1);
        setTimeout(deleteWord, Math.floor((Math.random() * 20)+45));
    }else if(document.getElementById("changingText").innerHTML == " "){
        i = 0;
        if(j == words.length -1){
            j = 0;
        }else{
            j++;
        }
        setTimeout(typeWriter, 100);
    }
}


function writeWord(){
    if (i < words[j].length) {
        document.getElementById("changingText").innerHTML += words[j].charAt(i);
        i++;
        setTimeout(writeWord,  Math.floor((Math.random() * 20)+45));
    }else if(i == words[j].length){
        setTimeout(typeWriter,1750);
    }
}