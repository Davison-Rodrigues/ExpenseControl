function logOut(){
    firebase.auth().signOut().then( ()=> {
        window.location.href = "index.html";
    }).catch(error =>{
        alert('Erro ao fazer LogOut!');
    });
}

findTransactions();

function findTransactions(){
    setTimeout(() => {
        addTransactionsToScreen(fakeTransactions);
    }, 1000)
}

function addTransactionsToScreen(transactions){
    const listaOrd = document.getElementById("transactions");

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        listaOrd.appendChild(li);

        const date = document.createElement('p');
        date.innerHTML = formatarData(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatarMoney(transaction.money);
        li.appendChild(money)

        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        if (transaction.description){const description = document.createElement('p');
        description.innerHTML = transaction.description;
        li.appendChild(description);}

    }); 
}

function formatarData(date){
    return new Date(date).toLocaleDateString('pt-br');
}

function formatarMoney(money){
    return `${money.currency} ${money.value.toFixed(2)}`
}

const fakeTransactions = [
    {
        type: 'expense',
        date: '2025-06-29',
        money: {
            currency: 'R$',
            value: 10
        },
        transactionType: 'Transporte',
        description: 'Ida e Volta'
    },
    {
        type: 'income',
        date: '2022-02-03',
        money: {
            currency: 'R$',
            value: 90
        },
        transactionType: 'Pix'
    },
    {
        type: 'expense',
        date: '2021-12-05',
        money: {
            currency: 'R$',
            value: 40
        },
        transactionType: 'Mecânica',
        description: 'Empresa A'
    },
    {
        type: 'expense',
        date: '2021-04-02',
        money: {
            currency: 'R$',
            value: 10
        },
        transactionType: 'Padária',
        description: 'Empresa B'
    }
];