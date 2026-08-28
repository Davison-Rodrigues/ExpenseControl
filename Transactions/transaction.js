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