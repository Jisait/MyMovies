
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Movie} from '../src/Components/Movie';
import {MovieRest} from '../src/Components/MovieRest';

import { Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';


var icon = {
  width : '52px',
}

var flex = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

var nav = {
  fontSize : '18px',
  fontWeight : 'bold',
  color : 'white'
}

var list = {
  fontSize : '18px',
  padding : "8px 10px",
}




function App() {


  const [movieListAPI, setMovieListAPI] = useState([]);
  const [wishList, setWishList] = useState([])
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);


 

  useEffect(async () => {

      var rawResponse = await fetch('/new-movies');
      var reponse = await rawResponse.json();
      setMovieListAPI(reponse.moviesAPI.results)

      }, []);

  
  useEffect(async () => {
      
      var rawResponse = await fetch('/wishlist-movie');
      var response = await rawResponse.json();
      setWishList(response.movies)
    
    }, []);

var movieData = movieListAPI.map((list, i) => {
          return list
              })
    

// tri des films par popularité
    movieData.sort(function(a, b) {
          return b.vote_average - a.vote_average})
////

// sépare les films en 1,2,3 puis le reste
  var movieDataFirst = [];
  var movieDataRest = [];

        movieDataFirst = movieData.filter((movie, idx) => idx < 3);
        movieDataRest = movieData.filter((movie,idx) => idx > 3 )
///

///Ajout dans WishList
        
var clickSurLike = async (nomDuFilm, afficheMovie) => {

    var wishListExist = wishList.map((exist, i) => {
        return exist.Nom})

    if (wishListExist.indexOf(nomDuFilm)  === -1) {
      setWishList( [...wishList, {Nom : nomDuFilm, img : afficheMovie}]) 

      await fetch('/wishlist-movie', {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: 'name='+nomDuFilm+'&img='+afficheMovie})

       } else if (wishListExist.indexOf(nomDuFilm)  !== -1) {
      setWishList( wishList.filter((e) => e.Nom !== nomDuFilm))
    
          await fetch('/wishlist-movie/'+nomDuFilm, {
                method: 'DELETE', }
                )
      }

/*          var rawResponse = await fetch('/wishlist-movie');
        var response = await rawResponse.json();
        setWishList(response.movies) */
      }

//////

// Suprresion depuis WIshList

var removeWishList = async (nomDuFilm) => {
    
    setWishList ( wishList.filter((e) => e.name !==nomDuFilm))
          await fetch('/wishlist-movie/'+nomDuFilm, {
          method: 'DELETE',
       })
          var rawResponse = await fetch('/wishlist-movie');
       var response = await rawResponse.json();
       setWishList(response.movies)
    }

///

/// creation de la div WishList
    
var favListComp = wishList.map((movielist, i) => {
        return(<PopoverBody  className = "wishList" onClick={() => removeWishList(movielist.Nom)}><img className = "wishListImage" src = {movielist.img}></img>{movielist.Nom}</PopoverBody>)
  })
    
//////

/// recup etatLike




////

/// creation des Cards Movies123 et MoviesRest

var movieListFirst = movieDataFirst.map((oneMovie, i) => {

  var result = wishList.find(e => e.Nom == oneMovie.title)

  var isSee = false
  if (result != undefined) {
    isSee = true
  }

    if (oneMovie.title.length > 22){

      return(<Movie booleanLike = {isSee} nivAvis = {oneMovie.Avis} nivMoyenne = {oneMovie.vote_average} nbreVote = {oneMovie.vote_count} nameMovie = {oneMovie.title.slice(0,22)+"..."} affiche = {'https://image.tmdb.org/t/p/w500'+oneMovie.poster_path} resume = {oneMovie.overview.slice(0,350)+"..."} like = {clickSurLike}/>);

    } else {
      return(<Movie booleanLike = {isSee} nivAvis = {oneMovie.Avis} nivMoyenne = {oneMovie.vote_average} nbreVote = {oneMovie.vote_count} nameMovie = {oneMovie.title} affiche = {'https://image.tmdb.org/t/p/w500'+oneMovie.poster_path} resume = {oneMovie.overview.slice(0,350)+"..."} like = {clickSurLike}/>);
    }

  });

var movieListRest = movieDataRest.map((oneMovie, i) => {

  var result = wishList.find(e => e.Nom == oneMovie.title)

  var isSee = false
  if (result != undefined) {
    isSee = true
  }


    if (oneMovie.title.length > 22){
      return(<MovieRest booleanLike = {isSee} nivAvis = {oneMovie.Avis} nivMoyenne = {oneMovie.vote_average} nbreVote = {oneMovie.vote_count} nameMovie = {oneMovie.title.slice(0,22)+"..."} affiche = {'https://image.tmdb.org/t/p/w500'+oneMovie.poster_path} resume = {oneMovie.overview.slice(0,350)+"..."} like = {clickSurLike}/>);
    
    } else {
      return(<MovieRest booleanLike = {isSee} nivAvis = {oneMovie.Avis} nivMoyenne = {oneMovie.vote_average} nbreVote = {oneMovie.vote_count} nameMovie = {oneMovie.title} affiche = {'https://image.tmdb.org/t/p/w500'+oneMovie.poster_path} resume = {oneMovie.overview.slice(0,350)+"..."} like = {clickSurLike}/>);
    }

  });
  
///////

return (
  <div className ="App">
    <Container>
      <Row className ="header">
        <Col>
        <Nav style={flex}>
        <NavItem>
          <NavLink  >< img src='./pop-corn.png' alt='' style={icon} /></NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={nav} href="#">Connexion</NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={nav} href="#">
          
          <div>
      <Button id="Popover1" type="button">
        Favoris : {favListComp.length}
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader>Liste de Favoris</PopoverHeader>
         {favListComp}
      </Popover>
          </div>
          
          </NavLink>
        </NavItem>
        </Nav>
        </Col>
      </Row>
      
      <Row className="cards">
          {movieListFirst}
      </Row>
      <Row>
          {movieListRest}
      </Row>
      
    </Container>
  </div>
  );
};

export default App;

