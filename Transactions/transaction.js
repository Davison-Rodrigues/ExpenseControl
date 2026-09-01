const form = {
    date: () => document.getElementById('date'),
    dateRequired: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequired: () => document.getElementById('value-required-error'),
    transactionType: () => document.getElementById('transactionType'),
    transactionTRequired: () => document.getElementById('transactionType-required-error'),
    saveButton: () => document.getElementById('saveButton'),
    typeExpense: () => document.getElementById('expense'),
    currency: () => document.getElementById('currency'),
    description: () => document.getElementById('description'),
    typeIncome: () => document.getElementById('income')
}


function logOut() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../Pags/index.html";
    }).catch(error => {
        alert('Erro ao fazer LogOut!');
    });
}

if (!isNewTransaction()) {
    const uid = getTransactionUid();
    findTransactionsByUid(uid);
}

function getTransactionUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewTransaction() {
    return getTransactionUid() ? false : true;
}

function findTransactionsByUid(uid) {
    showLoading();
    firebase.firestore().collection("transactions").doc(uid).get().then(doc => {
        hideLoading();
        if (doc.exists) {
            fillTransactionsScreen(doc.data());
            toggleSaveButtonDisabled();
        } else {
            alert("Não encontrado");
            window.location.href = "../Pags/home.html";
        }
    }).catch(() => {
        hideLoading();
        alert("Erro ao recuperar documento!");
        window.location.href = "../Pags/home.html";
    })
}

function fillTransactionsScreen(transaction) {

    if (transaction.type == "expense") {
        form.typeExpense().checked = true;
    } else {
        form.typeIncome().checked = true
    }
    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transactionType().value = transaction.transactionType;
    if (transaction.description) {
        form.description().value = transaction.description;
    }
}


function save(transaction) {
    showLoading();
    firebase.firestore()
    .collection('transactions')
    .add(transaction).then(() => {
        hideLoading();
        alert("Transação adicionada com sucesso!");
        window.location.href = "../Pags/home.html";
    }).catch(() => {
        hideLoading();
        alert("Erro ao adicionar transação")
    });
}


function saveTransaction() {
    showLoading();
    const transaction = createTransaction();
    if (isNewTransaction()){
        save(transaction);
    } else{
        update(transaction);
    }
}


function update(transaction){
    showLoading();
    firebase.firestore().collection('transactions').doc(getTransactionUid()).update(transaction).then(() => {
        hideLoading();
        window.location.href = "../Pags/home.html";
    }).catch(() => {
        hideLoading();
        alert("Erro ao atualizar trasação!");
    });
}

function createTransaction() {
    return {
        type: form.typeExpense().checked ? "expense" : "income",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

function onChangeDate() {
    const date = form.date().value;
    form.dateRequired().style.display = !date ? "block" : "none";

    toggleSaveButtonDisabled()
}

function onChangeValue() {
    const value = Number(form.value().value)
    form.valueRequired().style.display = value <= 0 || !value ? "block" : "none";

    toggleSaveButtonDisabled()
}

function onChangeTransactionType() {
    const transactionType = form.transactionType().value;
    form.transactionTRequired().style.display = !transactionType ? "block" : "none";

    toggleSaveButtonDisabled()
}

function toggleSaveButtonDisabled() {
    form.saveButton().disabled = !isFormValid();
}


function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false;
    }
    const value = form.value().value;
    if (!value || value <= 0) {
        return false;
    }
    const transactionType = form.transactionType().value;
    if (!transactionType) {
        return false;
    }
    return true;
}


function cancelar() {
    window.location.href = "../Pags/home.html";
}