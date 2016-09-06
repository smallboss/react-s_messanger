import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listMessages() {
        return axios.get(`${apiPrefix}/messages`);
    },

    createMessage(data) {
        return axios.post(`${apiPrefix}/messages`, data);
    },

    deleteMessage(messageId) {
        return axios.delete(`${apiPrefix}/messages/${messageId}`);
    }
}
