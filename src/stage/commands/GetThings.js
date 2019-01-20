import Command from "../../main/Command";
import {getThings} from "../api/ThingsService";

export default class GetThings extends Command{

    constructor(data) {
        super('GetThings', data);
    }

    // actions
    async onDispatch(context, action) {
        // console.log("GetThings");
        // console.log(context);
        // console.log(action);
        let fetchedResults = [new Owner({name:'FREDS'}), new Owner({name:'BO'}), new Owner({name:'mogzippen'})]
        // let results = await context.commit('do', {action: action, results: fetchedResults});
        // console.log(results);
        // return results;
        return await context.commit('do', {action: action, results: fetchedResults})
    }

    // mutation
    do(state, payload) {
        // console.log(state);
        // console.log(payload);
        // console.log(this.data);

        state.owners = [] ;
        // first add any owners that were sent in via the constructor
        this.data.forEach(owner => {
            state.owners.push(new Owner(owner));
        });
        // then add any owners that were fetched during the onDispatch action
        payload.forEach(owner => {
            state.owners.push(new Owner(owner));
        });
    }
}

