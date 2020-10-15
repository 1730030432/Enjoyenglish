<template>
    <div >
        <div class="container">
        <table class="table table-striped table-bordered table-hover table-condensed">
		<thead>
			<tr>
                <th v-if="flag">多选</th>
                <th>组代码</th>
                <th>类别</th>
                <th>组别</th>
                <th>行为</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in menus" :key="item.itemno">
                    <td v-if="flag"><input type="checkbox" @click="chose(item.groupno)"> </td> 
                    <td>{{ item.groupno }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.group }}</td>  
                    <td><Button @click="Dmenus(item.groupno)" type="error">删除</Button></td>              
			</tr>
		</tbody>
	</table>
    <Button @click="toggle" type="error" class="button_1">{{flag==true?msg_1:msg}}</Button>
    <!-- <Button @click="Dmenus(groupno)" type="error" v-if="flag" class="button_1">删除</Button> -->
    <Button to="/Menu/AddMenus" type="warning">添加</Button>
    <Button to="/Menu/EditMenus" type="info">修改</Button>
    <router-view name="Add"></router-view>
    <router-view name="Edit"></router-view>
    </div>
    </div>
</template>


<script>
export default {
    name:"Menu",
     data () {
            return {   
                menus: {},             
                groupno:[],
                flag:false,
                msg:'批量删除',
                msg_1:'隐藏'
            }
        },  
         methods: {
                // 拿到菜单中的类别，并保存菜单数据
                findMenus() {
                    this.$http.get('http://47.106.89.101:8080/management/searchMenu').then((res)=>{
                            this.menus = res.data.data
                                                    
                    })
                },   
            chose(groupno){                   
                    this.groupno.push(groupno)
                },
            Dmenus(groupno){
                 this.chose(groupno)
                this.$http.post('http://47.106.89.101:8080/management/deleteMenu', this.groupno).then(res => {
                        if (res.data.status === 1){
                         this.findMenus()
                        }
                });
            }, 
            toggle(){
                this.flag=!this.flag
            } ,            
            },
           
            created() {
                this.findMenus()
            }
           
    }
</script>

<style scoped>
th,td{
        text-align: center;
    }
.button_1{
    margin: 20px;
}
</style>