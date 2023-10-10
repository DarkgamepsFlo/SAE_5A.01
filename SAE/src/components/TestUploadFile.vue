<template>
    <div>
      <h1>Exemple de Upload File en Vue.js</h1>
      <button class="btn btn-info" @click="onPickFile">Upload profile picture</button>
      <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"/>
      <img :src="image" alt="Image sélectionnée" v-if="image" />
      <button type="submit" class="btn btn-info" @click="sendDataToApi">Envoyer l'image à l'API</button>
    </div>
  </template>
    <script>
    export default {
      data() {
        return {
          // La variable 'image' est initialisée à 'null'
          image: null
        };
      },
      methods: {
        // Cette méthode est appelée lorsque le bouton est cliqué
        onPickFile() {
          // Déclenche le clic sur l'input de type fichier caché
          this.$refs.fileInput.click();
        },
        // Cette méthode est appelée lorsque l'utilisateur sélectionne un fichier
        onFilePicked(event) {
            const files = event.target.files;

            if (files.length > 0) {
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    const imageDataUrl = fileReader.result;
                    this.image = imageDataUrl;
                });
                fileReader.readAsDataURL(files[0]);
            }
        },
        sendDataToApi() {
            console.log(this.image)
            }
        }
    };
    </script>
    
  