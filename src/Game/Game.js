import React from 'react';
import Board from './Board';
import propTypes from 'prop-types';

class Game extends React.Component{

    constructor( props ){
        super( props );
    } 

    render(){
        return ( <div> 
                     <h2> Jogo da memória </h2>,
                    <Board /> 
                </div> );
    }

} 

Game.propTypes = {
    name: propTypes.string,
}


export default Game;