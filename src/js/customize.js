import {cookieExists, getCookie} from "./cookie";
import {addLogoutButton, setHeaderButtons} from "./loginController";
import {addRedirectionToButtons, redirectTo} from "./redirect";
import {generateOrder, getCustomOptions} from "./requests";
import * as images from "../assets/car-imgs/*.png";
import toastr from "./toastrConfig";

function createWheelObject(rimName) {
    let randomPrice = (Math.random() * (1400 - 200) + 200).toFixed(2);

    const wheelObject = `
        <div class="wheel">
        <i class="fa-solid fa-check wheel-check"></i>
        <img src="${images[rimName]}" alt="">
        <p class="name">${rimName}</p>
        <p class="price">$${randomPrice}</p>
        </div>
        `;

    return wheelObject;
}

async function setupOptions() {

    // Get car model from address bar
    const urlParams = new URLSearchParams(new URL(window.location.href).search);
    const carModel = urlParams.get('car_model');
    
    var response = await getCustomOptions(carModel);

    // Set Preview information
    const preview_img = $('#preview-img');
    preview_img.attr("src", images[response.images.main[0].replace('.png', '')]);
    
    const car_name = $('#car__name');
    car_name.text(response.car.brandName);

    const car_price = $('#car__price');
    car_price.text('$' + response.car.priceBase);

    // Create rims
    const wheels = $('#wheels');
    const rims = response.images.rims;

    for (let rim of rims) {
        var wheelObject = createWheelObject(rim.replace('.png', ''));
        wheels.append(wheelObject);
    }

    // Setup wheel buttons
    setupWheelButtons();
}

function selectColor(clickedButton) {
    // Hide check icons from all images
    document.querySelectorAll('.color-check').forEach(icon => {
        icon.style.display = 'none';
    });

    // Show the check icon on the clicked image
    clickedButton.querySelector('.color-check').style.display = 'block';
}

function setupColorButtons() {
    document.querySelectorAll('.color').forEach(button => {
        $(button).click(function() { selectColor(button) });
    })
}

function selectWheel(clickedButton) {
    // Hide check icons from all images
    document.querySelectorAll('.wheel-check').forEach(icon => {
        icon.style.display = 'none';
    });

    // Show the check icon on the clicked image
    clickedButton.querySelector('.wheel-check').style.display = 'block';
}

function setupWheelButtons() {
    document.querySelectorAll('.wheel').forEach(button => {
        $(button).click(function() { selectWheel(button) });
    });
}

function categoriesAreChecked() {
    let wheelVisible = false;
    let colorVisible = false;

    // Check visibility for .wheel-check elements
    document.querySelectorAll('.wheel-check').forEach(element => {
        if (element.style.display == 'block') {
            wheelVisible = true;
        }
    });

    // Check visibility for .colors-check elements
    document.querySelectorAll('.color-check').forEach(element => {
        if (element.style.display == 'block') {
            colorVisible = true;
        }
    });

    // Return true if at least one element in each group is visible
    return wheelVisible && colorVisible;
}

async function buyCar() {

    if (!categoriesAreChecked()) {
        toastr.warning('Select one option per category');
        return;
    } 

    var response = await generateOrder(getCookie());

    toastr.success('Your order was placed!');

    setTimeout(redirectTo.orders, 1000);
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

    //generateOrder(getCookie());

    // Setup options of the car
    setupOptions();

    // Setup color buttons
    setupColorButtons();
    
    // Setup buy button
    const buy_button = $('#buy__button');
    buy_button.click(function(){ buyCar() });
});
