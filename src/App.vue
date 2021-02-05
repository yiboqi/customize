<template>
    <div id="app">
      <Index/>
    </div>
</template>

<script>
import Index from './views/Index/Index'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
@import "assets/css/base.css";
#app{
  height: 100%;
}
</style>
