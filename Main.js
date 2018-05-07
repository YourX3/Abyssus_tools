update();


function update(){
	var docSearchPath = document.location.search;
	
	if(docSearchPath.Split('&')[0] === "?page=attaque" && docSearchPath.Split('&')[2] === "lieu=1")
	{
		alert(docSearchPath);
	}
};
