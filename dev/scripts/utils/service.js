// checkServerResponse
const pattern_phone =  /[0-9]{9}/gi;

export const checkValidation = ( val, inputType) => {
debugger;
  switch (inputType) {
    case 'client_phone':
        return pattern_phone.test(val)
      break;
    case 'client_phone':
        return pattern_name.test(val)
      break;
  }
}

const ERROR_CODE = {
      "0" : "Сервер не овечает",
    "200" : "Операция прошла успешно",
    "300" : "REDIRECT",
    "400" : "ошибка в запросе",
    "401" : "Hевалидный токен",
    "403" : "Доступ запрещен",
    "404" : "Что-то не найдено по таким параметрам",
    "405" : "Тело не соответствует запросу",
    "406" : "Данные не прошли проверку валидатора",
    "431" : "Клиент имеет активный заказ",
    "409" : "Заказ уже кто-то забрал или отменен",
    "500" : "Серверная ошибка!"
};

export class networkManager {
    constructor(/*response server*/ response = null) {
        this._response = response;
        this.result = {
            isError: false,
            textMass: ""
        };
        this.init(response);
    }

    transErrCode() {
      let { isError, textMass } = this.result;

      // по умолчанию response = null , не меняем this._result
      if(this._response === null) {
        return this.result;
      }
      // если есть response.data вернем результат
      if(this._response && this._response.data) {
        let { result_code = 0, result = ""  } = this._response.data;
        let code = result_code.toString() ? result_code.toString() : "0";
        isError = result == "error" ? true : false;
        textMass = ERROR_CODE[code] ? ERROR_CODE[code] : "Серверная ошибка не обработана!!! Код ошибки : " + code ;
        return this.result = Object.assign({},this.result,{isError,textMass})
      }
      //если есть нет response - проблема на сервере
      isError = true;
      textMass = "Серверная ошибка! Сервер не отвечает";
      return this.result = Object.assign({},this.result,{isError,textMass})
    }

    newResponse (response) {
      this._response = response;
      this.init(response);
    }

    init (res) {
      this.transErrCode();      
    }
}
