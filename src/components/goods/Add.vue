<template>
<div class="school-edit" style="background: #fff; padding: 24px 32px;">
  <el-form ref="form" :model="form" label-position="left" label-width="80px">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first" style="padding: 0px 10px;">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-right: 10px; margin: 10px 0px;">
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
              <el-select v-model="form.type_id" placeholder="请选择类型">
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
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding-right: 10px; margin: 10px 0px;">
          <el-form-item label="活动时间">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

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
      content: '你好 我是gengxin',
      editorOption: {}
    }
  },
  components: {
    quillEditor
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
