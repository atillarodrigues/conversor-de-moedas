const convertButton = document.querySelector(".convert-button");
const inputValueRaiz = document.querySelector("#input-value");
const currencyFrom = document.querySelector("#currency-from");
const currencyFor = document.querySelector("#currency-for");
const currencyConverted =  document.getElementById('currency-converted');
const currencyConvert = document.getElementById('currency-convert');
const currencyConvertedP =  document.getElementById('currency');
const currencyConvertP =  document.getElementById('currency-convert-p');
const currencyConvertedImg = document.getElementById('currency-img');
const currencyConvertImg = document.getElementById('currency-convert-img');

const taxaCambio = {
    real: {nome:'BRL', taxa:1},
    dolar: {nome:'USD', taxa:5.78},
    euro: {nome:'EUR', taxa:6.10},
    libra: {nome:'GBP', taxa:7.18},
};


function trocarImgConvert() {
    const moedaOrigem = taxaCambio[currencyConvert.value]
    if (moedaOrigem.nome === 'BRL') {
        currencyFrom.textContent = 'R$: 0  ';
        currencyConvertP.textContent = 'Real';
        currencyConvertImg.src = "./assets/real.png";
        
    }
    if (moedaOrigem.nome === 'USD') {
        currencyFrom.textContent = '$: 0 ' ;
        currencyConvertP.textContent = 'Dolar';
        currencyConvertImg.src = "./assets/dolar.png";
        
    }
    if (moedaOrigem.nome === 'EUR') {
        currencyFrom.textContent = '€: 0 ' ;
        currencyConvertP.textContent = 'Euro';
        currencyConvertImg.src = "./assets/euro.png";
        
    }
    if (moedaOrigem.nome === 'GBP') {
        currencyFrom.textContent = '£: 0'  ;
        currencyConvertP.textContent = 'Libra';
        currencyConvertImg.src = "./assets/libra.png";
        
    }
}

function trocarImgConverted() {
    const moedaOrigem = taxaCambio[currencyConverted.value]
    if (moedaOrigem.nome === 'BRL') {
        currencyFor.textContent = 'R$: 0 ' ;
        currencyConvertedP.textContent = 'Real';
        currencyConvertedImg.src = "./assets/real.png";
        
    }
    if (moedaOrigem.nome === 'USD') {
        currencyFor.textContent = '$: 0'  ;
        currencyConvertedP.textContent = 'Dolar';
        currencyConvertedImg.src = "./assets/dolar.png";
        
    }
    if (moedaOrigem.nome === 'EUR') {
        currencyFor.textContent = '€: 0 ' ;
        currencyConvertedP.textContent = 'Euro';
        currencyConvertedImg.src ="./assets/euro.png";
        
    }
    if (moedaOrigem.nome === 'GBP') {
        currencyFor.textContent = '£: 0 ' ;
        currencyConvertedP.textContent = 'Libra';
        currencyConvertedImg.src = "./assets/libra.png";
        
    }
}



function changeValues() {
    let inputValue = inputValueRaiz.value.replace(',', '.');

    inputValue = parseFloat(inputValue);

    if (isNaN(inputValue)) {
        alert("Por favor, insira um valor numérico válido.");
        return;
    }

}

function cliqueiBotao() {

    let inputValue = inputValueRaiz.value.replace(',', '.');

    inputValue = parseFloat(inputValue);

    if (isNaN(inputValue)) {
        alert("Por favor, insira um valor numérico válido.");
        return;
    }

    const moedaOrigem = taxaCambio[currencyConvert.value]
    const moedaDestino = taxaCambio[currencyConverted.value]

    if (!moedaOrigem || !moedaDestino) {
        alert("Moeda inválida selecionada.");
        return;
    }

    const valorEmReais = inputValue * moedaOrigem.taxa;

    const valorConvertido = valorEmReais / moedaDestino.taxa;

    currencyFrom.textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: moedaOrigem.nome
    }).format(inputValue)

    currencyFor.textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: moedaDestino.nome
    }).format(valorConvertido)

}




convertButton.addEventListener("click", cliqueiBotao);

currencyConverted.addEventListener('change', trocarImgConverted);

currencyConvert.addEventListener('change', trocarImgConvert);
