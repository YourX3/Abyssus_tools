update();


function update(){
	var docSearchPath = document.location.search;

	if(docSearchPath.split('&')[0] === "?page=attaque" && docSearchPath.split('&')[2] === "lieu=1")
	{
		page_atk();
	}
};


/************************************************************
*                          PAGES
***********************************************************/

function page_atk()
{
 	var playerName = document.getElementsByTagName('h1')[0].textContent.split(' ')[3];

	var inputTdcTarget = document.createElement('none');
    var input_innerHTML = '<input type="text" id="targetTM" name="targetTM" class="text" value="TM de ' + playerName + '" data-nb="0" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';
    inputTdcTarget.innerHTML =  input_innerHTML;
    inputTdcTarget.value += "playerName";
    document.getElementsByTagName('center')[0].insertBefore(inputTdcTarget, document.getElementsByTagName('h1')[0]);
    

    var but_launchFloods = document.createElement('none');
    but_launchFloods.innerHTML = '<button onclick="onClick_buttonFloods()">Lancer les floods</button>';
    document.getElementsByTagName('center')[0].insertBefore(but_launchFloods, document.getElementsByTagName('h1')[0]);
}

function onClick_buttonFloods(){

    var targetTM = Number(document.getElementsByName('targetTM')[0].value);
    var nbRem = Number(document.getElementsByName('SJ')[0].value);
    var playerTM = Number(document.getElementsByTagName('span')[7].childNodes[1].data.replace(/\s/g, ''));

    if(nbRem > 0 && !isNaN(targetTM)){
        var listOfAttaks = [];
        var lastWasNotTwenty = false;
        var _end = false;
        while(!_end){
            var twentyPercents = Math.round(targetTM*20/100);

            if(nbRem >= twentyPercents){
                if(targetTM-twentyPercents > playerTM+twentyPercents/2){
                    listOfAttaks.push(["Attaque_"+String(listOfAttaks.lengh+1), +String(twentyPercents)]);
                    nbRem -= twentyPercents;
                }
                else if(!lastWasNotTwenty){
                    listOfAttaks.push(["Attaque_"+String(listOfAttaks.lengh+1), +String(playerTM / 2 - targetTM)]);
                    nbRem -= playerTM / 2 - targetTM;
                    lastWasNotTwenty = true;
                }
                else{
                    listOfAttaks.push(["Attaque_"+String(listOfAttaks.lengh+1), +String(twentyPercents)]);
                    nbRem -= twentyPercents;
                    _end = true;
                }
            }
            else{
                listOfAttaks.push(["Attaque_"+String(listOfAttaks.lengh+1), +String(nbRem)]);
                _end = true;
            }
        }

        createCookie("numberOfAttaks", listOfAttaks.lengh, 60);
        createCookie("attakNum", 0, 60);
        for(var i=0; i < listOfAttaks.lengh; ++i){
            alert((listOfAttaks[i])[1]);
            createCookie((listOfAttaks[i])[0], (listOfAttaks[i])[1], 60);
        }
    }
}

/*********************************************************
*                      COOKIES
*******************************************************/
// time in seconds
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

function removeCookie(nom) {
	createCookie(nom,"",-1);
}
