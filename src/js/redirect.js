export const redirectTo = {
    home: function(){ window.location.href = '/' },
    register: function(){ window.location.href = '/register' },
    login: function(){ window.location.href = '/login' },
    profile: function(){ window.location.href = '/profile' }
}

export function addRedirectionToButtons() {
    // Each button from each group
    const register_button = $('#register__button'),
        login_button = $('#login__button'),
        profile_button = $('#profile__button');

    // Add redirect function
    register_button.click(redirectTo.register);
    login_button.click(redirectTo.login);
    profile_button.click(redirectTo.profile);
}
