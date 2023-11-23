import {cookieExists} from "./cookie";
import {setHeaderButtons} from "./loginController";
import { addRedirectionToButtons } from "./redirect";
import {sendLoginForm} from "./requests";

const FORM = {
    // Login details
    email: $('#email'),
    password: $('#password')
}

function collectInfo() {

    // Load info fields from form
    const info = {};

    for (const key in FORM) {
        if (FORM.hasOwnProperty(key)) {
            info[key] = FORM[key].val();
        }
    } 

    return info;
}

function validateField(field, regex_expression = /^.*$/, error_message = '') {

    // Reset error message every validation
    var error_field = $(`#${field.attr('id').concat('__error')}`);
    error_field.empty();

    var fieldValue = field.val();

    let regex = regex_expression;

    var validation = regex.test(fieldValue);

    // If empty
    if (!fieldValue) {
        error_field.text('This field should not be empty');
        return false;
    }
    // If not, but not valid
    else if (!validation) {
        error_field.text(error_message); 
    }

    return validation;
}

function validateAllFields() {

    const conditions = [
        validateField(FORM.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail not valid'),
        validateField(FORM.password, /^.{8,100}$/, 'Password should be at least 8 and max. 100 characters long')
    ]

    // Validate if every validation is true
    const validation = conditions.every(condition => condition);

    return validation; 
}

async function sendLoginFormWrapper() {
    // Don't send anything if something is not valid
    if ( !validateAllFields() ) {
        return;
    }

    var packedInfo = collectInfo();

    var response = await sendLoginForm(packedInfo);
    console.log(response);
}

$(document).ready(function(){

    // Check if cookie exists (if user is logged in)
    if ( cookieExists() ) {
        redirectTo.home();
    }

    // Set header buttons
    setHeaderButtons();

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 

    // Activate login button 
    const send_login = $('#send__login');
    send_login.click(function() { sendLoginFormWrapper() });
});
