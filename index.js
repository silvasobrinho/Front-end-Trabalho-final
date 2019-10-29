//lista todas as cervejas
var todasCervejas2 = [];
   	   for(var i=1; i<6; i++) {
      fetch(`https://api.punkapi.com/v2/beers?page=${i}&per_page=80`)
        .then(function(resp) {
          return resp.json();
        })
        .then(function(data) {
			//Esse trem deu trabalho pra ficar colocando um dentro do outro NÂO ESQUECER PORRA!
    	todasCervejas2.push(...data)
		});
    }
console.log(todasCervejas2);

/*$(document).ready(function() {
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
});*/

$.when(
	$("#mxIBU").val() !=='' ||
	$("#mIBU").val() !=='' ||
	$("#mxABV").val() !==''||
	$("#mABV").val() !==''||
	$("#mxEBC").val() !==''||
	$("#mEBC").val() !=='') .then( function(){
		fetch(`https://api.punkapi.com/v2/beers?`)
		let a='' , b='' , c='' ,d='', e='',f='';

		if($("#mxIBU").val() !==''){
			a = "ibu_gt"+$('#mxIBU')+"&";
		}if($("#mIBU").val() !==''){
			b = "ibu_lt"+$('#mIBU')+"&";
		}if($("#mxABV").val() !==''){
			c = "abv_gt"+$('#mxABV')+"&";
		}if($("#mABV").val() !==''){
			d = "abv_lt"+$('#mABV')+"&";
		}if($("#mxEBC").val() !==''){
			e = "ebc_lg"+$('#mxEBC')+"&";
		}if($("#mEBC").val() !==''){
			f = "ebc_lt"+$('#mEBC')+"&";
		}


		
	}

	)

function order(opc){
	switch(opc){
		
		case 'Max IBU' :
				console.log(todasCervejas);
				console.log("aaaaaa");
				escrever(todasCervejas);
		break;

	}

}