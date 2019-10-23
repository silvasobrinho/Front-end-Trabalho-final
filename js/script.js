const apiCerva = "https://api.punkapi.com/v2/beers";

$('#search-input').keyup(function(){
    var searchField = $(this).val();
			if(searchField === '')  {
				$('#cervejas').html('');
				return;
			}
			
            var regex = new RegExp(searchField, "i");
            var output = '<div class="row">';
            var count = 1;
			  $.each(apiCerva, function(val){
				if ((val.name.search(regex) != -1) ) {
                  output += '<div class="col-lg-4 col-md-6 col-sm-12">';
                  output += '<div class="card " style="width: 18rem;">';
                  output += '<img class="card-img-top" src="' +val.image_url +'" alt="Card image cap">';
                  output += '<div class="card-body">';
                  output += '<h5 class="card-title">'+val.name+'</h5>';
                  output += '<p class="card-text">'+val.description+'</p>';
                  output += '</div>';
                  output += '</div>';
                  output += '</div>';
                 
				if(count%2 == 0){
					output += '</div><div class="row">'
				  }
				  count++;
				}
			  });
			  output += '</div>';
			  $('#cervejas').html(output);
        });




