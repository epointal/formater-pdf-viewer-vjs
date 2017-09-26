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
   <div>{{$t("Previous")}}</div>
   <div class="toolbar" style="display:block;margin0;padding:0;">
          <div class="toolbarContainer">
            <div class="toolbarViewer">
              <div class="toolbarViewerLeft">
                <!--  <div class="toolbarButtonSpacer"></div>-->
                <div class="splitToolbarButton hiddenSmallView">
                  <button class="toolbarButton pageUp" :title="$t('Previous page')"  @click="page -=1" :disabled="page <=1">
                    <span >{{$t("Previous")}}</span>
                  </button>
                  <button class="toolbarButton pageDown" :title="$t('Next page')"  @click="page +=1" :disabled="page >= numPages">
                    <span data-l10n-id="next_label">{{$t("Next")}}</span>
                  </button>
                </div>
                <input class="toolbarField pageNumber hiddenMediumView" :title="$t('Page')" v-model="page" size="4" min="1"  :max="numPages" type="number"  >
                <span  class="toolbarLabel hiddenMediumView">sur {{numPages}}</span>
              </div>
              <div class="toolbarViewerRight">
                <a  class="toolbarButton presentationMode" :title="$t('Full screen')" :href="src">
                  <span >{{$t('Full screen')}}</span>
                </a>
                <button  class="toolbarButton print hiddenMediumView" :title="$t('Print')" @click="print += 1;">
                  <span >{{$t('Print')}}</span>
                </button>
                <a  class="toolbarButton download hiddenMediumView" :title="$t('Download')" :href="src" download>
                  <span>{{$t('Download')}}</span>
                </a>
              </div>
              <div class="toolbarViewerMiddle">
                <div class="splitToolbarButton">
                  <button  class="toolbarButton zoomOut" :title="$t('Zoom out')" @click="zoomOut" :disabled="scale <= 1">
                    <span >{{$t('Zoom out')}}</span>
                  </button>
                 <!--  <div class="splitToolbarButtonSeparator"></div>--> 
                  <button  class="toolbarButton zoomIn" :title="$t('Zoom in')" @click="zoomIn" :disabled="scale > 8">
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

</style>