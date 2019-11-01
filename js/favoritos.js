var favoritinho = [];
listaFovoritos = JSON.parse(sessionStorage.getItem("listaFovoritos"));
listaAtualizada = JSON.parse(sessionStorage.getItem("listaFovoritos"));
console.log(listaFovoritos)
listaFovoritos.forEach(element => {
    fetch('https://api.punkapi.com/v2/beers/'+element)
    .then(function(response){
        return response.json();
    }).then(function(data){
   escrever(data)
console.log(favoritinho)
    
});
})


function escrever(arr){
           // trta cervejas sem foto
arr.forEach(element => {
if (element.image_url == null) {
    element.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
}
$('#fCerveja').append(
	`
	<div class="col-lg-4 col-md-6 col-sm-12 mt-4 ">
	
	 <div class="card " style="width: 18rem;" button type="button" data-toggle="modal" data-target="#modalQuickView${element.id}">
	 <a><i class="fa fa-star-o" id="id-${element.id}" aria-hidden="true" onclick="addFavo(${element.id})"></i></a>	

	 <img class="card-img-top smallimg" src="${element.image_url}">
	<div class="card-body ">
		<h5 class="card-title">${element.name}</h5>
		<p class="card-text">${element.tagline}</p>
		</div>
		</div>
	</div>`

)

if(listaAtualizada !== ""){
	console.log("entrei INT")
listaAtualizada.forEach(element => {
	
	$(`#id-${element}`).removeClass('fa fa-star-o').addClass('fa fa-star two');	
});
}})
}

function addFavo(elemento) {
	console.log('tona funcao de favoritos')
	if(typeof(Storage) !== "undefined") {
		if (sessionStorage.listaFovoritos) {
			listaFovoritos = JSON.parse(
				sessionStorage.getItem("listaFovoritos"));
		} else {
			listaFovoritos = [];
		}		
			if(listaFovoritos.includes(elemento)){
				listaFovoritos.splice(listaFovoritos.indexOf(elemento),1);
                console.log('deletei dos favoritos')
                location.reload();
			}else{
				listaFovoritos.push(elemento)
                console.log('adicionei nos favoritos')
                location.reload();
			}			
			
		sessionStorage.listaFovoritos = JSON.stringify(listaFovoritos);
	}
	var fav = listaFovoritos.filter(function (cerva){ return listaFovoritos.includes(cerva.id)});
		console.log(fav)
}
