// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	// Your code here
    
    var button = document.getElementById("submit-answer");  
    var input = document.getElementById("translate-answer");
    var wordArray = arrayOfProperties(current_dict);    //uzima objekt i vraća niz njegovih properties-a (u ovom slučajevu niz engleskih riječi)
    var random = randomElement(current_dict);   //vraća nasumično svojstvo objekta (u ovom slučajevu jednu englesku riječ)

    input.focus();  //fokusiramo input polje 

    //jQuery UI ugrađen autocomplete, source - niz riječi koje će prikazati
    //minLength - minimalan broj znakova
    //select - event, odabranu vrijednost sa autocomplete upišemo u formu,
    //pozovemo funkciju clickEvent() i vraćamo false da ne bi u formu upisao već proslijeđenu vrijednost
    $("#translate-answer").autocomplete({
        source: wordArray, 
        minLength: 2,
        select: function( event, ui ) {
            $("#translate-answer").val(ui.item.label);
            clickEvent(); 
            return false;
        }
    }); 

    //postavljamo riječ za koju tražimo prijevod
    document.getElementById("translate-word").innerHTML = current_dict[random];

    console.log(random);
    console.log(current_dict[random]);

    //nakon što kliknemo na dugme stvaramo novi red, brišemo tekst u input formi,
    //fokusiramo input, biramo novi random element i postavljamo ga kao novu riječ 
    //za koju tražimo prijevod
    button.addEventListener("click", clickEvent);

    function clickEvent() {
        buildRow(input, random, current_dict[random]);
        input.value = "";
        input.focus();
        random = randomElement(current_dict); 
        document.getElementById("translate-word").innerHTML = current_dict[random];
    }
});


//uzima objekt, prolazi kroz sva njegova svojstva i nasumično uzima i vraća jedan element
function randomElement(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}


//stvara html na osnovi string-a
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}


//uzima unešeni tekst u formi, točnu prevedenu riječ (na engleskom) i riječ na španjolskom
//stvara novi red, dodaje ga nakon prvog reda te na taj novi red dodaje potreban sadržaj
function buildRow(input, correctValue, word) {
    var isCorrect = input.value === correctValue ? 'correct' : 'incorrect';
    console.log(isCorrect);
    
    var row = document.createElement('div');
    var container = document.getElementById("translate-game");
    row.className = 'row';
    container.insertBefore(row, container.childNodes[2]);

    var col1 = '<div class="column column-1"><div class="' + isCorrect + '">' + word +  '</div></div>';
    col1 = create(col1);
    row.appendChild(col1);

    var col2 = '<div class="column column-2"><div class="' + isCorrect + '">' + input.value +  '</div></div>';
    col2 = create(col2);
    row.appendChild(col2);

    var col3;
    if(isCorrect === 'correct') {
        col3 = '<div class="column column-3"><div class="' + isCorrect + '"><img src="img/check.svg" alt="Točno"></div></div>';
    }
    else {
        col3 = '<div class="column column-3"><div class="' + isCorrect + '">' + correctValue + '</div></div>';
    }
    col3 = create(col3);
    row.appendChild(col3);
}


//vraća niz svojsava objekta obj
function arrayOfProperties(obj) {
    var temp = [];
    for (var i in obj) {
        temp[temp.length] = i;
    }
    return temp;
}
