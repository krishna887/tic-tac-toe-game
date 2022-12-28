const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElement=document.querySelectorAll('[data-cell]')
const bord=document.getElementById('board')
const restartButton=document.getElementById('restartButton')
const winningMessageElement=document.getElementById('winning-message')
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
let circleTurn
startGame()
restartButton.addEventListener('click',startGame)
function startGame(){
    circleTurn=false
    cellElement.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handelClick)
        cell.addEventListener('click',handelClick,{once:true})
    })

hoverMark()
winningMessageElement.classList.remove('show')
}


function handelClick(e){
    const cell= e.target
    const currentClass= circleTurn?CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurn()
        hoverMark()
    }
    //placeMark
    //check for win
    //check for draw
    //switch turn
    

}
function endGame(draw){
    if(draw){
winningMessageTextElement.innerText='Draw!'
    }else 
    {
        winningMessageTextElement.innerText=`${circleTurn?"0's":"x's"}wins!`
    }
    winningMessageElement.classList.add('show')
}
function isDraw(){
    return [...cellElement].every(cell=>{
        return cell.classList.contains(X_CLASS)||
        cell.classList.contains(CIRCLE_CLASS)
    })
}
function placeMark(cell, currentClass)
{
    cell.classList.add(currentClass)
}
function swapTurn(){
    circleTurn=!circleTurn
}
function hoverMark(){
    bord.classList.remove(X_CLASS)
    bord.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        bord.classList.add(CIRCLE_CLASS)
    }
    else{
        bord.classList.add(X_CLASS)
    }
    
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElement[index].classList.contains(currentClass)
        })
    })
}