import  React,{Component} from 'react';
import ajax from '../utils/ajax'

export default class Hello extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg:'Hello JSX!'
        }
    }
    render(){
        return (<div>{this.state.msg}</div>);
    }
    componentWillMount(){
        ajax.get('index',(res)=>{

        })
    }
}