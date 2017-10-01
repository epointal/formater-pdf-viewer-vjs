<i18n>
{
   "en":{
       "Previous": 		"Previous",
       "Previous page" :"Previous page",
       "Next": 			"Next",
       "Next page": 	"Next page",
       "Page": 			"Page",
       "Full screen": 	"Full screen",
       "Print":			"Print",
       "Download":		"Download",
       "Zoom out":		"Zoom out",
       "Zoom in":		"Zoom in"
   },
   "fr":{
       "Previous": 		"Précédent",
       "Previous page" :"Page précédente",
       "Next": 			"Prochain",
       "Next page": 	"Page suivante",
       "Page": 			"Page",
       "Full screen": 	"Plein écran",
       "Print":			"Imprimer",
       "Download":		"Télécharger",
       "Zoom out":		"Zoom arrière",
       "Zoom in":		"Zoom avant"
   }
}
</i18n>
<template>

   <div class="formater-pdf-viewer" style="position:relative;">
   <div class="toolbar" style="display:block;margin0;padding:0;">
          <div class="toolbarContainer">
            <div class="toolbarViewer">
              <div class="toolbarViewerLeft">
                <div class="splitToolbarButton">
                  <button class="toolbarButton pageUp" :class="{ facontent: fa}" :title="$t('Previous page')"  @click="page -=1" :disabled="page <=1">
                    <span >{{$t("Previous")}}</span>
                  </button>
                  <button class="toolbarButton pageDown" :class="{ facontent: fa}" :title="$t('Next page')"  @click="page +=1" :disabled="page >= numPages">
                    <span data-l10n-id="next_label">{{$t("Next")}}</span>
                  </button>
                </div>
                <input class="toolbarField pageNumber hiddenMediumView" :title="$t('Page')" v-model="page" size="4" min="1"  :max="numPages" type="number"  >
                <span  class="toolbarLabel hiddenMediumView">sur {{numPages}}</span>
              </div>
              <div class="toolbarViewerRight">
                <a  class="toolbarButton presentationMode" :class="{ facontent: fa}" :title="$t('Full screen')" :href="src">
                  <span >{{$t('Full screen')}}</span>
                </a>
                <button  class="toolbarButton print hiddenMediumView" :class="{ facontent: fa}" :title="$t('Print')" @click="print += 1;">
                  <span >{{$t('Print')}}</span>
                </button>
                <a  class="toolbarButton download hiddenMediumView" :class="{ facontent: fa}" :title="$t('Download')" :href="src" download>
                  <span>{{$t('Download')}}</span>
                </a>
              </div>
              <div class="toolbarViewerMiddle">
                <div class="splitToolbarButton">
                  <button  class="toolbarButton zoomOut" :class="{ facontent: fa}" :title="$t('Zoom out')" @click="zoomOut" :disabled="scale <= 1">
                    <span >{{$t('Zoom out')}}</span>
                  </button>
                 
                  <button  class="toolbarButton zoomIn" :class="{ facontent: fa}" :title="$t('Zoom in')" @click="zoomIn" :disabled="scale > 8">
                    <span >{{$t('Zoom in')}}</span>
                   </button>
                </div>
              </div>
            </div>  
          </div>
        </div>
		<div style="top:0;left:0;width:100%;">
		<formater-pdf  ref="pdf" class="formater-vue-pdf" :src="src" :page="page"  :scale="scale"  :triggerPrint="print" @progress="progress" @error="error" @numPages="recordNumPages"></formater-pdf>
		</div>
	</div>
</template>

<script>
export default {

  props:{
      src: {
          type: String
      },

	  lang:  {
	      type: String,
	      default: 'fr'
	    },
	  fa:{
		  type: Boolean,
		  default: false
	  }
  },
  data () {
		return {
  			show: true,
			loadedRatio: 0,
			page: 1,
			numPages: 0,
			scale: 1,
			print:0
		}
  },
 
  methods: {
		error: function(err) {

			console.log(err);
		},
		
		recordNumPages:function(event){
		    console.log("registreNumpagses");
		    console.log(event);
		    this.numPages = event.detail[0];
		},
		progress:function(event){
		    this.loadedRatio = event.detail[0];
		},
		
		zoomIn: function(){
		    this.scale *= 1.25;
		   
		},
		zoomOut: function(){
		    this.scale *= 0.8;
		},
		
	},
	
  created: function(){
      this.$i18n.locale = this.lang;
      this.scale=1;
  },
  mounted: function(){
   
      
  }
}
</script>
<style>
.formater-pdf-viewer * {
  padding: 0;
  margin: 0;
}

.formater-pdf-viewer input,
.formater-pdf-viewer button{
  font: message-box;
  outline: none;
}

.formater-pdf-viewer .toolbar {
  position: relative;
  left: 0;
  right: 0;
  z-index: 9999;
  cursor: default;
}

.formater-pdf-viewer .toolbarContainer {
  width: 100%;
  position: relative;
  height: 32px;
  background-color: #474747; /* fallback */
  border-color:#474747;
  border-style: solid;
  border-width:0 1px;
  
  box-shadow: inset 1px 0 0 hsla(0,0%,100%,.08),
              inset 0 1px 1px hsla(0,0%,0%,.15),
              inset 0 -1px 0 hsla(0,0%,100%,.05),
              0 1px 0 hsla(0,0%,0%,.15),
              0 1px 1px hsla(0,0%,0%,.1);
}


.formater-pdf-viewer .toolbarViewer {
  height: 32px;
}

.formater-pdf-viewer .toolbarViewerMiddle {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

}

.formater-pdf-viewer .toolbarViewerLeft{
  float: left;
}
.formater-pdf-viewer .toolbarViewerRight{
  float: right;
}
.formater-pdf-viewer .toolbarViewerLeft > *,
.formater-pdf-viewer .toolbarViewerMiddle > *,
.formater-pdf-viewer .toolbarViewerRight > * {
  position: relative;
  float: left;
}


 .formater-pdf-viewer .splitToolbarButton {
  margin: 0px 2px 0px 0;
  display: inline-block;
}

 .formater-pdf-viewer .splitToolbarButton > .toolbarButton {
  border-radius: 0;
  float: left;
}


.formater-pdf-viewer .toolbarButton {
  border: 0 none;
  background: none;
  width: 32px;
  height: 25px;
}

.formater-pdf-viewer .toolbarButton > span {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
}

.formater-pdf-viewer .splitToolbarButton:hover > .toolbarButton,
.formater-pdf-viewer .splitToolbarButton:focus > .toolbarButton {
  background-color: hsla(0,0%,0%,.12);
  background-image: linear-gradient(hsla(0,0%,100%,.05), hsla(0,0%,100%,0));
  background-clip: padding-box;
  border: 1px solid hsla(0,0%,0%,.35);
  border-color: hsla(0,0%,0%,.32) hsla(0,0%,0%,.38) hsla(0,0%,0%,.42);
  box-shadow: 0 1px 0 hsla(0,0%,100%,.05) inset,
              0 0 1px hsla(0,0%,100%,.15) inset,
              0 1px 0 hsla(0,0%,100%,.05);
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease;

}
.formater-pdf-viewer .splitToolbarButton > .toolbarButton:hover,
.formater-pdf-viewer .splitToolbarButton > .toolbarButton:focus{
  background-color: hsla(0,0%,0%,.2);
  box-shadow: 0 1px 0 hsla(0,0%,100%,.05) inset,
              0 0 1px hsla(0,0%,100%,.15) inset,
              0 0 1px hsla(0,0%,0%,.05);
  z-index: 199;
}
.formater-pdf-viewer .splitToolbarButton > .toolbarButton {
  position: relative;
}


.formater-pdf-viewer .toolbarButton{
  min-width: 16px;
  padding: 2px 6px 0;
  border: 1px solid transparent;
  border-radius: 2px;
  color: hsla(0,0%,100%,.8);
  font-size: 12px;
  line-height: 14px;
  -moz-user-select: none;
  /* Opera does not support user-select, use <... unselectable="on"> instead */
  cursor: default;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease;
  margin: 3px 2px 4px 0;
  cursor:pointer;
}
.formater-pdf-viewer .toolbarButton[disabled]{
	cursor:default;
	opacity:0.5;
}
.formater-pdf-viewer a.toolbarButton{
	max-height:21px;
	max-width:18px;
	box-sizing: unset;
}

.formater-pdf-viewer .toolbarButton:hover,
.formater-pdf-viewer .toolbarButton:focus{
  background-color: hsla(0,0%,0%,.12);
  background-image: linear-gradient(hsla(0,0%,100%,.05), hsla(0,0%,100%,0));
  background-clip: padding-box;
  border: 1px solid hsla(0,0%,0%,.35);
  border-color: hsla(0,0%,0%,.32) hsla(0,0%,0%,.38) hsla(0,0%,0%,.42);
  box-shadow: 0 1px 0 hsla(0,0%,100%,.05) inset,
              0 0 1px hsla(0,0%,100%,.15) inset,
              0 1px 0 hsla(0,0%,100%,.05);
}

.formater-pdf-viewer .toolbarButton:hover:active{
  background-color: hsla(0,0%,0%,.2);
  background-image: linear-gradient(hsla(0,0%,100%,.05), hsla(0,0%,100%,0));
  border-color: hsla(0,0%,0%,.35) hsla(0,0%,0%,.4) hsla(0,0%,0%,.45);
  box-shadow: 0 1px 1px hsla(0,0%,0%,.1) inset,
              0 0 1px hsla(0,0%,0%,.2) inset,
              0 1px 0 hsla(0,0%,100%,.05);
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 10ms;
  transition-timing-function: linear;
}

.formater-pdf-viewer .toolbarButton::before{
  /* All matching images have a size of 16x16
   * All relevant containers have a size of 32x25 */
  position: absolute;
  display: inline-block;
  top: 4px;
  left: 9px;
}

.formater-pdf-viewer .toolbarButton.pageUp::before {
  content: "\2b06";
}
.formater-pdf-viewer .toolbarButton.pageUp.facontent::before {
	font-family: "FontAwesome";
  content:"\f062";
}
.formater-pdf-viewer .toolbarButton.pageDown::before {
 	content:"\2b07";
}
.formater-pdf-viewer .toolbarButton.pageDown.facontent::before{
	font-family: "FontAwesome";
  	content:"\f063";
}
.formater-pdf-viewer .toolbarButton.zoomOut::before {
    content:"\2501";
    font-size:16px;
    left:7px;
}
.formater-pdf-viewer .toolbarButton.zoomOut.facontent::before {
    font-family: "FontAwesome";
  	content:"\f068";
  	left:9px;
}

.formater-pdf-viewer .toolbarButton.zoomIn::before {
  content:"\2795";
  font-size:16px;
  left:7px;
}
.formater-pdf-viewer .toolbarButton.zoomIn.facontent::before {
    font-family: "FontAwesome";
  	content:"\f067";
  	left:9px;
}

.formater-pdf-viewer .toolbarButton.presentationMode::before{
  /*font-family: "FontAwesome";
  content:"\f0b2";/*fa-arrows-alt*/
  content:"\2922";
  font-size:20px;
  left:7px;
  
}
.formater-pdf-viewer .toolbarButton.presentationMode.facontent::before{
  font-family: "FontAwesome";
  content:"\f0b2";/*fa-arrows-alt*/
  font-size:16px;
  left:9px;
}

.formater-pdf-viewer .toolbarButton.print::before{
  content:"\2399";
  font-size:20px;
  left:7px;
}

.formater-pdf-viewer .toolbarButton.print.facontent::before{
 font-family: "FontAwesome";
  content:"\f02f";
  font-size:16px;
  left:7px;
}

.toolbarButton.download::before {
  content:"\2b07";
  font-size:20px;
}

.formater-pdf-viewer .toolbarField {
  padding: 3px 6px;
  margin: 4px 0 4px 0;
  border: 1px solid transparent;
  border-radius: 2px;
  background-color: hsla(0,0%,100%,.09);
  background-image: linear-gradient(hsla(0,0%,100%,.05), hsla(0,0%,100%,0));
  background-clip: padding-box;
  border: 1px solid hsla(0,0%,0%,.35);
  border-color: hsla(0,0%,0%,.32) hsla(0,0%,0%,.38) hsla(0,0%,0%,.42);
  box-shadow: 0 1px 0 hsla(0,0%,0%,.05) inset,
              0 1px 0 hsla(0,0%,100%,.05);
  color: hsl(0,0%,95%);
  font-size: 12px;
  line-height: 14px;
  outline-style: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease;
}

.formater-pdf-viewer .toolbarField.pageNumber {
  -moz-appearance: textfield; /* hides the spinner in moz */
  min-width: 16px;
  text-align: right;
  width: 40px;
}

.formater-pdf-viewer .toolbarField:hover {
  background-color: hsla(0,0%,100%,.11);
  border-color: hsla(0,0%,0%,.4) hsla(0,0%,0%,.43) hsla(0,0%,0%,.45);
}

.formater-pdf-viewer .toolbarField:focus {
  background-color: hsla(0,0%,100%,.15);
  border-color: hsla(204,100%,65%,.8) hsla(204,100%,65%,.85) hsla(204,100%,65%,.9);
}

.formater-pdf-viewer .toolbarLabel {
  min-width: 16px;
  padding: 3px 6px 3px 2px;
  margin: 4px 2px 4px 0;
  border: 1px solid transparent;
  border-radius: 2px;
  color: hsl(0,0%,85%);
  font-size: 12px;
  line-height: 14px;
  text-align: left;
  -moz-user-select: none;
  cursor: default;
}


@page {
  margin: 0;
}

@media screen and (min-resolution: 2dppx) {
  /* Rules for Retina screens */
  .formater-pdf-viewer .toolbarButton::before {
    transform: scale(0.5);
    top: -5px;
  }

}

@media print {
  /* General rules for printing. */
  body {
    background: transparent none;
  }

  /* Rules for browsers that don't support mozPrintCallback. */
  .toolbar {
    display: none;
  }

  /* Rules for browsers that support PDF.js printing */
  /* wrapper around (scaled) print canvas elements */
}

@media all and (max-width: 900px) {
  .formater-pdf-viewer .toolbarViewerMiddle {
    display: table;
    margin: auto;
    left: auto;
    position: inherit;
    transform: none;
  }
}

@media all and (max-width: 640px) {
  .formater-pdf-viewer .hiddenMediumView, 
  .formater-pdf-viewer .hiddenMediumView * {
    display: none;
  }
}

@media all and (max-width: 535px) {
  .formater-pdf-viewer .scaleSelectContainer {
    display: none;
  }
}

</style>