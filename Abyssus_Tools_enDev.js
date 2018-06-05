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
	textVersion.innerHTML = '<font size="1" color="white">Abyssus Tools V 0.3 __ Last Updtate 05/06/2018 21h06 </font>';
	document.getElementById('footer').insertBefore(textVersion, document.getElementById('footer').childNodes[0]);
	
	// fin de l'URL : sur https://s1.abyssus.games/jeu.php?page=armee : ?page=armee
	var docSearchPath = document.location.search;
	
	// si la page est la Page d'attaque sur le TM
	if(docSearchPath.split('&')[0] === "?page=attaque" && docSearchPath.split('&')[2] === "lieu=1")
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
		var inputTargetTM_value = "TM de " + targetName;
		// case où entrer le TM la cible
		var inputTdcTarget = document.createElement('none');
		
		if(sessionStorage.getItem('targetTM') != null){
			inputTargetTM_value = sessionStorage.getItem('targetTM');
		}
		sessionStorage.removeItem('targetTM');
		
		var input_innerHTML = '<input type="text" id="targetTM" name="targetTM" class="text" value="' + inputTargetTM_value + '" data-nb="0" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';
		inputTdcTarget.innerHTML =  input_innerHTML;
		inputTdcTarget.value += "playerName";
		document.getElementsByTagName('center')[0].insertBefore(inputTdcTarget, document.getElementsByTagName('h1')[0]);

		// Bouton qui prépare les floods
		var but_launchFloods = document.createElement('none');
		but_launchFloods.innerHTML = '<button onclick="onClick_buttonFloods()">Préparer les floods</button>';
		document.getElementsByTagName('center')[0].insertBefore(but_launchFloods, document.getElementsByTagName('h1')[0]);
		
		var checkBoxGhost = document.createElement('none');
		checkBoxGhost.innerHTML = '<input id="checkBoxGhost" type="checkbox">';
		document.getElementsByTagName('center')[0].insertBefore(checkBoxGhost, document.getElementsByTagName('h1')[0]);
		
		var textGhost = document.createElement('none');
		textGhost.innerHTML = '<text> Ghost ?</text>';
		document.getElementsByTagName('center')[0].insertBefore(textGhost, document.getElementsByTagName('h1')[0]);
	}
	else if(document.getElementsByTagName('h1').length > 0){
		if(Number(readCookie("numberOfAttaks")) < Number(readCookie("attakNum"))){
			deleteCookie("numberOfAttaks");
			deleteCookie("attakNum");
			document.getElementsByTagName('h1')[0].textContent = "Tous les floods ont été lancés";
		}
		else{
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
	var ghost = document.getElementById('checkBoxGhost').checked;

    if(nbRem > 0 && !isNaN(targetTM)){
        var listOfAttaks = [];
        var lastWasNotTwenty = false;
        var _end = false;
	var totalFloods = 0;
        while(!_end){
            var twentyPercents = Math.round(targetTM*20/100);

            if(nbRem >= twentyPercents){
                if(targetTM-twentyPercents > (playerTM+twentyPercents)/2){
					listOfAttaks.push(["Attaque_"+String(listOfAttaks.length+1), String(twentyPercents)]);
					nbRem -= twentyPercents;
					targetTM -= twentyPercents;
					playerTM += twentyPercents;
					totalFloods += twentyPercents;
                }
                else if(!lastWasNotTwenty){
			var value = Math.floor((targetTM-(0.5*playerTM+1))*2/3);
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

        createCookie("numberOfAttaks", String(listOfAttaks.length), 60);
        createCookie("attakNum", "1", 60);
	var textToAlert = "Nb d'attaques : " + String(listOfAttaks.length) + "\n";
        for(var i=0; i < listOfAttaks.length; ++i){
            textToAlert += "Attaque " + String((listOfAttaks[i])[0]) + ": " + String((listOfAttaks[i])[1]) + "\n";
            createCookie(String((listOfAttaks[i])[0]), String((listOfAttaks[i])[1]), 60);
        }
	textToAlert += "Total: " + String(totalFloods) + "\n" + "\n";
	textToAlert += "Votre TM: " + String(playerTM) + "\n";
	textToAlert += "TM de la cible: " + String(targetTM);
	
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
		alignText.innerHTML = '<text>/ . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </text>';
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
		var antiSondeInput_Value = readCookie("antiSondeValue");
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
	getElementByInnerText('a', "Attaquer le terrain").onclick = function(){onclick_tmAttack()};
				
	var playerTM = document.getElementsByTagName('tbody')[1].childNodes[5].childNodes[3].innerText.split('(')[0];
	playerTM = playerTM.substr(0, playerTM.length-1);
	var maxTM = (Number(playerTM.replace(/\s/g, ''))+1).nombreFormate(0);

	$.post('ajax/ennemies.php', {mintdc:playerTM, maxtdc:maxTM, page:1, tri:'distance', sens:'asc', guerre:0, paix:0, ally:0}, function(data){
		var listOfResults = setPlayerTravelTime(data, "playerName:"+document.getElementsByTagName('h1')[0].innerText);
		if(listOfResults === null){
			document.getElementsByTagName('tbody')[1].childNodes[3].childNodes[3].innerText += " Distance et temps de Trajet inconnus..";
		}
		else{
			var distance = listOfResults[3];
			var time = listOfResults[4];

			document.getElementsByTagName('tbody')[1].childNodes[3].childNodes[3].innerText += '\r'+ "Distance: " + distance + " _Temps de trajet: " + time;
		}
	});
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
	var tmTarget = document.getElementsByTagName('tbody')[1].childNodes[5].childNodes[3].innerText;
	tmTarget = removeSpaces(tmTarget).split('(')[0];
	sessionStorage.setItem('targetTM', tmTarget);
}





///////////////////////////////////////////////////////////////
//                         PAGE ALLY                        //
/////////////////////////////////////////////////////////////

function page_ally(){
	var columnDistance = document.createElement('td');
	columnDistance.innerHTML = '<td align="center"><td align="center"><a onclick="onclick_allyDistanceAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Distance </strong><a onclick="onclick_allyDistanceDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
	columnDistance.align ="center";
	document.getElementsByTagName('tbody')[2].childNodes[1].appendChild(columnDistance);
	
	
	var columnTime = document.createElement('td');
	columnTime.innerHTML = '<td align="center"><td align="center"><a onclick="onclick_allyTimeAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Temps de trajet </strong><a onclick="onclick_allyTimeDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
	columnTime.align ="center";
	document.getElementsByTagName('tbody')[2].childNodes[1].appendChild(columnTime);
	
	
	createCookie("playerListNumber", "0", 5);
	setDistanceAndTime_Ally();
}


function getTagInH1(str){
	return str.substring(1, str.indexOf("]"));
}

function setDistanceAndTime_Ally(){
	var listOfPlayersTr = getPlayersTr();
	
	if(Number(readCookie("playerListNumber")) < listOfPlayersTr.length)
	{
		var playerTM = listOfPlayersTr[Number(readCookie("playerListNumber"))].childNodes[5].innerText;
		var maxTM = (Number(playerTM.replace(/\s/g, ''))+1).nombreFormate(0);

		$.post('ajax/ennemies.php', {mintdc:playerTM, maxtdc:maxTM, page:1, tri:'distance', sens:'asc', guerre:0, paix:0, ally:0}, function(data){
			var listOfResults = setPlayerTravelTime(data, "ally:"+getTagInH1(document.getElementsByTagName("h1")[0].innerText));
			var listOfPlayersTr = getPlayersTr();
			var targetPlayer = listOfPlayersTr[Number(readCookie("playerListNumber"))];

			if(listOfResults === null){	
				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.innerText = "inconnue";
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.innerText = "inconnu";
				targetPlayer.appendChild(timeTd);
			}
			else{
				var distance = listOfResults[3];
				var time = listOfResults[4];

				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.innerText = distance;
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.innerText = time;
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
	return element.childNodes[11].innerText;
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
	var textTime = element.childNodes[12].innerText;
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
}

function updateTables(){
	setTimeout(function(){
		var tables = getElementsByTagNameInList(document.getElementById("bloc").childNodes, "TABLE");
		if(tables.length > 0){
			for(var i=0; i < tables.length; ++i){
				var trs = getElementsByTagNameInList(tables[i].childNodes[1].childNodes, "TR");
				
				var input = getElementsByTagNameInList(getElementsByTagNameInList(trs[0].childNodes, "TD")[1].childNodes, "INPUT");
				if(input.length > 0){
					input = input[0];
					if(localStorage.getItem("ecaille") !== null){
						var hpsValue = Math.round(Number(removeSpaces(input.value)) * Number(input.dataset.vie) + Number(removeSpaces(input.value)) * Number(input.dataset.vie) * (Number(localStorage.getItem("ecaille"))/10));
						hpsValue = " " + hpsValue.nombreFormate(0);
						getElementsByTagNameInList(getElementsByTagNameInList(trs[1].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = hpsValue;
					}
					if(localStorage.getItem("morsure") !== null){
						var atkValue = Math.round(Number(removeSpaces(input.value)) * Number(input.dataset.fdf) + Number(removeSpaces(input.value)) * Number(input.dataset.fdf)* (Number(localStorage.getItem("morsure"))/10));
						atkValue = " " + atkValue.nombreFormate(0);
						getElementsByTagNameInList(getElementsByTagNameInList(trs[2].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = atkValue;
					}
					if(localStorage.getItem("morsure") !== null){
						var defValue = Math.round(Number(removeSpaces(input.value)) * Number(input.dataset.fdd) + Number(removeSpaces(input.value)) * Number(input.dataset.fdd) * (Number(localStorage.getItem("morsure"))/10));
						defValue = " " + defValue.nombreFormate(0);
						getElementsByTagNameInList(getElementsByTagNameInList(trs[3].childNodes, "TD")[0].childNodes, "SPAN")[0].textContent = defValue;
					}
				}
								       
				
			}
		}
	}, 10);
}




//////////////////////////////////////////////////////////////
//                    PAGE LABO                             //

function page_labo(){
	var headers2 = document.getElementsByTagName("h2");

	for(var i=0; i < headers2.length; ++i){
		if(headers2[i].innerText.split(' ')[0] === "Ecaille"){
			localStorage.setItem("ecaille", headers2[i].innerText.split(' ')[2]);
		}
		else if(headers2[i].innerText.split(' ')[0] === "morsure"){
			localStorage.setItem("morsure", headers2[i].innerText.split(' ')[2]);
		}
	}
}



////////////////////////////////////////////////////////////////////
//                         PAGE MEMBRES                           //

function page_membres(){
	var columnDistance = document.createElement('td');
	columnDistance.innerHTML = '<td align="center"><td align="center"><a onclick="onClick_membersDistanceAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Distance </strong><a onclick="onClick_membersDistanceDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
	columnDistance.align ="center";
	document.getElementsByTagName('tbody')[1].childNodes[1].appendChild(columnDistance);
	
	
	var columnTime = document.createElement('td');
	columnTime.innerHTML = '<td align="center"><td align="center"><a onclick="onClick_membersTimeAsc()"><img src="images/asc.png" style="vertical-align: middle;"></a><strong> Temps de trajet </strong><a onclick="onClick_membersTimeDesc()"><img src="images/desc.png" style="vertical-align: middle;"></a></td></td>';
	columnTime.align ="center";
	document.getElementsByTagName('tbody')[1].childNodes[1].appendChild(columnTime);
	
	createCookie("playerListNumber", "0", 5);
	setDistanceAndTime_Members();
}

function setDistanceAndTime_Members(){
	var listOfPlayersTr = getPlayersTrMembers();
	
	if(Number(readCookie("playerListNumber")) < listOfPlayersTr.length)
	{
		var playerTM = listOfPlayersTr[Number(readCookie("playerListNumber"))].childNodes[11].innerText;
		var maxTM = (Number(playerTM.replace(/\s/g, ''))+1).nombreFormate(0);

		$.post('ajax/ennemies.php', {mintdc:playerTM, maxtdc:maxTM, page:1, tri:'distance', sens:'asc', guerre:0, paix:0, ally:0}, function(data){
			var listOfResults = setPlayerTravelTime(data);
			var listOfPlayersTr = getPlayersTrMembers();
			var targetPlayer = listOfPlayersTr[Number(readCookie("playerListNumber"))];

			if(listOfResults === null){	
				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.innerText = "inconnue";
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.innerText = "inconnu";
				targetPlayer.appendChild(timeTd);
			}
			else{
				var distance = listOfResults[3];
				var time = listOfResults[4];

				var distanceTd = document.createElement('td');
				distanceTd.align = "center";
				distanceTd.innerText = distance;
				targetPlayer.appendChild(distanceTd);

				var timeTd = document.createElement('td');
				timeTd.align = "center";
				timeTd.innerText = time;
				targetPlayer.appendChild(timeTd);
			}
			createCookie("playerListNumber", String(Number(readCookie("playerListNumber")) +1), 5);
			setDistanceAndTime_Members();
		});
	}
}


function getDistanceOfElementMembers(element){
	return element.childNodes[19].innerText;
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
	var textTime = element.childNodes[22].innerText;
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
		if(listOfElements[i].innerText === innerText){
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
