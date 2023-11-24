import {cookieExists, getCookie} from "./cookie";
import {addLogoutButton, setHeaderButtons} from "./loginController";
import {addRedirectionToButtons, redirectTo} from "./redirect";
import {getPersonInfo, sendUpdatePayment, sendUpdatePerson} from "./requests";
import toastr from "./toastrConfig";

const FORM = {

    // Person details
    PERSON: {
        name: $('#first__name'),
        lastName: $('#last__name'),
        email: $('#email'),
        password: $('#password'),
        cellphone: $('#phone')
    },
    // Payment info
    PAYMENT: {
        cardType: $('#card__type'),
        cardNumber: $('#card__number'),
        expirationMonth: $('#expiration__month'),
        expirationYear: $('#expiration__year')

    }

}

const collectInfoFrom ={
    PERSON: function() {
        const info = {};

        // Add userID
        info.personID = getCookie();

        for (const key in FORM.PERSON) {
            if (FORM.PERSON.hasOwnProperty(key)) {
                info[key] = FORM.PERSON[key].val();
            }
        } 

        // Strip blank spaces from string
        info.cellphone = info.cellphone.replace(/\s/g, '');

        return info;
    },
    PAYMENT: function() {
        const info = {};

        // Add userID
        info.personID = getCookie();

        for (const key in FORM.PAYMENT) {
            if (FORM.PAYMENT.hasOwnProperty(key)) {
                info[key] = FORM.PAYMENT[key].val();
            }
        } 

        // Strip blank spaces from string
        info.cardNumber = info.cardNumber.replace(/\s/g, '');

        // Fix types
        info.expirationYear = parseInt(info.expirationYear);
        info.expirationMonth = parseInt(info.expirationMonth);

        return info;

    }
}

async function setCurrentData() {

    // Get cookie for current session
    var userID = getCookie();
    
    // Get current data of the person
    var response = await getPersonInfo(userID);

    // Change name displayed on profile card
    const name_on_card = $('#person-name');
    name_on_card.text(`${response.name} ${response.lastName}`);

    // Fill form placeholders
    FORM.PERSON.name.attr('placeholder', response.name);
    FORM.PERSON.lastName.attr('placeholder', response.lastName);
    FORM.PERSON.email.attr('placeholder', response.email);

    var cellphone = response.cellphone,
        formatted_cellphone = cellphone.slice(0, 3) + " " + cellphone.slice(3, 6) + " " + cellphone.slice(6);
    FORM.PERSON.cellphone.attr('placeholder', formatted_cellphone);

}

function setupFields() {

    // For phone number field
    FORM.PERSON.cellphone.on('keypress', function(e) {
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
    FORM.PAYMENT.cardNumber.on('keypress', function(e) {
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
        FORM.PAYMENT.cardType.append(option);
    }

    // For expiration month
    for (let i = 1; i <= 12; i++) {
        var option = $('<option>', {
            value: i,
            text: i
        });
        FORM.PAYMENT.expirationMonth.append(option); 
    }

    // For expiration month
    var currentYear = new Date().getFullYear();
    for (let i = 1; i <= 8; i++) {
        var option = $('<option>', {
            value: i + currentYear,
            text: i + currentYear
        });
        FORM.PAYMENT.expirationYear.append(option); 
    }

}

function validateField(field, regex_expression = /^.*$/, error_message = '') {

    // Reset error message every validation
    var error_field = $(`#${field.attr('id').concat('__error')}`);
    error_field.empty();

    var fieldValue = field.val();

    // Strip blank spaces from string if it is phone number or credit card
    if (field == FORM.PERSON.cellphone || field == FORM.PAYMENT.cardNumber) {
        fieldValue = fieldValue.replace(/\s/g, '');
    }

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

const validateAllFieldsOf = {
    PERSON: function() {
        const conditions = [
            validateField(FORM.PERSON.name, /^[A-Za-z]+$/, 'First name should only contain letters'),
            validateField(FORM.PERSON.lastName, /^[A-Za-z]+$/, 'Last name should only contain letters'),
            validateField(FORM.PERSON.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail not valid'),
            validateField(FORM.PERSON.password, /^.{8,100}$/, 'Password should be at least 8 and max. 100 characters long'),
            validateField(FORM.PERSON.cellphone, /^\d{10}$/, 'Phone number should be 10 digits long')
        ]

        // Validate if every validation is true
        const validation = conditions.every(condition => condition);

        return validation; 
    },

    PAYMENT: function() {
        const conditions = [
            validateField(FORM.PAYMENT.cardType),
            validateField(FORM.PAYMENT.expirationMonth),
            validateField(FORM.PAYMENT.expirationYear),
            validateField(FORM.PAYMENT.cardNumber, /^\d{16}$/, 'Card number not valid')
        ]
        
        // Validate if every validation is true
        const validation = conditions.every(condition => condition);

        return validation;
    }
}

async function updatePersonFormWrapper() {
    
    // Don't send anything if something is not valid
    if ( !validateAllFieldsOf.PERSON() ) {
        return;
    }

    var packedInfo = collectInfoFrom.PERSON();

    var response = await sendUpdatePerson(packedInfo);

    // If update was not valid
    if (response.status != 200) {
        toastr.warning(response.message);
        return;
    }

    // If register was a success
    toastr.success(response.message);

    // Reload page
    setTimeout(redirectTo.profile, 1000);

}

async function updatePaymentFormWrapper() {
    
    // Don't send anything if something is not valid
    if ( !validateAllFieldsOf.PAYMENT() ) {
        return;
    }

    var packedInfo = collectInfoFrom.PAYMENT();

    var response = await sendUpdatePayment(packedInfo);

    // If update was not valid
    if (response.status != 200) {
        toastr.warning(response.message);
        return;
    }

    // If register was a success
    toastr.success(response.message);

    // Reload page
    setTimeout(redirectTo.profile, 1000);

}

$(document).ready(function(){

    // Check if cookie exists (if user is logged in)
    if ( !cookieExists() ) {
        redirectTo.home();
    }

    // Set header buttons
    setHeaderButtons();
    // Add redirection to buttons on the page
    addRedirectionToButtons();
    // Add logout button function
    addLogoutButton();

    // Setup all fields to work properly
    setupFields();

    // Set current data as placeholders in the fields
    setCurrentData();

    // Activate both update buttons
    const update_person_button = $('#send__person__details'),
        update_payment_button = $('#send__payment__details');

    update_person_button.click(function() { updatePersonFormWrapper() });
    update_payment_button.click(function() { updatePaymentFormWrapper() });


});
