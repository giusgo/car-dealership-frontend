import { addRedirectionToButtons } from "./redirect";
import { sendRegisterForm } from "./requests";

const FORM = {
    // Person details
    name: $('#first__name'),
    lastName: $('#last__name'),
    email: $('#email'),
    password: $('#password'),
    cellphone: $('#phone'),

    // Payment info
    cardType: $('#card__type'),
    cardNumber: $('#card__number'),
    expirationMonth: $('#expiration__month'),
    expirationYear: $('#expiration__year')
}

function collectInfo() {
    
    // Load info fields from form
    const info = {};

    for (const key in FORM) {
        if (FORM.hasOwnProperty(key)) {
            info[key] = FORM[key].val();
        }
    } 

    return JSON.stringify(info);
}

function validateField(field, regex_expression, error_message) {

    // Reset error message every validation
    var error_field = $(`#${field.attr('id').concat('__error')}`);
    error_field.empty();

    var fieldValue = field.val();
    let regex = regex_expression;

    var validation = regex.test(fieldValue);

    // If empty
    if (!fieldValue) {
        error_field.text('This field should not be empty');
    }
    // If not, but not valid
    else if (!validation) {
        error_field.text(error_message); 
    }

    return validation;
}

function validateAllFields() {
    
    const conditions = [
        validateField(FORM.name, /^[A-Za-z]+$/, 'First name should only contain letters')
    ]

    // Validate if every validation is true
    const validation = conditions.every(condition => condition);

    return validation; 
}

async function sendRegisterFormWrapper() {

    // Don't send anything if something is not valid
    if ( !validateAllFields() ) {
        return;
    }

    //var packedInfo = collectInfo();
    //const data = await sendRegisterForm(packedInfo);

}

$(document).ready(function(){

    // Add redirection to buttons on the page
    addRedirectionToButtons();

    // Activate register button 
    const send_register = $('#send__register');
    send_register.click(function() { sendRegisterFormWrapper() });

});
