var i = 0;
var j = 0;
var words = [" a student", " an athlete", " a fullstack developer", " a hard worker"];
var speed = 50;

typeWriter();

function typeWriter() {
    if (i == 0) {
        writeWord();
    } else {
        deleteWord();
    }
}

function deleteWord() {
    var el = document.getElementById("changingText");
    if (!el) return;
    if (el.innerHTML != " ") {
        el.innerHTML = el.innerHTML.slice(0, -1);
        setTimeout(deleteWord, Math.floor((Math.random() * 20) + 45));
    } else {
        i = 0;
        if (j == words.length - 1) { j = 0; } else { j++; }
        setTimeout(typeWriter, 100);
    }
}

function writeWord() {
    var el = document.getElementById("changingText");
    if (!el) return;
    if (i < words[j].length) {
        el.innerHTML += words[j].charAt(i);
        i++;
        setTimeout(writeWord, Math.floor((Math.random() * 20) + 45));
    } else {
        setTimeout(typeWriter, 1750);
    }
}