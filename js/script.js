
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
  
  