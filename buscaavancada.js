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
		console.log(todascervas)
		const response = await fetch(url);
		const lcervejas = await response.json();
		todascervas.push(...lcervejas)
	}
	console.log(todascervas)
}

console.log(todascervas)


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
		   
// 				<img class="card-img-top smallimg" src="${element.image_url}">
// 				<div class="card-body ">
// 					<h5 class="card-title">${element.name}</h5>
// 					<p class="card-text">${element.description}</p>
			  
// 				</div>
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
	
// 	escreveTela(todasCervejas);


// 	for(let [key, value] of Object.entries(todasCervejas)){
// 		console.log('key',key , value)
// 	}
	
/* Não funcionou tbm mesmo erro
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
console.log(aaa)

aaa.forEach(function (i){
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
})*/
