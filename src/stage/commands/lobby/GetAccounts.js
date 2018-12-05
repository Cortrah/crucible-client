const Command = require("../../main/Command");

export default class GetAccounts extends Command {

    constructor(data) {
        super('GetAccounts', data);
    }

    do(store){
        this.$http.get('/hapi/api/accounts', {
            headers: {
                username: this.loginInfo.session._id,
                password: this.loginInfo.session.key,
                authorization: this.loginInfo.authHeader,
            }
        }).then( response => {
            this.$bus.$emit('goto-lobby');
        }, error => {
            this.gotoHome();
        });
    }
};
