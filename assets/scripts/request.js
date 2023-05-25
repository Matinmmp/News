class Request {
    constructor(options = {}) {
        this._baseURL = options.baseURL || "";
        this._headers = options.headers || {}
    }


    async _fetchJSON(endpoint = "", options = {}) {
        try {
            const resualt = await fetch(this._baseURL + endpoint, {
                ...options,
                headers: this._headers
            });
            return await resualt.json();
        } catch (error) {
            console.log("error");
        }
    }

    get(endpoint = "", options = {}) {
        return this._fetchJSON(endpoint, {
            ...options,
            method: "GET"
        });
    }
    
}

export default Request;