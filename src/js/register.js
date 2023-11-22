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

function setupFields() {

    // For phone number field
    FORM.cellphone.on('keypress', function(e) {
        // Allow only numbers
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }

        // Get the current value of the input
        let inputValue = $(this).val();

        // If the maximum length is reached, prevent further input
        if (inputValue.length >= 12) {
            e.preventDefault();
        }

        // Format the input value
        if (inputValue.length === 3 || inputValue.length === 7) {
            inputValue += ' ';
        }

        // Update the input field with the formatted value
        $(this).val(inputValue);

    });

    // For card number field
    FORM.cardNumber.on('keypress', function(e) {
        // Allow only numbers
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }

        // Get the current value of the input
        let inputValue = $(this).val();

        // If the maximum length is reached, prevent further input
        if (inputValue.length >= 19) {
            e.preventDefault();
        }

        // Format the input value
        if (inputValue.length === 4 || inputValue.length === 9 || inputValue.length === 14 ) {
            inputValue += ' ';
        }

        // Update the input field with the formatted value
        $(this).val(inputValue);
    });

    // For card type
    const options = ['Visa', 'Mastercard', 'American Express'];

    for (let i = 0; i < options.length; i++) {
        var option = $('<option>', {
            value: options[i],
            text: options[i]
        });
        FORM.cardType.append(option);
    }

    // For expiration month
    for (let i = 1; i <= 12; i++) {
        var option = $('<option>', {
            value: i,
            text: i
        });
        FORM.expirationMonth.append(option); 
    }

    // For expiration month
    var currentYear = new Date().getFullYear();
    for (let i = 1; i <= 8; i++) {
        var option = $('<option>', {
            value: i + currentYear,
            text: i + currentYear
        });
        FORM.expirationYear.append(option); 
    }

}

function validateField(field, regex_expression = /^.*$/, error_message = '') {

    // Reset error message every validation
    var error_field = $(`#${field.attr('id').concat('__error')}`);
    error_field.empty();

    var fieldValue = field.val();

    // Strip blank spaces from string if it is phone number or credit card
    if (field == FORM.cellphone || field == FORM.cardNumber) {
        fieldValue = fieldValue.replace(/\s/g, '');
    }

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
        validateField(FORM.name, /^[A-Za-z]+$/, 'First name should only contain letters'),
        validateField(FORM.lastName, /^[A-Za-z]+$/, 'Last name should only contain letters'),
        validateField(FORM.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail not valid'),
        validateField(FORM.password, /^.{8,100}$/, 'Password should be at least 8 and max. 100 characters long'),
        validateField(FORM.cellphone, /^\d{10}$/, 'Phone number should be 10 digits long'),
        validateField(FORM.cardType),
        validateField(FORM.expirationMonth),
        validateField(FORM.expirationYear),
        validateField(FORM.cardNumber, /^\d{16}$/, 'Card number not valid')
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

    // Setup all fields to work properly
    setupFields();

    // Activate register button 
    const send_register = $('#send__register');
    send_register.click(function() { sendRegisterFormWrapper() });

});
