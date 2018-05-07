update();


function update(){
	var docSearchPath = document.location.search;
	
	if(docSearchPath.split('&')[0] === "?page=attaque" && docSearchPath.split('&')[2] === "lieu=1")
	{
		alert(docSearchPath);
		page_atk();
	}
};


function page_atk()
{
	alert(getElementsByTagName('h1')[0]);
};
