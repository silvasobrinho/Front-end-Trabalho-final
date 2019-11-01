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
	console.log('error!');
	console.log(error);
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

/* $('input[type=search]').on('input', function(){
	clearTimeout(this.delay);
	this.delay = setTimeout(function(){
	   console.log(this.value);
	   
	}.bind(this), 800);
 }); */
//previni recarregar pagina ao precionar enter
/* $(document).ready(function() {
	$(window).keydown(function(event){
	  if(event.keyCode == 13) {
		event.preventDefault();
		return false;
	  }
	});
  });  */

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
			
					
				}
				});
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
			
			 <div class="card" style="width: 18rem;" button type="button" data-toggle="modal" data-target="#modalQuickView${element.id}">
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
		break;

		case '2' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const minibu = todascervas.sort(((a,b) => a.ibu - b.ibu));
		console.log(minibu);
		escrever(minibu)
		break;

		case '3' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const maxabv = todascervas.sort(((a,b) => b.abv - a.abv));
		console.log(maxabv);
		escrever(maxabv)
		break;

		case '4' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const minabv = todascervas.sort(((a,b) => a.abv - b.abv));
		console.log(minabv);
		escrever(minabv)
		break;

		case '5' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const maxebc = todascervas.sort(((a,b) => b.ebc - a.ebc));
		console.log(maxebc);
		escrever(maxebc)
		break;

		case '6' : 
		$('#bCerveja').html('');
		console.log("dentro o case");
		const minebc = todascervas.sort(((a,b) => a.ebc - b.ebc));
		console.log(minebc);
		escrever(minebc)
		break;

		default:
		/// se não achar vai listar por ordem alfabetica
		$('#bCerveja').html('');
		const all = todascervas.sort(((a,b) => a.name.localeCompare(b.name)))
		console.log(all)
		escrever(all)
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
	var fav = listaFovoritos.filter(function (cerva){ return listaFovoritos.includes(cerva.id)});
		console.log(fav)
}

listaAtualizada = JSON.parse(sessionStorage.getItem("listaFovoritos"));

//Faz o infinit scroll
function rescroll(){
	$('.scrollable-data').show();
		// hide everything that is out of bound
	$('.scrollable-data').filter(function(index){
		console.log($(this).position().top, $(window).height()+$(window).scrollTop());
		return ($(this).position().top > $(window).height()+$(window).scrollTop());
	}).hide();
	
	}
	
	$(window).scroll(function(){
	  rescroll();
	});
	
	