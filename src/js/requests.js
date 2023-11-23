import axios from "axios";

export async function sendRegisterForm(packedInfo) {

    const url = '/api/user-auth/register';

    return axios.post(url, packedInfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}

export async function sendLoginForm(packedinfo) {

    const url = '/api/user-auth/login';

    return axios.post(url, packedinfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}

export async function getPersonInfo(userID) {

    const url = '/api/user-info/get-client-info';

    var formattedUserID = { personID: userID };

    return axios.get(url, formattedUserID)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}

export async function sendUpdatePerson(packedinfo) {

    const url = '/api/user/update-client-info';

    return axios.post(url, packedinfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}

export async function getPaymentInfo() {

    const url = '/api/user/get-credit-card-info';

    return axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}

export async function sendUpdatePayment(packedinfo) {

    const url = '/api/user-info/update-credit-card-info';

    return axios.post(url, packedinfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}
