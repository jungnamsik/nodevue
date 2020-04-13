<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <todo-item ></todo-item>
    <ul id="example-1">
      <li v-for="x in items" v-bind:key="x">
        {{ x.message }}
      </li>
    </ul>

      <span v-for="x in 10" v-bind:key="x">
        {{ x }}
      </span>

      

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TodoItem from '@/components/todo-item'

export default {
  name: 'Home',
  components: {
    HelloWorld
    ,TodoItem
  }
  ,data ()  {
    return {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
      , msg :"aaaaa"
    }
  }
}
</script>
