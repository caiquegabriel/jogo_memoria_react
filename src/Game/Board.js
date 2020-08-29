import React from 'react';
import Card  from './Card';
// import * as helpers from './helpers.js';

/*
    Ler sobre o strict-mode
*/

export default class Board extends React.Component{

    constructor( props ){
        super( props );

        this.state = {
            cards          : Array(), 
            figures        : null,
            /*
                No jogo da memória, devemos selecionar duas cartas.
                Se a primeira for igual a segunda: sucesso!
            */
            first_selected : null, //ID da carta
            last_selected  : null, //ID da carta

            hands          : 0
        }

        this.loadFigures();

        this.state.cards = Array( this.state.figures.length ).fill(null);
        this.loadCards();
    } 


    loadFigures(){
        this.state.figures = [ 
            'dicionario', 'dicionario', 
            'livro', 'livro', 
            'lapis', 'lapis', 
            'borracha', 'borracha', 
            'princesa', 'princesa', 
            'luz', 'luz' 
        ];
    }

    /*
        Vamos embaralhar as cartas
    */
    loadCards(){

        let figures = this.state.figures.slice();  

        figures.sort(function (a, b){ 
            return Math.floor(Math.random() * 8 );
        }); 

        for( let i = 0 ; i < this.state.cards.length ; i++ ){
            let figure = figures[i] ;
            if( figure !== undefined && figure !== null ){ 
                this.state.cards[i] = figure;
            }

        } 
    }
    

    selectCard = ( _this ) => {

        if( _this.hasSelected() == true ){
            alert('essa já foi escolhida!');
            return -1;
        }

        let first_selected = this.state.first_selected;
        let last_selected  = this.state.last_selected; 
        

        if( this.state.hands % 2 == 0 ){
            //Primeira carta do par a ser selecionada  
            this.setState({ first_selected : _this }); 
            first_selected = _this;
        }else{
            //Segunda carta do par a ser selecionada   
            this.setState({ last_selected : _this });  
            last_selected = _this;
        }   

        if( first_selected !== null && last_selected !== null  ){

            /*
                Verificaremos se possuem os mesmos valores mas que são objetos diferentes
            */
            if(  first_selected.props.value ==  last_selected.props.value  && first_selected !== last_selected ){
                
                first_selected.correctCard();
                last_selected.correctCard();

                this.setState( 
                    { first_selected : null, last_selected : null } 
                );

            }else{ 
                first_selected.unselectCard();
                last_selected.unselectCard();

                this.setState( 
                    { first_selected : null, last_selected : null } 
                );
            }
        }else{
            this.setState( { hands: this.state.hands+1} );
        }
    }
    
    
    addCards(){ 
        let cards = [];
        for( let i = 0; i < this.state.cards.length; i++ ){ 
            cards.push( <Card value={this.state.cards[i]} onClick={ this.selectCard } key={ 'card-' + i } /> );
        }  
        return cards;
    }  

    render(){  
            return (   [
                        <h2 key="title"> Mãos { this.state.hands } </h2>,
                        <div className="simple-cards" card-key="cards">
                            { this.addCards() }
                        </div>
                    ]
                );
    }

} 