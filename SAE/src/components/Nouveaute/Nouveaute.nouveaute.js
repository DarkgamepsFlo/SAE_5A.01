import BoiteService from "../../services/BoiteService";

export default {
  data(){
    return{
      caroussel: [],
      caroussel_current: String,
      numero: 0,
      id: 0,
      intervalId: null,
    }
  },
  methods: {
    changeSlide(sens) {
      this.numero = this.numero + sens;
      if (this.numero < 0)
          this.numero = this.caroussel.length - 1;
      if (this.numero > this.caroussel.length - 1)
          this.numero = 0;
      this.caroussel_current = this.caroussel[this.numero].lien_img_boi;
      this.id = this.caroussel[this.numero].id_boite;
    }
  },
  async mounted(){
    try {
      const response = await BoiteService.getNouveaute()
      if (response) {
        this.caroussel = response;
        this.caroussel_current = this.caroussel[this.numero].lien_img_boi;
        this.id = this.caroussel[this.numero].id_boite;
        this.intervalId = setInterval(() => {
          this.changeSlide(1);
        }, 5000);
      }
    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
};