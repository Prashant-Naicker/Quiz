import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css'

function Hero() {
  return ( <div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Disney Quiz</h1>
      <p> Select the movie that stars the character shown</p>
    </div>
  </div>)
}

function Turn({character, movies, highlight, onAnswerSelectedFunc}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'rgb(100, 247, 149)',
      'incorrect': 'rgb(255, 122, 122)'
    }

    return mapping[highlight];
  }

  return (<div className="row turn">
      <div className="col-4 offset-1" style={{backgroundColor: highlightToBgColor(highlight)}}>
        <img src={character.imageUrl} className="charimage" alt="Author"></img>
      </div>
      <div className="col-6">
        {movies.map((title) => <Movie title={title} onClick={onAnswerSelectedFunc} key={title}/>)}
      </div>
    </div>);
}

Turn.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    movie: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelectedFunc: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Movie(title) {
  return (<div className="answer" onClick={() => { title.onClick(title.title) }}>
      <h4>{title.title}</h4>
    </div>
  );
}

function App({turnData, highlight, onAnswerSelectedFunc}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelectedFunc={onAnswerSelectedFunc} />
      <p><Link to="/add">Add an author</Link></p>
      <Footer></Footer>
    </div>
  );
}

function Footer() {
  return (
    <div className="col-4 offset-4">
      <p className="text-muted credit">
        First demo react app made by Prash
      </p>
    </div>
  );
}

export default App;
