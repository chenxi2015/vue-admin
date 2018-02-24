<template>
  <div class="myuploader" ref="uploader">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="本地图片" name="first" style="">
        <el-upload
          ref="upload"
          :action="upload_url"
          list-type="picture-card"
          multiple
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleImgurlSuccess"
          :on-error="handleImgurlFail"
          :with-credentials="true"
          :auto-upload="false">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="imgdialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button style="" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-tab-pane>
      <el-tab-pane label="图库图片" name="second">
        <el-row>
          <el-col :span="16">
            <div style="position: relative;">
              <div @click="handleSelectStoreImg(index)" v-for="(item, index) in imgList" :key="index" style="position: relative; margin: 6px; width: 80px; height: 80px; display: inline-block; ">
                <img :src="item.url" style="width: 80px; height: 80px;" :alt="item.alt" srcset="">
                <div v-if="item.isChoose" style="position: absolute; height: 82px; width: 82px; top: -3px; left: -3px; border: 2px solid #409EFF;">
                  <i class="iconfont icon-xuanze" style="color: #409EFF; position: absolute; right: -8px; top: -3px;"></i>
                </div>
              </div>
            </div>
            <div style="float: right; margin-top: 20px; text-align: center; width: 100%;">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="prev, pager, next"
                :total="400">
              </el-pagination>
            </div>
          </el-col>
          <el-popover ref="popover5" placement="top" width="160" v-model="visible">
            <p>删除不可撤销，确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button type="danger" size="mini" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
          </el-popover>
          <el-col :span="8" style=" border-left: 1px solid #ebeef5; padding-left: 20px;">
            <p style="font-weight: bold; border-bottom: 1px solid #ebeef5; padding-bottom: 10px; margin-top: 0px;">附件详情</p>
            <img :src="currentStoreImg[0]" style="height: 80px;" alt="">
            <div style="">
              <p>名称：1.png</p>
              <p>时间：2018年2月12日</p>
              <p>大小：758KB</p>
              <p>尺寸：1024 * 768 px</p>
              <p>
                <el-button type="text" @click="handleEditImg">编辑图像</el-button>
                <el-button type="text" style="color: #F56C6C;" v-popover:popover5>永久删除</el-button>
              </p>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="网络图片" name="third">
        <el-form-item label="网络图片">
          <el-input v-model="currentStoreImg[0]" placeholder=""></el-input>
          <p>图片地址必须以http开头,以jpg,png,bmp,gif结束</p>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'myuploader',
  data () {
    return {
      activeName2: 'first',
      currentStoreImg: [],
      imgdialogVisible: false,
      dialogImageUrl: '',
      currentPage: 1,
      imgList: [
        {
          url: 'http://localhost/my-projects/vue-admin/src/assets/images/default/1.png',
          alt: '',
          isChoose: false
        },
        {
          url: 'http://localhost/my-projects/vue-admin/src/assets/images/default/2.png',
          alt: '',
          isChoose: false
        },
        {
          url: 'http://localhost/my-projects/vue-admin/src/assets/images/default/3.png',
          alt: '',
          isChoose: false
        },
        {
          url: 'http://localhost/my-projects/vue-admin/src/assets/images/default/4.png',
          alt: '',
          isChoose: false
        },
        {
          url: 'http://localhost/my-projects/vue-admin/src/assets/images/default/5.png',
          alt: '',
          isChoose: false
        },
        {
          url: 'http://localhost/my-projects/vue-admin/src/assets/images/default/6.png',
          alt: '',
          isChoose: false
        },
        {
          url: 'http://localhost/my-projects/vue-admin/src/assets/images/default/7.png',
          alt: '',
          isChoose: false
        }
      ],
      visible: false,
      // upload_url: 'http://localhost/tuxiang-projects/api/public/v1/store/upload?type=articlepic'
      // upload_url: 'http://localhost/my-projects/baofei_admin/upload/handle?type=articlepic'
      upload_url: 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleImgurlSuccess: function (response, file) {
      if (response.code !== 200) {
        return false
      }
      console.log(URL.createObjectURL(file.raw))
      console.log(response.data.url)
    },
    handleImgurlFail (e, file, fileList) {
      this.currentStoreImg.push(URL.createObjectURL(file.raw))
    },
    handleSelectStoreImg (index) {
      this.currentStoreImg = []
      this.currentStoreImg[0] = this.imgList[index].url
      this.imgList.forEach(function (val, key) {
        if (key === index) {
          val.isChoose = true
        } else {
          val.isChoose = false
        }
      })
      this.imgList[index].isChoose = true
    },
    handleChooseImgStore () {
      this.dialogVisible = true
    },
    handleEditImg () {
    },
    submitUpload () {
      // console.log(this.$refs.upload)
      this.$refs.upload.submit()
    },
    imguploadAjax () {
      console.log('OK')
      console.log(this.$refs.upload)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.imgdialogVisible = true
    }
  }
}
</script>
<style>
  .el-dialog__body {padding-top: 0px;}
</style>
<style scoped>
</style>
