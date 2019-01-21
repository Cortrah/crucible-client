import Command from "../../main/Command";

export default class UpdateProfile extends Command {

    constructor(data) {
        super('UpdateProfile', data);
    }

    do(store){
        if(this.serverIsRunning) {
            this.$http.patch('/hapi/api/accounts', formData).then(
                response => {
                    // ok?
                }, error => {
                    // perhaps give a nice error message
                });
        } else {
            // not sure
        }
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);
        return state;
    }
};
