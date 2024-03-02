const api = "https://pokeapi.co/api/v2/pokemon/"
const all = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302"
var allResults = [];

function setImage(img, name, id){
	const eid = "#img" + id;
	$(eid).append('<img src="'+img+'" alt="'+name+'" >');
}

function setName(name, id){
	const eid = "#pokemon-head" + id;
	$(eid).append('<a class="pokemon-name" href="#">'+name+'</a><span class="number">'+id+'</span>');
}

function setStat(name, stat, id){
	const eid = "#pokemon-head" + id;
	$(eid).append('<div><span id="" class="info-label" >'+name.toUpperCase()+' : '+stat+'</span></div>');
}

function setTypes(type, id){
	const eid = "#type" + id;
	$(eid).append('<a class="'+type+' type-link" id="" href="#">'+type+'</a>');
	$(".ṭype-link").css("text-transform", "capitalize");

}

function paginate(prev, next){
	const eid = "#pagination";
	if ( prev ){
		$("#prev").val(prev);
		$("#prev").show();
	}
	else{
		$("#prev").hide();
	}
	if ( next ){
		$("#next").val(next);
		$("#next").show();
	}
	else{
		$("#next").hide();
	}
}


function getPokemon(value, index, array){
	const query = api + value.name;
	$.get(query, function(data, status){
		const id = data.id;
		const name = data.name;
		var img = null;
		if(data.sprites.other.dream_world.front_default){
			img = data.sprites.other.dream_world.front_default;
		}
		else{
			img = data.sprites.other.home.front_default;
		}
		const height = data.height;
		const weight = data.weight;
		const stats = data.stats;

		const types = data.types;

		$("#pokemons").append('<figure class="pokemon" ><div class="pokemon-info"><div class="stats"><div id="img'+id+'" class="pokemon-img"></div></div><div id="pokemon-head'+id+'" class="pokemon-head"></div></div><div class="description" ><p class="desc-head">Type</p><p id="type'+id+'" class="type"></p></div></figure>');
		setImage(img, name, id);
		setName(name, id);

		for ( let i = 0; i < stats.length; i++){
			setStat(stats[i].stat.name ,stats[i].base_stat, id);
		}

		for (let i = 0; i < types.length; i++){
			setTypes(types[i].type.name, id);
		}
	})
}

function getData(url){
	$.get(url, function(data, status){
		results = data.results;
		const prev = data.previous;
		const next = data.next;
		paginate(prev, next);
		results.forEach(getPokemon);
		$("#pokemons").fadeIn("slow", function(){
			$("#pokemons").show();
		});
	});
}

function getPokemonByName(value, index, array){

	const query = api + value.name;
//	console.log(query);
	$.get(query, function(data, status){


		const id = data.id;
		const name = data.name;
		var img = null;
		if(data.sprites.other.dream_world.front_default){
			img = data.sprites.other.dream_world.front_default;
		}
		else{
			img = data.sprites.other.home.front_default;
		}
		const height = data.height;
		const weight = data.weight;
		const stats = data.stats;

		const types = data.types;

		$("#pokemons").append('<figure class="pokemon" ><div class="pokemon-info"><div class="stats"><div id="img'+id+'" class="pokemon-img"></div></div><div id="pokemon-head'+id+'" class="pokemon-head"></div></div><div class="description" ><p class="desc-head">Type</p><p id="type'+id+'" class="type"></p></div></figure>');
		setImage(img, name, id);
		setName(name, id);
		console.log(data.id + " : " + data.name + " : " + img);

		for ( let i = 0; i < stats.length; i++){
			setStat(stats[i].stat.name ,stats[i].base_stat, id);
		}

		for (let i = 0; i < types.length; i++){
			setTypes(types[i].type.name, id);
		}

	});
}

function search(value, index, array){
	var searchResults = [];
	for( let i = 0; i < allResults.length; i++){
		let name = allResults[i].name;
//		console.log(i);
//		console.log(name);
//		if(name == value ){
//			console.log(name);
//		}
		if (name.search(value) > -1){
			searchResults.push(allResults[i]);

		}
	}
//	console.log(searchResults);
//	$("#pokemons").hide("slow", function(){
//		$("#pokemons").empty();
//	});
	$("#pokemons").empty();
//	searchResults.forEach(getPokemon);
	searchResults.forEach(getPokemonByName);
//	$("#pokemons").fadeIn("slow", function(){
//		$("#pokemons").show();
//	});
}

$(document).ready(function(){
	getData(api);

	$.get(all, function(data, status){
		allResults = data.results;
	});

	$("#search-input").on("input", function(){
		var value = $("#search-input").val();
		if(value.length > 2){
			search(value);
		}
//		value = value;
//		let name = "bulbasaur";

//		console.log(name.matchAll(value));
//		var matched = name.matchAll(value);

	});

//	$("#search-btn").click(function(){
//		var value = $("#search-input").val();
//		if(value.length > 2){
//			search(value);
//		}
////		if(value){
////			search(value);
//////			console.log("Value: " + value);
////			let name = "bulbasaur";
//////			if (name.search){
//////				console.log("Matched");
//////			}
//////			else{
//////				console.log("Not Matched");
//////			}
////		}
//	});

	$("#next").click(function(){
		const url = $(this).val();
		$("#pokemons").hide("slow", function(){
			$("#pokemons").empty();
			getData(url);
		});
	});


	$("#prev").click(function(){
		const url = $(this).val();
		$("#pokemons").hide("slow", function(){
			$("#pokemons").empty();
			getData(url);
		});
	});
});
