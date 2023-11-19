function redirectToRegisterPage() {
    window.location.href = '/register';
}

$(document).ready(function(){

    // Header button groups 
    const loggedout_buttons = $('#loggedout__buttons'),
          loggedin_buttons = $('#loggedin__buttons');

    // Each button from each group
    const register_button = $('#register__button'),
          login_button = $('#login_button'),
          profile_button = $('#profile__button'),
          logout_button = $('#logout__button');

    // Add redirect function
    register_button.click(function(){ redirectToRegisterPage() });
});
