// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
//Exe0
import { play } from './music.js'
import { intParaRomano } from './romano.js'
import { restartAnimation } from './restart-animation.js'

const filmes_element = document.querySelector('#filmes > ul');
const introducao = document.querySelector('.introducao');
const API_ENDPOINT = 'https://swapi.dev/api'

//Exercicio 1
const musicInfo = {
    audioUrl: 'audio/tema-sw.mp3', 
    coverImageUrl: 'imgs/logo.svg', 
    title: 'Intro', 
    artist: 'John Williams'
};

play(musicInfo, document.body)

//Exe2 e 3
 async function obterFilmes() {
    const resposta = await fetch(`${API_ENDPOINT}/films`,{
      method: 'Get',
      headers: {
        'Content-Type': 'application/json'
      }});
      
    const filmes = await resposta.json();
    const filmesOrdenados = filmes.results.sort((a,b) => a.episode_id - b.episode_id);

    filmesOrdenados.forEach(f => {
      const element = document.createElement('li');
      element.innerHTML = `Episode ${intParaRomano(f.episode_id).padEnd(3, ' ')} - ${f.title}`;
      filmes_element.appendChild(element);
  
      element.addEventListener('click', g => {
        introducao.innerHTML =  `Episode ${intParaRomano(f.episode_id)} \n ${f.title} \n\n ${f.opening_crawl}`;
        restartAnimation(introducao);
      })
    });
  }
  
  obterFilmes();