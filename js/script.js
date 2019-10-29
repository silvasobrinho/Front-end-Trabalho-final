const todasCervejas = [];
var i = 2;
/*
$.when ($('#search-input').val() == '').then(function (){
fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
		   .then(function(resp) {
			   return resp.json();
		   })
		   .then(function(data) {
			  escrever(data);
		   });
});*/

 if ($('#search-input').val() == ''){
	fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
			   .then(function(resp) {
				   return resp.json();
			   })
			   .then(function(data) {
				  escrever(data);
			   });
	};

$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height() && $('#search-input').val() === "") {
		   // ajax call get data from server and append to the div
		 	   if( i < 6){
		   fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
		   .then(function(resp) {
			   return resp.json();
		   })
		   .then(function(data) {
			   escrever(data);
		   });	
		i++;
		}
	}
});

function escrever(data){
		if (data.length === 0) {
this.showError('Esta Cerveja não existe na nossa base de Cervejas!')
} else {
$('#error').remove()
	data.forEach(element => {
		if(element.image_url == null){
			element.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
		}
	 $('#lCervejas').append(
		`
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
}}
	



function order(opc){
	switch(opc){
		
		case 'Max IBU' :
				console.log(todasCervejas);
				console.log("aaaaaa");
				escrever(todasCervejas);
		break;

	}

}



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
		const userInput = this.elements.input.val().trim();		
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
			if(beer.image_url == null){
				beer.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
			}
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
  

