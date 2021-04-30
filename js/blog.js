
//la variable con los compos esta en posteos.json y se llama posteos
//Genera las Card de descarga de los archivos
//archivo viene con "nombre", "enlace", "ext" extension

setTimeout(function(){ lista(posteos,"posteos"); }, 1000);


function postCard(post){
	return( 
		`
            <div class="blog__items">
                <h2 class="blog__title--two title">${post.titulo}</h2>
                <p class="blog__text text">${post.texto}</p>
                <time class="blog__time">${post.year}</time> <span class="blog__name--span">${post.alumno}</span>
                <div class="blog__content--img">
                    <img class="blog__img" src="blog/img/${post.imagen}" alt="blog-img">
                </div>
            </div>
		`
	)
}

//Genera la lista de archivos en Html
function lista(myList, idDestino = "file_list"){
	destino = document.getElementById(idDestino)
	destino.innerHTML = ""
	for(let i=0;i<myList.length;i++){
		 destino.innerHTML += postCard(myList[i])
    }
}

