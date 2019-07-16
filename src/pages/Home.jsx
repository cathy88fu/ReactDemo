import React,{Component} from 'react';
import img from '../images/test.png';
import {Button} from 'antd-mobile';
import ajax from '../utils/ajax';
import {observer,inject} from 'mobx-react';

@inject('userStore')
@observer
export default class Home extends Component {
    render(){
        const {userStore} = this.props;
        return(<div>this is Home page<img src={img}/><br/>
            <div>名字：{userStore.userName}</div>
            <div>{userStore.sayHello}</div>
            <Button type="primary" onClick={this.changeName.bind(this)}>changeName</Button>
        </div>)
    }
    changeName = () => {
        const {userStore} = this.props;
        console.log(userStore);
        userStore.setName('fuxinlei');
    }
    componentWillMount = () => {
        ajax.get('/index',{name:'cathy'},(res)=>{
    
        })
    }
}