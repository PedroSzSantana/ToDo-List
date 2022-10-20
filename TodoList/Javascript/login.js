const formulario = document.querySelector('form');

let login_email = 'admim';
let login_senha = '123';

formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    validacao();
    formulario.reset();
});
function validacao(){
    let email = formulario.querySelector('#email').value;
    let senha = formulario.querySelector('#senha').value;
    if(senha === login_senha && email === login_email){
        alert('Login realizado com sucesso')

        sessionStorage.setItem('Logado',true);
        window.location = 'index.html'
    }else{alert('Email ou senha incorreto!'); sessionStorage.setItem('Logado',false)} 
}
