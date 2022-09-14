const inputValue = (id) => {
    const input = document.getElementById(id);
    const value = input.value;
    input.value = "";
    return value;
}

const addProduct = () => {
    const product_name = inputValue("product-name");
    const product_quantity = inputValue("product-quantity");

    const number = Number(product_quantity);

    if (!isNaN(product_name) || !Number.isInteger(number) || product_name === "" || product_quantity === '') {
        alert("Vul output diso");

        return;  //ar cholbe na bki code
    }

    setDataInLS(product_name, product_quantity);

    // window.location.reload();

    display();

}

const getDataFromLS = () => {
    const data = localStorage.getItem('all_products');
    const parseData = JSON.parse(data);
    return parseData;

}

const setDataInLS = (name, quantity) => {

    // console.log(name, quantity);
    let products = getDataFromLS('all_products');


    if (!products) {
        products = {};
    }



    if (products[name]) {

        const updateValue = parseInt(products[name]) + parseInt(quantity);

        if (updateValue < 0) {
            alert("You have no enough item");
        } else {
            products[name] = updateValue;
        }

    } else {

        products[name] = quantity;

    }




    localStorage.setItem("all_products", JSON.stringify(products));

}


const display = () => {
    const products = getDataFromLS();
    // console.table(products);

    const section = document.getElementById("all-products");
    section.textContent = "";
    for (const product in products) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="shadow-sm p-3 mb-2 bg-body rounded">
            <span class="fs-1">${product}</span>
            Quantity:<small class="fw-bold">
            ${products[product] > 0 ? products[product] : "Stock out"}
            </small>
        </div> 
        `;

        section.appendChild(div);

    }
}

display();

