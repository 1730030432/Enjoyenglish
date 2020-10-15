<template>
   <div class="wrap">
        <form action="">
            <label class="label">指标号</label><input class="input_1" v-model="item.itemno" type="text" />
            <label class="label">类别</label><input class="input_1" v-model="item.category" type="text" />
            <label class="label">组别</label><input class="input_1" v-model="item.group" type="text" />
            <label class="label">问题</label><input class="input_1" v-model="item.itemq" type="text" />
            <label class="label">答案</label><input class="input_1" v-model="item.itema" type="text" />
            <Button type="primary" @click="EditQa" class="button">修改</Button>
            <Button type="success" to="/Menu">取消</Button>
        </form>
    </div>
</template>

<script>
export default {
    name:"EditQa",
     data () {
            return {  
                item:{},
                itemno:[]
            }
     },
     methods:{
            findQA() {
                    this.$http.get('http://47.106.89.101:8080/management/searchQA').then((res)=>{
                            this.menus = res.data.data
                    })
                },
            EditQa(){
                this.$http.post("http://47.106.89.101:8080/management/updateQA",this.item).then(res=>{
                console.log(res.data)
                if (res.data.status === 1){
                    this.findQA()
                    this.$router.push("/Preserve")
                    alert("修改成功")
                }
                
                })
            }
     }, 
     created(){
         this.findQA()
     }
}
</script>

<style scope>
.wrap{
    width: 1200px;
    height: 80px;
    margin-top: 20px;
}
.input_1{
    border: 0 ;
    border-bottom: 1px solid #b4becc;
    box-shadow: inset 0px -1px 0px 0px #a4bad8;
    width:140px;
    display: inline-block;
    outline: none;
}
.label{
    color:#b4becc;
    font-size: 14px;
}
.button{
    margin-left: 16px;
}
</style>