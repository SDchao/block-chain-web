<template>
    <div id="test-panel">
        <el-upload
                class="test-upload"
                list-type="picture-card"
                :auto-upload="false"
                :limit="3"
                :on-preview="handlePreview"
                :on-exceed="handleExceed"
                action="http://jsonplaceholder.typicode.com/posts">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">TEST TIP</div>
        </el-upload>

        <el-dialog class="preview-dialog" :visible.sync="previewDialogVisible">
            <img :src="previewImgUrl" width="100%" alt="无法显示缩略图">
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "TestPanel",
    data() {
        return {
            previewDialogVisible: false,
            previewImgUrl: "",
        };
    },
    methods: {
        handlePreview(file) {
            this.previewImgUrl = file.url;
            this.previewDialogVisible = true;
        },
        handleExceed() {
            this.$message.error("超出上传数量限制!");
        }
    }
};
</script>