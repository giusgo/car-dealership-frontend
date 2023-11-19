import { addRedirectionToButtons } from "./redirect";

$(document).ready(function(){

    // Header button groups 
    const loggedout_buttons = $('#loggedout__buttons'),
        loggedin_buttons = $('#loggedin__buttons');

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 
});
