<template>
  <div>
      <input type="text" v-model="item.group" ><button @click="SearchQa" to="/SearchQa">搜索</button>
  </div>
</template>

<script>
export default {
    name:'SearchQa',
    data(){
        return{
                  item:{}
        }
    },
    methods:{
          SearchQa(){
              console.log(this.item)
                    this.$http.get('http://47.106.89.101:8080/management/searchQA').then((res)=>{
                            this.item = res.data.data
                            console.log(res)
                            
                    })
                },
    }
}
</script>

<style>

</style>