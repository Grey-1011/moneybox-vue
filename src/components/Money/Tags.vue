<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">
        <Icon name="new"/>
      </button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>= 0}"
          @click="toggle(tag)">
        <Icon :name="tag.name" v-if="['衣', '食', '住','行'].includes(tag.name)"/>
        <span v-text="tag.name" v-else></span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import tagHelper from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(tagHelper) {
  get tagList() {
    return this.$store.state.tagList;
  }

  selectedTags: string[] = [];

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

}

</script>

<style lang="scss" scoped>

.tags {
  background: #ffffff;
  //font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;


    > li {
      //display: flex;
      $bg: #f8f8f8;
      background: $bg;
      $h: 48px;
      height: $h;
      width: 48px;
      //line-height: $h;
      padding: 8px;
      margin-right: 8px;
      border-radius: 50%;
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        width: 32px;
        height: 32px;
      }

      &.selected {
        background: darken(#40b3c8, 1%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>