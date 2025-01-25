const numberSheet = document.querySelector("#numbersSheet");
const mainContainer = document.querySelector(".container-bingo");
const bingoButton = document.querySelector("#bingo");
const clearButton = document.querySelector("#reset");

// Preencher a tabela bingo com os 75 números
const createTabel = (numberSheet) => {
    numberSheet.innerHTML = "";

    for (let i = 1; i <= 75; i++) {
        const cell = document.createElement("button");
        cell.className = `number`;
        cell.id = `${i}`;
        cell.textContent = i;

        numberSheet.appendChild(cell);
    }
}

createTabel(numberSheet);
const chosenNumbers = [];

// Atualizar último número
const lastNumberUpdate = (number) => {
    const lastNumber = document.querySelector(".last-number");

    if (number > 0 && number <= 15) {
        lastNumber.innerText = "B" + number.toString().padStart(2, '0');
    } else if (number <= 30) {
        lastNumber.innerText = "I" + number;
    } else if (number <= 45) {
        lastNumber.innerText = "N" + number;
    } else if (number <= 60) {
        lastNumber.innerText = "G" + number;
    } else {
        lastNumber.innerText = "O" + number;
    }
}

// Seleção de número
const choseNumber = (number, chosenNumbers) => {
    number.classList.add("chosen");
    chosenNumbers.push(number.id);
    lastNumberUpdate(number.id);
}

// Remoção de número
const removeNumber = (number, chosenNumbers) => {
    // Gerar alerta
    const alert = `<div class="alert">
        <p> Deseja remover o número ${number.id}?</p>
        <div class="container-options">
            <button class="option back"> Voltar </button>
            <button class="option remove"> Remover </button>
        </div>
    </div>`;

    const parser = new DOMParser();

    const htmlTemplate = parser.parseFromString(alert, "text/html");

    const alertBox = htmlTemplate.querySelector(".alert");

    mainContainer.appendChild(alertBox);

    const backOption = document.querySelector(".back");
    const removeOption = document.querySelector(".remove");

    backOption.addEventListener('click', (e) => {
        e.preventDefault();
        alertBox.remove();
    })

    removeOption.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Removeu", number.id);
        number.classList.remove("chosen");
        if (number.id == chosenNumbers[chosenNumbers.length - 1]) {
            if (chosenNumbers[chosenNumbers.length - 2]) {
                lastNumberUpdate(chosenNumbers[chosenNumbers.length - 2]);
            } else {
                const lastNumber = document.querySelector(".last-number");
                lastNumber.innerText = "";
            }
            chosenNumbers.pop();
        } else {
            chosenNumbers.splice(chosenNumbers.indexOf(number.id), 1);
        }

        alertBox.remove();
    })
    return;
}

// Comemoração
const celebrate = () => {
    const celebrationImage = document.createElement("img");
    celebrationImage.classList.add("celebration");
    celebrationImage.src = "img/Bingo.webp";
    celebrationImage.alt = "Imagem gerada por IA comemorativa de bingo";

    mainContainer.appendChild(celebrationImage);

    celebrationImage.addEventListener('click', (e) => {
        e.preventDefault();
        celebrationImage.remove();
    })
};

const clear = () => {
    // Gerar alerta
    const alert = `<div class="alert">
    <p> Deseja remover TODOS OS NÚMEROS?</p>
    <div class="container-options">
        <button class="option back"> Voltar </button>
        <button class="option remove"> Remover </button>
    </div>
    </div>`;

    const parser = new DOMParser();

    const htmlTemplate = parser.parseFromString(alert, "text/html");

    const alertBox = htmlTemplate.querySelector(".alert");

    mainContainer.appendChild(alertBox);

    const backOption = document.querySelector(".back");
    const removeOption = document.querySelector(".remove");

    backOption.addEventListener('click', (e) => {
        e.preventDefault();
        alertBox.remove();
    })

    removeOption.addEventListener('click', () => {
        location.reload();
    })
};

// Event listener do click nos números
const numbers = document.querySelectorAll(".number");

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        e.preventDefault();
        if (number.classList.contains("chosen")) {
            console.log(number.id, " escolhido");
            removeNumber(number, chosenNumbers);
        } else {
            choseNumber(number, chosenNumbers);
        }
    })
})

// Event listener dos botões 
bingoButton.addEventListener('click', (e) => {
    e.preventDefault();
    celebrate();
})
clearButton.addEventListener('click', (e, chosenNumbers) => {
    e.preventDefault();
    clear(chosenNumbers);
})