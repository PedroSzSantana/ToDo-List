const ListaTarefas = ObtemListaTarefaStorega();
const formulario = document.querySelector('form');
const Lista = document.querySelector('#lista_tarefas');
let Dados

let logado = sessionStorage.getItem('Logado');
let login = JSON.parse(logado);
if(login !== true){
    window.location = 'login.html'
}
formulario.addEventListener('submit', (evento) =>{
    evento.preventDefault();

    let Tarefa = formulario.querySelector('#tarefa').value;
    
    if(verifcar(Tarefa)){
        GravarTarefa(Tarefa);
        Criartarefa(Dados.Tarefa, Dados.id); 
    }
    formulario.reset();
});
// Funçãa para gravar a Tarefa
function GravarTarefa(Tarefa){
    let Status = 'uncompleted';
    Dados = {id:ListaTarefas.length + 1, Tarefa:Tarefa, 'Status':Status};
    ListaTarefas.push(Dados);
    AtualizaListaTarefaStorega()
    return Dados
}
// Função para verificar o campo //
function verifcar(campo){
    if(campo == ''){
        alert('Preencha o campo da Tarefa');
        return false;
    }
    return true;
}
// Criação do elemento HTML //
function Criartarefa(Dados,length){

        // Tag li que contem o Nome da Tarefa criada
        let Li1 = document.createElement('li');
        Li1.className = 'todo-item';
        Li1.innerHTML = Dados;
        Li1.id = length;

        //Botão Check
        let = I1 = document.createElement('i');
        I1.className = 'fas fa-check';
        let Btn1 = document.createElement('button');
        Btn1.className = 'check-btn';
        Btn1.id = length;
        Btn1.append(I1);
        // Evento completar tarefa
        Btn1.addEventListener('click', (b)=>{
            let botao1 = b.target
            Div.classList.add('completed');
            CompletarTarefa(botao1.id);
            
        });
        //Botão Delete
        let = I2 = document.createElement('i');
        I2.className = 'fas fa-trash';
        let Btn2 = document.createElement('button');
        Btn2.id = length;
        Btn2.className = 'trash-btn';
        Btn2.append(I2);
        // Evento para remover a tarefa criada//
        Btn2.addEventListener('click', (b)=>{
            let Botao2 = b.target;
            Div.classList.add('fall');
            setTimeout(() => { 
                RemoveDaLista(Botao2.id);
                RemoveHTML(Botao2.id);
            }, 450);
        });
        // Div que contém todo o HTML criado
        let Div = document.createElement('div');
        Div.id = 'Div'+ length;
        Div.className = 'todo';
        Div.append(Li1);
        Div.append(Btn1);
        Div.append(Btn2);

        // Adição da div ao HTML dentro da lista não ordena (ul)
        Lista.append(Div);
}
// Função do botão para completar a Tarefa
function CompletarTarefa(Id){
    // Muda o Status para 'completed'
    let Tarefa_Completa
    Tarefa_Completa =  ListaTarefas.filter(element => element.id == Id);
    Tarefa_Completa.forEach(linha =>{
        linha.Status = 'completed'
    })
}
// Funçoes do botão de remover
function RemoveDaLista(Id){
    let rmv = ListaTarefas.findIndex((item) => item.id ==  Id)
    ListaTarefas.splice(rmv, 1);
    AtualizaListaTarefaStorega()
}
function RemoveHTML(Id){
    let Div_remover = document.querySelector('#Div'+ Id);
    Lista.removeChild(Div_remover);
}
// Filtro 
const filtro = document.querySelector('#Filtro');
    Filtred = []
    Filtred = ListaTarefas
    filtro.addEventListener('change', ()=>{
        if(filtro.value === 'all'){
            Filtred = ListaTarefas
            remove(Filtred);
        }
        else{
            if(filtro.value === 'completed'){
                adiciona(Filtred);
                Filtred = ListaTarefas.filter(element => element.Status == 'completed');
                remove(Filtred);
            }
            else{
                if(filtro.value === 'uncompleted'){
                    adiciona(Filtred);
                    Filtred = ListaTarefas.filter(element => element.Status == 'uncompleted');
                    remove(Filtred);
                } 
            }
        }
});
// Adiciona a classe que oculta os itens
function adiciona(Filtro){
    Filtro.forEach(linha =>{
        let Div = document.querySelector('#Div'+ linha.id);
        Div.classList.add('ocult');
    });
}
// Remove a classe que oculta os itens
function remove(Filtro){
    Filtro.forEach(linha =>{
        let Div = document.querySelector('#Div'+linha.id);
        Div.classList.remove('ocult');
    });
}
function inicializaDom(){
    if(ListaTarefas.length > 0){
        for(let i = 0; i < ListaTarefas.length; i++){
            Criartarefa(ListaTarefas[i].Tarefa,ListaTarefas[i].id);
        }
    }
}
function AtualizaListaTarefaStorega(){
    sessionStorage.setItem('Tarefas',JSON.stringify(ListaTarefas));
}
function ObtemListaTarefaStorega(){
    let aux = sessionStorage.getItem('Tarefas');
    if(aux){
        return JSON.parse(aux);
    }else{
        return Array();
    }
}
inicializaDom();