import { cookieExists, deleteCookie } from "./cookie";

export function addLogoutButton() {
    // Logout button
    const logout_button = $('#logout__button');

    // Add function to clear cookie and redirect to home page
    logout_button.click(function(){ deleteCookie() });
}

export function setHeaderButtons() {

    // Header button groups 
    const loggedout_buttons = $('#loggedout__buttons'),
        loggedin_buttons = $('#loggedin__buttons');

    // Show buttons depending on session status
    if ( cookieExists() ) {
        loggedin_buttons.addClass('active');
        return;
    }

    loggedout_buttons.addClass('active');

}
