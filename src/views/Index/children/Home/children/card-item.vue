<template>
  <div class="container">
    <div class="box-card" v-for="(item,index) in homeCardData" :key="index">
      <el-card class="left-color" :style="{ 'background-color': item.color }">
        <i class="icon-size" :class="item.icon"></i>
      </el-card>
      <div class="right-div">
        <div :style="{ color: item.color }"> {{ item.count }} </div>
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'card-item',
    props:["homeCardData"]
  }
</script>

<style scoped>
   .container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0;
   }
   .box-card{
    min-width: 200px;
    width: 25%;
    background-color: #FFF;
    transition: all 0.25s ease-in-out;
    display: flex;
    flex-direction: row;
    border-radius: 5px;
  }
  .box-card:nth-child(2),
  .box-card:nth-child(3),
  .box-card:nth-child(4){
    margin-left: 25px;
  }
  .box-card:hover{
    /* box-shadow: h-shadow v-shadow blur spread color inset;
    h-shadow 必需。水平阴影的位置。允许负值。（正值是在右边，负值是在左边）
    v-shadow 必需。垂直阴影的位置。允许负值。 （正值是在下边，负值是在上边）
    blur 可选。模糊距离。 （阴影的覆盖面积）
    spread 可选。阴影的尺寸。 （阴影的尺寸）
    color 可选。阴影的颜色。请参阅 CSS 颜色值。 （阴影的颜色）
    inset 可选。将外部阴影 (outset) 改为内部阴影。** （默认是外部，内部阴影和外部阴影的设置） */
    /*  h-shadow,v-shadow设为0px,实现四周阴影 */
    box-shadow: 0px 0px 10px rgb(170, 170, 170);

  }
  .icon-size{
    font-size: 50px;
    color: #FFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .public{
    margin-left: 30px;
  }
  .left-color{
    min-width: 60px;
    width: 60%;
    height: 100px;
    /* background-color: #2D8CF0; */
  }
  .right-div{
    min-width: 100px;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .right-div div:first-child{
    font-size: 28px;
    margin-bottom: 10px;
    /* color: #2D8CF0; */
  }
  .right-div div:nth-child(2){
    font-weight: bold;
    color: #888;
  }
</style>
