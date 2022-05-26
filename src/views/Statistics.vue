<template>
  <layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper" >
      <Chart class="chart" :options="chartOptions" />
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>¥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>¥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div class="noResult" v-else>
      <Icon name="notes"/>
      <span>暂时还没有记录，快去记一笔吧~</span>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constans/recordTypeList';
import dayjs from 'dayjs';
import day from 'dayjs';
import _ from 'lodash';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';


@Component({
  components: {Chart, Tabs},
})
export default class Statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    // console.log(div.scrollWidth);
    div.scrollLeft = div.scrollWidth;
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get keyValueList() {
    const today = new Date();
    const array = [];
    // console.log(this.groupedList);
    for (let i = 0; i <= 29; i++) {
      // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
      const dateString = day(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {
        title: dateString
      })
      array.push({
        key: dateString, value: found ? found.total : 0
      });
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.key);
    const values = this.keyValueList.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
        height: 200
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {
          show: false,
          alignWithLabel: false
        },
        axisLine: {lineStyle: {color: '#000'}},
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false,


      },
      series: [{
        colorBy: 'series',
        symbol: 'emptyCircle',
        symbolSize: 8,
        itemStyle: {borderWidth: 1, color: '#feda46', borderColor: '#feda46',},
        data: values,
        type: 'line',
        cursor: 'pointer',

        labelLine: {
          show: true,
          showAbove: true,
          smooth: true,
        }
      }],
      tooltip: {
        show: true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{b}: {c}',
        showDelay: 0
      }
    };
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {

    const {recordList} = this;

    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [];}
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;

  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.chart {
  width: 430%;


  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}


.noResult {
  margin-top: 100px;
  padding: 16px;
  text-align: center;

  .icon {
    width: 32px;
    height: 32px;
  }
}

// 深继承  CSS 透过 css scope
//::v-deep {
//  .type-tabs-item {
//    background: #c4c4c4;
//
//    &.selected {
//      background: white;
//
//      &::after {
//        display: none;
//      }
//    }
//  }
//  .interval-tabs-item {
//    height: 48px;
//  }
//}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}
</style>