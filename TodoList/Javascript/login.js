const formulario = document.querySelector('form');

let user_valido = 'adm';
let senha_valida = '123';

formulario.addEventListener('submit', (evento)=>{
    let User = formulario.querySelector('#user').value
    let Senha = formulario.querySelector('#senha').value
    evento.preventDefault();
    if(VerificaCampo(User,Senha)){
        ValidaCampos(User, Senha);
    }
    formulario.reset();
});
const ValidaCampos = (User, Senha)=>{

    if(User === user_valido && Senha === senha_valida){
        alert('Login realizado com sucesso!')
        sessionStorage.setItem('Logado', true);
        window.location ='index.html'
    }else{
        alert('Usuário ou Senha invalido!');
        sessionStorage.setItem('Logado', false);
    }
}
const VerificaCampo = (User,Senha) =>{
    if(User == '' && Senha == ''){
        alert('Por Favor preencha os campos!');
        return false
    }else{
        if(User == ''){
            alert('Preencha o campo do Usuário');
            return false;
            }else{
                if(Senha == ''){
                    alert('Preencha o campo Senha');
                    return false;
                }
                else return true
            }
    }
}