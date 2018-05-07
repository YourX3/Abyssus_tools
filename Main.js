update();


function update(){
	var docSearchPath = document.location.search;
	
	if(docSearchPath.split('&')[0] === "?page=attaque" && docSearchPath.split('&')[2] === "lieu=1")
	{
		alert(docSearchPath);
	}
};
