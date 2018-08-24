import {observable, action, computed} from 'mobx';

class UserStore {
    @observable userName = 'cathy';

    @computed get sayHello() {
        return `Hello ${this.userName}`;
    }
    @action setName = (name)=>{
        this.userName = name;
    }
}

export default new UserStore();
