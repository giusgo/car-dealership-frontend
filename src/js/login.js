import {cookieExists} from "./cookie";
import {setHeaderButtons} from "./loginController";
import { addRedirectionToButtons } from "./redirect";

$(document).ready(function(){

    // Check if cookie exists (if user is logged in)
    if ( cookieExists() ) {
        redirectTo.home();
    }

    // Set header buttons
    setHeaderButtons();

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 
});
