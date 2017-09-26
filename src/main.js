require("exports-loader?!./l.min.js")

import Vue from 'vue';

import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

//pour la traduction (non-utilisé pour le moment)
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

/*import VueResource from 'vue-resource';
Vue.use(VueResource);*/

/*import PDFJS from 'pdfjs-dist/webpack.js';
Vue.use(PDFJS);*/

import VueResizeSensor from 'vue-resize-sensor';
//Vue.use(VueResizeSensor);
//var PDFJS = require('pdfjs-dist/webpack.js');
//var resizeSensor = require('vue-resize-sensor');

import PdfComponent from './formater-pdf.vue';

import PdfViewer from './formater-pdf-viewer.vue';

ljs.addAliases({
	dep: [//'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 
	   // 'https://rawgit.com/aeris-data/aeris-commons-fonts/develop/font/aeriscommmonsfonts.css',
	    'viewer.css',
	    'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js',
	    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js',
	    'https://cdnjs.cloudflare.com/ajax/libs/moment-range/3.0.3/moment-range.min.js'
	    ]
})
ljs.load('dep', function() {
	
	window.moment = moment
	window['moment-range'].extendMoment(moment);
	
	// le tableau des composants Aeris
	if (!window.registredAerisElements) {
		window.registredAerisElements = [];
	}
	

    
	Vue.customElement('resize-sensor', VueResizeSensor);
    window.registredAerisElements.push('resize-sensor');
	
	Vue.customElement('formater-pdf', PdfComponent);
	window.registredAerisElements.push('formater-pdf');
	
	Vue.customElement('formater-pdf-viewer', PdfViewer);
    window.registredAerisElements.push('formater-pdf-viewer');

})

