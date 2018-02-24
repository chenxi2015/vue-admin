<template>
<div class="school-edit" style="background: #fff; padding: 24px 32px;">
  <el-form ref="form" :model="form" label-position="left" label-width="80px">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first" style="padding: 0px 10px;">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="padding-right: 10px; margin: 10px 0px;">
          <div style="width: 460px;">
            <el-form-item label="分类">
              <el-select v-model="form.cate_id" placeholder="请选择分类">
                <el-option label="服装" value="1"></el-option>
                <el-option label="|--女装" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type_id" placeholder="请选择类型">
                <el-option label="手机产品" value="1"></el-option>
                <el-option label="笔记本产品" value="2"></el-option>
                <el-option label="男士衬衫" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌">
              <el-select v-model="form.type_id" placeholder="请选择品牌">
                <el-option label="手机产品" value="1"></el-option>
                <el-option label="笔记本产品" value="2"></el-option>
                <el-option label="男士衬衫" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品编号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-table border :data="tableData" style="width: 100%">
                <el-table-column align="center" prop="date" label="积分" width="">
                  <template slot-scope="scope">
                    <el-input v-model="form.name" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="排序" width="">
                  <template slot-scope="scope">
                    <el-input v-model="form.name" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="计量单位">
                  <template slot-scope="scope">
                    <el-input v-model="form.name" placeholder=""></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="是否上架">
                  <template slot-scope="scope">
                    <el-switch v-model="form.delivery" active-color="#13ce66"></el-switch>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="产品相册">
              <el-button @click="handleShowUploadDialog" type="primary" icon="el-icon-plus">添加图片</el-button>
              <div style="margin-top: 10px;">
                <div v-for="(item, index) in imgList" :key="index" style="margin: 5px; float: left; border: 1px solid #ddd">
                  <img :src="item" style="width: 100px; height: 100px; border: 2px solid #fff;" alt=""><br/>
                  <i @click="handleImgPrev(index)" class="el-icon-arrow-left" style="width: 30%; text-align: center; cursor: pointer;"></i>
                  <i @click="handleImgNext(index)" class="el-icon-arrow-right" style="width: 30%; text-align: center; cursor: pointer;"></i>
                  <i @click="handleImgDel(index)" class="el-icon-delete" style="width: 30%; text-align: center; cursor: pointer;"></i>
                </div>
              </div>
              <el-dialog title="图片库" :visible.sync="dialogVisible" width="820px" height="600px">
                <my-uploader ref="myUploader"></my-uploader>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible=false">取 消</el-button>
                  <el-button type="primary" @click="handleSelectImg">确 定</el-button>
                </span>
              </el-dialog>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" style="padding-right: 10px; margin: 10px 0px;">
          <el-form-item label="产品规格">
            <el-input v-model="form.name" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="描述信息" name="second" style="padding: 0px 10px;">
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-tab-pane>
      <el-tab-pane label="SEO信息" name="third" style="padding: 0px 10px;">
      </el-tab-pane>
      <el-tab-pane label="售后保障" name="forth" style="padding: 0px 10px;">
        <quill-editor ref="myTextEditor"
                      v-model="description"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-tab-pane>
    </el-tabs>
    <el-form-item style="text-align: center; margin-top: 20px;">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import myUploader from './Uploader'

export default {
  data () {
    return {
      activeName2: 'first',
      form: {
        cate_id: '1',
        type_id: '1',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogVisible: false,
      content: '你好 我是gengxin',
      description: '你好 我是chenxi',
      editorOption: {},
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      imgList: []
    }
  },
  components: {
    quillEditor,
    myUploader
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  methods: {
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
    },
    handleShowUploadDialog () {
      this.dialogVisible = true
    },
    handleSelectImg () {
      var flag = 1
      var self = this
      this.dialogVisible = false
      var currentImgurl = this.$refs.myUploader.currentStoreImg
      if (currentImgurl.length === 0) {
        return false
      }
      console.log(currentImgurl)
      if (currentImgurl.length === 1) {
        this.imgList.forEach(function (val, key) {
          currentImgurl.forEach(function (v, k) {
            if (val === v) {
              flag = 2
            }
          })
        })
      }
      if (flag === 1) {
        currentImgurl.forEach(function (val, key) {
          self.imgList.push(val)
        })
      }
      this.$refs.myUploader.currentStoreImg = []
    },
    handleImgDel (index) {
      this.imgList.splice(index, 1)
    },
    handleImgPrev (index) {
      this.imgList.splice(index - 1, 0, this.imgList[index])
      this.imgList.splice(index + 1, 1)
    },
    handleImgNext (index) {
      this.imgList.splice(index + 2, 0, this.imgList[index])
      this.imgList.splice(index, 1)
    }
  }
}
</script>
<style>
  .school-edit .el-select .el-input {width: 380px !important;}
  .ql-editor {height: 400px !important;}
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
</style>
