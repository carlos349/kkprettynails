<template>
    <div class="container-fluid">
         <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    data() {
    return {
        editor: ClassicEditor,
        editorData: '<p>Contenido del editor.</p>',
        editorConfig: {
            // The configuration of the editor.
        }
    };
}
}
</script>
<style>

</style>