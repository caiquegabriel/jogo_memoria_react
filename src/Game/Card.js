import React from 'react';
import PropTypes from 'prop-types';  

 
class Card extends React.Component {

    constructor( props ){  
        super(props); 
        this.state = {
            show   : true , //Se o valor está vazio
            value  : props.value,
            error  : false,
            correct: false
        } 

        this.previewCard();

    }

    hasSelected( ){
        return this.state.show;
    } 

    previewCard(){
        let _this = this;
        setTimeout( 
            function(){
                _this.setState( { show : false } );
                console.log('pronto');
            }, 2500
        );
    }

    selectCard( object ){

       let resp = object(this);

       if( resp == -1 ){
            return;
       }

        if( this.state.error !== true ){
            //Vamos selecionar a carta
            this.setState({ show: true });
        }else{
            //Vamos selecionar a carta
            this.setState({ error: false });
        }

    }

    unselectCard(){ 

        //Vamos setar o error para ocorrer a animação de erro
        this.setState(  { error: true } );

        //Após 0,75s, vamos remover o erro e esconder a carta
        let _this = this; 
        setTimeout( 
            function(){
                _this.setState( { show : false , error: false } );
            }, 750
        );
    }

    correctCard(){
        this.setState( { correct : true } );
    } 

    render(){

        let has_selected    = this.state.show == true ? 'x' : '';
        let button_class    = this.state.show == true ? 'selected' : 'no-selected';
        button_class        = ( this.state.correct !== true ? button_class : 'correct' );
        has_selected        = ( this.state.correct !== true ? has_selected : '' );

        if( this.state.show == true ){
            button_class        =  this.state.error == true ? 'error' : button_class ;
            return (
                <div className={'card ' + button_class} onClick ={ () => this.selectCard( this.props.onClick ) }  > {this.props.value} </div>
            );
        }else{
            return (
                <div className={'card verso ' + button_class} onClick ={ () => this.selectCard( this.props.onClick ) }  ><img src={process.env.PUBLIC_URL + '/images/carta-verso.png'} /></div>
            );
        }
    }

}

Card.propTypes = {
    id : PropTypes.string
};

export default Card; 