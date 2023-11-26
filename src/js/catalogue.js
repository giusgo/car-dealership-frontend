import {addLogoutButton, setHeaderButtons} from "./loginController";
import {addRedirectionToButtons, redirectTo} from "./redirect";
import {getCatalogue} from "./requests";
import * as car_images from "../assets/car-imgs/*.png";
import {cookieExists} from "./cookie";

function createItem(imageName, name, price) {

    let itemObject = `
        <div class="item">

        <div class="img">
        <img src="${car_images[imageName.replace(".png", "")]}" alt="">
        </div>
        <div class="name">
        <p>${name}</p>
        </div>
        <div class="price">
        <p>$${price}</p>
        </div>

        </div>
        `;

    return itemObject;

}

function customizeCar(car_model) {
    
    // Login if not logged in
    if (!cookieExists()) {
        window.location.href = `/login?car_model=${car_model}`;
        return;
    }

    // If logged in
    window.location.href = `/customize?car_model=${car_model}`;

}

async function generateCatalogue() {

    const catalogueList = $('#catalogue-list');

    var catalogue = await getCatalogue();
    console.log(catalogue);

    for (let i = 0; i <= 4; i++) {

        for (let object of catalogue) {
            let item = createItem(object.carImage, object.brandName, object.priceBase);
            catalogueList.append(item);

            // Add redirect function
            $('.item').last().click(function() {
                customizeCar(object.model);
            });
        }
    }

}

$(document).ready(function(){

    // Set header buttons
    setHeaderButtons();

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 

    // Add logout button function
    addLogoutButton();

    // Generate catalogue
    generateCatalogue();
});
