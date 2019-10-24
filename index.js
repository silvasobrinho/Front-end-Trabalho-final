var options = {
	url: function(phrase) {
		return "https://api.punkapi.com/v2/beers?beer_name="+phrase;
	},

	getValue: "name"
};

$("#provider-remote").easyAutocomplete(options);

