<template>
  <div class="home">
    <h1 class="red">{{_.random(5)}} :: {{rno}}</h1>
    <h1 class="red">{{_.upperFirst(_.camelCase('aaaaa-bbbbb'))}}</h1>
    <img alt="Vue logo" src="../assets/logo.png">

    <!-- <li v-for="(x,i) in tno" :key="i"> -->
    <li v-for="x in tno" :key="x.no">
      {{x.no}} : <input type="text" v-model="x.cno">
      <button @click.prevent="saveTno(x)">Save</button>
      
    </li>


    <todo-item ></todo-item>
    <ul id="example-1">
      <li v-for="(x, i) in items" :key="i">
        {{ x.message }}
      </li>
    </ul>

      <div v-for="xt in tmp" :key="xt">
        {{ xt }} 
      </div>

      

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
  , created () {
      this.getTno();
  }
  ,data ()  {
    return {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
      , msg :"aaaaa"
      , tno : []
      // , tmp : [11,21,31,41]
      , tmp : [11,21,31,41,51]
      , rno : this._.random(50)
    }
  }
  ,methods : {
    getTno () {
      this.$http.get('http://localhost:7000/apis/1').then( ret => {
        if (ret.status != 200) return [];
        console.log('tno=>', ret);
        this.tno = ret.data;
      });
    }
    ,saveTno(tno) {
      this.$http.put('http://localhost:7000/apis/1', tno).then( ret => {
        if (ret.status != 200) return [];
        console.log('saveTno.tno=>', ret);
        // this.tno = ret.data;
        // ret.affectedRows
      });
    }
  }
}
</script>

<style>
.red {color: red }
</style>