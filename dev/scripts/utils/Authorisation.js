import {makeRequest, Endpoints} from  "../utils/api"

export class Authorisation {
    static checkAuthorisation( nextState, replace ) {
      let token = localStorage.getItem("token");
      if( !token ) {
        replace('/login')
      }
    }

    static getLogout( nextState, replace ) {
      localStorage.removeItem("token");
      replace('/login');
    }

    static setToken(token) {
        localStorage.setItem("token", token);
    }

    static getToken() {
        return localStorage.getItem("token");
    }

    static removeToken() {
        makeRequest(Endpoints.REMOVE_AUTH_TOKEN())
            .then(() => {
                localStorage.removeItem("token");
                location.href = "/"
            })
            .catch(() => {
                localStorage.removeItem("token");
                location.href = "/"
            });
    }
    static getAuthToken(userLogin,userPassword) {
      return (
        makeRequest(Endpoints.GET_AUTH_TOKEN(), {
          login: userLogin,
          password: userPassword
          })
          .then(response=> {
              //debugger;
              if (response.data && response.data.token) {
                Authorisation.setToken(response.data.token);
              }
              return response.data.token;
          })
          .catch(error=> {
              console.log("Authorisation Error");
          })
      )
    }
}
