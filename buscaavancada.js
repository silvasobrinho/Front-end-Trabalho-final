const todasCervejas = [];
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
		   // ajax call get data from server and append to the div
		 let i = 2;
		   if( i < 6){
	console.log("oi 1")
		   fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
		   .then(function(resp) {
			   return resp.json();
		   })
		   .then(function(data) {
			 console.log(data)
		   escrever(data);
		   });	
		i++;
		}
	}
});

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
		function escrever(arr){
		
		arr.forEach(element => {
		 $('#bCerveja').append(
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
		   
				<img class="card-img-top smallimg" src="${element.image_url}">
				<div class="card-body ">
					<h5 class="card-title">${element.name}</h5>
					<p class="card-text">${element.description}</p>
			  
				</div>
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
	
	escreveTela(todasCervejas);


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
