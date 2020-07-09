import React from "react";
import {Square} from "./Square";

const isWin = (squares) => {
    const winState = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    const filtered = squares.slice(0, 15)
    return (filtered.join() === winState.join())
}

export class Board extends React.Component{

    constructor(props) {
        super(props);
        //const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null].sort(() => Math.random() - 0.5);
        const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,null,15]
        this.state = {
            squares: arr,
            timer: 0
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(state => {
                return {...state, timer: state.timer++}
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleClick(i) {
        const squares = this.state.squares.slice()
        if (isWin(squares)) return
        if(!squares[i+1] && (i+1 <= 15) && i!==3 && i!==7 && i!==11) {
            squares[i+1] = squares[i]
            squares[i] = null
        } else if(!squares[i-1] && (i-1 >= 0) && i!==4 && i!==8 && i!==12){
            squares[i-1] = squares[i]
            squares[i] = null
        } else if (!squares[i-4] && (i-4 >= 0)){
            squares[i-4] = squares[i]
            squares[i] = null
        } else if (!squares[i+4] && (i+4 <= 15)){
            squares[i+4] = squares[i]
            squares[i] = null
        }
        this.setState(state => {
            return {...state, squares}
        })
        if (isWin(squares)) {
            clearInterval(this.timer)
            //delete(this.timer)
        }
    }

    handlePlayAgain() {
        clearInterval(this.timer)
        const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null].sort(() => Math.random() - 0.5);
        //const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,null,15]
        this.setState ({
            squares: arr,
            timer: 0
        })
        this.timer = setInterval(() => {
            this.setState(state => {
                return {...state, timer: state.timer++}
            })
        }, 1000);
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const win = isWin(this.state.squares)
        let status = win ? 'You win!' : 'Play!'

        let h = this.state.timer/3600 ^ 0 ;
        let m = (this.state.timer-h*3600)/60 ^ 0 ;
        let s = this.state.timer-h*3600-m*60 ;
        let timerStatus = win ? 'Your result is ' + (h<10?"0"+h:h)+" h "+(m<10?"0"+m:m)+" min "+(s<10?"0"+s:s)+" sec" : (h<10?"0"+h:h)+" h "+(m<10?"0"+m:m)+" min "+(s<10?"0"+s:s)+" sec passed"

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>
                <div className="status">
                    {timerStatus}
                    <br/>
                    <button onClick={() => this.handlePlayAgain()}>New game</button>
                </div>
            </div>
        );
    }
}