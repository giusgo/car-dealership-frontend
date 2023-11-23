export function createCookie(userID) {
    document.cookie = 'userID' + '=' + encodeURIComponent(userID) + '; path=/';
}

export function checkCookie() {

}
