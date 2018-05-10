
// Title       : Abyssus toolz
// Desc        : Little tools for Abyssus Game("https://s1.abyssus.games/jeu.php")
// Autor       : YourX3(youri03 in the game)
// Creation    : 04/05/2018
// Last update : 10/05/2018  19h36

// Version     : 0.1.5



init();

// fonction appelée lorsque la page est chargée(sur https://s1.abyssus.games/*)
function init(){
	// fin de l'URL : sur https://s1.abyssus.games/jeu.php?page=armee : ?page=armee
	var docSearchPath = document.location.search;

	// si la page est la Page d'attaque sur le TM
	if(docSearchPath.split('&')[0] === "?page=attaque" && docSearchPath.split('&')[2] === "lieu=1")
		page_atk();
	// si la page est la page d'armée
	else if(docSearchPath === "?page=armee" || docSearchPath === "?page=armee&action=barriere")
		armyPage();
};

/************************************************************
*                          PAGES
***********************************************************/

////////////////////////////////////////////////////////////
//                        PAGE ATTAQUE                    //

function page_atk()
{
	// Si aucun cookie au nom "numberOfAttaks" n'a été trouvé -> pas de floods lancés
	if(readCookie("numberOfAttaks") === null){
		// nom de la cible
		var targetName = document.getElementsByTagName('h1')[0].textContent.split(' ')[3];
		
		// case où entrer le TM la cible
		var inputTdcTarget = document.createElement('none');
		var input_innerHTML = '<input type="text" id="targetTM" name="targetTM" class="text" value="TM de ' + targetName + '" data-nb="0" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';
		inputTdcTarget.innerHTML =  input_innerHTML;
		inputTdcTarget.value += "playerName";
		document.getElementsByTagName('center')[0].insertBefore(inputTdcTarget, document.getElementsByTagName('h1')[0]);

		// Bouton qui prépare les floods
		var but_launchFloods = document.createElement('none');
		but_launchFloods.innerHTML = '<button onclick="onClick_buttonFloods()">Préparer les floods</button>';
		document.getElementsByTagName('center')[0].insertBefore(but_launchFloods, document.getElementsByTagName('h1')[0]);
	}
	else if(document.getElementsByTagName('h1').length > 0){
		if(Number(readCookie("numberOfAttaks")) < Number(readCookie("attakNum"))){
			deleteCookie("numberOfAttaks");
			deleteCookie("attakNum");
			document.getElementsByTagName('h1')[0].textContent = "Tous les floods ont été lancés";
		}
		else{
			putAllUnitsToNull();
			document.getElementsByName('SJ')[0].value = readCookie("Attaque_"+readCookie("attakNum"));
			document.getElementsByName('SJ')[0].data = readCookie("Attaque_"+readCookie("attakNum"));
			createCookie("attakNum", String(Number(readCookie("attakNum"))+1), 60);
		}
	}
}

function putAllUnitsToNull() {
	document.getElementsByName('SJ')[0].value = 0;
	document.getElementsByName('SJ')[0].data = 0;
	
	document.getElementsByName('S')[0].value = 0;
	document.getElementsByName('S')[0].data = 0;
	
	document.getElementsByName('SC')[0].value = 0;
	document.getElementsByName('SC')[0].data = 0;
	
	document.getElementsByName('R')[0].value = 0;
	document.getElementsByName('R')[0].data = 0;
	
	document.getElementsByName('M')[0].value = 0;
	document.getElementsByName('M')[0].data = 0;
	
	document.getElementsByName('PP')[0].value = 0;
	document.getElementsByName('PP')[0].data = 0;
	
	document.getElementsByName('B')[0].value = 0;
	document.getElementsByName('B')[0].data = 0;
	
	document.getElementsByName('BC')[0].value = 0;
	document.getElementsByName('BC')[0].data = 0;
	
	document.getElementsByName('GRB')[0].value = 0;
	document.getElementsByName('GRB')[0].data = 0;
	
	document.getElementsByName('OQ')[0].value = 0;
	document.getElementsByName('OQ')[0].data = 0;
	
	document.getElementsByName('OQC')[0].value = 0;
	document.getElementsByName('OQC')[0].data = 0;
	
	document.getElementsByName('K')[0].value = 0;
	document.getElementsByName('K')[0].data = 0;
	
	document.getElementsByName('L')[0].value = 0;
	document.getElementsByName('L')[0].data = 0;
}

function onClick_buttonFloods(){
    var targetTM = Number(removeSpaces(document.getElementsByName('targetTM')[0].value));
    var nbRem = Number(removeSpaces(document.getElementsByName('SJ')[0].value));
    var playerTM = Number(removeSpaces(document.getElementsByTagName('span')[7].childNodes[1].data));

    if(nbRem > 0 && !isNaN(targetTM)){
        var listOfAttaks = [];
        var lastWasNotTwenty = false;
        var _end = false;
	var totalFloods = 0;
        while(!_end){
            var twentyPercents = Math.round(targetTM*20/100);

            if(nbRem >= twentyPercents){
                if(targetTM-twentyPercents > (playerTM+twentyPercents)/2){
			listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), +String(twentyPercents)]);
			nbRem -= twentyPercents;
			targetTM -= twentyPercents;
			playerTM += twentyPercents;
			totalFloods += twentyPercents;
                }
                else if(!lastWasNotTwenty){
			listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), +String(Math.round(targetTM - playerTM / 2))]);
			nbRem -= Math.round(targetTM - playerTM / 2);
			lastWasNotTwenty = true;
			targetTM -= Math.round(targetTM - playerTM / 2);
			playerTM += Math.round(targetTM - playerTM / 2);
			totalFloods += Math.round(targetTM - playerTM / 2);
                }
                else{
			listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), +String(twentyPercents)]);
			nbRem -= twentyPercents;
			_end = true;
			targetTM -= twentyPercents;
			playerTM += twentyPercents;
			totalFloods += twentyPercents;
                }
            }
            else{
                listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), +String(nbRem)]);
				totalFloods += nbRem;
                _end = true;
            }
        }

        createCookie("numberOfAttaks", String(listOfAttaks.length), 60);
        createCookie("attakNum", "1", 60);
	var textToAlert = "Nb d'attaques : " + String(listOfAttaks.length) + "\n";
        for(var i=0; i < listOfAttaks.length; ++i){
            textToAlert += "Attaque " + String((listOfAttaks[i])[0]) + ": " + String((listOfAttaks[i])[1]) + "\n";
            createCookie(String((listOfAttaks[i])[0]), String((listOfAttaks[i])[1]), 60);
        }
	textToAlert += "Total: " + String(totalFloods);
	alert(textToAlert);
		
	putAllUnitsToNull();
	document.getElementsByName('SJ')[0].value = readCookie("Attaque_"+readCookie("attakNum"));
	document.getElementsByName('SJ')[0].data = readCookie("Attaque_"+readCookie("attakNum"));
	createCookie("attakNum", String(Number(readCookie("attakNum"))+1), 60);
    }
}


////////////////////////////////////////////////////////////
//                        PAGE ARMEE                     //

function armyPage(){
	if(readCookie("armyReplacing") === null){
		var alignText = document.createElement('none');
		alignText.innerHTML = '<text>/ . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </text>';
		document.getElementsByTagName('center')[0].insertBefore(alignText, document.getElementsByTagName('table')[1]);

		var but_replaceArmy = document.createElement('none');
		but_replaceArmy.innerHTML = '<button onclick="onClickButtonReplaceArmy()">Placer anti-sonde</button>';
		document.getElementsByTagName('center')[0].insertBefore(but_replaceArmy, document.getElementsByTagName('table')[1]);

		var antiSondeText = document.createElement('none');
		antiSondeText.innerHTML = '<text> __ Anti sonde : </text>';
		document.getElementsByTagName('center')[0].insertBefore(antiSondeText, document.getElementsByTagName('table')[1]);

		var antiSondeValue;
		if(readCookie("antiSondeValue") === null){
			antiSondeValue = "10000 rem";
		}
		else{
			antiSondeValue = readCookie("antiSondeValue");
		}

		var antiSondeInput = document.createElement('none');
		antiSondeInput.innerHTML = '<input type="text" name="antiSondeInput" class="text" value="' + antiSondeValue + '" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';


		$(antiSondeInput).on('focusout', function(){
		    onFocusOut_antiSondeInput();
		});
		document.getElementsByTagName('center')[0].insertBefore(antiSondeInput, document.getElementsByTagName('table')[1]);
	}
	else if(readCookie("armyReplacing") === "1"){
		createCookie("armyReplacing", "2", 5);
		var antiSondeInput_Value = document.getElementsByName("antiSondeInput")[0].value;
		var type;
		var nb = Number(removeSpaces(antiSondeInput_Value.split(' ')[0]));

		switch(antiSondeInput_Value.split(' ')[1].toUpperCase())
		{
			case 'REM':
				type = "SJ";
				break;
			case 'PR':
				type = "S";
				break;
			case 'R':
				type = "SC";
				break;
			case 'GR':
				type = "R";
				break;
			case 'RP':
				type = "RB";
				break;
			case 'M':
				type = "M";
				break;
			case 'ME':
				type = "PP";
				break;
			case 'RM':
				type = "B";
				break;
			case 'RL':
				type = "BC";
				break;
			case 'RLV':
				type = "GRB";
				break;
			case 'RB':
				type = "OQ";
				break;
			case 'GRB':
				type = "OQC";
				break;
			case 'K':
				type = "K";
				break;
			case 'KI':
				type = "L";
				break;
		}
		type += "_dome"


		$.post('ajax/deplacement_armee.php', {type:type, nb:nb}, function(data){
			document.location.href='jeu.php?page=armee';
		});
	}
	else if(readCookie("armyReplacing") === "2"){
		$.post('ajax/deplacement_armee.php', {type:"SJ", nb:1}, function(data){
			document.location.href='jeu.php?page=armee';
		});
		deleteCookie("armyReplacing");
	}
}

function onFocusOut_antiSondeInput(){
	var antiSondeInput_Value = document.getElementsByName("antiSondeInput")[0].value;
	if(!rightAntiSonde(antiSondeInput_Value)){
		antiSondeInput_Value = "10000 rem";
		document.getElementsByName("antiSondeInput")[0].value = "10000 rem";
	}
	createCookie("antiSondeValue", antiSondeInput_Value, 30*24*86400);
}

function rightAntiSonde(antiSonde){
	
	if(antiSonde.split(' ').length = 2)
	{
		var antiSondeType = antiSonde.split(' ')[1].toUpperCase();
		if(antiSondeType === "REM" || antiSondeType === "PR" || antiSondeType === "R" || antiSondeType === "GR" || antiSondeType === "RP" || antiSondeType === "M" || antiSondeType === "ME" || antiSondeType === "RM" || antiSondeType === "RL" || antiSondeType === "RLV" || antiSondeType === "RB" || antiSondeType === "GRB" ||  antiSondeType === "K" ||  antiSondeType === "KI") 
		{
			return true;
		}
	}
	return false;
}

function onClickButtonReplaceArmy(){
	createCookie("armyReplacing", "1", 5);
	$.post('ajax/deplacement_armee.php', function(data){
		document.location.href='jeu.php?page=armee&action=barriere';
	});
	
}



//////////////////////////////////////////////////////////////
//                        UTILS                            //
////////////////////////////////////////////////////////////


// supprime les espaces d'une chaîne de charactères
function removeSpaces(string){
	return string.replace(/\s/g, '');
}



/*********************************************************
*                      COOKIES
*******************************************************/

// temps en secondes
function createCookie(nom, value, time) {
	if (time) {
		var date = new Date();
		date.setTime(date.getTime()+(time*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = nom+"="+value+expires+"; path=/";
}

function readCookie(nom) {
	var nameEQ = nom + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function deleteCookie(nom){
	createCookie(nom,"",-1);
}
