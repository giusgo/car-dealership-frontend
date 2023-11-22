import axios from "axios";

export async function sendRegisterForm(packedInfo) {

    const url = '/api/user-auth/register';

    axios.post(url, packedInfo)
        .then(response => {
            return response.data;
        })
        .catch(error => {throw error});

}
