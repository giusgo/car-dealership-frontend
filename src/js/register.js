import { addRedirectionToButtons } from "./redirect";
import { sendRegisterForm } from "./requests";

$(document).ready(function(){

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 

    // Register fields
    

    // Register button
    const send_register = $('#send__register');
    send_register.click(function(){ sendRegisterForm('bddgd@gkldsfmafaiafl.com', 'jsdasasdadasdad') });

});
