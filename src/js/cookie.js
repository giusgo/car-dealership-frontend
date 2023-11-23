import {redirectTo} from "./redirect";

export function createCookie(userID) {
    document.cookie = 'userID' + '=' + encodeURIComponent(userID) + '; path=/';
}

export function cookieExists() {
    // Encode cookieName to escape special characters
    cookieName = encodeURIComponent('userID');

    // Get all cookies as a string and split them into an array
    var cookies = document.cookie.split(';');

    // Loop through the cookies array
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        // Check if the cookie string starts with the desired cookie name followed by "="
        // It's important to add the "=" to ensure the cookie name matches exactly
        if (cookie.startsWith(cookieName + '=')) {
            return true;
        }
    }

    // Return false if the cookie was not found
    return false;
}

export function deleteCookie() {
    document.cookie = 'userID' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    redirectTo.home();
}
