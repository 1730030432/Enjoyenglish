<template>
    <div class="wrap">
        <form>
            <label class="label">类别</label><input class="input_1" v-model="item.category" type="text" />
            <label class="label">组别</label><input class="input_1" v-model="item.group" type="text" />     
            <Button type="warning" @click="addInfo" class="button">添加</Button>
            <Button type="success" to="/Menu">取消</Button>
        </form>
    </div>
</template>

<script>
export default {
    name:'AddMenus',
    data(){
        return{
            menus:{},
            item:{}
        }
    },
    methods :{
        findMenus() {
                    this.$http.get('http://47.106.89.101:8080/management/searchMenu').then((res)=>{
                            this.menus = res.data.data
                                                    
                    })
                },   
        addInfo(){
           console.log(this.item)
            this.$http.post("http://47.106.89.101:8080/management/addMenu",this.item).then(res=>{
                console.log(res)
                if(res.data.status==1){
                    this.$router.push("/Menu")
                    this.findMenus()
                     alert("添加成功")
                }
            })
        }
            
        
    },
    created(){
        this.findMenus()
    }
}
</script>

<style scope>
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
    margin-left: 20px;
}
</style>