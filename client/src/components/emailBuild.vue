<template>
    <div class="container-fluid">
        <div class="row">
            <div v-if="template == 1" style="border:5px solid #ecebea;height:99vh" class="col-sm-7">
                <div class="container">
                    <picture-input 
                    ref="pictureInput"
                    width="800" 
                    height="800" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    
                    button-class="btn btn-primary"
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChange">
                    </picture-input>
                    
                    <!-- <div v-html="textareaOne" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                    </div>
                    
                    <div v-html="textareaTwo" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea">
                        
                    </div>
                    <div v-html="textareaThree" v-on:click="editarTextarea(textareaThree,3)"  class="m-3 p-3 textarea">
                        
                    </div> -->
                </div>
                
            </div>
            <div v-if="template == 2" style="border:5px solid #ecebea;height:99vh" class="col-sm-7">
                <div class="container">
                    
                    <div v-html="textareaOne" style="max-height:90vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                    </div>
                    
                    <!-- <div v-html="textareaTwo" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea">
                        
                    </div>
                    <div v-html="textareaThree" v-on:click="editarTextarea(textareaThree,3)"  class="m-3 p-3 textarea">
                        
                    </div> -->
                </div>
                
            </div>
            <div v-if="template == 3" style="border:5px solid #ecebea;height:99vh" class="col-sm-7">
                <div class="container">
                    <picture-input 
                    ref="pictureInput"
                    width="250" 
                    height="250" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    
                    button-class="btn btn-primary"
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChange">
                    </picture-input>
                    
                    <div v-html="textareaOne" style="max-height:60vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                    </div>
                    
                    <!-- <div v-html="textareaTwo" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea">
                        
                    </div>
                    <div v-html="textareaThree" v-on:click="editarTextarea(textareaThree,3)"  class="m-3 p-3 textarea">
                        
                    </div> -->
                </div>
                
            </div>
            <div v-if="template == 4" style="border:5px solid #ecebea;height:99vh" class="col-sm-7">
                <div class="container">
                    <picture-input 
                    ref="pictureInput"
                    width="200" 
                    height="200" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    
                    button-class="btn btn-primary"
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChange">
                    </picture-input>
                    
                    <div v-html="textareaOne" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <picture-input 
                    ref="pictureInput"
                    width="200" 
                    height="200" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    
                    button-class="btn btn-primary"
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChangeTwo">
                    </picture-input>
                        </div>
                        <div class="col-sm-6">
                            <picture-input 
                    ref="pictureInput"
                    width="200" 
                    height="200" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    
                    button-class="btn btn-primary"
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChangeThree">
                    </picture-input>
                        </div>
                    </div>
                    
                    
                    <div v-html="textareaTwo" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea">
                        
                    </div>
                    
                </div>
                
            </div>
            <div v-if="template == 5" style="border:5px solid #ecebea;height:99vh" class="col-sm-7">
                <div class="container">
                    <div v-html="textareaOne" style="max-height:65vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                    </div>
                    <picture-input 
                    ref="pictureInput"
                    width="250" 
                    height="250" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    
                    button-class="btn btn-primary"
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChange">
                    </picture-input>
                    
                    
                    
                    <!-- <div v-html="textareaTwo" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea">
                        
                    </div>
                    <div v-html="textareaThree" v-on:click="editarTextarea(textareaThree,3)"  class="m-3 p-3 textarea">
                        
                    </div> -->
                </div>
                
            </div>
            <div v-if="template == 6" style="border:5px solid #ecebea;height:99vh" class="col-sm-7">
                <div class="container">
                    <picture-input 
                    ref="pictureInput"
                    width="200" 
                    height="200" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    
                    button-class="btn btn-primary"
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChange">
                    </picture-input>
                    
                    <div v-html="textareaOne" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaOne,1)"  class="m-3 p-3 textarea">
                    </div>
                    <picture-input 
                    ref="pictureInput"
                    width="200" 
                    height="200" 
                    margin="16"
                    :hideChangeButton='true'
                    accept="image/jpeg,image/png" 
                    size="10" 
                    class="mt-4"
                    :custom-strings="{
                        tap: 'Click para seleccionar una foto.',
                        upload: '<h1>Bummer!</h1>',
                        drag: 'Selecciona una foto..',
                        change:'Cambiar imagen'
                    }"
                    @change="onChangeTwo">
                    </picture-input>
                    
                    
                    <div v-html="textareaTwo" style="max-height:22vh;overflow:hidden" v-on:click="editarTextarea(textareaTwo,2)"  class="m-3 p-3 textarea">
                        
                    </div>
                    
                </div>
                
            </div>
            <div style="background-color:#ecebea;border-radius:5px" class="col-sm-5 p-3">
                <button class="btn btn-primary float-right mb-2" v-on:click="SendMail">Enviar correo</button>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">De:</span>
                    </div>
                    <input v-model="de" type="text" class="form-control" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <p style="color:#8b8a89" class="font-italic float-right">*Estas enviando el E-Mail a {{mailsQuantity}} personas</p>
                <div class="input-group mb-3">
                    
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Para:</span>
                    </div>
                    <input v-model="mails" type="text" class="form-control" placeholder="ejemplo@ejemplo.com" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Asunto:</span>
                    </div>
                    <input v-model="subject" type="text" class="form-control" placeholder="Asunto.." aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <ckeditor @input="changeTextarea()" :editor="editor" v-model="editorData" ></ckeditor>
            </div>
        </div>
        
    </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PictureInput from 'vue-picture-input'
import EventBus from './eventBus'
import axios from 'axios'

export default {
    data() {
    return {
            editor: ClassicEditor,
            editorData: '',
            template: localStorage.getItem("selectTemplate"),
            change: 'Change Photsado',
            textareaOne:'Click para editar en el editor...',
            textareaTwo:'Click para editar en el editor...',
            textareaThree:'Click para editar en el editor...',
            select: 0,
            de: 'kkprettynails@gmail.com',
            mails: '',
            mailsQuantity: '',
            subject: ''
        };
        
    },
    components: {
        PictureInput
    },
    created(){
        this.getMails()
    },
    methods: {
        onChange (image) {
            if (image) {
                this.image = this.$refs.pictureInput.file
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        onChangeTwo (image) {
            if (image) {
                this.imageTwo = this.$refs.pictureInput.file
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        onChangeThree (image) {
            if (image) {
                this.imageThree = this.$refs.pictureInput.file
            } else {
                console.log('FileReader API not supported: use the <form>, Luke!')
            }
        },
        async getMails(){
            const mails = await axios('clients/mails')
            for (let index = 0; index < mails.data.length; index++) {
                if(mails.data[index].correoCliente){
                    if (this.mails == '') {
                        this.mails = mails.data[index].correoCliente
                    }else{
                        this.mails = this.mails + ', ' + mails.data[index].correoCliente
                    }
                }
            }
            const splitMails = this.mails.split(',')
            this.mailsQuantity = splitMails.length
        },

        async SendMail(){
            const from = this.de
            const to = this.mails
            const subject = this.subject
            const config = {headers: {'Content-Type': 'multipart/form-data', 'x-access-token': localStorage.userToken}}
            let formData = new FormData();
            formData.append('from', from)
            formData.append('to', to)
            formData.append('subject', subject)
            if (this.template == 1) {
                formData.append('image', this.image)
                
            }
            if (this.template == 2) {
                formData.append('text', this.textareaOne)
            }
            if (this.template == 3) {
                formData.append('image', this.image)
                formData.append('text', this.textareaOne)
            }
            if (this.template == 4) {
                formData.append('image', this.image)
                formData.append('text', this.textareaOne)
                formData.append('imageTwo', this.imageTwo)
                formData.append('imageThree', this.imageThree)
                formData.append('textTwo', this.textareaTwo)
                
            }
            if (this.template == 5) {
                formData.append('text', this.textareaOne)
                formData.append('image', this.image)
        
            }
            if (this.template == 6) {
                formData.append('image', this.image)
                formData.append('text', this.textareaOne)
                formData.append('imageTwo', this.imageTwo)
                formData.append('textTwo', this.textareaTwo)
        
            }
            try{
                const send = await axios.post('clients/sendmail', formData, config)
                console.log(send)
            }catch(err){
                console.log(err)
            }
                
        },
        editarTextarea (info, model){
            $(".textarea").removeClass("sombreado")
            $(".textarea").eq(model-1).addClass("sombreado")
            $(".ck-content").focus()
            this.select = model
            if (model == 1 && info != 'Click para editar en el editor...') {
                this.editorData = this.textareaOne
            }
            else if (info == 'Click para editar en el editor...') {
                this.editorData = ''
            }
            if (model == 2 && info != 'Click para editar en el editor...') {
                this.editorData = this.textareaTwo
            }
            else if (info == 'Click para editar en el editor...') {
                this.editorData = ''
            }
            if (model == 3 && info != 'Click para editar en el editor...') {
                this.editorData = this.textareaThree
            }
            else if (info == 'Click para editar en el editor...') {
                this.editorData = ''
            }
                
            
        },
        changeTextarea(){
            console.log("Epale")
                if (this.select == 1) {
                    this.textareaOne = this.editorData
                }
                if (this.select == 2) {
                    this.textareaTwo = this.editorData
                }
                if (this.select == 3) {
                    this.textareaThree = this.editorData
                }
            
        }

        },
        mounted(){
            EventBus.$on("select-template",select => {
                this.template = select
            })
        }
    }
</script>
<style>
 .textarea {
     cursor: pointer;
     background-color:#ecebea;
     border-radius:5px
 }
 .sombreado{
     box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)
 }
 .ck-content{
     max-height: 70vh;
 }
 .ck-file-dialog-button{
     display: none;
 }
 
</style>