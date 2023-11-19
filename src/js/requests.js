
export function sendRegisterForm(email, password) {

    const base_url = '/api/user-auth/login';
    const parameters =`?email=${email}&password=${password}`
    fetch(base_url+parameters)
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad network response');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}
