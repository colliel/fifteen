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
        const shuffle = (array) => array.sort(() => Math.random() - 0.5);
        const arr = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null])
        this.state = {
            squares: arr
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice()
        if(isWin(squares)) return;
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
        this.setState({squares: squares})
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const winner = isWin(this.state.squares);
        let status;
        if (winner) {
            status = 'You win!';
        } else {
            status = 'Play!';}

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
            </div>
        );
    }
}