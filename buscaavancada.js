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
	escrever(todascervas)
}


/* 
if ($('#search-input').val() == '') {
    fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            escrever(data);
        });
}; */
// function escreveTela(cervejas){
// 	this.$('#bCerveja').html('')
// 	console.log(cervejas);
// 	    // NAO funcionou  $.each(cervejas, function(element){
// 		//for(let element of cervejas){
// 		//for(let element in cervejas){
// 		//cervejas.forEach(function(item, index, array){
// 		cervejas.forEach(element => {
		
// 		console.log("200 ok entrei");	
//         $('#bCerveja').append(
//             `}
// 			<div class="col-lg-4 col-md-6 col-sm-12 mt-4">
// 			<div class="card " style="width: 18rem;">
/* const todasCervejas = [];
var i = 2;
$(document).ready( function tela() { 
fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
		   .then(function(resp) {
			   return resp.json();
		   })
		   .then(function(data) {
			 console.log("OIE2")
		   escrever(data);
		   });
		});

$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
		  	 	   if( i < 6){
		   fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
		   .then(function(resp) {
			   return resp.json();
		   })
		   .then(function(data) {
			$('#lCervejas').html("");
			   escrever(data);
		   });	
		i++;
		}
	}
}); */

/*
	const pegarCervejas = () =>{
		const callback = (resolve, reject)=>{	
			for(var i=1; i<6; i++) {
			fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
			.then(function(resp) {
				return resp.json();
			})
			.then(function(data) {
				//Esse trem deu trabalho pra ficar colocando um dentro do outro NÂO ESQUECER PORRA!
			escrever(data);
			});
			};
			resolve(todas);
		}	
		return new Promise(callback);
	}*/
	    // NAO funcionou  $.each(cervejas, function(element){
		//for(let element of cervejas){
		//for(let element in cervejas){
		//cervejas.forEach(function(item, index, array){
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
			<div class="col-lg-4 col-md-6 col-sm-12 mt-4 ">
			<a><i class="fa fa-star-o two" id="estrela" aria-hidden="true" onclick="addFavo(${element.id})"></i></a>
		 <div class="card " style="width: 18rem;" button type="button" data-toggle="modal" data-target="#modalQuickView${element.id}">
			<img class="card-img-top smallimg" src="${element.image_url}">
			<div class="card-body ">
				<h5 class="card-title">${element.name}</h5>
				<p class="card-text">${element.tagline}</p>
				</div>
				</div>
			</div>`

		)
		
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

		/* case '10' :
			$('#bCerveja').html('');
			const all = todascervas.sort(((a,b) => a.name.localeCompare(b.name)))
			console.log(all)
			escrever(all)
		break; */
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



/*		const rodartudo = async ()=>{
			await pegarCervejas();
			console.log(todasCervejas)
			escrever();
		};

		rodartudo();


/*
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
	
	
	    // NAO funcionou  $.each(cervejas, function(element){
		//for(let element of cervejas){
		//for(let element in cervejas){
		//cervejas.forEach(function(item, index, array){
		console.log(todasCervejas)
		$(document).ready(
		todasCervejas.forEach(element => {
		console.log("200 ok entrei");	
        $('#bCerveja').append(
            `}
			<div class="col-lg-4 col-md-6 col-sm-12 mt-4">
			<div class="card " style="width: 18rem;">
		   
// 				<img class="card-img-top smallimg" src="${element.image_url}">
// 				<div class="card-body ">
// 					<h5 class="card-title">${element.name}</h5>
// 					<p class="card-text">${element.description}</p>
			  
// 			</div>
// 		</div>`
// 		)
// 		console.log("200 ok 2");
// 	});
	
// }



// var todasCervejas = [];
//    	   for(var i=1; i<6; i++) {
//       fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
//         .then(function(resp) {
//           return resp.json();
//         })
//         .then(function(data) {
// 			//Esse trem deu trabalho pra ficar colocando um dentro do outro NÂO ESQUECER PORRA!
//     	todasCervejas.push(...data)
// 		});
// 	}
				</div>
		</div>`
		)
		console.log("200 ok 2");
	})
		)


   	  /* for(var i=1; i<6; i++) {
      fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
			//Esse trem deu trabalho pra ficar colocando um dentro do outro NÂO ESQUECER PORRA!
    	todasCervejas.push(...data)
		});
	}
	
// 	escreveTela(todasCervejas);

// 	for(let [key, value] of Object.entries(todasCervejas)){
// 		console.log('key',key , value)
// 	}
	for(let [key, value] of Object.entries(todasCervejas)){
		console.log('key',key , value)
	}  */
/*
	
 //Não funcionou tbm mesmo erro
var aaa = [];
	$.when(
		$.getJSON(`https://api.punkapi.com/v2/beers?page=1&per_page=80`),
		$.getJSON(`https://api.punkapi.com/v2/beers?page=2&per_page=80`),
		$.getJSON(`https://api.punkapi.com/v2/beers?page=3&per_page=80`),
		$.getJSON(`https://api.punkapi.com/v2/beers?page=4&per_page=80`),
		$.getJSON(`https://api.punkapi.com/v2/beers?page=5&per_page=80`)
	).done(function(data1, data2, data3, data4, data5) {
		aaa.push(...data1[0], ...data2[0], ...data3[0], ...data4[0], ...data5[0])
	});
(aaa.forEach(function (i){
	console.log(i);
	$("#bCerveja").append(`
	<div class="col-lg-4 col-md-6 col-sm-12 mt-4">
	<div class="card " style="width: 18rem;">
   
		<img class="card-img-top smallimg" src="${i.image_url}">
		<div class="card-body ">
			<h5 class="card-title">${i.name}</h5>
			<p class="card-text">${i.description}</p>
	  
		</div>
	</div>
</div>`)
})
)
*/
/*
pfunc();
const todas = [];
async function pfunc(){
const pegApi1 = await fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`);
const pegApi2 = await fetch(`https://api.punkapi.com/v2/beers?page=2&per_page=80`);
const pegApi3 = await fetch(`https://api.punkapi.com/v2/beers?page=3&per_page=80`);
const pegApi4 = await fetch(`https://api.punkapi.com/v2/beers?page=4&per_page=80`);
const pegApi5 = await fetch(`https://api.punkapi.com/v2/beers?page=5&per_page=80`);
console.log(todas)
Promise.all([pegApi1,pegApi2,pegApi3,pegApi4,pegApi5]).then(function(values){
	todas.push(...pegApi5, ...pegApi4, ...pegApi2, ...pegApi1, ...pegApi3);
	console.log(values);
});
} */

var listaFovoritos = [];
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
			}else{
				listaFovoritos.push(elemento)
				console.log('adicionei nos favoritos')
			}			
			
		sessionStorage.listaFovoritos = JSON.stringify(listaFovoritos);
	}
	var fav = listaFovoritos.filter(function (cerva){ return listaFovoritos.includes(cerva.id)});
		console.log(fav)
}

