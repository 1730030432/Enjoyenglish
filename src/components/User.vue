<template>
   <div class="container">                                     
	<table class="table table-striped table-bordered table-hover table-condensed">
		<thead>
			<tr>
                <th v-if="flag">多选</th>
				<th>用户名</th>
                <th>账号</th>
                <th>电话号码</th>
                <th>日期</th>
                <th>操作</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in User" :key="item.accno">
                    <th v-if="flag"><input type="checkbox" @click="chose(item.accno)"> </th> 
                    <th>{{ item.accno }}</th>
                    <th>{{ item.name }}</th>
                    <th>{{ item.telno }}</th>
                    <th>{{ item.registerdatetime }}</th>    
                    <th>
                        <Button @click="Dinfo(item.accno)" type="error">删除</Button>
                        <Button to="/User/EditUser"  type="primary">修改</Button>
                    </th>
			</tr>
		</tbody>
	</table>
    <Button @click="toggle" type="error">{{flag==true?msg_1:msg}}</Button>
    <Router-view name="Uedit"></Router-view>
     <nav aria-label="Page navigation" style="text-align:center;">
            <ul class="pagination">
                <li :class="page<=1?'disabled':''" @click="prePack">
                    <a  aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li :class="(index-1)==page?'active':''" v-for="index in pageNum" :key="index" @click="curPage(index-1)">
                    <a>{{index}}</a>
                </li>
                <li :class="page>=pageNum?'disabled':''" @click="nextPack">
                    <a aria-label="Next" >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
                <input v-model="jump" class="input"><a @click="Jump()"><span class="span">跳转</span></a>
            </ul>
        </nav>
    
</div>
     
</template>

<script>
export default {
    name:"User",
     data () {
            return {
                User:[],
                accno:[],
                page:0,
                size:'',
                pageNum:[this.pagenum],
                jump:'',
                flag:false,
                msg:'批量删除',
                msg_1:'取消'
            }
        },  
        methods: {
            FindAllInfo(page){
                 this.page=page
                 this.$http.get("http://47.106.89.101:8080/management/getUser?page="+this.page).then((res)=>{
                 this.User = res.data.data;
                 this.pageNum=res.data.pagenum;
                 this.size=res.data.size;
                 });
            },
            chose(accno){                   
                    this.accno.push(accno)
                },
            Dinfo(accno){
                this.chose(accno)
                this.$http.post('http://47.106.89.101:8080/management/deleteUser', this.accno).then(res => {
                        if (res.data.status === 1){
                         this.FindAllInfo()
                        }
                });
            },
            toggle(){
                this.flag=!this.flag
            } ,
            Jump(){
                    this.page=this.jump-1
                    this.FindAllInfo(this.page)
                },
            curPage(index){
                console.log(index)
                this.FindAllInfo(index)
            },
            prePack(){
                if(this.page>1){
                    this.page--
                    this.FindAllInfo(this.page)
                }
            },
            nextPack(){
                if(this.page<this.pageNum-1){
                    this.page++
                    this.FindAllInfo(this.page)
                }
            },
            Pages(){
                    return[1,2,3,4,5,6,'...',this.pageNum-1]
            }  
        },
        created(){
                  this.FindAllInfo()
            }
        
}   
    
</script>

<style scoped>    
    .input{
        width: 30px;
        height: 33px;
        margin-left: 10px;
        border: 1px solid #d2d5d5;
        outline: none;
        text-indent: 7px;
    }
    .input:hover{
        width: 30px;
        height: 33px;
        margin-left: 10px;
        border: 1px solid #d2d5d5;
        box-shadow: 0 0 5px #d2d5d5;
        text-indent: 7px;
    }
    th{
        text-align: center;
    }
    .span{
        font-weight: bold;
        color: #23658b;
        margin-left: 5px;
    }
    .span:hover{
        font-weight: bold;
        color: #227caf;
        margin-left: 5px;
    }
</style>