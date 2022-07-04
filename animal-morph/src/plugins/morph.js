import {gsap} from 'gsap/all';
import {ScrollTrigger} from 'gsap/src/ScrollTrigger';
import {state} from '../store/state';

import * as d3 from 'd3';

import LazyLinePainter from 'lazy-line-painter';

let animalAnimationInfo = {};

function playAnimation(animalName, triggerDom, progress) {
  animalAnimationInfo[`animal-${animalName}`].set('progress', progress);
}

function tweenAnimals(animalPaths) {
  animalPaths.each(function (item) {
    animalAnimationInfo[`animal-${item.name}`] = new LazyLinePainter(
      document.querySelector(`#animal-${item.name}`),
      {
        strokeColor: '#cc2d8a',
        strokeWidth: 2,
        ease: 'easeInOutExpo',
      }
    );
  });
}

export {tweenAnimals, playAnimation};
