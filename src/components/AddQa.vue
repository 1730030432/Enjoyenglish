<template>
  <div class="wrap">
        <form action="">
            <label class="label">类别</label><input class="input_1" v-model="item.category" type="text" />
            <label class="label">组别</label><input class="input_1" v-model="item.group" type="text" />
            <label class="label">问题</label><input class="input_1" v-model="item.itemq" type="text" />
            <label class="label">答案</label><input class="input_1" v-model="item.itema" type="text" />
            <Button type="warning" @click="addQa" class="button">添加</Button>
            <Button type="success" to="/Preserve">取消</Button>
        </form>
    </div>
</template>

<script>
export default {
    name:'AddQa',
    data(){
        return{
            item:{},
            menus:{}
        }
    },
    methods:{
        findQA() {
                    
                    this.$http.get('http://47.106.89.101:8080/management/searchQA?page='+this.page).then((res)=>{
                            this.menus = res.data.data                        
                    })
                },
        addQa(){       
             this.$http.post("http://47.106.89.101:8080/management/addQA",this.item).then(res=>{
                 if(res.data.status==1){
                     console.log(res)
                     this.findQA()
                     this.$router.push("/Preserve")
                 }else{
                     alert("添加失败")
                 }
                
            })
        }
    },
    created(){
        this.findQA()
    }
}
</script>

<style scoped>
    .wrap{
    width: 1200px;
    height: 80px;
    margin-top: 30px;
}
.input_1{
    border: 0 ;
    border-bottom: 1px solid #b4becc;
    box-shadow: inset 0px -1px 0px 0px #a4bad8;
    width:170px;
    display: inline-block;
    outline: none;
}
.label{
    color:#b4becc;
    font-size: 14px;
}
.button{
    margin-left: 100px;
}
</style>