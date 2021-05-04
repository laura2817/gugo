//la variable con los compos esta en posteos.json y se llama posteos
//Genera las Card de descarga de los archivos
//archivo viene con "nombre", "enlace", "ext" extension

setTimeout(function(){ lista(posteos,"posteos"); }, 1200);


function postCard(post){
	return( 
		`
            <div class="blog__items">
				<h2 class="blog__title--two title">${post.titulo}</h2>
				
				${generaWord( `${post.archivo}` )}
                
				<time class="blog__time">${post.year}</time> <span class="blog__name--span">${post.alumno}</span>
                <div class="blog__content--img">
                    <img class="blog__img" src="blog/img/${post.imagen}" alt="blog-img">
                </div>
            </div>
		`
	)
}

//Genera la lista de archivos en Html
function lista(myList, idDestino = "posteos"){
	destino = document.getElementById(idDestino)
	destino.innerHTML = ""
	for(let i=0;i<myList.length;i++){
		 destino.innerHTML += postCard(myList[i])
    }
}

function generaWord(filename,folder="blog/"){
let ww = window.location.href
let ws = ww.split("/")

let archivo = ww.slice(0, ww.length - ws[ws.length-1].length)+ folder + filename

let respuesta = 
	`
				<iframe class="blog__iframe" height="100%" width="100%" 
				src='https://view.officeapps.live.com/op/embed.aspx?src=${archivo}' 
				frameborder='0'>
				</iframe>
	`
	return respuesta
}



