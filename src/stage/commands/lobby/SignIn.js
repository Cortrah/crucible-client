import Command from "../../../main/Command";

export default class AddSome extends Command {

    constructor(data) {
        super('SignIn', data);
    }

    do(store){
        if (this.serverIsRunning) {
            this.$http.post('/hapi/api/login', formData)
                .then( response => {
                    this.loginInfo = response.body;
                    this.signedIn = true;
                    this.$bus.$emit('goto-profile');
                }, error => {
                    // perhaps give a nice error message and customize login page
                    // for now go to splash just to mark that a change has happened
                    this.$bus.$emit('goto-home');
                });
        } else {
            // just fake it
            this.signedIn = true;
            this.$bus.$emit('goto-lobby');
        }
    }
};
