<template>
  <div>
    <el-form :model="sysNotice" label-width="80px" size="small">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="标题">
            <el-input v-model="sysNotice.noticeTitle" clearable placeholder="请输入标题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="排序">
            <el-input-number v-model="sysNotice.sorted" controls-position="right" style="width: 100%" placeholder="请输入排序值" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="公告内容">
            <markdown-editor ref="markdownEditor" v-model="sysNotice.noticeContentTemp" language="zh_CN" height="500px" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import sysNoticeApi from '@/api/sys-notice'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      // 表单对象
      sysNotice: {}
    }
  },
  methods: {
    // 添加
    add() {
      // 判断，如果存在内容，就转成HTML
      if (this.sysNotice.noticeContentTemp) {
        this.sysNotice.noticeContent = this.$refs.markdownEditor.getHtml()
      }
      sysNoticeApi.save(this.sysNotice).then(res => {
        this.$message.success(res.msg)
        this.$emit('close')
        this.$emit('after')
      })
    }
  }
}
</script>

<style>

</style>
