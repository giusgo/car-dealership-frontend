import axios from "axios";

export async function sendRegisterForm(packedInfo) {

    const url = '/api/user-auth/register';

    return axios.post(url, packedInfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}

export async function sendLoginForm(packedInfo) {

    const url = '/api/user-auth/login';

    return axios.post(url, packedInfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}

export async function getPersonInfo(userID) {

    const url = '/api/user-info/get-client-info';
    const urlWithParams = url + `?personID=${userID}`;

    return fetch(urlWithParams)
        .then(response => {
            return response.json();
        })

}

export async function sendUpdatePerson(packedInfo) {

    const url = '/api/user-info/update-client-info';

    return axios.post(url, packedInfo)
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

export async function sendUpdatePayment(packedInfo) {

    const url = '/api/user-info/update-credit-card-info';

    return axios.post(url, packedInfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}
