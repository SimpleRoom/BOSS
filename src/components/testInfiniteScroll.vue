<template>
  <div class="page-infinite">
    <h1 class="page-title">測試 Infinite Scroll</h1>
    <p class="page-infinite-desc">当即将滚动至列表底部时, 自动加载更多数据</p>
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="(item,index) in list" :key="index" class="page-infinite-listitem">{{ item }}</li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
  </div>
</template>

<style>
.page-infinite-loading,
.page-infinite-listitem {
  line-height: 1.8rem;
  text-align: center;
}
.page-infinite-loading div {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.mint-spinner-fading-circle {
  position: relative;
}
</style>

<script type="text/babel">
export default {
  data() {
    return {
      list: [],
      loading: false,
      allLoaded: false,
      wrapperHeight: 0
    };
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    }
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    console.log(document.documentElement.clientHeight);
    console.log(this.$refs.wrapper.getBoundingClientRect().top);
    for (let i = 1; i <= 20; i++) {
      this.list.push(i);
    }
  }
};
</script>