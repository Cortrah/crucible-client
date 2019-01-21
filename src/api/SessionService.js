import axios from "axios";

/**
 * Get a list of sessions
 */
export function getSession() {
    return axios.get("/sessions");
}

/**
 * Add a new things
 */
export function addSession(session) {
    return axios.post("/sessions/", session);
}

/**
 * Update a session
 */
export function updateSession(session) {
    return axios.put("/sessions/" + session.id, session);
}

/**
 * delete a thing by its id
 */
export function deleteSession(id) {
    return axios({
        data: null,
        headers: {
            "Content-Type": "application/json",
        },
        method: "delete",
        url: "/sessions/" + id,
    });
}
