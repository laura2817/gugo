//Genera lista de descargables
//Lee todos los archivos de la carpeta y genera las cards de descargas.



get_files()

//Obtiene la lista de archivos de la carpeta, en base al listado automatico
function get_files(){

	var req = new XMLHttpRequest();  
	req.open('GET', '/descargas/', false);   
	req.send(null);  
	
	let recuperado = document.createElement("div")
	
	recuperado.innerHTML = req.response
	
	let myTab = recuperado.getElementsByTagName('table')[0]
	
	let info = document.getElementById('info')
	
	
	
	for (i = 1; i < myTab.rows.length; i++) {
	var objCells = myTab.rows.item(i).cells;
		for (var j = 2; j < objCells.length ; j++) {
			info.innerHTML += ' ' + objCells.item(j).innerHTML;
	 	}
	info.innerHTML  += '<br />';     // ADD A BREAK (TAG).
	}
}




