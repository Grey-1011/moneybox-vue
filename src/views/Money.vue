<template>
  <layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <div class="notes">
      <Icon name="remarks"/>
      <FormItem field-name="" placeholder="在这里输入备注" :value.sync="record.notes"/>
    </div>
    <div class="createdAt">
      <Icon name="date"/>
      <FormItem field-name="" type="datetime-local" placeholder="在这里输入日期" :value.sync="record.createdAt"/>
    </div>
    <Tags @update:value="record.tags = $event"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constans/recordTypeList';

@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()};

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss">
.notes {
  position: relative;
  .icon{
    margin-left: 8px;
    position: absolute;
    top: 24px;
  }
}

.createdAt {
  position: relative;
  .icon{
    margin-left: 8px;
    position: absolute;
    top: 12px;
  }
}

.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>
