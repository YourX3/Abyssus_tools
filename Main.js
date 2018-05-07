update();


function update(){
	var docSearchPath = document.location.search;
	
	if(docSearchPath.split('&')[0] === "?page=attaque" && docSearchPath.split('&')[2] === "lieu=1")
	{
		alert(docSearchPath);
		page_atk();
	}
};


/************************************************************
*                          PAGES
***********************************************************/

function page_atk()
{
 	var playerName = document.getElementsByTagName('h1')[0].split(' ')[3];
	alert(document.getElementsByTagName('h1')[0]);
	
	var inputTdcTarget = <input type="text" id="targetTdc" name="targetTdc" class="text" value="tdc de la cible" data-nb="0" style="font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; color: rgb(0, 0, 102); text-align: center; outline: none; padding: 5px; width: 120px; cursor: text;">
	document.getElementsByTagName('center')[0].appendChild(inputTdcTarget);
};




/*********************************************************
*                      COOKIES
*******************************************************/

function createCookie(nom, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
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
