import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {changeHandler} from '../mixins/index'
import {Loading} from "../components/Loading"
import {makeRequest, Endpoints} from "../utils/api"
import {Authorisation} from '../utils/Authorisation'
import {Alert, TYPE_ERROR, TYPE_INFO} from '../components/Alert'
import {Grid, Row, Col} from 'react-bootstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.auth = this.auth.bind(this);
        this.changeHandler = changeHandler(this);
        this.state = {
            login: "380500000001",
            password: "Pipilatz123",
            isFetching: false,
            error: null,
            response: null
        };
    }

    componentDidUpdate() {
        if (Authorisation.getToken()) {
            location.href = "#/orders";
        }
    }

    componentWillMount() {
        if (Authorisation.getToken()) {
            location.href = "#/orders";
        }
    }

    auth() {
        if (this.state.response) {
            if (this.state.response.data) {
                if (this.state.response.data.token) {
                    Authorisation.setToken(this.state.response.data.token);
                    location.href = "#/orders";
                }
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isFetching: true
        });
        makeRequest(Endpoints.GET_AUTH_TOKEN(), {
            login: this.state.login,
            password: this.state.password
        })
            .then(response=> {
                //debugger;
                this.setState({
                    error: null,
                    response,
                    isFetching: false
                }, this.auth)
            })
            .catch(error=> {
                this.setState({
                    response: null,
                    error,
                    isFetching: false
                });
            })
    }

    render() {
        const { login, password } = this.state;
        const { changeHandler } = this;
        let note = null;
        let noteType = TYPE_INFO;

        if (this.state.response && this.state.response.data && this.state.response.data.note) {
            note = this.state.response.data.note;
            if (this.state.response.data.result == "error") {
                noteType = TYPE_ERROR;
            } else {
                noteType = TYPE_INFO;
            }
        }

        return (
          <Row style={{ marginTop: '150px'}}>
            <Col xs={4} xsOffset={4}>
              <Loading loading={this.state.isFetching}/>
              <h1 className="text-center">Taxi system</h1>
              <h4 className="text-center">Авторизуйтесь чтобы продолжить</h4>
              <Alert type={noteType}>{note}</Alert>
              <div className="account-wall">
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                          <input type="text"
                                 className="form-control"
                                 placeholder="Логин"
                                 value={login}
                                 onChange={changeHandler("login")}
                                 autofocus/>
                      </div>
                      <div className="form-group">
                          <input type="password"
                                 className="form-control"
                                 placeholder="Пароль"
                                 value={password}
                                 onChange={changeHandler("password")}/>
                      </div>
                      <div className="form-group">
                          <button className="btn btn-primary btn-block" type="submit">
                              Войти
                          </button>
                      </div>
                  </form>
              </div>
            </Col>
          </Row>
        );
    }
}

export default LoginPage;
