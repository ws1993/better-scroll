<template>
  <div class="slide-specified-index">
    <div class="banner-wrapper">
      <div class="slide-specified-wrapper" ref="slide">
        <div class="slide-specified-content">
          <div v-for="num in nums" class="slide-page" :class="'page' + num" :key="num">page {{num}}</div>
        </div>
      </div>
    </div>
    <div v-if="slideCreated" class="description">currentPageIndex is {{slide.getCurrentPage().pageX}}</div>
    <div class="btn-wrap">
      <button class="next" @click="nextPage">nextPage</button>
      <button class="prev" @click="prePage">prePage</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from '@better-scroll/core'
  import Slide from '@better-scroll/slide'

  BScroll.use(Slide)

  export default {
    data() {
      return {
        slideCreated: false,
        nums: 4,
        currentPageIndex: 0
      }
    },
    mounted() {
      this.init()
      this.slideCreated = true
    },
    beforeDestroy() {
      this.slide.destroy()
    },
    methods: {
      init() {
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          slide: {
            autoplay: false,
            loop: true,
            startPageXIndex: 2 // v2.3.0
          },
          momentum: false,
          bounce: false,
          probeType: 3
        })
        // v2.1.0
        this.slide.on('slidePageChanged', (page) => {
          console.log('CurrentPage changed to => ', page)
          // always get the currentPageIndex, because slide is not reactive
          this.$forceUpdate()
        })
      },
      nextPage() {
        this.slide.next()
      },
      prePage() {
        this.slide.prev()
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

.slide-specified-index
  .banner-wrapper
    position relative
  .slide-specified-wrapper
    min-height 1px
    overflow hidden
  .slide-specified-content
    height 200px
    white-space nowrap
    font-size 0
    .slide-page
      display inline-block
      height 200px
      width 100%
      line-height 200px
      text-align center
      font-size 26px
      &.page1
        background-color #95B8D1
      &.page2
        background-color #DDA789
      &.page3
        background-color #C3D899
      &.page4
        background-color #F2D4A7
  .description
    text-align center
  .btn-wrap
    margin-top 20px
    display flex
    justify-content center
    button
      margin 0 10px
      padding 10px
      color #fff
      border-radius 4px
      background-color #666

</style>
