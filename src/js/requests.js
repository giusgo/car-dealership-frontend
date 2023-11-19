import axios from "axios";

export function sendRegisterForm(email, password) {
    

    axios.post('/api/user-auth/login', {
        email: email,
        password: password
    })
        .then(response => {
            // Handle the response from the API
            console.log('API Response:', response.data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error during Axios request:', error);
        }); 
}
