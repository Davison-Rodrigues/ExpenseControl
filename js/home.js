function logOut(){
    firebase.auth().signOut().then( ()=> {
        window.location.href = "index.html";
    }).catch(error =>{
        alert('Erro ao fazer LogOut!');
    });
}