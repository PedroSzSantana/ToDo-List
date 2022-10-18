const ListaTarefas = Array();
const formulario = document.querySelector('form');
const Lista = document.querySelector('#lista_tarefas');


formulario.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    GravarTarefa();
    console.log(ListaTarefas);
    formulario.reset();
});
// Função que verifica e grava
function GravarTarefa(){
    let Tarefa = formulario.querySelector('#tarefa').value;
    let Status = 'uncompleted'

    if(verifcar(Tarefa)){
        Dados = {id:ListaTarefas.length + 1, Tarefa:Tarefa, 'Status':Status};
        ListaTarefas.push(Dados);
        Criartarefa(Dados.Tarefa);
    }
}
// Função para verificar o campo //
function verifcar(campo){
    if(campo == ''){
        alert('Preencha o campo da Tarefa');
        return false;
    }
    else return true;
}
// Criação do elemento HTML //
function Criartarefa(Nome_Tarefa, vetor){

        // Tag li que contem o Nome da Tarefa criada
        let Li1 = document.createElement('li');
        Li1.className = 'todo-item';
        Li1.innerHTML = Nome_Tarefa;
        Li1.id = ListaTarefas.length;

        //Botão Check
        let = I1 = document.createElement('i');
        I1.className = 'fas fa-check';
        let Btn1 = document.createElement('button');
        Btn1.className = 'check-btn';
        Btn1.id = ListaTarefas.length;
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
        Btn2.id = ListaTarefas.length;
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
        Div.id = 'Div'+ ListaTarefas.length;
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
    for(let i = 0; i < ListaTarefas.length; i++){
        if(ListaTarefas[i].id == Id){
            ListaTarefas[i].Status = 'completed';
            console.log(ListaTarefas[i]);
        }
    }
}
// Funçoes do botão de remover
function RemoveDaLista(Id){
    for(let i = 0; i < ListaTarefas.length; i++){
        if(ListaTarefas[i].id == Id){
            ListaTarefas.splice(i, 1);
        }
    }
}
function RemoveHTML(Id){
    let Div_remover = document.querySelector('#Div'+ Id);
    Lista.removeChild(Div_remover);  
}
// Filtro 
const filtro = document.querySelector('#Filtro');
    filtro.addEventListener('change', ()=>{
        if(filtro.value === 'all'){
            for(let i = 0; i < ListaTarefas.length; i++){
                Div = document.querySelector('#Div'+ListaTarefas[i].id);
                Div.classList.remove('ocult');
            }
        }
        else{
            if(filtro.value === 'completed'){
                for(let i = 0; i < ListaTarefas.length; i++){
                    if(ListaTarefas[i].Status == 'uncompleted'){
                        Div = document.querySelector('#Div'+ListaTarefas[i].id);
                        Div.classList.add('ocult');
                    }
                    if(ListaTarefas[i].Status == 'completed'){
                        Div = document.querySelector('#Div'+ListaTarefas[i].id);
                        Div.classList.remove('ocult');
                    }
                }
            }
            else{
                if(filtro.value === 'uncompleted'){
                    for(let i = 0; i < ListaTarefas.length; i++){
                        if(ListaTarefas[i].Status == 'completed'){
                            Div = document.querySelector('#Div'+ListaTarefas[i].id);
                            Div.classList.add('ocult');
                        }
                        if(ListaTarefas[i].Status == 'uncompleted'){
                            Div = document.querySelector('#Div'+ListaTarefas[i].id);
                            Div.classList.remove('ocult');
                        }
                    }       
                } 
            }
        }
    });