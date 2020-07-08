import React, {Component,useState} from "react";

import ReactDOM from 'react-dom';

import { Container,CardDeck,Card,Button,Row,Col,ListGroup,ListGroupItem,Image,Modal } from 'react-bootstrap';

import './App.css';

const URL = 'https://pokeapi.co/api/v2/';

const URL_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class Pokemon extends Component{
    
    render(){    
        let pokemons = this.props.pokemons;

        pokemons = JSON.parse(pokemons);
        
        let listPokemons = [];
        let myCart = [];

        myCart = JSON.parse(localStorage.getItem("myCart"));

        if(Array.isArray(myCart)){
          myCart = Array.from(myCart);
        }else{
          myCart = [];
        }        
        
        pokemons.map((p) => {
            let obj = {name: p.name, price: (Math.random() * 100 + 10 )};
            listPokemons.push(obj);            
        });

        myCart.map((pokemon) => {
          pokemon.price = listPokemons.filter((p) => {return p.name === pokemon.name})[0].price;
        })

        function getPokemonInfo(name){
            let pokemon = localStorage.getItem(name);
            pokemon = JSON.parse(pokemon);
            return pokemon;
        }

        function getPokemonID(name){
            let pokemon = localStorage.getItem(name);
            pokemon = JSON.parse(pokemon);
            return pokemon.id;
        }
        
        function getCard(name){            
            return (
            <Col xs="{6}" md="{4}">
                <Card border="secondary" bg="light" style={{ width: '16rem', height: '24rem' }}>
                    <Card.Header>{name.toUpperCase()}</Card.Header>
                    <Card.Img src={URL_IMG + getPokemonID(name) + ".png"} style={{ height: '150px' }}/>
                    <Card.Body>
                    <Card.Title>Preço: R$ {listPokemons.filter((p) => {return p.name === name})[0].price.toFixed(2).replace('.',',')} </Card.Title>
                    <Card.Text>    
                        XP: {getPokemonInfo(name).base_experience}                       
                    </Card.Text>
                    <Card.Text>    
                        Altura: {getPokemonInfo(name).height} | Peso: {getPokemonInfo(name).weight}                    
                    </Card.Text>
                    <Button variant="secondary"  onClick={() => cart(name)} >Comprar</Button>               
                    </Card.Body>                                
                </Card>
            </Col>
            )            
        }

        function getCardsPokemon(start,end){            
            return (
                <Row>
                {pokemons.slice(start,end).map((p) =>                    
                    getCard(p.name)                    
                )}
                </Row>   
            )            
        }
               
        function getMyCartItem(name){
            return (
                <ListGroupItem>
                    <Image src={URL_IMG + getPokemonID(name) + ".png"} style={{ width: '5rem'}}/>
                     {name} - R$ {listPokemons.filter((p) => {return p.name === name})[0].price.toFixed(2).replace('.',',')}                    
                </ListGroupItem>
            )
        }
       
        function MyCart(){ 
          return ( 
          <ListGroup className="list-group-flush">
           {myCart.map(p => 
              getMyCartItem(p.name)
           )}
           </ListGroup>
          )
        }

        function TotalPrice(){ 
          let total = myCart.reduce((sum,pokemon) => {
            return sum + pokemon.price;
          },0);
          total = `Total: R$ ${total.toFixed(2).replace('.',',')}`;
          return ( total )          
        }

        function setTotalPrice(value){ 
          const total = `Total: R$ ${value.toFixed(2).replace('.',',')}`;
          ReactDOM.render(total, document.getElementById('total'));
        }

        function addMyCart(nameCart){
          let priceCart = listPokemons.filter((p) => {return p.name === nameCart})[0].price;
          let obj = {name: nameCart,price: priceCart}; 
          myCart.push(obj);
          localStorage.setItem("myCart",JSON.stringify(myCart));
        }

        function cart(name){ 
          if(name != null) {
            addMyCart(name); 
          }
          let cart = <MyCart></MyCart>;
          let total = myCart.reduce((sum,pokemon) => {
            return sum + pokemon.price;
          },0);
          setTotalPrice(total);
          ReactDOM.render(cart, document.getElementById('cart'));          
        }

        function ModalClick(){
          myCart = [];
          cart(null);
          localStorage.setItem("myCart",null);
        }

        function ModalCart(props) {
            return (
              <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered                
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Parabéns!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <h4>Compra Realizada.</h4>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {props.onHide(); ModalClick()} } >Fechar</Button>
                </Modal.Footer>
              </Modal>
            );
          }

        function ModalFinalizar() {
            const [modalShow, setModalShow] = React.useState(false);          
            return (
              <>
                <Button variant="secondary" size="lg" block onClick={() => setModalShow(true)}>
                  Finalizar
                </Button>          
                <ModalCart
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </>
            );
          }

        return(
            <>
            <Container fluid>
            <Row>  
                <Col xs={12} md={8}>  
                <CardDeck>                 
                    {getCardsPokemon(0,3)}
                    {getCardsPokemon(3,6)}
                    {getCardsPokemon(6,9)}
                </CardDeck>
                </Col>
                <Col xs={6} md={4}>
                <Card border="secondary" bg="light" style={{ width: '20rem' }}>                
                <Card.Body>
                    <Card.Title>Carrinho</Card.Title>                    
                </Card.Body>   
                <div id="cart">
                  <MyCart></MyCart>
                </div>    
                <Card.Text>
                    <div id="total">
                      <TotalPrice></TotalPrice>
                    </div>
                </Card.Text>
                <Card.Body>  
                    <ModalFinalizar />                                  
                </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>            
            </>  
        )
    }
}

export default Pokemon;