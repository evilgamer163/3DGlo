'use strict';

import elementClosest from 'element-closest';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scrollPage from './modules/scroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import replacePhoto from './modules/replacePhoto';
import calculate from './modules/calc';
import sendForm from './modules/sendForm';

setInterval(countTimer, 1000, '22 july 2020');
toggleMenu();
togglePopup();
scrollPage();
tabs();
slider();
replacePhoto();
calculate();
sendForm();