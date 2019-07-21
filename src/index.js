import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const characters = [
    {
        name: 'Aladdin',
        imageUrl: '/images/characters/Aladin.jpg',
        movie: ['Aladdin']
    },
    {
        name: 'Simba',
        imageUrl: '/images/characters/Simba.jpg',
        movie: ['Lion King']
    },
    {
        name: 'Stitch',
        imageUrl: '/images/characters/Stitch.jpg',
        movie: ['Lilo & Stitch']
    },
    {
        name: 'Alice',
        imageUrl: '/images/characters/Alice.jpg',
        movie: ['Alice in Wonderland']
    },
    {
        name: 'Mulan',
        imageUrl: '/images/characters/Mulan.jpg',
        movie: ['Mulan']
    },
    {
        name: 'Elsa',
        imageUrl: '/images/characters/Elsa.jpg',
        movie: ['Frozen']
    },
    {
        name: 'Miguel',
        imageUrl: '/images/characters/Miguel.jpg',
        movie: ['Coco']
    }
]

function getTurnData(characters) {
    const allMovies = characters.reduce(function (p, c, i) {
        return p.concat(c.movie);
    }, []);

    const fourRandMovies = shuffle(allMovies).slice(0, 4);
    const answer = sample(fourRandMovies);

    return {
        movies: fourRandMovies,
        character: characters.find((character) => 
            character.movie.some((title) =>
                title === answer))
    }
}

const state = {
    turnData: getTurnData(characters),
    highlight: ''
}

function onAnswerSelectedFunc(answer) {
    const isCorrect = state.turnData.character.movie.some((movie) => movie === answer);
    state.highlight = isCorrect ? 'correct' : 'incorrect';
    render();
}

function MainApp() {
    return <App {...state} onAnswerSelectedFunc={onAnswerSelectedFunc}/>;
}

function AddCharacterForm() {
    return(
        <div>
            <h1>Add Character</h1>
            <p></p>
        </div>
    );
}

function render() {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={MainApp} />
            <Route path="/add" component={AddCharacterForm} />
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
