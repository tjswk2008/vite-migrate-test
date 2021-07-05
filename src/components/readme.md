* 所有移动端的插件单位均为rem, 以750px宽度为基准，1rem = 100px

* alert
  
  * 参数: content，title(默认值为提示)
  
  * 直接使用
    
    ```javascript
    import alert from '~/components/Alert';
    
    alert('test alert').then(res => {
     console.log(res);
    });
    ```
  
  * 绑定至vue prototype
    
    ```javascript
    import alert from '~/components/Alert';
    import Vue from 'vue';
    
    Vue.prototype.$alert = alert;
    
    this.$alert('test alert').then(res => {
     console.log(res);
    });
    ```

* confirm
  
  * 直接使用
    
    ```javascript
    import confirm from '~/components/Confirm';
    
    confirm('test confirm').then(res => {
     console.log(res);
    });
    ```
  
  * 绑定至vue prototype
    
    ```javascript
    import confirm from '~/components/Confirm';
    import Vue from 'vue';
    
    Vue.prototype.$confirm = confirm;
    
    this.$confirm('test confirm').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    });
    ```

* autoscroll (自动滚动的列表，常用于展示中奖人列表)
  
  ```javascript
  <template>
    <AutoScroll class="scroll">
      <div class="list" v-for="(v, i) in list" :key="i" tag="li">
        <div class="film-list__img">
          <img :src="v.image" alt="" />
        </div>
      </div>
    </AutoScroll>
  </template>
  
  import AutoScroll from '~/components/AutoScroll/autoscroll.vue'
  
  export default {
      components: {
          AutoScroll
      }
  }
  ```

* scroller (上拉加载更多组件)
  
  * 参数: 
    
    * dataList: 数据列表
    
    * is-end: 数据是否加载完毕
    
    * onPullUp: 上拉加载回调函数
  
  ```javascript
  <template>
    <Scroller
      class="scroll"
      ref="scroll"
      :dataList="filmList"
      :is-end="loaded"
      @onPullUp="pullUpHandle"
    >
      <div class="list" v-for="(v, i) in list" :key="i" tag="li">
        <div class="film-list__img">
          <img :src="v.image" alt="" />
        </div>
      </div>
    </Scroller>
  </template>
  
  import Scroller from '~/components/scroller.vue';
  
  export default {
    components: {
      Scroller
    }
  }
  ```

* datepicker
  
  * 参数:
    
    * props-show: 是否展示日期弹窗
    
    * initialDate: 日期初值
    
    * startYear: 起始年，即可选的最小年份，默认值为2000
    
    * endYear: 可选年份的最大值，默认为2049
    
    * confirm: 确定按钮文字，type: String
    
    * setDialogVisible: 设置弹窗是否可见的函数
    
    * setDate: 接受到日期弹窗选中值的处理函数
  
  ```javascript
  <date-picker
    :props-show="showStart"

    v-on:setDialogVisible="(val) => showStart = val"

    v-on:setDate="setStart"

    :initialDate="startDate"

  ></date-picker>
  
  import datePicker from '~/components/DatePicker/datepicker.vue';
  
  export default {
    components: {
      datePicker
    },
    data() {
      return {
        showStart: false,
        startDate: '请选择开始日期',
      }
    },
    methods: {
      setStart(val) {

        this.startDate = `${val.year}-${val.month}-${val.day}`;

      },
    }
  }
  ```

* orientation - 横屏状态下提示旋转手机的组件
  
  ```javascript
  <Orientation></Orientation>
  
  import Orientation from '~/components/Orientation/orientation.vue';
  
  export default {
    components: {
      Orientation
    }
  }
  ```

* loading
  
  ```javascript
  <Loading v-if="loading"></Loading>
  
  import Loading from './components/loading.vue';
  
  export default {
    components: {
      Loading
    }
  }
  ```
