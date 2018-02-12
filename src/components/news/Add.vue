<template>
<div class="news-add" style="background: #F0F2F5;">
  <div class="yj-breadcrumb-div" style="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章相关</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div style="">
    <el-form ref="form" :model="form" label-width="70px" label-position="left" style="">
      <el-col :xs="14" :sm="14" :md="14" :lg="16" :xl="18" style="padding-right: 10px; margin: 10px 0px; height: 100vh;">
        <el-card class="box-card">
          <el-form-item label="标题" label-width="50px">
            <el-input v-model="form.name" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="摘要" label-width="50px">
            <el-input type="textarea" v-model="form.name" placeholder="请输入摘要 不超过255个字"></el-input>
          </el-form-item>
          <el-form-item label-width="0px" style="">
            <quill-editor ref="myTextEditor"
                        style="line-height: 22px;"
                        v-model="content"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
            </quill-editor>
          </el-form-item>
        </el-card>
      </el-col>
      <el-col :xs="10" :sm="10" :md="10" :lg="8" :xl="6" style="margin: 10px 0px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发布</span>
            <div style="float: right; cursor: pointer;">
              <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
                <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
              </el-tooltip>
            </div>
          </div>
          <div style="background: #fff; height: auto;">
            <el-form-item label="状态">
              <el-select v-model="form.isSelected">
                <el-option label="草稿" value="1"></el-option>
                <el-option label="等待复审" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公开度">
              公开
              <el-button type="text" style="line-height: 15px;">编辑</el-button>
            </el-form-item>
            <el-form-item label="立即发布">
              <el-button type="text" style="line-height: 15px;">编辑</el-button>
            </el-form-item>
            <el-form-item label-width="0px" style="text-align: center;">
              <el-button type="primary" @click="onSubmit">发布</el-button>
              <el-button>保持草稿</el-button>
              <el-button>预览</el-button>
            </el-form-item>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;">
          <div slot="header" class="clearfix">
            <span>缩略图</span>
            <div style="float: right; cursor: pointer;">
              <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
                <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
              </el-tooltip>
            </div>
          </div>
          <div style="background: #fff; height: auto;">
            <el-form-item label-width="0px" style="text-align: center;">
              <div class="avatar-uploader" @click="toggleShow">
                <div tabindex="0" class="el-upload el-upload--text">
                  <img v-if="imgDataUrl" :src="imgDataUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <input type="file" name="file" class="el-upload__input">
                </div>
              </div>
              <!-- <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                @click="toggleShow">
                <img v-if="imgDataUrl" :src="imgDataUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
              <my-upload field="img"
                  @crop-success="cropSuccess"
                  @crop-upload-success="cropUploadSuccess"
                  @crop-upload-fail="cropUploadFail"
                  v-model="show"
                  :width="300"
                  :height="300"
                  url="/upload"
                  :params="params"
                  :headers="headers"
                  img-format="png">
              </my-upload>
            </el-form-item>
            <el-form-item label-width="0px" style="text-align: center;">
              <el-button type="primary" @click="handleChooseImgStore">选择图片库</el-button>
              <el-button @click="handleUploadClose">取消图片</el-button>
            </el-form-item>
          </div>
        </el-card>
        <el-dialog title="图片库" :visible.sync="dialogVisible" width="800px" height="600px">
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
              <img :src="currentStoreImg" style="height: 80px;" alt="">
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
           <span v-if="currentStoreImg" slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleChooseStoreImg">确 定</el-button>
          </span>
        </el-dialog>
        <el-card class="box-card" style="margin-top: 10px;">
          <div slot="header" class="clearfix">
            <span>分类目录</span>
            <div style="float: right; cursor: pointer;">
              <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
                <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
              </el-tooltip>
            </div>
          </div>
          <div style="background: #fff; height: 250px;">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="常用目录" name="first">
                <el-tree
                  :data="data3"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]">
                </el-tree>
              </el-tab-pane>
              <el-tab-pane label="所有分类目录" name="second">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="禁用" disabled></el-checkbox>
                  <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;">
          <div slot="header" class="clearfix">
            <span>标签</span>
            <div style="float: right; cursor: pointer;">
              <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
                <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
              </el-tooltip>
            </div>
          </div>
          <div style="background: #fff; height: auto;">
            <el-tag :key="tag" size="large" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
          </div>
        </el-card>
      </el-col>
      <div style="clear: both"></div>
    </el-form>
  </div>
</div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { quillEditor } from 'vue-quill-editor'
import myUpload from 'vue-image-crop-upload'

export default {
  data () {
    return {
      activeName2: 'first',
      form: {
        isSelected: '1',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      content: '你好 我是gengxin',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      },
      data3: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkList: ['选中且禁用', '复选框 A'],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      imgDataUrl: '',
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      dialogVisible: false,
      currentStoreImg: '',
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
      visible: false
    }
  },
  components: {
    quillEditor,
    myUpload
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  methods: {
    handleChooseStoreImg () {
      this.dialogVisible = false
      this.imgDataUrl = this.currentStoreImg
    },
    handleDelImg () {

    },
    handleEditImg () {

    },
    handleSelectStoreImg (index) {
      this.currentStoreImg = this.imgList[index].url
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
    handleUploadClose () {
      this.imgDataUrl = ''
    },
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    cropUploadFail (status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    handleAvatarSuccess (res, file) {
      this.imgDataUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      this.content = html
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style>
  .ql-editor {height: 600px !important;}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .ql-toolbar.ql-snow {border-color: #dcdfe6;}
  .ql-container.ql-snow {border-color: #dcdfe6;}
</style>

<style scoped>
  .box-card {
    box-shadow: none !important;
    border: none !important;
    text-align: left;
  }
  .el-checkbox-group .el-checkbox {
    float: left;
    width: 160px;
    padding-right: 20px;
    margin: 0;
    padding: 0;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-top: 10px;
    vertical-align: bottom;
  }
</style>
