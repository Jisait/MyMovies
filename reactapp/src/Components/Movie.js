
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import {Col } from 'reactstrap';
import {Card, CardImg, CardText, CardBody} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, {useState, useEffect}  from 'react';
import { Badge } from 'reactstrap';
import { Progress } from 'reactstrap';




function Movie(props) {



  var cardText = {
    paddingTop : '3px',

  }



  var flex = {
    display: 'flex',
    flexDirection : 'row',
 
    alignItems: 'center',
  }



  var fiche = {
    marginBottom : '24px'
  }
  

  var titre = {
    color : 'black',
    fontSize : '28px',
    fontWeight : 'bold'
  }

  var badge = {
    backgroundColor : 'grey'
  }

  var Like = {
    backgroundColor : "white",
    borderWidth : "3px",
    borderColor : "white"
  }
  var sousVotePour = {color: '#E3E2E2'}
  var votePour = {color : '#FEBE00'}



  const [likeMovie, setLikeMovie] = useState(false);
  const [watchMovie, setWatchMovie] = useState(false);
  const [watchNumber, setWatchNumber] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  const [myVote, setMyVote] = useState(false);
  const [wishList, setWishList] = useState([])

  var clickSurLike = () => {
    /*     if (likeMovie === false) {
            setLikeMovie(true)
              } else {
            setLikeMovie(false)}; */
        props.like(props.nameMovie, props.affiche)}

  useEffect(async () => {
      
    var rawResponse = await fetch('/wishlist-movie');
    var response = await rawResponse.json();
    setWishList(response.movies)
  
  }, []);

  var changeLike = (name, img) => {
      if(props.booleanLike = true) {
        props.removeWishList(name) } else {
          props. clickSurLike(name, img)
      }

      setLikeMovie(!likeMovie)
  }


        
        
      if (props.booleanLike == true)  Like = {
              backgroundColor : "#FEBE00",
              borderWidth : "3px",
              borderColor : "#B49E24"
                                      }

      if (props.booleanLike == true) votePour = {
              color : '#e74c3c'
                                        }

      if (props.booleanLike == true) sousVotePour = {
              color : "white"
      }
  var clickSurCamera = () => {
    if (watchMovie === false) {
    setWatchMovie(true)}
    setWatchNumber(watchNumber+1)
   
      }

  var clickStar = (compteur) => {
    
    setMyRatingMovie(compteur);
    setMyVote(true)

  }

  var myVoteNumber = 0
    if(myVote === true){
      myVoteNumber = 1
    }

  var newMoyenne = ((props.nivMoyenne * props.nbreVote)+ (myRatingMovie)) / (props.nbreVote+myVoteNumber);



  var newMoyenneArrondi = Math.round(newMoyenne*10)

  var nbreVote = props.nbreVote;
    if(myVote === true) {
      nbreVote = props.nbreVote +1
    }

    var coeur = {color: 'grey'}
  if (props.booleanLike == true) {
    coeur = {color: '#e74c3c'}
  }

  var camera = {color:'#EAEAEA'}
  if (watchMovie === true) {
    camera = {color: 'black'}
  }

  var tabMyRating = []
  for(var i=0; i<10; i++){
      var color = sousVotePour
      if(i<myRatingMovie){
          color = votePour
      }
      let compteur = i+1
    tabMyRating.push(<FontAwesomeIcon className = "pointer" onClick={() => clickStar(compteur)} style={color} icon={faStar} /> )
  }

  var tabGlobalRating = []
  for(i=0;i<10;i++){
      color = sousVotePour
      if(i<newMoyenne){
          color = votePour
      }

      {/* <Progress animated color="warning" value={75} /> */}

     tabGlobalRating.push(<FontAwesomeIcon className = "pointer" style={color} icon={faStar} /> ) 
  }

  


return (

   <Col style={fiche} sm="12" lg="6" xl="4">
    
      <Card style={Like}>

        <div className="position-relative">
        <CardImg top width="100%" src={props.affiche} className="noirci"/> 
        <h2 className="resume">{props.resume}</h2>
        </div>

        <CardBody style={cardText}>
          <CardText style={titre}>{props.nameMovie}</CardText>
          <CardText >Like <FontAwesomeIcon className = "pointer" onClick={() => clickSurLike()} style={coeur} icon={faHeart} /></CardText>
          <CardText>Nombre de vues {props.nbreVue} <FontAwesomeIcon className = "pointer" onClick={() => clickSurCamera()} style={camera} icon={faVideo} />    <Badge style= {badge}>{watchNumber}</Badge></CardText>
          <CardText>Mon avis{tabMyRating} {/* <Badge onClick={() => clickSurAvisMoins()} style= {badge}>-1</Badge>   <Badge onClick={() => clickSurAvisPlus()} style= {badge}>+1</Badge> */}</CardText>
          <hr></hr>
          <CardText>
      <Progress className="progBar" value={newMoyenne*10} max={111} /><div className="text-center">{newMoyenneArrondi}% d'avis positif sur {nbreVote} avis</div></CardText>
    
          <CardText></CardText>
        </CardBody>
      </Card>
    </Col>
  );}


export {Movie};

