<template>
   <div class="wrap">
        <form action="">
           <label class="label">组代码</label><input class="input_1" v-model="item.groupno" type="text" />
            <label class="label">类别</label><input class="input_1" v-model="item.category" type="text" />
            <label class="label">组别</label><input class="input_1" v-model="item.group" type="text" />
            <Button type="primary" @click="EditMenus" class="button">修改</Button>
            <Button type="success" to="/Menu">取消</Button>
        </form>
    </div>
</template>

<script>
export default {
    name:"EditMenus",
     data () {
            return {  
                item:{},
                itemno:[]
            }
     },
     methods:{
            EditMenus(){
                this.$http.post("http://47.106.89.101:8080/management/updateMenu",this.item).then(res=>{
                if (res.data.status === 1){
                    this.$router.push("/Menu")
                    alert("修改成功")
                }else{
                    console.log(res.data.message)
                }
                
                })
            }
     }, 
     created(){
         
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
    width:152px;
    display: inline-block;
    outline: none;
}
.label{
    color:#b4becc;
    font-size: 14px;
}
.button{
    margin-left: 30px;
}
</style>