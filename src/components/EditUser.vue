<template>
   <div class="wrap">
        <form action="">
            <label class="label">用户名</label><input class="input_1" v-model="item.accno" type="text" />
            <label class="label">密码</label><input class="input_1" v-model="item.password" type="text" />
            <label class="label">账号</label><input class="input_1" v-model="item.name" type="text" />
            <label class="label">电话号码</label><input class="input_1" v-model="item.telno" type="text" />
            <Button type="primary" @click="EditUser" class="button">修改</Button>
            <Button type="success" to="/User">取消</Button>
        </form>
    </div>
</template>

<script>
export default {
    name:"EditQa",
     data () {
            return {  
                item:{},
                accno:[]
            }
     },
     methods:{
            // FindAllInfo() {
            //         this.$http.get('http://47.106.89.101:8080/management/getUser').then((res)=>{
            //                 this.item = res.data.data
            //         })
            //     },
            EditUser(){
                this.$http.post("http://47.106.89.101:8080/api/updateUser",this.item).then(res=>{
                console.log(res.data)
                if (res.data.status === 1){
                    // this.FindAllInfo()
                    this.$router.push("/User")
                    alert("修改成功")
                }
                
                })
            }
     }, 
     created(){
        //  this.FindAllInfo()
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