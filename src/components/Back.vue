<template>
  <div class="container">                                   
	<table class="table table-striped table-bordered table-hover table-condensed">
		<thead>
			 <tr>
                <th>序号</th>
                <th>用户名</th>
                <th>反馈时间</th>
                <th>显示状态</th>
                <th>操作</th>
            </tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in Back" :key="index">
                <th>{{index}}</th>
                <th>{{item.accno}}</th>
                <th>{{item.editdatetime}}</th>
                <th>{{item.showout}}</th>
                <th><Button v-text="item.showout == true ? '隐藏' : '显示'" @click="EditBack(item)" type="success"></Button></th>
            </tr>
		</tbody>
	</table>
    <router-view></router-view>
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
import Home from '@/components/Home'
export default {
    name:"Back",
    data () {
            return {
                Back:[],
                Backdata:[],
                 page:'',
                size:'',
                pageNum:'',
                jump:''
            }
        },
        methods: {
            addBack(page){
                this.page=page
                this.$http.get("http://47.106.89.101:8080/management/getFeedback").then((res)=>{
                this.Back = res.data.data;
                 console.log(res.data)    
                // console.log(this)
                });
            },
            getBack(){
                this.$http.get("http://47.106.89.101:8080/management/getFeedback").then((res)=>{   
                    if (res.data.status == 1) {
                            this.Back = res.data.data
                            this.pageNum=res.data.pagenum;
                            this.size=res.data.size;
                            console.log(res.data)
                            console.log(res.data.size)
                            console.log(res.data.pagenum) 
                        } else {
                            console.log("菜单数据查询失败")
                        }    
                });
            },
            EditBack(item) {
                    this.$http.post("http://47.106.89.101:8080/management/updateFeedback", {
                        "feedbackUnionKey": {
                            "accno": item.accno,
                            "editdatetime": item.editdatetime
                        },
                        "showout": !item.showout
                    }).then((res) => {
                        if (res.data.status == 1) {
                            alert("修改成功")
                            this.getBack()
                        }
                    })
                },
            Jump(){
                    this.page=this.jump
                    this.getBack()
                },
            curPage(index){
                console.log(index)
                this.getBack(index)
            },
            prePack(){
                if(this.page>1){
                    this.page--
                    this.getBack(this.page)
                }
            },
            nextPack(){
                if(this.page<this.pageNum-1){
                    this.page++
                    this.getBack(this.page)
                }
            },
            Pages(){
                    return[1,2,3,4,5,6,'...',this.pageNum-1]
            }  
        },
        created(){
                this.getBack()
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