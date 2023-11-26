import {addLogoutButton, setHeaderButtons} from "./loginController";
import {addRedirectionToButtons} from "./redirect";
import {getCatalogue} from "./requests";

async function generateCatalogue() {

    var response = await getCatalogue();
    console.log(response);



}

$(document).ready(function(){

    // Set header buttons
    setHeaderButtons();

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 

    // Add logout button function
    addLogoutButton();

    // Generate catalogue
    generateCatalogue();
});
