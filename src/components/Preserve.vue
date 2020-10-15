<template>
    <div >
        <div class="container">
        <!-- <Button type="success" to="/Preserve/SearchQa">查询</Button> -->
        <router-view name="SQA"></router-view>
        <table class="table table-striped table-bordered table-hover table-condensed">
		<thead>
			<tr>
                <th v-if="flag">多选</th>
                <th>指标号</th>
                <th>类别</th>
                <th>组别</th>
                <th>问题</th>
                <th>答案</th>
                <th>行为</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in menus" :key="item.itemno">
                    <td v-if="flag"><input type="checkbox" @click="chose(item.itemno)"> </td> 
                    <td>{{ item.itemno }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.group }}</td>
                    <td>{{ item.itemq }}</td>
                    <td>{{ item.itema }}</td>
                    <td>
                        <Button to="/Preserve/EditQa"  type="primary">修改</Button>
                        <!-- <Button @click="deleteQa(itemno)" type="error">删除</Button> -->
                    </td>
                    
			</tr>
		</tbody>
	</table>
    <Button @click="toggle" type="error">{{flag==true?msg_1:msg}}</Button>
     <Button @click="deleteQa(itemno)" type="error" v-if="flag">删除</Button>
    <Button to="/Preserve/AddQa" type="success">添加</Button>
    <router-view name="AQA"></router-view>
    <router-view name='EQA'></router-view>
        <nav aria-label="Page navigation" style="text-align:center;">
            <ul class="pagination">
                <li :class="page<=1?'disabled':''" @click="prePack">
                    <a  aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li :class="(index)==page?'active':''" v-for="index in Pages()" :key="index" @click="curPage(index)">
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
    </div>
</template>


<script>
export default {
    name:"Menu",
     data () {
            return {   
                menus: {},             
                itemno:[],
                page:0,
                size:'',
                pageNum:'',
                jump:'',
                flag:false,
                msg:'批量删除',
                msg_1:'取消'
            }
        },  
         methods: {
                // 拿到菜单中的类别，并保存菜单数据
                findQA(page) {
                    this.page=page||this.page
                    this.$http.get('http://47.106.89.101:8080/management/searchQA?page='+this.page).then((res)=>{
                            this.menus = res.data.data
                            this.pageNum=res.data.pagenum;
                            this.size=res.data.size;                          
                    })
                },
                Jump(){
                    console.log(this.jump)
                    this.page=this.jump
                    this.findQA(this.page)
                },
                chose(itemno){
                    this.itemno.push(itemno)

                },
                deleteQa(itemno){
                        // this.chose(itemno)
                         this.$http.post('http://47.106.89.101:8080/management/deleteQA', this.itemno).then(res => {
                        if (res.data.status === 1){                       
                             this.findQA()
                        }
 
        })

                },
            curPage(page){
                
                this.findQA(page)
            },
            prePack(){
                if(this.page>1){
                    this.page--
                    this.findQA(this.page)
                }
            },
            nextPack(){
                if(this.page<this.pageNum){
                    this.page++
                    this.findQA(this.page)
                }
            },
            Pages(){
                    return[1,2,3,4,5,6,'...',this.pageNum-1]
            } ,
            toggle(){
                this.flag=!this.flag
            }               
            },
           
            created() {
                this.findQA()
            }
           
    }
</script>

<style>
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
    th,td{
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