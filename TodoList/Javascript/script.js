const formulario = document.querySelector('form');
const ListaDeTarefas = RecebeListaTarefas();
const ListaHTML = document.querySelector('#lista');

let logado = sessionStorage.getItem('Logado');
let login = JSON.parse(logado);
if(login != true){
    window.location = 'Login.html'
}
formulario.addEventListener('submit', (evento)=>{
    let Tarefa = formulario.querySelector('#tarefa').value

    evento.preventDefault();
    if(VerificaCampo(Tarefa)){
        SalvaDados(Tarefa);
        CriaHTML(Tarefa, ListaDeTarefas.length);
        atualizaStorage()
    }
    formulario.reset();
});
// Salva os dados num objeto
const SalvaDados = (Tarefa)=>{
    let Dados = {id:ListaDeTarefas.length + 1, Tarefa:Tarefa, Status:'uncompleted'}
    ListaDeTarefas.push(Dados);
}
// Verifica se o campo Tarefa esta preenchido
const VerificaCampo = (Tarefa)=>{
     if(Tarefa == ''){
        alert('Preencha o campo da Tarefa');
        return false
     }else return true;
}
// Cria o elemento HTML e o adicina a lista
const CriaHTML = (Tarefa, id) =>{
    let li = document.createElement('li');
        li.classList.add('todo-item');
        li.id = id
        li.innerHTML = Tarefa
    
    let i1 = document.createElement('i');
        i1.classList.add('fas');
        i1.classList.add('fa-check');

    let buttonCheck = document.createElement('button');
        buttonCheck.classList.add('check-btn')
        buttonCheck.id = id
        buttonCheck.addEventListener('click',(b)=>{
            target = b.target;
            Div.classList.add('completed');
            CompletarTarefa(target.id);
            atualizaStorage()
        });
        buttonCheck.append(i1);
    
    let i2 = document.createElement('i');
        i2.classList.add('fas');
        i2.classList.add('fa-trash');

    let buttonRemove = document.createElement('button');
        buttonRemove.classList.add('trash-btn');
        buttonRemove.id = id
        buttonRemove.addEventListener('click', (b) =>{
            target = b.target
            Div.classList.add('fall');
            setTimeout(() =>{
                RemoveDaLista(target.id);
                RemoveHTML(target.id)
            },500);
            atualizaStorage();
        });
        buttonRemove.append(i2);

    let Div = document.createElement('div');
        Div.classList.add('todo');
        Div.id = 'Div' + id;
        Div.append(li);
        Div.append(buttonCheck);
        Div.append(buttonRemove);

    ListaHTML.append(Div);
}
// Funções do Botão Remover
const RemoveHTML = (id)=>{
    let Div_remover = document.querySelector('#Div'+id)
    ListaHTML.removeChild(Div_remover);
}
const RemoveDaLista = (id)=>{
    let rmv = ListaDeTarefas.filter(element => element.id == id)

        ListaDeTarefas.splice(rmv, 1);
}
// Função para alterar os Status para completed
const CompletarTarefa = (id)=>{
    let Tarefa_Completa = ListaDeTarefas.filter(element => element.id == id);
    Tarefa_Completa.forEach(linha => {
        linha.Status = 'completed'
    });
}
const Filtro = formulario.querySelector('#filtro');
Filtro.addEventListener('change', ()=>{
    Filtred = ListaDeTarefas;
    switch(Filtro.value){
        case 'all' :    FiltroRemoveHTML();
                        FiltroCriaHTML(Filtred);

        break;
        case 'completed' : FiltroRemoveHTML();
                            Filtred = ListaDeTarefas.filter(element => element.Status == 'completed');
                            FiltroCriaHTML(Filtred);
        break;
        default :   FiltroRemoveHTML();
                    Filtred = ListaDeTarefas.filter(element => element.Status == 'uncompleted');
                    FiltroCriaHTML(Filtred);
        break;
    }
});
const FiltroRemoveHTML = ()=>{
    ListaHTML.innerHTML = "";
}
const FiltroCriaHTML = (Filtro) =>{
    Filtro.forEach(linha => {
        CriaHTML(linha.Tarefa, linha.id);
        if(linha.Status == 'completed'){
            let Div = document.querySelector('#Div' + linha.id);
            Div.classList.add('completed')
        }
    })
}
function atualizaStorage(){
    sessionStorage.setItem('Tarefas', JSON.stringify(ListaDeTarefas));
}
function RecebeListaTarefas(){
    let aux = sessionStorage.getItem('Tarefas');
    if(aux) return JSON.parse(aux);
    else return Array();
}
function inicializaDom(){
    if(ListaDeTarefas.length > 0){
        ListaDeTarefas.forEach(linha =>{
        CriaHTML(linha.Tarefa, linha.id);
        if(linha.Status == 'completed'){
            let Div = document.querySelector('#Div' + linha.id);
            Div.classList.add('completed')
        }
        })
    }
}
inicializaDom();