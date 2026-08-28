const form = {
    date: () => document.getElementById('date'),
    dateRequired: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequired: () => document.getElementById('value-required-error'),
    transactionType: () => document.getElementById('transactionType'),
    transactionTRequired: () => document.getElementById('transactionType-required-error'),
    saveButton: () => document.getElementById('saveButton')
}


function logOut(){
    firebase.auth().signOut().then( ()=> {
        window.location.href = "../Pags/index.html";
    }).catch(error =>{
        alert('Erro ao fazer LogOut!');
    });
} 

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user);
    }
});


function onChangeDate(){
    const date = form.date().value;
    form.dateRequired().style.display = !date ? "block" : "none";

    toggleSaveButtonDisabled()
}

function onChangeValue(){
    const value = Number(form.value().value)
    form.valueRequired().style.display = value <= 0 || !value ? "block" : "none";

    toggleSaveButtonDisabled()
}

function onChangeTransactionType(){
    const transactionType = form.transactionType().value;
    form.transactionTRequired().style.display = !transactionType ? "block" : "none";

    toggleSaveButtonDisabled()
}

function toggleSaveButtonDisabled(){
    form.saveButton().disabled = !isFormValid();
}


function isFormValid(){
    const date = form.date().value;
    if (!date){
        return false;
    }
    const value = form.value().value;
    if(!value || value <= 0){
        return false;
    }
    const transactionType = form.transactionType().value;
    if (!transactionType) {
        return false;
    }
    return true;
}   