const CellsElements = document.querySelectorAll('[data-cell]');
console.log(CellsElements)
const WinnerCombinations = [
    [0,1,2],
    [3,4,5],
    [5,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const ButtonReinicio = document.querySelector('#reinicio');
ButtonReinicio.addEventListener('click',()=>{
    window.location.reload()
})
let TurnoCicle;

// Verifica se há vencedor
const CheckForWin =(currentplayer) =>{
    return WinnerCombinations.some(combination =>{
        return combination.every((index) => {
            return CellsElements[index].classList.contains(currentplayer)
        });
    });
}
// Mensagem de aviso 
const Aviso = document.querySelector('.aviso');
const Mensagem = Aviso.querySelector('#mensagem');

const FimGame = (empate)=>{
    if(empate){
        Mensagem.innerText ='Empate !'
    }else{
        Mensagem.innerText = TurnoCicle ? 'Circulo Venceu' : 'X venceu';
    }
    Aviso.classList.add('aviso2')
}
// Verifica Empate
const CheckEmpate = ()=>{
    return [...CellsElements].every((cell) =>{
       return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}
const placeMark = (cell,AddClasse) =>{
    cell.classList.add(AddClasse);
}
const StartGame = ()=>{
    TurnoCicle = false;
    Board.classList.add('x');
}
// Muda Turno
const Board = document.querySelector('[data-board]');
const swapTurns = ()=>{
    TurnoCicle = !TurnoCicle

    Board.classList.remove('x');
    Board.classList.remove('circle');
    if(TurnoCicle){
        Board.classList.add('circle');
    }else Board.classList.add('x');
}

const handclick = (e)=>{
    // marcar com x ou circle
    const cell = e.target;
    
    const AddClasse = TurnoCicle ? 'circle' : 'x';

    placeMark(cell,AddClasse);
    // verificar por vitoria
    const isWin = CheckForWin(AddClasse);
    const Empate = CheckEmpate();

    if(isWin){
        FimGame(false);
    }else if(Empate){
        FimGame(true); 
    }else{
       swapTurns(); 
    }
}
for(const cell of CellsElements){
    cell.addEventListener('click', handclick, {once:true});
}
StartGame();



