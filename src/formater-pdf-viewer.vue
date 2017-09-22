<!--  <i18n>
{
   "en":{
       "Previous": "Previous"
   },
   "fr":{
       "Previous": "Précédent"
   }
}
</i18n>-->
<template>
   <div class="formater-pdf-viewer ">
   	<div class="toolbar" style="display:block;margin0;padding:0;">
          <div class="toolbarContainer">
            <div class="toolbarViewer">
              <div class="toolbarViewerLeft">
                <!--  <div class="toolbarButtonSpacer"></div>-->
                <div class="splitToolbarButton hiddenSmallView">
                  <button class="toolbarButton pageUp" data-i18n="[title]PreviousPage" @click="page -=1" :disabled="page <=1">
                    <span >Previous</span>
                  </button>
                  <!--  <div class="splitToolbarButtonSeparator"></div>-->
                  <button class="toolbarButton pageDown" title="Page suivante" @click="page +=1" :disabled="page >= numPages">
                    <span data-l10n-id="next_label">Next</span>
                  </button>
                </div>
                <input id="pageNumber" class="toolbarField pageNumber" title="Page" v-model="page" size="4" min="1"  :max="numPages" type="number" >
                <span id="numPages" class="toolbarLabel">sur {{numPages}}</span>
              </div>
              <div class="toolbarViewerRight">
                <a  class="toolbarButton presentationMode" title="Basculer en mode présentation" tabindex="31" :href="src">
                  <span >Mode présentation</span>
                </a>
                <button  class="toolbarButton print hiddenMediumView" title="Imprimer" tabindex="33" >
                  <span data-l10n-id="print_label">Imprimer</span>
                </button>
                <a  class="toolbarButton download hiddenMediumView" title="Télécharger" :href="src" download>
                  <span data-l10n-id="download_label">Télécharger</span>
                </a>
              </div>
              <div class="toolbarViewerMiddle">
                <div class="splitToolbarButton">
                  <button  class="toolbarButton zoomOut" title="Zoom arrière" @click="zoomOut" >
                    <span data-l10n-id="zoom_out_label">Zoom arrière</span>
                  </button>
                 <!--  <div class="splitToolbarButtonSeparator"></div>--> 
                  <button  class="toolbarButton zoomIn" title="Zoom avant" @click="zoomIn" >
                    <span data-l10n-id="zoom_in_label">Zoom avant</span>
                   </button>
                </div>
              </div>
            </div>  
          </div>
        </div><formater-pdf  ref="pdf" class="formater-vue-pdf" :src="src" :page="page" :rotate="rotate" :scale="scale"  @progress="progress" @error="error" @numPages="recordNumPages"></formater-pdf>
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
	    }	  
  },
  data () {
		return {
  			show: true,
			loadedRatio: 0,
			page: 1,
			numPages: 0,
			rotate: 0,
			scale: 1,
			tx: 0,
			ty:0
		}
  },
 
  methods: {
		error: function(err) {

			console.log(err);
		},
		print: function(){
		    console.log(this.$refs.pdf);
		    this.$refs.pdf.print();
		},
		recordNumPages:function(event){
		    console.log("registreNumpagses");
		    console.log(event);
		    this.numPages = event.detail[0];
		},
		progress:function(event){
		    this.loadedRatio = event.detail[0];
		},
		resize:function(event){
		    console.log('resize');
		   // this.$emit('resize');
		},
		zoomIn: function(){
		    this.scale *= 1.25;
		    this.tx -= 1000;
		},
		
		zoomOut: function(){
		    this.scale *= 0.75;
		}
	},
	
  created: function(){
      console.log("pdf-viewer created")
      //this.$i18n.locale = this.lang;
  },
  mounted: function(){
      console.log("pdf-viewer mounted")
      console.log(this.$refs);
      
  }
}
</script>
<style>
.formater-container{
	display:block;
	height:auto;
}
.formater-container a{
   color: black;
}
.formater-vue-pdf{
   border:1px solid black;
}
</style>