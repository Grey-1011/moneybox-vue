<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value"
        class="tabs-item"
        :class="liClass(item)" @click="select(item)">{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string }
@Component
export default class Tabs extends Vue {
  @Prop(String) readonly value!: string; // ! 不会是undefined
  @Prop(String) classPrefix?: string; // ?类型可能是 undefined
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem;
  @Prop({type: String, default: '64px'}) height!: string;

  liClass(item: DataSourceItem) {
    return {
      selected: item.value === this.value,
      [this.classPrefix + '-tabs-item']: this.classPrefix
    };
  }


  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs {
  @extend %outerShadow;
  background: #ffffff;
  display: flex;
  font-size: 18px;

  &-item {
    width: 50%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 25%;
        width: inherit;
        height: 2px;
        background: #333;
      }
    }
  }
}
</style>