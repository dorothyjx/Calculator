const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const clearButton = document.querySelector(`[data-clear]`);
const upperDisplayText = document.querySelector(`[data-upperDisplay]`);
const currentDisplayText = document.querySelector(`[data-currentDisplay]`);

class Caculator {
	constructor(upperDisplayText, currentDisplayText) {
		this.upperDisplayText = upperDisplayText
		this.currentDisplayText = currentDisplayText
		this.clear()
		this.state = true
	}
	
	clear() {
		this.currentDisplay = '0'
		this.upperDisplay = ''
		this.operation = undefined
	}
	
	delete() {
	  	if(this.currentDisplay === '') {
			this.upperDisplay = this.upperDisplay.toString().slice(0, -1)
	  	}    
	 	this.currentDisplay = this.currentDisplay.toString().slice(0, -1)
	}
	
	appendNumber(number) {
	  	if(number === '.' && this.currentDisplay.includes('.')) return
	  	if(this.currentDisplay === '0') {
			if(number === '0') return
			this.currentDisplay = number.toString()
	  	} else {
			this.currentDisplay = this.currentDisplay.toString() + number.toString()
	  	}
	}
	
	chooseOperation(operation) {
		//if(this.currentDisplay === '') return
		//console.log(this.currentDisplay)
		if(this.upperDisplay !== '') {
			if(isNaN(this.upperDisplay.slice(-1))) {
				this.currentDisplay = this.upperDisplay
				this.delete()
				this.operation = operation
				//console.log("zheli", operation, this.currentDisplay, "current", this.upperDisplay, "upper")
			} else {
				this.compute()
			}
		}
	this.operation = operation
	this.upperDisplay = this.currentDisplay + " " + operation
	this.currentDisplay = ''
	}
	
	compute() {
		let computation 
		const prevNumber = parseFloat(this.upperDisplay)
		const currentNumber = parseFloat(this.currentDisplay)
	  
		if(isNaN(prevNumber) || isNaN(currentNumber)) return
		switch (this.operation) {
			case '+':
				computation = prevNumber + currentNumber
				break
			case '-':
				computation = prevNumber - currentNumber
				break
			case '×':
				computation = prevNumber * currentNumber
				break
			case '÷':
				computation = prevNumber / currentNumber
				break
			default:
				return
		}
		this.currentDisplay = computation
		this.operation = undefined
		this.upperDisplay = ''
	}
	
	updateDisplay() {
	    this.currentDisplayText.innerText = this.currentDisplay
	  
	    if(this.operation != null) {
			this.upperDisplayText.innerText = `${this.upperDisplay} ${this.currentDisplay}`
		} else {
			this.upperDisplayText.innerText = ''
	  	}
	}
}
  
const caculator = new Caculator(upperDisplayText, currentDisplayText);
  
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
	if (caculator.state == false) {
		caculator.clear()
	  	caculator.updateDisplay()
	  	caculator.state = true
	}
	caculator.appendNumber(button.innerText)
	caculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
	  	//console.log(button.innerText, 'button')
	  	caculator.state = true
	  	caculator.chooseOperation(button.innerText)
	  	caculator.updateDisplay()
	})
})
  
equalsButton.addEventListener('click', button => {
	caculator.compute()
	caculator.updateDisplay()
	caculator.state = false
	//console.log("3", caculator.state)
})
  
clearButton.addEventListener('click', button => {
	caculator.clear()
	caculator.updateDisplay()
	caculator.state = true
})
  
deleteButton.addEventListener('click', button => {
	caculator.delete()
	caculator.updateDisplay()
})
  