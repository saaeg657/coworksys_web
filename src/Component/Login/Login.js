import React from 'react';
import APIManager from '../../Controller/APIManager.js';
import ModelManager from '../../Controller/ModelManager.js';
import * as SessionUtil from '../../Util/SessionUtil.js';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            rememberAccount: false
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.responseAPICallback = this.responseAPICallback.bind(this);
    }

    componentDidMount() {
        if (SessionUtil.getCookie("email").length > 0)
            this.props.ViewManager.login(SessionUtil.getCookie("email"), SessionUtil.getCookie("userID"));
    }
    responseAPICallback(response, key) {
        console.log(response, key);
        if (response.data["code"] == "eSuccess") {
            this.props.ViewManager.login(response.data[key].email, response.data[key].id, this.state.rememberAccount);
        }
        else {
            alert("이메일과 비밀번호를 확인해주세요.");
        }
    }
    login() {
        var api = ModelManager.GetAPICommand("login");
        APIManager.requestAPI(
            api.get("apikey"),
            api.get("apicommand"),
            api.get("apiheader"),
            {
                "email": this.state.id,
                "password": this.state.password
            },
            this.responseAPICallback,
            api.get("apilistkey"));

        //this.props.ViewManager.login();
    }
    onChange(type, e) {
        switch (type) {
            case "id":
                this.setState({ id: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
            case "rememberAccount":
                this.setState({ rememberAccount: !this.state.rememberAccount });
                break;
        }
    }
    render() {
        return (
            <div className="div-login" >
                <div className="div-login-middle">
                    <div className="div-login-box">
                        <div className="div-login-logo" />
                        <form className="form" data-name="Email Form 3" id="email-form-3" name="email-form-3">
                            <div className="div-login-input" style={{ marginTop: 60 }}>사용자이름</div>
                            <input className="text-login-input" data-name="Email" id="email" value={this.state.id}
                                onChange={this.onChange.bind(this, "id")} maxLength={256} name="email" type="text" />
                            <div className="div-login-input">비밀번호</div>
                            <input className="text-login-input" data-name="Email" id="email" value={this.state.password}
                                onChange={this.onChange.bind(this, "password")} maxLength={256} name="email" type="password" />
                            <div className="div-login-input" style={{ display: "flex", marginTop: 28 }}>
                                <img src={this.state.rememberAccount ? '../images/chkbox2_on.png' : '../images/chkbox2_off.png'} style={{ marginTop: 2, marginRight: 10, width: 15, height: 15 }} onClick={this.onChange.bind(null, "rememberAccount")} />
                                <div style={{ cursor: "pointer" }} onClick={this.onChange.bind(null, "rememberAccount")}>계정 기억하기</div>
                            </div>
                            <div className="div-login-input" style={{ marginTop: 60 }}>
                                {/* <img src={'../images/btn_login.png'} onClick={this.login} style={{ cursor: "pointer" }} /> */}
                                <img src={'../images/btn_login.png'} onClick={() => {
                                    this.props.ViewManager.login();
                                }} style={{ cursor: "pointer" }} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}