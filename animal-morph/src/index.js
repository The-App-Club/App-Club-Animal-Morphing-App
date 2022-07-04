import * as d3 from 'd3';
import {easeLinear} from 'd3-ease';

import {gsap} from 'gsap/all';
import {ScrollTrigger} from 'gsap/src/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import wineBottle from './assets/js/wine-bottle';
import animalBird from './assets/js/animal-bird';
import animalCroc from './assets/js/animal-crocodile';
import animalGiraffe from './assets/js/animal-giraffe';
import animalPig from './assets/js/animal-pig';
import animalSloth1 from './assets/js/animal-sloth-1';
import animalSloth2a from './assets/js/animal-sloth-2a';
import animalWhale from './assets/js/animal-whale';

import {state} from './store/state';

import {getTriggerPositions} from './plugins/getTriggerPositions';
import {resizeCanvas} from './plugins/resizeCanvas';
import {tweenAnimals, playAnimation} from './plugins/morph';

import './plugins/setUpDevice';

function isMobile() {
  const html = document.documentElement;
  return html.classList.contains('isMobile');
}

// svelteに移植する
window.addEventListener('load', (e) => {
  const loadingDom = document.querySelector('#loading');
  loadingDom.classList.add('hidden');
});

state.animals.data = [
  {
    name: 'wineBottle',
    path: wineBottle,
    llpDuraion: 8000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'ワインボトル',
  },
  {
    name: 'animalPig',
    path: animalPig,
    llpDuraion: 8000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'ぶたちゃん',
  },
  {
    name: 'animalCroc',
    path: animalCroc,
    llpDuraion: 8000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'クロコダイル',
  },
  {
    name: 'animalGiraffe',
    path: animalGiraffe,
    llpDuraion: 9000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'きりんちゃん',
  },
  {
    name: 'animalSloth1',
    path: animalSloth1,
    llpDuraion: 8000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'ナマケモノ',
  },
  {
    name: 'animalWhale',
    path: animalWhale,
    llpDuraion: 7000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'ジュディマリ',
  },
  {
    name: 'animalBird',
    path: animalBird,
    llpDuraion: 5000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'バードウォッチング',
  },
  {
    name: 'animalSloth2a',
    path: animalSloth2a,
    llpDuraion: 8000,
    stroke: '#eeeeee',
    strokeWidth: 0.1,
    fill: 'none',
    description: 'ナマケモノの再来',
  },
];

const svg = d3.select('.svg-reflector');
const viewBoxWidth = 300;
const viewBoxHeight = 300;
// Add the paths to the DOM.
const animalPaths = svg
  .attr('id', 'animals')
  .attr('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
  .selectAll('.animal')
  .data(state.animals.data)
  .join('svg')
  .attr('id', (d) => `animal-${d.name}`)
  .attr('class', 'animal')
  .append('svg')
  .attr('x', `${viewBoxWidth / 4 - 20}`)
  .attr('y', `${viewBoxHeight / 4 - 20}`)
  .append('path')
  .attr('id', (d) => d.name)
  .attr('d', (d) => d.path)
  .attr('data-llp-duration', (d) => d.llpDuraion)
  .attr('stroke', (d) => d.stroke)
  .attr('stroke-width', (d) => d.strokeWidth)
  .attr('fill', (d) => d.fill);

// Get each animal path's BBox.
animalPaths.each(function (d) {
  state.animals[d.name] = this.getBBox();
  state.animals[d.name].dom = this;
});

const {start, end} = getTriggerPositions();

const sectionDataInfoList = [];

for (let index = 0; index <= state.animals.data.length; index++) {
  const element = state.animals.data[index];
  sectionDataInfoList.push({id: `section-${index}`});
}

d3.select('#hidden-container')
  .selectAll('.main-section')
  .enter()
  .data(sectionDataInfoList)
  .join('section')
  .attr('class', (data) => {
    return `main-section ${data.id}`;
  });

const containerDom = document.querySelector('.container');

tweenAnimals(animalPaths);

function hidden(animalName) {
  const text = document.querySelector(`.text`);
  const dom = document.querySelector(`#animal-${animalName}`);
  dom.classList.remove('is-active');
  text.classList.remove('is-active');
}

function show(animalName, description) {
  const text = document.querySelector(`.text`);
  const dom = document.querySelector(`#animal-${animalName}`);
  dom.classList.add('is-active');
  text.classList.add('is-active');
  text.innerHTML = description;
}

animalPaths.each(function (d, i) {
  const sectionId = `section-${i + 1}`;
  ScrollTrigger.create({
    trigger: `.${sectionId}`,
    start,
    end,
    scroller: containerDom,
    id: d.name,
    onEnter: (e) => {
      show(d.name, d.description);
    },
    onLeave: (e) => {
      hidden(d.name);
    },
    onUpdate: (e) => {
      playAnimation(d.name, e.trigger, e.progress);
    },
    onEnterBack: (e) => {
      show(d.name, d.description);
    },
    onLeaveBack: (e) => {
      hidden(d.name);
    },
  });
});
