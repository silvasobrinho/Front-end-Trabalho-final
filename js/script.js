var todascervas = [];
listaAtualizada = JSON.parse(sessionStorage.getItem("listaFovoritos"));



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

async function buscar(){
	var x = document.getElementById("search-input");
	console.log(x)
}

 var options = {
    url: function(q) {
        return "https://api.punkapi.com/v2/beers?beer_name=" + q;
    },
    getValue: "name",

    requestDelay: 800
};

$("#search-input").easyAutocomplete(options);

class BeerAPI {
    constructor() {
        this.apiUrl = 'https://api.punkapi.com/v2/beers'
    }

	// Busca
    searchByName(name, callback) {
        const url = this.apiUrl
        const params = {
            'beer_name': name
        }

        $.getJSON(url, params)
            .done((data) => {
                callback(data)
            })
            .fail((response) => {
                callback(null)
            })
    }
}

class BeerSearch {
    constructor() {
        this.BeerAPI = new BeerAPI()
        this.elements = {
            'form': $('#search-form'),
            'input': $('#search-input'),
            'results': $('#lCervejas')
        }

        this.registerEvents()
    }

    registerEvents() {
        this.elements.form.on('submit', (e) => {
            e.preventDefault()
			const userInput = this.elements.input.val().trim();
			$('#bCerveja').empty();
            this.BeerAPI.searchByName(
                userInput, (data) => {
                    this.showResults(data)
                }
            )
        })
    }

    // escreve na tela resultado
    showResults(data) {
            this.elements.results.html('')
            if (data.length === 0 || data===null) {
                this.showError('Esta Cerveja não existe na nossa base de Cervejas!')
            } else {
                $('#error').remove()
                data.forEach((element) => {
                    if (element.image_url == null) {
                        element.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
					}
					
					$('#bCerveja').append(
						`
						<div class="col-lg-4 col-md-6 col-sm-12 mt-4 scrollable-data">
						
						 <div class="card" style="width: 18rem;" button type="button" data-toggle="modal" data-target="#modalQuickView${element.id}">
						 <a><i class="fa fa-star-o" id="id-${element.id}" aria-hidden="true" onclick="addFavo(${element.id})"></i></a>	
					
						 <img class="card-img-top smallimg" src="${element.image_url}" data-dismiss="modal" data-toggle="modal" data-target="#popup" onclick="chamaModal(${element.id})">
						<div class="card-body ">
							<h5 class="card-title">${element.name}</h5>
							<p class="card-text">${element.tagline}</p>
							</div>
							</div>
						</div>`
			
					)
					
						listaFovoritos.forEach(element => {		
							console.log("entei na lista de escrever")				
						$(`#id-${element}`).removeClass('fa fa-star-o').addClass('fa fa-star two');	
					}			
					
				
				);
				}
				)
		}
	}
		showError(message) {
			let alert = $('#error')
	
			if (alert.length === 0) {
				this.elements.form.before('<div class="alert alert-danger" id="error"></div>')
				alert = $('#error')
			}
	
			alert.text(message)
		}
	}
	
	const beerForm = new BeerSearch()




			function erroTela(menssagem){
				let alert = $('#error')
		
				if (alert.length === 0) {
					$('#bCerveja').before('<div class="alert alert-danger" id="error"></div>')
					alert = $('#error')
				}
		
				alert.text(menssagem)
			}
			
		function escrever(arr){
				// tratando erro se nao tiver nenhuma cerveja
			if (arr.length === 0) {
				erroTela('Sua Busca não obteve nenhum resultado!')
			} else {
				$('#error').remove()
					// trta cervejas sem foto
		arr.forEach(element => {
			if (element.image_url == null) {
				element.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
			}
		 $('#bCerveja').append(
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
		if(listaFovoritos !== ""){
			listaFovoritos.forEach(element => {
			console.log("entrei")
			$(`#id-${element}`).removeClass('fa fa-star-o').addClass('fa fa-star two');	
		});

		
	}
	});
}

}
// busca avançada
function order(valor){
	console.log("dentro do switch"+ valor)
	switch(valor){
		case '1' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const maxibu = todascervas.sort(((a,b) => b.ibu - a.ibu));
		console.log(maxibu);
		escrever(maxibu)
		rescroll()
		break;

		case '2' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const minibu = todascervas.sort(((a,b) => a.ibu - b.ibu));
		console.log(minibu);
		escrever(minibu)
		rescroll()
		break;

		case '3' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const maxabv = todascervas.sort(((a,b) => b.abv - a.abv));
		console.log(maxabv);
		escrever(maxabv)
		rescroll()
		break;

		case '4' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const minabv = todascervas.sort(((a,b) => a.abv - b.abv));
		console.log(minabv);
		escrever(minabv)
		rescroll()
		break;

		case '5' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const maxebc = todascervas.sort(((a,b) => b.ebc - a.ebc));
		console.log(maxebc);
		escrever(maxebc)
		rescroll()
		break;

		case '6' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const minebc = todascervas.sort(((a,b) => a.ebc - b.ebc));
		console.log(minebc);
		escrever(minebc)
		rescroll()
		break;

		default:
		/// se não achar vai listar por ordem alfabetica
		$('#bCerveja').html('');
		const all = todascervas.sort(((a,b) => a.name.localeCompare(b.name)))
		console.log(all)
		escrever(all)
		rescroll()
	}
	
}
 // começa com ele escondido
document.getElementById("advancedmenu").style.display = "none";
// some e  aparece o nmenu avancado
function menuavancado() {
	var x = document.getElementById("advancedmenu");
	if (x.style.display === "") {
	  x.style.display = "none";
	  
	} else {
	  x.style.display = "";
	 }
  }
	


// botoes de pesquisa avancada de antes e apos data
function bbefore(data){
	const databf = moment(data.target.value).format('MM-YYYY');
	fetch('https://api.punkapi.com/v2/beers?brewed_before='+databf+'&per_page=80')
	.then(function(response){
		return response.json();
	}).then(function(data){
		$('#bCerveja').html('');
		escrever(data);
		console.log(data)
	})

	}
	
	function bafter(data){
		const databf = moment(data.target.value).format('MM-YYYY');
		fetch('https://api.punkapi.com/v2/beers?brewed_after='+databf+'&per_page=80')
		.then(function(response){
			return response.json();
		}).then(function(data){
			$('#bCerveja').html('');
			escrever(data);
			console.log(data)
		})	
		}

//Guarda os favoritos
var listaFovoritos = [];
function addFavo(elemento) {
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
				$(`#id-${elemento}`).removeClass('fa fa-star two').addClass('fa fa-star-o');
			}else{
				listaFovoritos.push(elemento)
				console.log('adicionei nos favoritos')
				$(`#id-${elemento}`).removeClass('fa fa-star-o').addClass('fa fa-star two');
			}			
			
		sessionStorage.listaFovoritos = JSON.stringify(listaFovoritos);
	}
	listaAtualizada = JSON.parse(sessionStorage.getItem("listaFovoritos"));
	
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


setInterval(function(){
	if(listaAtualizada !== null){
		console.log("Verificando favoritos")
		
	listaAtualizada.forEach(element => {
		
		$(`#id-${element}`).removeClass('fa fa-star-o').addClass('fa fa-star two');	
	});
	}
},1000);