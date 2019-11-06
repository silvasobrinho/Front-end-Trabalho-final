var favoritinho = [];
var todascervas = [];

const urls = ['https://api.punkapi.com/v2/beers?page=1&per_page=80',
'https://api.punkapi.com/v2/beers?page=2&per_page=80',
'https://api.punkapi.com/v2/beers?page=3&per_page=80',
'https://api.punkapi.com/v2/beers?page=4&per_page=80',
'https://api.punkapi.com/v2/beers?page=5&per_page=80'];

vainaAPI(urls).then(response =>{
	console.log ("executando!")
})
.catch(error => {

	console.error(error);
});

async function vainaAPI(urls){
	for(let url of urls){
		const response = await fetch(url);
		const lcervejas = await response.json();
		todascervas.push(...lcervejas)
	}
	if($('#search-input').val() == ''){
	escrever(todascervas)
	rescroll();}
}

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
			<div class="col-lg-4 col-md-6 col-sm-12 mt-4 scrollable-data">
			
			 <div class="card" type="button" data-toggle="modal" data-target="#modalQuickView${element.id}">
			 <a><i class="fa fa-star-o" id="id-${element.id}" aria-hidden="true" onclick="addFavo(${element.id})"></i></a>	
		
			 <img class="card-img-top img-fluid smallimg" src="${element.image_url}" data-dismiss="modal" data-toggle="modal" data-target="#popup" onclick="chamaModal(${element.id})">
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

}

async function chamaModal(id){
	console.log(id)
	let itemModal = todascervas[id-1];

	console.log(itemModal)
	$("#modalDinamico").empty();
	$("#modalDinamico").append(`
	
	
	<div class="modal-content">
	<!--Body-->
	<div class="modal-body">
	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
		<div class="text-center">
			<div class="container">
				<div class="row cointainer-fluid">
					<div class="col-md-4">
						<img class="card-img-top modalimg" src="${itemModal.image_url}" alt="Card image cap">
					</div>
					<div class="col-md-8">
						<h2>${itemModal.name}</h2>
						<h4>${itemModal.tagline}</h4>
						<hr/>
						<div class="text-left">
						<span>
							<label class="mdmintitle">IBU:</label> ${itemModal.ibu}
						</span>
						<span>
							<label class="mdmintitle">ABV:</label> ${itemModal.abv}
						</span>
						<span>
							<label class="mdmintitle">EBC:</label> ${itemModal.ebc}
						</span>
						</div>
						<p class="text-left modalText">${itemModal.description}</p>
						<div><h5>Best served with:</h5>
						<ul id="lista_comidas" class="text-left">
						${itemModal.food_pairing
							.map(ingredient => `<li>${ingredient}</li>`)
							.join("")}
						</ul>
						</div>
					</div>
				</div>
				<p><h5 id="titlemodalbottom">You might also like:</h5></p>
				<div class="row">
					<div class="card-deck cerveja row container-fluid mt-4" id="alsomight" style="display:flex;">
					
					</div>
				</div>
				</div>
				</div>
			</div>
		</div>
	</div>
</div>

	
	`);

	let also = [];
	if (itemModal.id == 1 || itemModal.id == 325 || itemModal.id == 324){
		also.push(todascervas[25] , todascervas[30] , todascervas[50]);
		
	}else{
		also.push( todascervas[itemModal.id - 1],todascervas[itemModal.id + 1] , todascervas[itemModal.id + 2]);
	}
	console.log(also)
	$('#alsomight').empty();
	escreveralso(also);
	

function escreveralso(arr){

arr.forEach(element => {
if (element.image_url == null) {
element.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
}
$('#alsomight').append(
`
<div class="col-lg-4 col-md-6 col-sm-12">

<div class="card cardmod" style="width: 18rem;" button type="button">
<a><i id="id-${element.id}" aria-hidden="true" onclick="addFavo(${element.id})"></i></a>	

<img class="card-img-top smallimg" src="${element.image_url}" >
<div class="card-body ">
<h5 class="card-title alsotitle">${element.name}</h5>
</div>
</div>
</div>`

)

});

}
}

//Faz o infinit scroll
function rescroll(){
	$('.scrollable-data').show();
		// hide everything that is out of bound
	$('.scrollable-data').filter(function(index){
	return ($(this).position().top > $(window).height()+$(window).scrollTop());
	}).hide();
	
	}
	
	$(window).scroll(function(){
	  rescroll();
	});