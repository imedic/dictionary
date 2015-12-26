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

function buildRow(input, correctValue, word) {
    var isCorrect = input.value === correctValue ? 'correct' : 'incorrect';
    console.log(isCorrect);

    var container = document.getElementById("past-results");
    var row = document.createElement('div');
    var column1 = document.createElement('div');
    var column2 = document.createElement('div');
    var column3 = document.createElement('div');

    row.className = 'row';
    container.insertBefore(row, container.childNodes[0]);

    column1.className = 'column column-1';
    column1.innerHTML = '<div class="' + isCorrect + '">' + word +  '</div>';
    row.appendChild(column1);

    column2.className = 'column column-2';
    column2.innerHTML = '<div class="' + isCorrect + '">' + input.value +  '</div>';
    row.appendChild(column2);

    column3.className = 'column column-3';
    if(isCorrect === 'correct') {
        column3.innerHTML = '<div class="' + isCorrect + '"><img src="img/check.svg" alt="Točno"></div>';
    }
    else {
        column3.innerHTML = '<div class="' + isCorrect + '">' + correctValue + '</div>';
    }
    row.appendChild(column3);
}


//vraća niz svojsava objekta obj
function arrayOfProperties(obj) {
    var temp = [];
    for (var i in obj) {
        temp[temp.length] = i;
    }
    return temp;
}
