const convertButton = document.querySelector(".convert-button");
const inputValueRaiz = document.querySelector("#input-value");
const currencyFrom = document.querySelector("#currency-from");
const currencyFor = document.querySelector("#currency-for");
const currencyConverted = document.getElementById("currency-converted");
const currencyConvert = document.getElementById("currency-convert");
const currencyConvertedP = document.getElementById("currency");
const currencyConvertP = document.getElementById("currency-convert-p");
const currencyConvertedImg = document.getElementById("currency-img");
const currencyConvertImg = document.getElementById("currency-convert-img");
const API_URL = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
const taxaCambio = {}



async function getExchangeRates() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados da API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao acessar a API:", error.message);
    return null;
  }
}


async function inicializarTaxas() {
  const data = await getExchangeRates();
  if (data) {
    taxaCambio.real = { nome: "BRL", taxa: 1, simbolo: "R$", img: "./assets/real.png" };
    taxaCambio.dolar = { nome: "USD", taxa: parseFloat(data.USDBRL.high), simbolo: "$", img: "./assets/dolar.png" };
    taxaCambio.euro = { nome: "EUR", taxa: parseFloat(data.EURBRL.high), simbolo: "€", img: "./assets/euro.png" };
    taxaCambio.bitcoin = { nome: "BTC", taxa: parseFloat(data.BTCBRL.high), simbolo: "₿", img: "./assets/bitcoin.png" };

    console.log("Objeto taxaCambio inicializado:", taxaCambio);


    document.dispatchEvent(new Event("taxaCambioInicializado"));
  }
}


inicializarTaxas();

  function trocarImagem() {
    if (Object.keys(taxaCambio).length === 0) {
      console.warn("taxaCambio ainda não foi inicializado.");
      return;
    }
  
    const moedaOrigem = taxaCambio[currencyConvert.value]; 
    const moedaDestino = taxaCambio[currencyConverted.value]; 
  
    if (moedaOrigem) {
      currencyFrom.textContent = `${moedaOrigem.simbolo}: 0`;
      currencyConvertP.textContent = moedaOrigem.nome;
      currencyConvertImg.src = moedaOrigem.img;
    } else {
      console.warn(`A moeda ${currencyConvert.value} não foi encontrada em taxaCambio.`);
    }
  
    if (moedaDestino) {
      currencyFor.textContent = `${moedaDestino.simbolo}: 0`;
      currencyConvertedP.textContent = moedaDestino.nome;
      currencyConvertedImg.src = moedaDestino.img;
    } else {
      console.warn(`A moeda ${currencyConverted.value} não foi encontrada em taxaCambio.`);
    }
  }
function cliqueiBotao() {
  let inputValue = inputValueRaiz.value.replace(",", ".");
  inputValue = parseFloat(inputValue);

  if (isNaN(inputValue)) {
    alert("Por favor, insira um valor numérico válido.");
    return;
  }

  const moedaOrigem = taxaCambio[currencyConvert.value];
  const moedaDestino = taxaCambio[currencyConverted.value];

  if (!moedaOrigem || !moedaDestino) {
    alert("Moeda inválida selecionada.");
    return;
  }

  const valorEmReais = inputValue * moedaOrigem.taxa;
  const valorConvertido = valorEmReais / moedaDestino.taxa;

  currencyFrom.textContent =
    moedaOrigem.nome === "BTC"
      ? `${moedaOrigem.simbolo} ${inputValue.toFixed(6)}`
      : new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: moedaOrigem.nome,
        }).format(inputValue);

  currencyFor.textContent =
    moedaDestino.nome === "BTC"
      ? `${moedaDestino.simbolo} ${valorConvertido.toFixed(6)}`
      : new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: moedaDestino.nome,
        }).format(valorConvertido);
}

convertButton.addEventListener("click", cliqueiBotao);
document.addEventListener("taxaCambioInicializado", () => {
    currencyConverted.addEventListener("change", trocarImagem);
    currencyConvert.addEventListener("change", trocarImagem);
  });