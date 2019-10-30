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

if ($('#search-input').val() == '') {
    fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            escrever(data);
        });
};

$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height() && $('#search-input').val() === "") {
        // ajax call get data from server and append to the div
        if (i < 6) {
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

function escrever(data) {
    if (data.length === 0) {
        this.showError('Esta Cerveja não existe na nossa base de Cervejas!')
    } else {
        $('#error').remove()
        data.forEach(element => {
                    if (element.image_url == null) {
                        element.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
                    }
                    $('#lCervejas').append(
                            `
		<div class="col-lg-4 col-md-6 col-sm-12 mt-4">
		 <div class="card " style="width: 18rem;" button type="button"  data-toggle="modal" data-target="#modalQuickView">
	   
			<img class="card-img-top smallimg" src="${element.image_url}">
			<div class="card-body ">
				<h5 class="card-title">${element.name}</h5>
				<p class="card-text">${element.description}</p>


				<!-- Modal inicio: modalQuickView -->
				
				<div class="modal fade" id="modalQuickView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-body">

							<!-- X PRA FECHAR O POP UP -->

							<button type="button" class="close" data-dismiss="modal">
							   <span>&times;</span>
							</button>
								   
							<!--/.X PRA FECHAR O POP UP-->

								<div class="row">
									<div class="col-lg-5">
											 <!--Carousel Wrapper-->
									   <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
											
											 <!--COLOCAR A IMAGEM DA CERVEJA PRINCIPAL-->
											<div class="carousel-inner" role="listbox" id="imgmodal">
												<div class="carousel-item active">
													<img class="d-block w-100" src="${element.image_url}">
												</div>

											</div>
								   <!--/.FIM DA CERVEJA PRINCIPAL-->

									   </div>


									<!--/.Carousel Wrapper-->
								  </div>
										<div class="col-lg-7">
											<h2 class="h2-responsive product-name">
												<h3 id="nomeprodutomodal" style=text-align:left>${element.name} </h3>
											</h2>
											<h4 class="h4-responsive">
												<span class="text-muted">
													<h6 style=text-align:left>${element.tagline}</h6>
												</span>
												<span>
												<h6 class ="title mt-3" style=text-align:left>IBU: ${element.ibu}  ABV: ${element.abv}%   EBC: ${element.ebc}</h6>
												</span>
											</h4>

											<!--Accordion wrapper-->
											<div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">



												<!-- Card body -->
												<div id="collapseOne1" class="collapse show" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
													<div class="card-body" style=text-align:left>
													${element.description}
													<h6 class ="title" style=text-align:left id="bestserved"><strong>Best Served With </strong></h6>
													 <ul style=text-align:left>
													   ${element.food_pairing
													   .map(ingredient => `<li>${ingredient}</li>`)
													   .join("")}

													 </ul>
													</div>
													
												</div>

										  </div>
										 
									  </div>
  
									  <h4 class ="title ml-4 mt-5" id="alsolike">You might also like:</h4>
									  
								  </div>
								  <div class="card " id="alsolikecard">
									<img class="card-img-top smallimg" src="${element.image_url}" class="img-fluid" alt="Responsive image">
									<div class="card-body" id="alsolikecard">
									 <h5 class="card-title" style="color: grey">${element.name}</h5>
									</div>
								  </div>
								 
								  <div class="card " id="alsolikecard">
									<img class="card-img-top smallimg" src="${element.image_url}" class="img-fluid" alt="Responsive image">
									<div class="card-body" id="alsolikecard">
									 <h5 class="card-title" style="color: grey">${element.name}</h5>
									</div>
								  </div>

								  <div class="card " id="alsolikecard">
									<img class="card-img-top smallimg" src="${element.image_url}"class="img-fluid" alt="Responsive image">
									<div class="card-body" id="alsolikecard">
									 <h5 class="card-title" style="color: grey">${element.name}</h5>
									</div>
								  </div>


							  </div>
						  </div>
					  </div>
				  </div>

												<!-- FIM DO MODAL --> 
		  
			</div>
		</div>
	</div>`

            )

        });
    }
}




function order(opc) {
    switch (opc) {

        case 'Max IBU':
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
                    if (beer.image_url == null) {
                        beer.image_url = "https://images-americanas.b2w.io/produtos/01/00/oferta/46158/3/46158304_1GG.jpg"
                    }
                    this.elements.results.append(`
		  <div class="col-lg-4 col-md-6 col-sm-12 mt-4">
		   <div class="card " style="width: 18rem;" button type="button"  data-toggle="modal" data-target="#modalQuickView">
  				 
					  <img class="card-img-top smallimg" src="${beer.image_url}">
					  <div class="card-body ">
						  <h5 class="card-title">${beer.name}</h5>
						  <p class="card-text">${beer.description}</p>


						  <!-- Modal inicio: modalQuickView -->
				<div class="modal fade" id="modalQuickView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-body">

							<!-- X PRA FECHAR O POP UP -->

							<button type="button" class="close" data-dismiss="modal">
							   <span>&times;</span>
							</button>
								   
							<!--/.X PRA FECHAR O POP UP-->

								<div class="row">
									<div class="col-lg-5">
											 <!--Carousel Wrapper-->
									   <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails" data-ride="carousel">
											
											 <!--COLOCAR A IMAGEM DA CERVEJA PRINCIPAL-->
											<div class="carousel-inner" role="listbox" id="imgmodal">
												<div class="carousel-item active">
													<img class="d-block w-100" src="${beer.image_url}">
												</div>

											</div>
								   <!--/.FIM DA CERVEJA PRINCIPAL-->

									   </div>


									<!--/.Carousel Wrapper-->
								  </div>
										<div class="col-lg-7">
											<h2 class="h2-responsive product-name">
												<h3 id="nomeprodutomodal" style=text-align:left>${beer.name} </h3>
											</h2>
											<h4 class="h4-responsive">
												<span class="text-muted">
													<h6 style=text-align:left>${beer.tagline}</h6>
												</span>
												<span>
												<h6 class ="title mt-3" style=text-align:left>IBU: ${beer.ibu}  ABV: ${beer.abv}%   EBC: ${beer.ebc}</h6>
												</span>
											</h4>

											<!--Accordion wrapper-->
											<div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">



												<!-- Card body -->
												<div id="collapseOne1" class="collapse show" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
													<div class="card-body" style=text-align:left>
													${beer.description}
													<h6 class ="title" style=text-align:left id="bestserved"><strong>Best Served With </strong></h6>
													 <ul style=text-align:left>
													   ${beer.food_pairing
													   .map(ingredient => `<li>${ingredient}</li>`)
													   .join("")}

													 </ul>
													</div>
													
												</div>

										  </div>
										 
									  </div>
  
									  <h4 class ="title ml-4 mt-5" id="alsolike">You might also like:</h4>
									  
								  </div>
								  <div class="card " id="alsolikecard">
									<img class="card-img-top smallimg" src="${beer.image_url}" class="img-fluid" alt="Responsive image">
									<div class="card-body" id="alsolikecard">
									 <h5 class="card-title" style="color: grey">${beer.name}</h5>
									</div>
								  </div>
								 
								  <div class="card " id="alsolikecard">
									<img class="card-img-top smallimg" src="${beer.image_url}" class="img-fluid" alt="Responsive image">
									<div class="card-body" id="alsolikecard">
									 <h5 class="card-title" style="color: grey">${beer.name}</h5>
									</div>
								  </div>

								  <div class="card " id="alsolikecard">
									<img class="card-img-top smallimg" src="${beer.image_url}"class="img-fluid" alt="Responsive image">
									<div class="card-body" id="alsolikecard">
									 <h5 class="card-title" style="color: grey">${beer.name}</h5>
									</div>
								  </div>


							  </div>
						  </div>
					  </div>
				  </div>

												<!-- FIM DO MODAL --> 
					
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