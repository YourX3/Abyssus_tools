// Title       : Abyssus toolz
// Desc        : Little tools for Abyssus Game("https://s1.abyssus.games/jeu.php")
// Autor       : YourX3(youri03 in the game)
// Creation    : 04/05/2018
// Last update : 15/05/2018  20h16

// Version     : 0.3



init();

// fonction appelée lorsque la page est chargée(sur https://s1.abyssus.games/*)
function init(){
	Number.prototype.nombreFormate = function(decimales,signe,separateurMilliers){var _sNombre=String(this),i,_sRetour="",_sDecimales="";if(decimales==undefined)decimales=2;if(signe==undefined)signe='';if(separateurMilliers==undefined)separateurMilliers=' ';function separeMilliers(sNombre){var sRetour="";while(sNombre.length%3!=0){sNombre="0"+sNombre}for(i=0;i<sNombre.length;i+=3){if(i==sNombre.length-1)separateurMilliers='';sRetour+=sNombre.substr(i,3)+separateurMilliers}while(sRetour.substr(0,1)=="0"){sRetour=sRetour.substr(1)}return sRetour.substr(0,sRetour.lastIndexOf(separateurMilliers))}if(_sNombre==0){_sRetour=0}else{if(_sNombre.indexOf('.')==-1){for(i=0;i<decimales;i++){_sDecimales+="0"}_sRetour=separeMilliers(_sNombre)+signe+_sDecimales}else{var sDecimalesTmp=(_sNombre.substr(_sNombre.indexOf('.')+1));if(sDecimalesTmp.length>decimales){var nDecimalesManquantes=sDecimalesTmp.length-decimales;var nDiv=1;for(i=0;i<nDecimalesManquantes;i++){nDiv*=10}_sDecimales=Math.round(Number(sDecimalesTmp)/nDiv)}_sRetour=separeMilliers(_sNombre.substr(0,_sNombre.indexOf('.')))+String(signe)+_sDecimales}}return _sRetour}
	
	var textVersion = document.createElement('none');
	textVersion.innerHTML = '<font size="1" color="white">Abyssus Tools V 0.6 __ Last Updtate 01/07/2018 21h59 </font>';
	document.getElementById('footer').insertBefore(textVersion, document.getElementById('footer').childNodes[0]);
	
	// fin de l'URL : sur https://s1.abyssus.games/jeu.php?page=armee : ?page=armee
	var docSearchPath = document.location.search;
	
	// si la page est la Page d'attaque sur le TM
	if(docSearchPath.split('&')[0] === "?page=attaque")
		page_atk();
	// si la page est la page d'armée
	else if(docSearchPath === "?page=armee" || docSearchPath.split('&')[1] === "action=barriere")
		armyPage();
	else if(docSearchPath.split('&')[0] === "?page=joueur")
		page_playerProfile();
	else if(docSearchPath.split('&')[0] === "?page=alliance")
		page_ally();
	else if(docSearchPath.split('&')[0] === "?page=productionunite")
		page_prodUnit();
	else if(docSearchPath.split('&')[0] === "?page=laboratoire")
		page_labo();
	else if(docSearchPath.split('&')[0] === "?page=listemembre")
		page_membres();
	else if(docSearchPath.split('&')[0] === "?page=chasse")
		page_exploration();
};

/************************************************************
*                          PAGES
***********************************************************/

////////////////////////////////////////////////////////////
//                        PAGE ATTAQUE                    //

function page_atk()
{
	var insertContainer = document.getElementsByTagName('center')[0];
	var insertPlace = document.getElementsByTagName('h1')[0];
	
	if(readCookie("numberOfAttaks") === null){	
		var targetName = document.getElementsByTagName('h1')[0].textContent.split(' ')[3];
		var inputTargetTM_value = "TM de " + targetName;
		
		if(sessionStorage.getItem('targetTM') != null){
			inputTargetTM_value = sessionStorage.getItem('targetTM');
			sessionStorage.removeItem('targetTM');
		}

		var input_innerHTML = '<input type="text" id="targetTM" name="targetTM" class="text" value="' + inputTargetTM_value + '" data-nb="0" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';
		
		var optiFlood_Elements = document.createElement('optiFlood');
		optiFlood_Elements.innerHTML += input_innerHTML;
		optiFlood_Elements.append(createLine());
		optiFlood_Elements.innerHTML += '<input id="checkBoxGhost" type="checkbox">';
		optiFlood_Elements.append(document.createTextNode("Ghost ?"));
		optiFlood_Elements.append(document.createTextNode(" ___ "));
		optiFlood_Elements.innerHTML += '<input id="checkBoxMulti" type="checkbox">';
		optiFlood_Elements.append(document.createTextNode("Multiflood"));
		optiFlood_Elements.append(createLine());
		optiFlood_Elements.append(document.createTextNode("Niveau Quête Poseidon: "));
		
		
		var lvQuestvalue = "inconnue";
		if(readCookie("poseidonQuestLv") != null){
			lvQuestvalue = readCookie("poseidonQuestLv");
		}
		optiFlood_Elements.innerHTML += '<input type="text" id="inputQuestLv" onfocusout="onFocusOut_inputQuestLv()" class="text" value="' + lvQuestvalue + '" data-nb="0" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 50px; cursor: text;">';
		optiFlood_Elements.append(document.createTextNode(" --> "));
		optiFlood_Elements.innerHTML += '<button onclick="onClick_buttonFloods()">Lancer les floods</button>';
		insertContainer.insertBefore(optiFlood_Elements, insertPlace);
	}
	else{
		if(Number(readCookie("numberOfAttaks")) < Number(readCookie("attakNum"))){
			deleteCookie("numberOfAttaks");
			deleteCookie("attakNum");
			var textFloodsEncours =  document.createTextNode("Tous les floods ont été lancés");
			insertContainer.insertBefore(textUnif, insertPlace);
		}
		else{
			var textFloodsEncours =  document.createTextNode("Attaques en cours de lancement: " + readCookie("attakNum") + "/" + readCookie("numberOfAttaks"));
			insertContainer.insertBefore(textFloodsEncours, insertPlace);
			
			if(readCookie("Attaque_"+readCookie("attakNum")) === "Ghost"){
				createCookie("attakNum", String(Number(readCookie("attakNum"))+1), 60);
			}
			else
			{
				putAllUnitsToNull();
				document.getElementsByName('SJ')[0].value = readCookie("Attaque_"+readCookie("attakNum"));
				document.getElementsByName('SJ')[0].data = readCookie("Attaque_"+readCookie("attakNum"));
				createCookie("attakNum", String(Number(readCookie("attakNum"))+1), 60);
			}
			$("input[value='Attaquer']").click();
		}
	}
}

function onFocusOut_inputQuestLv(){
	createCookie("poseidonQuestLv", document.getElementById("inputQuestLv").value, 86400*30);
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


function strToNumber_time(time){
	if(time !== ""){
		var listOfUnits = time.split(' ');
		var total = 0;
		if(listOfUnits.length === 4){
			var dayNb = Number(listOfUnits[0].replace('j', ''));
			var hourNb = Number(listOfUnits[1].replace('h', ''));
			var minNb = Number(listOfUnits[2].replace('m', ''));
			var secNb = Number(listOfUnits[3].replace('s', ''));

			total = dayNb*86400 + hourNb*3600 + minNb*60 + secNb;
		}
		else if(listOfUnits.length === 3){
			var hourNb = Number(listOfUnits[0].replace('h', ''));
			var minNb = Number(listOfUnits[1].replace('m', ''));
			var secNb = Number(listOfUnits[2].replace('s', ''));

			total = hourNb*3600 + minNb*60 + secNb;
		}
		else{
			var minNb = Number(listOfUnits[0].replace('m', ''));
			var secNb = Number(listOfUnits[1].replace('s', ''));

			total = minNb*60 + secNb;
		}
		return total;
	}
	return "inconnu";
}


function onClick_buttonFloods(){
	var targetTM = Number(removeSpaces(document.getElementsByName('targetTM')[0].value));
	var playerTM = Number(removeSpaces(document.getElementsByTagName('span')[7].childNodes[1].data));
	var nbRem = Number(removeSpaces(document.getElementsByName('SJ')[0].value));
	
	if(nbRem > 0 && !isNaN(targetTM)){
		var currentAtks = document.getElementdByTagName("i");    
		if(multi && currentAtks.length > 0){
			var targetTM_new = Number(targetTM).nombreFormate(0);
			var maxTM = (Number(targetTM_new.replace(/\s/g, ''))+1).nombreFormate(0);

			$.post('ajax/ennemies.php', {mintdc:targetTM_new, maxtdc:maxTM, page:1, tri:'distance', sens:'asc', guerre:0, paix:0, ally:0}, function(data){
				var listOfResults = setPlayerTravelTime(data, "playerName:"+document.getElementsByTagName('h1')[0].textContent);
				if(listOfResults !== null){
					var time = listOfResults[4];
					time = strToNumber_time(time);

					if(time !== "inconnu"){
						var indexsOfAtks = [];
						$(".restedans").each(function(index) {
							var currentAtkTime = $(this).value;
							currentAtkTime = currentAtkTime.split(" ");
							var timeValue = "";
							for(var i=currentAtkTime.length-1; i > 0; i-=2){
								currentAtkTime[i-1] = currentAtkTime.replace(/\D/g,'');
								
								switch(i-1){
									case 0: 
										currentAtkTime[i-1] += "s";
										break;
										
									case 1: 
										currentAtkTime[i-1] += "m";
										break;
										
									case 2: 
										currentAtkTime[i-1] += "h";
										break;
										
									case 3: 
										currentAtkTime[i-1] += "j";
										break;
								}
								timeValue += currentAtkTime[i-1] + " ";
							}
							if(strToNumber_time(timeValue) <= time){
								indexsOfAtks.push(index);
							}
						});
						for(var i=0; i < currentAtks.length; ++i){
							if(indexsOfAtks.includes(i)){
								var army = indexsOfAtks[i].childNodes[indexsOfAtks[i].childNodes.length-1];
								army = removeAll_nonNbOrSpaces(army).split("  ");
								
								var totalBooty = 0;
								for(var j = 0; j < army.length; ++j){
									totalBooty += Number(removeSpaces(army[j]));
								}
								playerTM += totalBooty;
							}
						}
					}
				}
			});
		}
		
		optiFlood(playerTM, targetTM);
	}
}

function removeAll_nonNbOrSpaces(str){
	var result = "";
	for(var i=0; i < str.length; ++i){
		if(str[i] === "0" || str[i] === "1" || str[i] === "2" || str[i] === "3" || str[i] === "4" || str[i] === "5" || str[i] === "6" || str[i] === "7" || str[i] === "8" || str[i] === "9" || str[i] === " ")
			result += str[i];
	}
	return result;
}

function optiFlood(playerTM, targetTM){
	var nbRem = Number(removeSpaces(document.getElementsByName('SJ')[0].value));
	var ghost = document.getElementById('checkBoxGhost').checked;
	var multi = document.getElementById('checkBoxMulti').checked;
	var poseidonQuestLv = Number(removeSpaces(document.getElementById('inputQuestLv').value));
	if(isNaN(poseidonQuestLv))
		poseidonQuestLv = 0;
	
	var listOfAttaks = [];
        var lastWasNotTwenty = false;
        var _end = false;
	var totalFloods = 0;
	var minMultiplier = 1/(2 + poseidonQuestLv/10 * 2);
	
	while(!_end){
		var twentyPercents = Math.round(targetTM*0.2);

		if(nbRem >= twentyPercents){
			if(targetTM-twentyPercents > (playerTM+twentyPercents)* minMultiplier){
				listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), String(twentyPercents)]);
				nbRem -= twentyPercents;
				targetTM -= twentyPercents;
				playerTM += twentyPercents;
				totalFloods += twentyPercents;
			}
			else if(!lastWasNotTwenty){
				var value = Math.floor((targetTM-(minMultiplier*playerTM+1))*2/3);
				listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), String(value)]);
				nbRem -= value;
				lastWasNotTwenty = true;
				targetTM -= value;
				playerTM += value;
				totalFloods += value;
			}
			else{
				if(ghost){
					listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), "Ghost"]);
				}
				else{
					listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), String(twentyPercents)]);
				}
				nbRem -= twentyPercents;
				_end = true;
				targetTM -= twentyPercents;
				playerTM += twentyPercents;
				totalFloods += twentyPercents;
			}
		}
		else{
			listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), +String(nbRem)]);
			playerTM += nbRem;
			targetTM -= nbRem;
			totalFloods += nbRem;
			_end = true;
		}
	}

	createCookie("numberOfAttaks", String(listOfAttaks.length), 15);
	createCookie("attakNum", "1", 15);
	var textToAlert = "Nb d'attaques : " + String(listOfAttaks.length) + "\n";
	for(var i=0; i < listOfAttaks.length; ++i){
	textToAlert += "Attaque " + String((listOfAttaks[i])[0]) + ": " + String((listOfAttaks[i])[1]) + "\n";
	createCookie(String((listOfAttaks[i])[0]), String((listOfAttaks[i])[1]), 15);
	}
	textToAlert += "Total: " + String(totalFloods) + "\n" + "\n";
	textToAlert += "Votre TM: " + String(playerTM) + "\n";
	textToAlert += "TM de la cible: " + String(targetTM);

	alert(textToAlert);

	putAllUnitsToNull();
	document.getElementsByName('SJ')[0].value = readCookie("Attaque_"+readCookie("attakNum"));
	document.getElementsByName('SJ')[0].data = readCookie("Attaque_"+readCookie("attakNum"));
	createCookie("attakNum", String(Number(readCookie("attakNum"))+1), 15);
	$("input[value='Attaquer']").click();
}


////////////////////////////////////////////////////////////
//                        PAGE ARMEE                     //

function armyPage(){
	if(readCookie("armyReplacing") === null){
		var insertContainer = document.getElementsByTagName('center')[0];
		var insertPlace = document.getElementsByTagName('table')[1];
	
		var divAlignRight = document.createElement("div");
		divAlignRight.align = "center";
		
		divAlignRight.innerHTML += '<button onclick="onClickButtonReplaceArmy()">Placer anti-sonde</button>';
		divAlignRight.appendChild(document.createTextNode(" _ Anti-sonde : "));

		var antiSondeValue;
		if(readCookie("antiSondeValue") === null){
			antiSondeValue = "10000 rem";
		}
		else{
			antiSondeValue = readCookie("antiSondeValue");
		}
		divAlignRight.innerHTML += '<input type="text" id="antiSondeInput" class="text" value="' + antiSondeValue + '" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';

		$('#antiSondeInput').on('focusout', function(){
		    onFocusOut_antiSondeInput();
		});
		
		divAlignRight.appendChild(createLine());
		insertContainer.insertBefore(divAlignRight, insertPlace);
	}
	else if(readCookie("armyReplacing") === "1"){
		createCookie("armyReplacing", "2", 5);
		var antiSondeInput_Value = readCookie("antiSondeValue");
		if(antiSondeInput_Value === null)
			antiSondeInput_Value = "10000 rem";
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
		var href = getElementByInnerText("a", "Barrière de corail").href;
		document.location.href = href;
	});
	
}


	
////////////////////////////////////////////////////////////////
//                    PAGE PLAYER PROFILE                    //
	
	
function page_playerProfile(){
	if(sessionStorage.getItem("displayingDistances_total") === null || sessionStorage.getItem("displayingDistances_total") === "-2"){
		getElementByInnerText('a', "Attaquer le terrain").onclick = function(){onclick_tmAttack()};
		
		if(sessionStorage.getItem("displayingDistances_total") === "-2") {
			
			var positionTarget = sessionStorage.getItem("displayingDistances_-1");
			
			var posTargetX = positionTarget.split("_")[0];
			var posTargetY = positionTarget.split("_")[1];

			var vc = Number(sessionStorage.getItem("displayingDistances_vc"));


			var locationText = removeSpaces(document.getElementsByTagName('tbody')[1].childNodes[3].childNodes[3].textContent);
			var posX = locationText.split(":")[1];
			posX = posX.substr(0, posX.length-1);
			var posY = locationText.split(":")[2];

			var distance = String(Math.ceil(Math.sqrt((Number(posX) - Number(posTargetX)) * (Number(posX) - Number(posTargetX)) + (Number(posY) - Number(posTargetY)) * (Number(posX) - Number(posTargetY)))));
			var time = Math.ceil(Math.round((24 * 3600 * ((1 - Math.exp(-(Math.sqrt(Math.pow(Math.abs(posTargetX - posX), 2) + Math.pow(Math.abs(posTargetY - posY), 2))) / 350)) * 7.375 * Math.pow(0.9, vc)))));
			time = displayingTime(time);
			
			document.getElementsByTagName('tbody')[1].childNodes[3].childNodes[3].textContent += "\r" + " ______________________ Distance: " + distance + " _Temps de trajet: " + time;
			
			sessionStorage.removeItem("displayingDistances_-1");
			sessionStorage.removeItem("displayingDistances_finalHref");
			sessionStorage.removeItem("displayingDistances_current");
			sessionStorage.removeItem("displayingDistances_total");
		}
		else {		
			var playerTM = document.getElementsByTagName('tbody')[1].childNodes[5].childNodes[3].textContent.split('(')[0];
			playerTM = playerTM.substr(0, playerTM.length-1);
			var maxTM = (Number(playerTM.replace(/\s/g, ''))+1).nombreFormate(0);

			$.post('ajax/ennemies.php', {mintdc:playerTM, maxtdc:maxTM, page:1, tri:'distance', sens:'asc', guerre:0, paix:0, ally:0}, function(data){
				var listOfResults = setPlayerTravelTime(data, "playerName:"+document.getElementsByTagName('h1')[0].textContent);
				if(listOfResults === null){
					document.getElementsByTagName('tbody')[1].childNodes[3].childNodes[3].textContent += "\r" + " ______________________ Distance et temps de Trajet inconnus..";
				}
				else{
					var distance = listOfResults[3];
					var time = listOfResults[4];

					document.getElementsByTagName('tbody')[1].childNodes[3].childNodes[3].textContent += "\r" + " ______________________ Distance: " + distance + " _Temps de trajet: " + time;
				}
			});
		}
		
		var insertContainer = document.getElementsByTagName("center")[0];
		var insertPlace = document.getElementsByTagName("table")[1];

		var divChangePosition = document.createElement('div');

		divChangePosition.innerHTML += '<button onclick="onClick_buttonChangePosition_profile()">Se placer en temps que </button>';
		divChangePosition.innerHTML += '<input type="text" id="inputPlayerName" class="text" value="" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';

		divChangePosition.appendChild(document.createTextNode(" __ VC: "));
		divChangePosition.innerHTML += '<input type="text" id="inputVC" class="text" value="10" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 70px; cursor: text;">';
		
		
		insertContainer.insertBefore(createLine(), insertPlace);
		insertContainer.insertBefore(divChangePosition, insertPlace);

		createCookie("playerListNumber", "0", 5);
		setDistanceAndTime_Ally();
	}
	else{
		var locationText = removeSpaces(document.getElementsByTagName('tbody')[1].childNodes[3].childNodes[3].textContent);
		
		var posX = locationText.split(":")[1];
		posX = posX.substr(0, posX.length-1);
		
		var posY = locationText.split(":")[2];
		
		sessionStorage.setItem("displayingDistances_" + sessionStorage.getItem("displayingDistances_current"), posX +"_" + posY);
		
		if(sessionStorage.getItem("displayingDistances_total") === "-1"){
			sessionStorage.setItem("displayingDistances_total", "-2");
			document.location.href = sessionStorage.getItem("displayingDistances_finalHref");
		}
		else if(Number(sessionStorage.getItem("displayingDistances_current"))+1 === Number(sessionStorage.getItem("displayingDistances_total")))
			document.location.href = sessionStorage.getItem("displayingDistances_finalHref");
		else {
			sessionStorage.setItem("displayingDistances_current", String(Number(sessionStorage.getItem("displayingDistances_current"))+1));
			document.location.href = "jeu.php?page=joueur&pseudo=" + sessionStorage.getItem("displayingDistancesPlayers_" + String(sessionStorage.getItem("displayingDistances_current")));
		}
	}
}

function onClick_buttonChangePosition_profile(){
	var inputValue = document.getElementById('inputPlayerName').value;
	
	if(inputValue !== ""){
		sessionStorage.setItem("displayingDistances_total", "-1");
		sessionStorage.setItem("displayingDistances_current", "-1");
		
		var inputVcValue = Number(document.getElementById("inputVC").value);
		if(isNaN(inputVcValue))
			inputVcValue = 10;
		
		sessionStorage.setItem("displayingDistances_vc", String(inputVcValue));
		sessionStorage.setItem("displayingDistances_finalHref", document.location.href);
		
		var listOfPlayersTr = getPlayersTr();
		
		for(var i=0; i < listOfPlayersTr.length; ++i){
			sessionStorage.setItem("displayingDistancesPlayers_" + String(i), getElementsByTagNameInList(getElementsByTagNameInList(listOfPlayersTr[i].childNodes, "TD")[0].childNodes, "A")[0].textContent);
		}
		
		document.location.href ="jeu.php?page=joueur&pseudo=" + inputValue;
	}
}



function setPlayerTravelTime(data, constraint = "none"){
	var dataSplited = data.split(/\r?\n/);
	
	var playerName, ally, tdc, distance, time;
	var listOfElements = [];

	for(var i=0; i < dataSplited.length; ++i){
		var indexOfPlayer = dataSplited[i].indexOf("page=joueur");
		if(indexOfPlayer !== -1){
			playerName = dataSplited[i].substring(dataSplited[i].indexOf(">", indexOfPlayer) +1, dataSplited[i].indexOf("<", indexOfPlayer));

			var allyIndexOf = dataSplited[i+1].indexOf("tag=");
			ally = dataSplited[i+1].substring(allyIndexOf+4, dataSplited[i+1].indexOf('"', allyIndexOf));

			tdc = dataSplited[i+3].substring(dataSplited[i+3].indexOf('>')+1, dataSplited[i+3].indexOf("</"));
			distance = dataSplited[i+7].substring(dataSplited[i+7].indexOf('>')+1, dataSplited[i+7].indexOf("</"));
			time = dataSplited[i+8].substring(dataSplited[i+8].indexOf('>')+1, dataSplited[i+8].indexOf("</"));
			listOfElements.push([playerName, ally, tdc, distance, time]);
			i += 9;
		}
	}
	
	var finalValue = null;
	if(listOfElements.length > 0){
		if(constraint !== "none"){
			var consType = constraint.split(':')[0];
			var consValue = constraint.split(':')[1];

			switch(consType)
			{
				case "playerName":
					for(var i=0; i < listOfElements.length; ++i){
						if((listOfElements[i])[0] === consValue){
							finalValue = listOfElements[i];
							break;
						}
					}
					break;

				case "ally":
					for(var i=0; i < listOfElements.length; ++i){
						if((listOfElements[i])[1] === consValue){
							finalValue = listOfElements[i];
							break;
						}
					}
					break;

				case "tdc":
					for(var i=0; i < listOfElements.length; ++i){
						if((listOfElements[i])[2] === consValue){
							finalValue = listOfElements[i];
							break;
						}
					}
					break;

				case "distance":
					for(var i=0; i < listOfElements.length; ++i){
						if((listOfElements[i])[3] === consValue){
							finalValue = listOfElements[i];
							break;
						}
					}
					break;

				case "time":
					for(var i=0; i < listOfElements.length; ++i){
						if((listOfElements[i])[4] === consValue){
							finalValue = listOfElements[i];
							break;
						}
					}
					break;
			}
		}
		else{
			finalValue = listOfElements[0];
		}
	}
	return finalValue;
}

function onclick_tmAttack(){
	var tmTarget = document.getElementsByTagName('tbody')[1].childNodes[5].childNodes[3].textContent;
	tmTarget = removeSpaces(tmTarget).split('(')[0];
	sessionStorage.setItem('targetTM', tmTarget);
}





///////////////////////////////////////////////////////////////
//                         PAGE ALLY                        //
/////////////////////////////////////////////////////////////

function page_ally(){
	if(sessionStorage.getItem("displayingDistances_total") === null) {
		var columnDistance = document.createElement('td');
		columnDistance.innerHTML = '<td align="center"><td align="center"><a onclick="onclick_allyDistanceAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Distance </strong><a onclick="onclick_allyDistanceDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnDistance.align ="center";
		document.getElementsByTagName('tbody')[2].childNodes[1].appendChild(columnDistance);


		var columnTime = document.createElement('td');
		columnTime.innerHTML = '<td align="center"><td align="center"><a onclick="onclick_allyTimeAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Temps de trajet </strong><a onclick="onclick_allyTimeDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnTime.align ="center";
		document.getElementsByTagName('tbody')[2].childNodes[1].appendChild(columnTime);

		var insertContainer = document.getElementsByTagName("center")[0];
		var insertPlace = document.getElementsByTagName("h3")[1];

		var divChangePosition = document.createElement('div');
		divChangePosition.align = "right";

		divChangePosition.innerHTML += '<button onclick="onClick_buttonChangePosition_ally()">Se placer en temps que </button>';
		divChangePosition.innerHTML += '<input type="text" id="inputPlayerName" class="text" value="" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';

		divChangePosition.appendChild(document.createTextNode(" __ VC: "));
		divChangePosition.innerHTML += '<input type="text" id="inputVC" class="text" value="10" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 70px; cursor: text;">';
		
		
		insertContainer.insertBefore(createLine(), insertPlace);
		insertContainer.insertBefore(divChangePosition, insertPlace);

		createCookie("playerListNumber", "0", 5);
		setDistanceAndTime_Ally();
	}
	else {
		var columnDistance = document.createElement('td');
		columnDistance.innerHTML = '<td align="center"><td align="center"><a onclick="onclick_allyDistanceAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Distance </strong><a onclick="onclick_allyDistanceDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnDistance.align ="center";
		document.getElementsByTagName('tbody')[2].childNodes[1].appendChild(columnDistance);


		var columnTime = document.createElement('td');
		columnTime.innerHTML = '<td align="center"><td align="center"><a onclick="onclick_allyTimeAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Temps de trajet </strong><a onclick="onclick_allyTimeDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnTime.align ="center";
		document.getElementsByTagName('tbody')[2].childNodes[1].appendChild(columnTime);
		
		var insertContainer = document.getElementsByTagName("center")[0];
		var insertPlace = document.getElementsByTagName("h3")[1];

		var divChangePosition = document.createElement('div');
		divChangePosition.align = "right";

		divChangePosition.innerHTML += '<button onclick="onClick_buttonChangePosition_ally()">Se placer en temps que </button>';
		divChangePosition.innerHTML += '<input type="text" id="inputPlayerName" class="text" value="" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';

		divChangePosition.appendChild(document.createTextNode(" __ VC: "));
		divChangePosition.innerHTML += '<input type="text" id="inputVC" class="text" value="10" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 70px; cursor: text;">';
		
		
		insertContainer.insertBefore(createLine(), insertPlace);
		insertContainer.insertBefore(divChangePosition, insertPlace);
		
		var targetPos = sessionStorage.getItem("displayingDistances_-1");
		var allPos = [];
		
		for(var i=0; i < Number(sessionStorage.getItem("displayingDistances_total")); ++i){
			if(sessionStorage.getItem("displayingDistances_" + String(i)) !== null){
				allPos.push(sessionStorage.getItem("displayingDistances_" + String(i)));
				sessionStorage.removeItem("displayingDistances_" + String(i));
			}
		}
		
		for(var i=0; i < Number(sessionStorage.getItem("displayingDistances_total")); ++i){
			sessionStorage.removeItem("displayingDistancesPlayers_" + String(i));
		}
		
		setDistanceAndTime_byPos_ally(targetPos, allPos);
		
		sessionStorage.removeItem("displayingDistances_finalHref");
		sessionStorage.removeItem("displayingDistances_current");
		sessionStorage.removeItem("displayingDistances_total");
	}
}

function onClick_buttonChangePosition_ally(){
	var inputValue = document.getElementById('inputPlayerName').value;
	
	if(inputValue != ""){
		sessionStorage.setItem("displayingDistances_total", String(getPlayersTr().length));
		sessionStorage.setItem("displayingDistances_current", "-1");
		
		var inputVcValue = Number(document.getElementById("inputVC").value);
		if(isNaN(inputVcValue))
			inputVcValue = 10;
		
		sessionStorage.setItem("displayingDistances_vc", String(inputVcValue));
		sessionStorage.setItem("displayingDistances_finalHref", document.location.href);
		
		var listOfPlayersTr = getPlayersTr();
		
		for(var i=0; i < listOfPlayersTr.length; ++i){
			sessionStorage.setItem("displayingDistancesPlayers_" + String(i), getElementsByTagNameInList(getElementsByTagNameInList(listOfPlayersTr[i].childNodes, "TD")[0].childNodes, "A")[0].textContent);
		}
		
		document.location.href ="jeu.php?page=joueur&pseudo=" + inputValue;
	}
}

function setDistanceAndTime_byPos_ally(targetPos, playersPos){
	var listOfPlayersTr = getPlayersTr();
	var posTargetX = targetPos.split("_")[0];
	var posTargetY = targetPos.split("_")[1];
	
	var vc = Number(sessionStorage.getItem("displayingDistances_vc"));
	
	for(var i=0; i < listOfPlayersTr.length; ++i){
		var targetPlayer = listOfPlayersTr[i];
		var posPlayerX = playersPos[i].split("_")[0];
		var posPlayerY = playersPos[i].split("_")[1];
		
		var distance = String(Math.ceil(Math.sqrt((Number(posPlayerX) - Number(posTargetX)) * (Number(posPlayerX) - Number(posTargetX)) + (Number(posPlayerY) - Number(posTargetY)) * (Number(posPlayerY) - Number(posTargetY)))));
		var time = Math.ceil(Math.round((24 * 3600 * ((1 - Math.exp(-(Math.sqrt(Math.pow(Math.abs(posTargetX - posPlayerX), 2) + Math.pow(Math.abs(posTargetY - posPlayerY), 2))) / 350)) * 7.375 * Math.pow(0.9, vc)))));

		time = displayingTime(time);
		
		var distanceTd = document.createElement('td');
		distanceTd.align = "center";
		distanceTd.textContent = distance;
		targetPlayer.appendChild(distanceTd);

		var timeTd = document.createElement('td');
		timeTd.align = "center";
		timeTd.textContent = time;
		targetPlayer.appendChild(timeTd);
	}
	
}


function getTagInH1(str){
	return str.substring(1, str.indexOf("]"));
}

function setDistanceAndTime_Ally(){
	var listOfPlayersTr = getPlayersTr();
	
	if(Number(readCookie("playerListNumber")) < listOfPlayersTr.length)
	{
		var playerTM = listOfPlayersTr[Number(readCookie("playerListNumber"))].childNodes[5].textContent;
		var maxTM = (Number(playerTM.replace(/\s/g, ''))+1).nombreFormate(0);

		$.post('ajax/ennemies.php', {mintdc:playerTM, maxtdc:maxTM, page:1, tri:'distance', sens:'asc', guerre:0, paix:0, ally:0}, function(data){
			var listOfResults = setPlayerTravelTime(data, "ally:"+getTagInH1(document.getElementsByTagName("h1")[0].textContent));
			var listOfPlayersTr = getPlayersTr();
			var targetPlayer = listOfPlayersTr[Number(readCookie("playerListNumber"))];

			if(listOfResults === null){	
				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.textContent = "inconnue";
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.textContent = "inconnu";
				targetPlayer.appendChild(timeTd);
			}
			else{
				var distance = listOfResults[3];
				var time = listOfResults[4];

				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.textContent = distance;
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.textContent = time;
				targetPlayer.appendChild(timeTd);
			}
			createCookie("playerListNumber", String(Number(readCookie("playerListNumber")) +1), 5);
			setDistanceAndTime_Ally();
		});
	}
}


function getPlayersTr(){
	var listOfElements = document.getElementsByTagName('tbody')[2].childNodes;
	var result = [];
	
	for(var i=2; i < listOfElements.length; ++i){
		if(listOfElements[i].tagName === "TR"){
			result.push(listOfElements[i]);
		}
	}
	return result;
}

/////////////////////////////////////////////////////////////
//                         TRI ALLY                       //


function distanceSorter(){
	var listOfPlayersTr = getPlayersTr();
	for(var i=0; i < listOfPlayersTr.length; ++i){
		document.getElementsByTagName('tbody')[2].removeChild(listOfPlayersTr[i]);
	}
	var listSorted = [];
	listSorted.push(listOfPlayersTr[0]);
	for(var i=1; i < listOfPlayersTr.length; ++i){
		if(isNaN(Number(getDistanceOfElement(listSorted[0])))){
			listSorted.splice(0, 0, listOfPlayersTr[i]);
		}
		else if(isNaN(Number(getDistanceOfElement(listOfPlayersTr[i])))){
			listSorted.push(listOfPlayersTr[i]);
		}
		else{
			var findedMore = false;
			for(var j=0; j < listSorted.length; ++j){
				if(Number(getDistanceOfElement(listOfPlayersTr[i])) < Number(getDistanceOfElement(listSorted[j]))){
					listSorted.splice(j, 0, listOfPlayersTr[i]);
					findedMore = true;
					break;
				}
			}
			if(!findedMore)
				listSorted.push(listOfPlayersTr[i]);
		}
	}
	return listSorted;
}

function getDistanceOfElement(element){
	return element.childNodes[11].textContent;
}


function onclick_allyDistanceAsc(){// plus petit au plus grand
	var listSorted = distanceSorter();
	
	for(var i=0; i < listSorted.length; ++i){
		document.getElementsByTagName('tbody')[2].appendChild(listSorted[i]);
	}
}

function onclick_allyDistanceDesc(){
	var listSorted = distanceSorter();
	
	for(var i=listSorted.length-1; i > -1; --i){
		document.getElementsByTagName('tbody')[2].appendChild(listSorted[i]);
	}
}


function timeSorter(){
	var listOfPlayersTr = getPlayersTr();
	for(var i=0; i < listOfPlayersTr.length; ++i){
		document.getElementsByTagName('tbody')[2].removeChild(listOfPlayersTr[i]);
	}
	var listSorted = [];
	listSorted.push(listOfPlayersTr[0]);
	for(var i=1; i < listOfPlayersTr.length; ++i){
		if(getTimeOfElement(listSorted[0]) === "inconnu"){
			listSorted.splice(0, 0, listOfPlayersTr[i]);
		}
		else if(getTimeOfElement(listOfPlayersTr[i]) === "inconnu"){
			listSorted.push(listOfPlayersTr[i]);
		}
		else{
			var findedMore = false;
			for(var j=0; j < listSorted.length; ++j){
				if(getTimeOfElement(listOfPlayersTr[i]) < getTimeOfElement(listSorted[j])){
					listSorted.splice(j, 0, listOfPlayersTr[i]);
					findedMore = true;
					break;
				}
			}
			if(!findedMore)
				listSorted.push(listOfPlayersTr[i]);
		}
	}
	return listSorted;
}

function getTimeOfElement(element){
	var textTime = element.childNodes[12].textContent;
	if(textTime !== "inconnu"){
		var listOfUnits = textTime.split(' ');
		var total = 0;
		if(listOfUnits.length === 4){
			var dayNb = Number(listOfUnits[0].replace('j', ''));
			var hourNb = Number(listOfUnits[1].replace('h', ''));
			var minNb = Number(listOfUnits[2].replace('m', ''));
			var secNb = Number(listOfUnits[3].replace('s', ''));

			total = dayNb*86400 + hourNb*3600 + minNb*60 + secNb;
		}
		else if(listOfUnits.length === 3){
			var hourNb = Number(listOfUnits[0].replace('h', ''));
			var minNb = Number(listOfUnits[1].replace('m', ''));
			var secNb = Number(listOfUnits[2].replace('s', ''));

			total = hourNb*3600 + minNb*60 + secNb;
		}
		else{
			var minNb = Number(listOfUnits[0].replace('m', ''));
			var secNb = Number(listOfUnits[1].replace('s', ''));

			total = minNb*60 + secNb;
		}
		return total;
	}
	return "inconnu";
}





function onclick_allyTimeAsc(){
	var listSorted = timeSorter();
	
	for(var i=0; i < listSorted.length; ++i){
		document.getElementsByTagName('tbody')[2].appendChild(listSorted[i]);
	}
}


function onclick_allyTimeDesc(){
	var listSorted = timeSorter();
	
	for(var i=listSorted.length-1; i > -1; --i){
		document.getElementsByTagName('tbody')[2].appendChild(listSorted[i]);
	}
}


//////////////////////////////////////////////////////////////
//                      PAGE PROD UNITS                    //

function getElementsByTagNameInList(list, tagName){
	var result = [];
	for(var i=0; i < list.length; ++i){
	    if(list[i].tagName === tagName){
		 result.push(list[i]);
	    }
	}
	return result;
}

function page_prodUnit(){
	var body = document.getElementsByTagName("body")[0];
	body.addEventListener("keyup", function(){updateTables()});
	
	setRealAtkToArmy(true);
}

function updateTables(){
	setTimeout(function(){
		setRealAtkToArmy(false);
	}, 10);
}


function setRealAtkToArmy(firstTime){
	var tables = getElementsByTagNameInList(document.getElementById("bloc").childNodes, "TABLE");
	if(tables.length > 0){
		for(var i=0; i < tables.length; ++i){
			var trs = getElementsByTagNameInList(tables[i].childNodes[1].childNodes, "TR");

			var input = getElementsByTagNameInList(getElementsByTagNameInList(trs[0].childNodes, "TD")[1].childNodes, "INPUT");
			if(input.length > 0){
				input = input[0];
				var inputValue = input.value;
				
				if(inputValue === "" || inputValue === "0")
					inputValue = "1";
				
				if(localStorage.getItem("ecaille") !== null){
					var hpsValue = Math.round(Number(removeSpaces(inputValue)) * Number(input.dataset.vie) + Number(removeSpaces(inputValue)) * Number(input.dataset.vie) * (Number(localStorage.getItem("ecaille"))/10));
					hpsValue = " " + hpsValue.nombreFormate(0);
					getElementsByTagNameInList(getElementsByTagNameInList(trs[1].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = hpsValue;
				}
				if(localStorage.getItem("morsure") !== null){
					var atkValue = Math.round(Number(removeSpaces(inputValue)) * Number(input.dataset.fdf) + Number(removeSpaces(inputValue)) * Number(input.dataset.fdf)* (Number(localStorage.getItem("morsure"))/10));
					atkValue = " " + atkValue.nombreFormate(0);
					getElementsByTagNameInList(getElementsByTagNameInList(trs[2].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = atkValue;
				}
				if(localStorage.getItem("morsure") !== null){
					var defValue = Math.round(Number(removeSpaces(inputValue)) * Number(input.dataset.fdd) + Number(removeSpaces(inputValue)) * Number(input.dataset.fdd) * (Number(localStorage.getItem("morsure"))/10));
					defValue = " " + defValue.nombreFormate(0);
					getElementsByTagNameInList(getElementsByTagNameInList(trs[3].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = defValue;
				}
			}
			else if(firstTime){
				if(localStorage.getItem("ecaille") !== null){
					var hpsValue_old = Number(removeSpaces(getElementsByTagNameInList(getElementsByTagNameInList(trs[1].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent));
					var hpsValue = hpsValue_old + hpsValue_old * (Number(localStorage.getItem("ecaille"))/10);
					hpsValue = " " + hpsValue.nombreFormate(0);
					getElementsByTagNameInList(getElementsByTagNameInList(trs[1].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = hpsValue;
				}
				if(localStorage.getItem("morsure") !== null){
					var atkValue_old = Number(removeSpaces(getElementsByTagNameInList(getElementsByTagNameInList(trs[2].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent));
					var atkValue = atkValue_old + atkValue_old * (Number(localStorage.getItem("morsure"))/10);
					atkValue = " " + atkValue.nombreFormate(0);
					getElementsByTagNameInList(getElementsByTagNameInList(trs[2].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = atkValue;
				}
				if(localStorage.getItem("morsure") !== null){
					var defValue_old = Number(removeSpaces(getElementsByTagNameInList(getElementsByTagNameInList(trs[3].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent));
					var defValue = defValue_old + defValue_old * (Number(localStorage.getItem("morsure"))/10);
					defValue = " " + defValue.nombreFormate(0);
					getElementsByTagNameInList(getElementsByTagNameInList(trs[3].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = defValue;
				}
			}
		}
	}
}


//////////////////////////////////////////////////////////////
//                    PAGE LABO                             //

function page_labo(){
	var headers2 = document.getElementsByTagName("h2");

	for(var i=0; i < headers2.length; ++i){
		if(headers2[i].textContent.split(' ')[0] === "Ecaille"){
			localStorage.setItem("ecaille", headers2[i].textContent.split(' ')[3]);
		}
		else if(headers2[i].textContent.split(' ')[0] === "Morsure"){
			localStorage.setItem("morsure", headers2[i].textContent.split(' ')[3]);
		}
		else if(headers2[i].textContent.split(' ')[0]+headers2[i].textContent.split(' ')[1] === "Instinctde"){
			localStorage.setItem("instinctDeChasse", headers2[i].textContent.split(' ')[5]);
		}
	}
}



////////////////////////////////////////////////////////////////////
//                         PAGE MEMBRES                           //

function page_membres(){
	if(sessionStorage.getItem("displayingDistances_total") === null){
		var columnDistance = document.createElement('td');
		columnDistance.innerHTML = '<td align="center"><td align="center"><a onclick="onClick_membersDistanceAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Distance </strong><a onclick="onClick_membersDistanceDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnDistance.align ="center";
		document.getElementsByTagName('tbody')[1].childNodes[1].appendChild(columnDistance);


		var columnTime = document.createElement('td');
		columnTime.innerHTML = '<td align="center"><td align="center"><a onclick="onClick_membersTimeAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Temps de trajet </strong><a onclick="onClick_membersTimeDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnTime.align ="center";
		document.getElementsByTagName('tbody')[1].childNodes[1].appendChild(columnTime);

		var insertContainer = document.getElementById("bloc");
		var insertPlace = document.getElementById("tableaumembre");

		var divChangePosition = document.createElement('div');
		divChangePosition.align = "right";

		divChangePosition.innerHTML += '<button onclick="onClick_buttonChangePosition()">Se placer en temps que </button>';
		divChangePosition.innerHTML += '<input type="text" id="inputPlayerName" class="text" value="" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';

		divChangePosition.appendChild(document.createTextNode(" __ VC: "));
		divChangePosition.innerHTML += '<input type="text" id="inputVC" class="text" value="10" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 70px; cursor: text;">';
		
		insertContainer.insertBefore(divChangePosition, insertPlace);
		insertContainer.insertBefore(createLine(), insertPlace);

		createCookie("playerListNumber", "0", 5);
		setDistanceAndTime_Members();
	}
	else {
		var columnDistance = document.createElement('td');
		columnDistance.innerHTML = '<td align="center"><td align="center"><a onclick="onClick_membersDistanceAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Distance </strong><a onclick="onClick_membersDistanceDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnDistance.align ="center";
		document.getElementsByTagName('tbody')[1].childNodes[1].appendChild(columnDistance);


		var columnTime = document.createElement('td');
		columnTime.innerHTML = '<td align="center"><td align="center"><a onclick="onClick_membersTimeAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Temps de trajet </strong><a onclick="onClick_membersTimeDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
		columnTime.align ="center";
		document.getElementsByTagName('tbody')[1].childNodes[1].appendChild(columnTime);

		var insertContainer = document.getElementById("bloc");
		var insertPlace = document.getElementById("tableaumembre");

		var divChangePosition = document.createElement('div');
		divChangePosition.align = "right";

		divChangePosition.innerHTML += '<button onclick="onClick_buttonChangePosition()">Se placer en temps que </button>';
		divChangePosition.innerHTML += '<input type="text" id="inputPlayerName" class="text" value="" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';

		divChangePosition.appendChild(document.createTextNode(" __ VC: "));
		divChangePosition.innerHTML += '<input type="text" id="inputVC" class="text" value="10" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 70px; cursor: text;">';
		
		
		insertContainer.insertBefore(divChangePosition, insertPlace);
		insertContainer.insertBefore(createLine(), insertPlace);
		
		var targetPos = sessionStorage.getItem("displayingDistances_-1");
		var allPos = [];
		
		for(var i=0; i < Number(sessionStorage.getItem("displayingDistances_total")); ++i){
			if(sessionStorage.getItem("displayingDistances_" + String(i)) !== null){
				allPos.push(sessionStorage.getItem("displayingDistances_" + String(i)));
				sessionStorage.removeItem("displayingDistances_" + String(i));
			}
		}
		
		for(var i=0; i < Number(sessionStorage.getItem("displayingDistances_total")); ++i){
			sessionStorage.removeItem("displayingDistancesPlayers_" + String(i));
		}
		
		setDistanceAndTime_byPos(targetPos, allPos);
		
		sessionStorage.removeItem("displayingDistances_finalHref");
		sessionStorage.removeItem("displayingDistances_current");
		sessionStorage.removeItem("displayingDistances_total");
	}
}

function setDistanceAndTime_byPos(targetPos, playersPos){
	var listOfPlayersTr = getPlayersTrMembers();
	var posTargetX = targetPos.split("_")[0];
	var posTargetY = targetPos.split("_")[1];
	
	var vc = Number(sessionStorage.getItem("displayingDistances_vc"));
	
	for(var i=0; i < listOfPlayersTr.length; ++i){
		var targetPlayer = listOfPlayersTr[i];
		var posPlayerX = playersPos[i].split("_")[0];
		var posPlayerY = playersPos[i].split("_")[1];
		
		var distance = String(Math.ceil(Math.sqrt((Number(posPlayerX) - Number(posTargetX)) * (Number(posPlayerX) - Number(posTargetX)) + (Number(posPlayerY) - Number(posTargetY)) * (Number(posPlayerY) - Number(posTargetY)))));
		var time = Math.ceil(Math.round((24 * 3600 * ((1 - Math.exp(-(Math.sqrt(Math.pow(Math.abs(posTargetX - posPlayerX), 2) + Math.pow(Math.abs(posTargetY - posPlayerY), 2))) / 350)) * 7.375 * Math.pow(0.9, vc)))));

		time = displayingTime(time);
		
		var distanceTd = document.createElement('td');
		distanceTd.align = "center";
		distanceTd.textContent = distance;
		targetPlayer.appendChild(distanceTd);

		var timeTd = document.createElement('td');
		timeTd.align = "center";
		timeTd.textContent = time;
		targetPlayer.appendChild(timeTd);
	}
	
}

function displayingTime(time){
	var result = "";
	
	if(time === 0){
		result = "0m 0s";
	}
	else {
		if(Math.floor(time / 86400) > 0){
			result = String(Math.floor(time / 86400)) + "j ";
			time -= Math.floor(time / 86400) * 86400;
		}

		if(Math.floor(time / 3600) > 0){
			result += String(Math.floor(time / 3600)) + "h ";
			time -= Math.floor(time / 3600) * 3600;
		}

		if(Math.floor(time / 60) > 0){
			result += String(Math.floor(time / 60)) + "m ";
			time -= Math.floor(time / 60) * 60;
		}

		if(time > 0){
			result += String(time) + "s";
		}
	}
	return result;
}


function setDistanceAndTime_Members(){
	var listOfPlayersTr = getPlayersTrMembers();
	var playerListNumb = Number(readCookie("playerListNumber"));
	
	if(playerListNumb < listOfPlayersTr.length)
	{
		var playerTM = listOfPlayersTr[playerListNumb].childNodes[11].textContent;
		var maxTM = (Number(playerTM.replace(/\s/g, ''))+1).nombreFormate(0);

		$.post('ajax/ennemies.php', {mintdc:playerTM, maxtdc:maxTM, page:1, tri:'distance', sens:'asc', guerre:0, paix:0, ally:0}, function(data){
			var listOfResults = setPlayerTravelTime(data);
			var listOfPlayersTr = getPlayersTrMembers();
			var targetPlayer = listOfPlayersTr[Number(readCookie("playerListNumber"))];

			if(listOfResults === null){	
				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.textContent = "inconnue";
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.textContent = "inconnu";
				targetPlayer.appendChild(timeTd);
			}
			else{
				var distance = listOfResults[3];
				var time = listOfResults[4];

				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.textContent = distance;
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.textContent = time;
				targetPlayer.appendChild(timeTd);
			}
			createCookie("playerListNumber", String(Number(readCookie("playerListNumber")) +1), 5);
			setDistanceAndTime_Members();
		});
	}
}

function onClick_buttonChangePosition(){
	var inputValue = document.getElementById('inputPlayerName').value;
	
	if(inputValue != ""){
		sessionStorage.setItem("displayingDistances_total", String(getPlayersTrMembers().length));
		sessionStorage.setItem("displayingDistances_current", "-1");
		
		var inputVcValue = Number(document.getElementById("inputVC").value);
		if(isNaN(inputVcValue))
			inputVcValue = 10;
		
		sessionStorage.setItem("displayingDistances_vc", String(inputVcValue));
		sessionStorage.setItem("displayingDistances_finalHref", document.location.href);
		
		var listOfPlayersTr = getPlayersTrMembers();
		
		for(var i=0; i < listOfPlayersTr.length; ++i){
			sessionStorage.setItem("displayingDistancesPlayers_" + String(i), getElementsByTagNameInList(getElementsByTagNameInList(listOfPlayersTr[i].childNodes, "TD")[3].childNodes, "A")[0].textContent);
		}
		
		document.location.href ="jeu.php?page=joueur&pseudo=" + inputValue;
	}
}


function getDistanceOfElementMembers(element){
	return element.childNodes[21].textContent;
}

function getPlayersTrMembers(){
	var listOfElements = document.getElementsByTagName('tbody')[1].childNodes;
	var result = [];
	
	for(var i=2; i < listOfElements.length; ++i){
		if(listOfElements[i].tagName === "TR"){
			result.push(listOfElements[i]);
		}
	}
	return result;
}


function onClick_membersDistanceAsc(){
	var listSorted = membersDistanceSorter();
	
	for(var i=0; i < listSorted.length; ++i){
		document.getElementsByTagName('tbody')[1].appendChild(listSorted[i]);
	}
}

function onClick_membersDistanceDesc(){
	var listSorted = membersDistanceSorter();
	
	for(var i=listSorted.length-1; i > -1; --i){
		document.getElementsByTagName('tbody')[1].appendChild(listSorted[i]);
	}
}

function membersDistanceSorter(){
	var listOfPlayersTr = getPlayersTrMembers();
	for(var i=0; i < listOfPlayersTr.length; ++i){
		document.getElementsByTagName('tbody')[1].removeChild(listOfPlayersTr[i]);
	}
	var listSorted = [];
	listSorted.push(listOfPlayersTr[0]);
	for(var i=1; i < listOfPlayersTr.length; ++i){
		if(isNaN(Number(getDistanceOfElementMembers(listSorted[0])))){
			listSorted.splice(0, 0, listOfPlayersTr[i]);
		}
		else if(isNaN(Number(getDistanceOfElementMembers(listOfPlayersTr[i])))){
			listSorted.push(listOfPlayersTr[i]);
		}
		else{
			var findedMore = false;
			for(var j=0; j < listSorted.length; ++j){
				if(Number(getDistanceOfElementMembers(listOfPlayersTr[i])) < Number(getDistanceOfElementMembers(listSorted[j]))){
					listSorted.splice(j, 0, listOfPlayersTr[i]);
					findedMore = true;
					break;
				}
			}
			if(!findedMore)
				listSorted.push(listOfPlayersTr[i]);
		}
	}
	return listSorted;
}


function onClick_membersTimeAsc(){
	var listSorted = membersTimeSorter();
	
	for(var i=0; i < listSorted.length; ++i){
		document.getElementsByTagName('tbody')[1].appendChild(listSorted[i]);
	}
}

function onClick_membersTimeDesc(){
	var listSorted = membersTimeSorter();
	
	for(var i=listSorted.length-1; i > -1; --i){
		document.getElementsByTagName('tbody')[1].appendChild(listSorted[i]);
	}
}

function membersTimeSorter(){
	var listOfPlayersTr = getPlayersTrMembers();
	for(var i=0; i < listOfPlayersTr.length; ++i){
		document.getElementsByTagName('tbody')[1].removeChild(listOfPlayersTr[i]);
	}
	var listSorted = [];
	listSorted.push(listOfPlayersTr[0]);
	for(var i=1; i < listOfPlayersTr.length; ++i){
		if(getTimeOfElementMembers(listSorted[0]) === "inconnu"){
			listSorted.splice(0, 0, listOfPlayersTr[i]);
		}
		else if(getTimeOfElementMembers(listOfPlayersTr[i]) === "inconnu"){
			listSorted.push(listOfPlayersTr[i]);
		}
		else{
			var findedMore = false;
			for(var j=0; j < listSorted.length; ++j){
				if(getTimeOfElementMembers(listOfPlayersTr[i]) < getTimeOfElementMembers(listSorted[j])){
					listSorted.splice(j, 0, listOfPlayersTr[i]);
					findedMore = true;
					break;
				}
			}
			if(!findedMore)
				listSorted.push(listOfPlayersTr[i]);
		}
	}
	return listSorted;
}

function getTimeOfElementMembers(element){
	var textTime = element.childNodes[22].textContent;
	if(textTime !== "inconnu"){
		var listOfUnits = textTime.split(' ');
		var total = 0;
		if(listOfUnits.length === 4){
			var dayNb = Number(listOfUnits[0].replace('j', ''));
			var hourNb = Number(listOfUnits[1].replace('h', ''));
			var minNb = Number(listOfUnits[2].replace('m', ''));
			var secNb = Number(listOfUnits[3].replace('s', ''));

			total = dayNb*86400 + hourNb*3600 + minNb*60 + secNb;
		}
		else if(listOfUnits.length === 3){
			var hourNb = Number(listOfUnits[0].replace('h', ''));
			var minNb = Number(listOfUnits[1].replace('m', ''));
			var secNb = Number(listOfUnits[2].replace('s', ''));

			total = hourNb*3600 + minNb*60 + secNb;
		}
		else{
			var minNb = Number(listOfUnits[0].replace('m', ''));
			var secNb = Number(listOfUnits[1].replace('s', ''));

			total = minNb*60 + secNb;
		}
		return total;
	}
	return "inconnu";
}



///////////////////////////////////////////////////////////////
//                    PAGE EXPLORATIONS                     //

function getExplorationNumberMax(){
	var instinctDeChasse = localStorage.getItem("instinctDeChasse");
	if(instinctDeChasse == null)
		instinctDeChasse = 0;
	else
		instinctDeChasse = Number(instinctDeChasse)+1;
	return instinctDeChasse;
}

function page_exploration(){
	var insertContainer = document.getElementsByTagName("form")[0];
	var insertPlace = document.getElementById("tempschasse");
	
	if(readCookie("exploTotal") === null){
		var instinctDeChasse = localStorage.getItem("instinctDeChasse");


		var nbExploText =  document.createTextNode("Nb d'explorations : ");
		insertContainer.insertBefore(nbExploText, insertPlace);

		var inputNbExplo = document.createElement('input');
		inputNbExplo.type = "text";
		inputNbExplo.class = "nb";
		inputNbExplo.id = "inputNbExplo";
		if(getExplorationNumberMax() == 0)
			inputNbExplo.value = "1";
		else
			inputNbExplo.value = String(getExplorationNumberMax());
		insertContainer.insertBefore(inputNbExplo, insertPlace);

		insertContainer.insertBefore(createLine(), insertPlace);


		var checkBoxUnif = document.createElement('input');
		checkBoxUnif.type = "checkbox";
		checkBoxUnif.id = "unif";
		insertContainer.insertBefore(checkBoxUnif, insertPlace);

		var textUnif =  document.createTextNode("Uniforme --> ");
		insertContainer.insertBefore(textUnif, insertPlace);

		var buttonPrepareExploration = document.createElement('button');
		buttonPrepareExploration.textContent = "Lancer les explorations";
		buttonPrepareExploration.onclick = function(){onclickButtonExplo()};
		insertContainer.insertBefore(buttonPrepareExploration, insertPlace);


		insertContainer.insertBefore(createLine(), insertPlace);
		insertContainer.insertBefore(createLine(), insertPlace);
	}
	else {
		if(Number(readCookie("exploCurrent")) < Number(readCookie("exploTotal"))){
			var textLanc =  document.createTextNode("Lancement d'explorations en cours... " + readCookie("exploCurrent") + "/" + readCookie("exploTotal"));
			insertContainer.insertBefore(textLanc, insertPlace);

			insertContainer.insertBefore(createLine(), insertPlace);
			insertContainer.insertBefore(createLine(), insertPlace);
			
			document.getElementById("tm").value = readCookie("exploTm");
			if(Number(readCookie("exploCurrent"))+1 === Number(readCookie("exploTotal"))){
				$("#remplissage").click();
			}
			else {
				var trList = getElementsByTagNameInList(document.getElementsByTagName('tbody')[1].childNodes, "TR");
				
				for(var i=1; i < 15; ++i){
					getElementsByTagNameInList(getElementsByTagNameInList(trList[i].childNodes, "TD")[4].childNodes, "INPUT")[0].value = readCookie("explo_" + String(i));
				}
			}
			createCookie("exploCurrent", String(Number(readCookie("exploCurrent"))+1), 60);
			$("input[name='explorer']").click();
		}
		else {
			var textLanc =  document.createTextNode("Toutes les explorations ont été lancées !");
			insertContainer.insertBefore(textLanc, insertPlace);

			insertContainer.insertBefore(createLine(), insertPlace);
			insertContainer.insertBefore(createLine(), insertPlace);
			
			deleteCookie("exploCurrent");
			deleteCookie("exploTotal");
		}
	}
}

function createLine(){return document.createElement('br');}


function onclickButtonExplo(){
	var inputTmByExplo_Value = Number(removeSpaces(document.getElementById("tm").value));
	var inputNbExplo_Value = Number(removeSpaces(document.getElementById("inputNbExplo").value));
	
	var textToAlert = "";
	
	if(getExplorationNumberMax() === 0 || inputNbExplo_Value <= getExplorationNumberMax()){
		var nbUnits = [14];
		var trList = getElementsByTagNameInList(document.getElementsByTagName('tbody')[1].childNodes, "TR");
		
		textToAlert += "Exploration à lancer :" + "\n" + "\n";
		textToAlert += "Nb d'exploration: " + String(inputNbExplo_Value) + "\n";
		textToAlert += "Tm par exploration: " + String(inputTmByExplo_Value) + "\n";
		textToAlert += "TOTAL -> " + String(inputNbExplo_Value * inputTmByExplo_Value) + "\n" + "\n";
		
		textToAlert += "Répartition armée: uniforme";
		
		for(var i=1; i < trList.length; ++i){
			nbUnits[i-1] = getElementsByTagNameInList(getElementsByTagNameInList(trList[i].childNodes, "TD")[4].childNodes, "INPUT")[0].value;
			nbUnits[i-1] = Number(removeSpaces(nbUnits[i-1]));

			var value = Math.round(nbUnits[i-1] / inputNbExplo_Value);
			createCookie("explo_"+String(i), String(value), 60);
		}
		
		createCookie("exploTotal", String(inputNbExplo_Value), 60);
		createCookie("exploCurrent", "0", 60);
		createCookie("exploTm", String(inputTmByExplo_Value), 60);
	}
	else{
		textToAlert = "Information données incorrectes";
	}
	
	alert(textToAlert);
}

//////////////////////////////////////////////////////////////
//                        UTILS                            //
////////////////////////////////////////////////////////////


// supprime les espaces d'une chaîne de charactères
function removeSpaces(string){
	return string.replace(/\s/g, '');
}


function getElementByInnerText(tag, innerText){
	var listOfElements = document.getElementsByTagName(tag);
	var result = null;
	
	for(var i=0; i < listOfElements.length; ++i){
		if(listOfElements[i].textContent === innerText){
			result = listOfElements[i];
		}
	}
	return result;
}


/******************************************************
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
