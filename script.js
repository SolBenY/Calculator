
class Calculator{
    constructor(previousOperandTextElement , currentOperandTextElement){
        this.previousOperandTextElement= previousOperandTextElement;
        this.currentOperandTextElement= currentOperandTextElement;
        this.clear()
    }


 clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation=undefined 
}

removeNumber(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}



addNumber(number){
    if(number==='.' && this.currentOperand.includes('.')) return

    this.currentOperand = this.currentOperand.toString() + number.toString()
}
chooseOperation(operation){
    if(this.currentOperand==='') return
    if( this.previousOperand !== ''){
       this.calculate()
    }

    this.operation=operation;
    this.previousOperand = this.currentOperand
    this.currentOperand = '';


}
calculate(){
    let result
    const thatNumber=parseFloat(this.previousOperand)
    const thisNumber= parseFloat(this.currentOperand)
    if(isNaN(thatNumber)||isNaN(thisNumber)) return
    switch (this.operation) {
        case '+':
            result = thatNumber+thisNumber 
            break;
        case '-':
            result = thatNumber-thisNumber 
             break;
         case '÷':
            result = thatNumber/thisNumber 
             break;
         case '*':
             result = thatNumber*thisNumber 
             break;
        default:
            return
        
    }
    
     this.currentOperand = result
     this.operation = undefined
     this.previousOperand=''

}

update() {
this.currentOperandTextElement.innerText = this.currentOperand
this.previousOperandTextElement.innerText = this.previousOperand
}

}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous]'); 
const currentOperandTextElement = document.querySelector('[data-current]');
const calculator= new Calculator(previousOperandTextElement , currentOperandTextElement); 

numberButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.addNumber(button.innerText)
        calculator.update()

    })
})
allClearButton.addEventListener('click' , () =>{
    calculator.clear()
    calculator.update()
    
})

operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})

equalsButton.addEventListener('click', ()=>{
    calculator.calculate()
    calculator.update()

})

deleteButton.addEventListener('click', button => {
    calculator.removeNumber()
    calculator.update()
  })