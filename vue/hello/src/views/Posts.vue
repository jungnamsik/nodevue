<template>
    <div>
        <h1>This is Posts</h1>
        <ul>
            <li v-for="x in posts" :key="x.id">
                {{x.id}} : {{x.name}}:{{x.info}}
            </li>

        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return  {
            posts : [
                 {id:1, name:'jns1', info:'abcd'}
                ,{id:2, name:'jns2', info:'efg'}
                ,{id:3, name:'jns3', info:'dddd'}
            ]

        }
    }
}
</script>