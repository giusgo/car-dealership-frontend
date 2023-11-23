import {addLogoutButton, setHeaderButtons} from "./loginController";
import { addRedirectionToButtons } from "./redirect";

$(document).ready(function(){

    // Add buttons depending on session status
    setHeaderButtons();

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 

    // Add logout button function
    addLogoutButton();
});
