import {cookieExists, getCookie} from "./cookie";
import {addLogoutButton, setHeaderButtons} from "./loginController";
import { addRedirectionToButtons, redirectTo } from "./redirect";
import {getSalesOrderHeaders, getSalesOrderDetails} from "./requests";

function createOrderObject(number, id, date, total, products) {

    const orderObject = `
        <div class="order">
        <div class="order__header">
        <div class="order__number">
        <i class="fa-solid fa-tag"></i>
        <p class="tag">Order #${number}</p>
        </div>
        <p class="tag"><span>Order ID: </span>${id}</p>
        <p class="tag"><span>Date: </span>${date}</p>
        <p class="tag"><span>Total: </span> <span class="money">$${total}</span></p>
        </div>

        <p class="products">Products:</p>

        <div class="order__details">
        ${products}
        </div> 

        </div>

        `;

    return orderObject;
}

function createOrderDetailObject(id, unitPrice, quantity, lineTotal) {

    const orderDetailObject = `
        <div class="order__detail">
        <p class="tag"><span>Product ID: </span>${id}</p>
        <p class="tag"><span>Unit price: </span>$${unitPrice}</p>
        <p class="tag"><span>Quantity: </span>${quantity}</p>
        <p class="tag"><span>Line total: </span>$${lineTotal}</p>
        </div>
        `;

    return orderDetailObject;
}

async function getSalesOrdersWrapper() {

    const orderList = $('#orders__list');

    var salesOrderHeader = await getSalesOrderHeaders( getCookie() );

    for (let orderHeader of salesOrderHeader) {

        var salesOrderDetail = await getSalesOrderDetails( orderHeader.salesOrderID );

        let products = '';

        for (let orderDetail of salesOrderDetail) {
            const detailObject = createOrderDetailObject(orderDetail.salesOrderDetailID,
                                                        orderDetail.unitPrice,
                                                        orderDetail.quantity,
                                                        orderDetail.lineTotal);

            products += detailObject;
        }

        const orderObject = createOrderObject(orderHeader.salesOrderNumber,
                                            orderHeader.salesOrderID,
                                            orderHeader.orderDate.substring(0, 10),
                                            orderHeader.total,
                                            products);

        orderList.append(orderObject);
    } 

}

$(document).ready(function(){

    // Check if cookie not exists (if user is logged out)
    if ( !cookieExists() ) {
        redirectTo.home();
    }

    // Add buttons depending on session status
    setHeaderButtons();

    // Add redirection to buttons on the page
    addRedirectionToButtons(); 

    // Add logout button function
    addLogoutButton();

    // Get orders from the user
    getSalesOrdersWrapper();
});
