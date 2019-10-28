const todasCervejas = [];

   	   for(var i=1; i<6; i++) {
      fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
			//Esse trem deu trabalho pra ficar colocando um dentro do outro NÂO ESQUECER PORRA!
    	todasCervejas.push(...data)
		});
	}
	
$(document).ready(function() {
	console.log(todasCervejas);  
	todasCervejas.forEach(element => {
		console.log(todasCervejas); 
		$('#lCervejas').append(`
			<div class="col-lg-4 col-md-6 col-sm-12 mt-4">
			<div class="card " style="width: 18rem;">
		   
				<img class="card-img-top smallimg" src="${element.image_url}">
				<div class="card-body ">
					<h5 class="card-title">${element.name}</h5>
					<p class="card-text">${element.description}</p>
			  
				</div>
			</div>
		</div>`
		)
	});
});


var options = {
	url: function(q) {
	return "https://api.punkapi.com/v2/beers?beer_name=" + q;
},	
getValue: "name",
	
	requestDelay: 1000
};

$("#search-input").easyAutocomplete(options);

class BeerAPI {
	constructor() {
	  this.apiUrl = 'https://api.punkapi.com/v2/beers'
	}
	
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
		const userInput = this.elements.input.val().trim()
		
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
	  	  if (data.length === 0) {
		this.showError('Esta Cerveja não existe na nossa base de Cervejas!')
	  } else {
		$('#error').remove()
		data.forEach((beer) => {
		  this.elements.results.append(`
		  <div class="col-lg-4 col-md-6 col-sm-12 mt-4">
				  <div class="card " style="width: 18rem;">
				 
					  <img class="card-img-top smallimg" src="${beer.image_url}">
					  <div class="card-body ">
						  <h5 class="card-title">${beer.name}</h5>
						  <p class="card-text">${beer.description}</p>
					
					  </div>
				  </div>
			  </div>`)
	   })  
	  }
	}
  // caso de erro gera umj div com o erro
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
  
  