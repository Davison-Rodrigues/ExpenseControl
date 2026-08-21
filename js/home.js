function logOut(){
    firebase.auth().signOut().then( ()=> {
        window.location.href = "index.html";
    }).catch(error =>{
        alert('Erro ao fazer LogOut!');
    });
}

findTransactions();

function findTransactions(){
    firebase.firestore().collection('transactions').get().then(snapshot =>{
        const transactions = snapshot.docs.map(doc => doc.data());
        addTransactionsToScreen(transactions)
    })
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