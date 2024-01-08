console.log("Hello World!");
//ChangingWords();
function ChangingWords(){
    const element = document.getElementById("changingText");
    const descriptions = ["fullstack developer", "data analist", "student", "hard worker","backend devloper"]
    let message = "";
    while(true){
        descriptions.forEach(word => {
            word.split("").forEach(char => { 
                console.log("pp");
                message += char;
                element.innerHTML = " " + message;
            });
            for(let i = word.length -1; i!=0; i--){
                message[i] = "";
            }
        });
    }
    
    
}