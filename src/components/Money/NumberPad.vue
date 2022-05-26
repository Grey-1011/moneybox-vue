<template>
  <div class="numberPad">
    <div class="output">{{ output || '&nbsp;' }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="equal">=</button>
      <button @click="ok" class="ok">
        <Icon name="ok"/>
      </button>
      <button @click="inputContent">.</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="remove">
        <Icon name="backspace"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output = '';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    if (this.output.indexOf('+') >= 0 || input === '+') {
      return this.output += input;
    }
    if (this.output.indexOf('-') >= 0 || input === '-') {
      return this.output += input;
    }
    this.output += input;
  }

  equal() {
    this.output = eval(this.output).toString();
    // eval 仅在 demo 使用
    // console.log(typeof this.output);
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    this.equal();
    this.$emit('update:value', this.output);
    this.$emit('submit', this.output);
    this.output = '0';
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/style/helper.scss";

.numberPad {
  .icon {
    width: 32px;
    height: 32px;
  }

  .output {
    background: #fafafa;
    border: 1px solid #e9e9e9;
    text-align: right;
    font-size: 24px;
    padding: 4px 16px;
    font-family: Consolas, monospace;
    //@extend %innerShadow;
  }

  .buttons {
    @extend %clearFix;

    > button {
      background: #fafafa;
      border: 1px solid #e9e9e9;
      width: 25%;
      height: 56px;
      float: left;

      &.ok {
        //height: 56*2px;
        float: right;
      }

      &.zero {
        //width: 50%;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        //background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        //background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        //background: darken($bg, 4%*2);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        //background: darken($bg, 4%*3);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        //background: darken($bg, 4%*4);
      }

      &:nth-child(14) {
        //background: darken($bg, 4%*5);
      }

      &:nth-child(13) {
        //background: darken($bg, 4%*6);
        background: #feda46;
      }

      &:nth-child(15) {

      }
    }
  }
}
</style>