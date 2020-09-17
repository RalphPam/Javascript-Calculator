import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: '',
      answer: ''
    }
    this.handleFormula = this.handleFormula.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
  }
  handleFormula(e) {
    const char = e.target.value
    const operators = ['+', '-', '*', '/']
    this.setState(prevState => {
      const prevChar = [prevState.formula[prevState.formula.length - 2], prevState.formula[prevState.formula.length - 1]]
      if(
          ( 
            operators.indexOf(prevChar[1]) >= 0 && 
            operators.indexOf(char) >= 0 &&
            char !== '-'
          ) ||
          ( 
            operators.indexOf(prevChar[0]) >= 0 && 
            operators.indexOf(prevChar[1]) >= 0 && 
            char === '-' ) ||
          (
            prevState.formula === '' && 
            operators.indexOf(char) >= 0 && 
            char !== '-'
          ) ||
          (
            prevState.formula === '-' &&
            operators.indexOf(char) >= 0
          ) ||
          (
            prevState.formula.length >= 50
          )
      ) {
        return {formula: prevState.formula}
      }
      return {formula: prevState.formula + char}
    })
  }
  handleAnswer() {
    const regex = /(\+-?|--?|\*-?|\/-?)/
    const formulaArray = this.state.formula.split(regex)
    const functionOperators = {
      "+": (x,y) => x + y,
      "-": (x,y) => x - y,
      "*": (x,y) => x * y,
      "/": (x,y) => x / y,
      "+-": (x,y) => x + -y,
      "--": (x,y) => x - -y,
      "*-": (x,y) => x * -y,
      "/-": (x,y) => x / -y
    }
    if(formulaArray[0] === '') {
      formulaArray.shift()
      formulaArray.shift()
      formulaArray[0] = '-' + formulaArray[0]
    }
    for(let i=1, total = 0; i< formulaArray.length; i+=2) {
      if(i === 1) {
        total = functionOperators[formulaArray[1]](parseFloat(formulaArray[0]),parseFloat(formulaArray[2]))
      } else {
        const reduceArray = [total, ...formulaArray.slice(i)]
        total = functionOperators[formulaArray[i]](reduceArray[0],parseFloat(reduceArray[2]))
      }
      this.setState({answer: total})
    }
    this.setState({formula: ''})
  }
  render() {
    return (
      <div className='calculatorContainer'>
        <div className='calculator'>
          <h3 className='formula'>{this.state.formula}</h3>
          <h3 className='answer'>{this.state.answer}</h3>
          <button className='ac' onClick={() => this.setState({formula: '', answer: ''})}>AC</button>
          <button className='divide' value={'/'} onClick={this.handleFormula}>/</button>
          <button className='multiply' value={'*'} onClick={this.handleFormula}>*</button>
          <button className='seven' value={'7'} onClick={this.handleFormula}>7</button>
          <button className='eight' value={'8'} onClick={this.handleFormula}>8</button>
          <button className='nine' value={'9'} onClick={this.handleFormula}>9</button>
          <button className='minus' value={'-'} onClick={this.handleFormula}>-</button>
          <button className='four' value={'4'} onClick={this.handleFormula}>4</button>
          <button className='five' value={'5'} onClick={this.handleFormula}>5</button>
          <button className='six' value={'6'} onClick={this.handleFormula}>6</button>
          <button className='plus' value={'+'} onClick={this.handleFormula}>+</button>
          <button className='one' value={'1'} onClick={this.handleFormula}>1</button>
          <button className='two' value={'2'} onClick={this.handleFormula}>2</button>
          <button className='three' value={'3'} onClick={this.handleFormula}>3</button>
          <button className='equal' value={'='} onClick={this.handleAnswer}>=</button>
          <button className='zero' value={'0'} onClick={this.handleFormula}>0</button>
          <button className='decimal-point' value={'.'} onClick={this.handleFormula}>.</button>
        </div>
        <h3 className='design'>Design and Coded by Ralph P.</h3>
      </div>
    )
  }
}

