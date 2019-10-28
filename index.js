//lista todas as cervejas
var todasCervejas = [];
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
console.log(todasCervejas);

$(document).ready(function() {
      todasCervejas.forEach(element => {
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