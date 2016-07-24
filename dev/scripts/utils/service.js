//API pokemon call:

let service = {
    getPokemonData(url) {
        console.log('request Url : ' + url);

        return fetch(url)
            .then(function(Response){
                if (!Response.ok) {
                    throw Error(response.statusText);
                }
                return Response.json();
            })
            .catch(function(error) {
                console.log("get request threw an error.");
                return null;
            });
    }
};

module.exports = service;