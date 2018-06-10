import React from 'react';
/**
 * TopArea
 * 
 * props 목록
 * username : 로그인 유저 이름
 */
export default class TopArea extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        var logout = confirm("로그아웃 하시겠습니까?");
        if(logout){
            this.props.Body.props.ViewManager.logout();
        }
    }
    render() {
        return (
            <div className="div-top" style={{position:"fixed",width:"100%"}}>
                <div className="div-top-userinfo">
                    <div className="txt-top-userinfo" style={{marginRight:this.props.Body.state.isShowMenu?250:70}}>
                        <div style={{marginRight:10,textDecorationColor:"#"}}>{this.props.username}</div>
                        <a style={{cursor:"pointer"}} onClick={this.logout}><img src="../images/Ellipse.png" className="image-2"/></a>
                    </div>

                </div>
            </div>
        );
    }
}