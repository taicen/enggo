<template>
  <div class="b-dropzone">
  <vue-dropzone 
    :ref="refName"
    :id="refName"
    :options="options"
    :useCustomSlot=true
    @vdropzone-success="handleInput"
    @vdropzone-removed-file="removeFileInput"
  >
    <div class="custom-dropzone">
      <div class="custom-title-dropzone">{{ placeholder }}</div>
    </div>
  </vue-dropzone>
  </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    value: '',
    refName: {
      type: String,
      default: 'myVueDropzone'
    },
    placeholder: {
      type: String,
      default: 'Загрузить фото'
    },
    dataFile: {
      type: Object,
      default: null
    },
    isBase64: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean
    },
    isSuccess: {
      type: Boolean
    },
    options: {
      type: Object,
      default: ()=>({
        thumbnailWidth: 150,
        maxFiles: 1,
        maxFilesize: 5,
        acceptedFiles: 'image/*',
        url: 'https://httpbin.org/post',
        addRemoveLinks: true,
        dictInvalidFileType: 'Неверный тип файла, только изображения',
        dictFileTooBig: 'Размер файла ({{filesize}}MB) превышает допустимый размер ({{maxFilesize}}MB.)',
        dictCancelUpload: 'Удалить',
        dictRemoveFile: 'Удалить'
      })
    }
  },
  data: () => ({
    content: ''
  }),
  methods: {
    handleInput(file){      
      // console.log("%c 8️⃣: handleInput -> file ", "font-size:16px;background-color:#69bc0e;color:white;", file)
      this.$emit('input', this.isBase64 ? file.dataURL : file)
    },
    removeFileInput(){
      this.$emit('input', '')
    }
  },
  mounted(){
    // вставка изображения если есть    
    if(this.dataFile){
      const file = { 
        size: this.dataFile.size, 
        name: this.dataFile.originalname, 
        type: this.dataFile.mimetype
      };
      const url = require(`~/assets/images/${this.dataFile.filename}`);

      this.$refs[`${this.refName}`].manuallyAddFile(file, url);
    }
  }
}
</script>

<style lang="scss">
  .b-dropzone {
    display: flex;
    .vue-dropzone {
      border: 2px dashed $color-second;
      border-radius: 16px;
      flex: 0 0 auto;
      padding: 0;
    }
    .dropzone .dz-preview {
      width: 150px;
    }
  }
  .custom-dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 1px solid $color-second-light;
    border: none;
    width: 150px;
    height: 150px;
    border-radius: 16px;
  }
  .custom-title-dropzone {
    padding: 0 10px;
    font-size: rem(20);
    color: $color-second
  }
</style>