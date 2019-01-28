import axios from "axios";

/**
 * Get a list of things
 */
export function getThings() {
    return axios.get("/things");
}

/**
 * Add a new things
 */
export function addThing(thing) {
    return axios.post("/things/", thing);
}

/**
 * Update a thing
 */
export function updateThing(thing) {
    return axios.put("/things/" + thing.id, thing);
}

/**
 * delete a thing by its id
 */
export function deleteThing(id) {
    return axios({
        data: null,
        headers: {
            "Content-Type": "application/json",
        },
        method: "delete",
        url: "/things/" + id,
    });
}
