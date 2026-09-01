function logOut(){
    firebase.auth().signOut().then( ()=> {
        window.location.href = "index.html";
    }).catch(error =>{
        alert('Erro ao fazer LogOut!');
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user);
    }
});

function findTransactions(user){
    showLoading();
    firebase.firestore()
    .collection('transactions')
    .where('user.uid', '==', user.uid)
    .orderBy('date', 'desc')
    .get()
    .then(snapshot =>{
        hideLoading();
        const transactions = snapshot.docs.map(doc => ({...doc.data(), uid: doc.id}));
        addTransactionsToScreen(transactions)
    }).catch(error => {
        hideLoading();
        console.log(error.code);
        console.log(error.message)
        alert("Erro ao recuperar transações!!");
    })
}

function addTransactionsToScreen(transactions){
    const listaOrd = document.getElementById("transactions");

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.addEventListener("click", () =>{
            window.location.href = "../Transactions/transaction.html?uid="+ transaction.uid;
        });

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
        
        listaOrd.appendChild(li);
    }); 
}

function formatarData(date){
    return new Date(date).toLocaleDateString('pt-br');
}

function formatarMoney(money){
    return `${money.currency} ${money.value.toFixed(2)}`
}


function newTransaction(){
    window.location.href = "../Transactions/transaction.html";
}