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
	alert(playerName);


	var inputTdcTarget = document.createElement('none');
    inputTdcTarget.innerHTML =  '<input type="text" id="targetTdc" name="targetTdc" class="text" value="tdc de la cible" data-nb="0" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">';

    document.getElementsByTagName('center')[0].insertBefore(inputTdcTarget, document.getElementsByTagName('h1')[0]);
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
