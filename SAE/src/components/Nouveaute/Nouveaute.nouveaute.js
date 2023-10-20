import BoiteService from "../../services/BoiteService";

export default {
  data(){
    return{
      caroussel: []
    }
  },
  methods: {},
  async mounted(){
    try {
      const response = await BoiteService.getNouveaute()

      if (response) {
        this.caroussel = response;
      }
    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
};

let numero = 0;

let element = caroussel[numero]

function ChangeSlide(sens) {
    numero = numero + sens;
    if (numero < 0)
        numero = caroussel.length - 1;
    if (numero > caroussel.length - 1)
        numero = 0;
    element = caroussel[numero].lien_img_boi;
}

while(true){
  await setTimeout(5000);
  numero = numero + sens;
    if (numero < 0)
        numero = caroussel.length - 1;
    if (numero > caroussel.length - 1)
        numero = 0;
    element = caroussel[numero].lien_img_boi;
}