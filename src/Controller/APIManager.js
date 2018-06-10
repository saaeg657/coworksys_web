import * as properties from '../Properties.js'
import * as util from '../Util/Util.js';

import Axios from 'axios';
class APIManager {
    constructor(props) {
        this.requestAPI = this.requestAPI.bind(this);
    }
    requestAPI(key, command, header, body, callback, listKey) {
        if (key == null || command == null || header == null)
            return;
        // URL + /coworksys + /api/user/update/status
    
        Axios.post(properties.ServerURL + key + command,
            body, header)
            .then(
            Response => {
                callback(Response, listKey);
                //console.log(Response,command,body);
            }
            );
    }
}

export default (new APIManager)