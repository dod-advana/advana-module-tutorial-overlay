import axiosLib from "axios";
import https from 'https';

const endpoints = {
    dismissTutorialOverlayPOST: '/api/dismissTutorialOverlay/save'
};

export default class DismissTutorialAPI {
    constructor(opts = {}) {
        const {
            axios = axiosLib
        } = opts

        this.axios = axios.create({
            baseURL: window?.__env__?.REACT_APP_TUTORIAL_HREF || process.env.REACT_APP_TUTORIAL_HREF,
            httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
            withCredentials: true
        });
    }

    dismissTutorialOverlayPOST = async (url = endpoints.dismissTutorialOverlayPOST, tutorialAppName, userId) => {
        return await this.axios.post(url, { tutorialAppName, userId });
    }

}
