
//https://autosuggest-backend.onrender.com/api/autosuggest?q=a&weighted=true&algorithm=trie&limit=8
var api_url = "https://autosuggest-backend.onrender.com/api/autosuggest";

var searchbar = document.getElementById("search-bar");
var searchsuggestions = document.getElementById("search-suggestions");
searchbar.addEventListener("input", function(){
    //every time user types something in searchbar this function will be called and we will make an API call to get the suggestions and show them in the header 
    var query = searchbar.value.trim();
    console.log(query);
    fetchsuggestions(query);
})

function fetchsuggestions(query){
    var fullapi = api_url + "?q=" + query + "&weighted=true&algorithm=trie&limit=8";
    fetch(fullapi)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data);
            showsuggestions(data);
        })
        .catch(function(err){
            console.log("Error : "+ err);
        })
    }
        function showsuggestions(data){
            var values = data.results;
            if(data.count == 0){
                searchsuggestions.innerHTML = "<div> No matching results found </div>";
            }else{
                var htmlstring="";
                for(var i=0; i<values.length; i++){
                    htmlstring += "<div><span class='suggestion-item'>" + values[i].text + "</span><span class='item-weight'>" + values[i].weight + "</span></div>";
                }
                searchsuggestions.innerHTML = htmlstring;
            }
        }