<template>
  <div id="app">
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"><h1>乐享英语</h1></div>
                    <div class="layout-nav">
                        <a href="#/login" class="acli">登录</a>
                        <a @click="login_out" class="acli">登出</a>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Content>
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1" width=200px>
                                <MenuGroup title="后台管理">
                                    <div class="nav">
                                        <Icon type="md-contacts" />
                                        <a href="#/User">用户个人资料</a>
                                    </div>
                                    <div class="nav" >
                                        <Icon type="md-chatbubbles" />
                                        <a href="#/Menu">菜单管理</a>
                                    </div >
                                    <div class="nav">
                                        <Icon type="md-construct" />
                                        <a href="#/Preserve">乐享英语维护</a>
                                    </div>
                                    <div class="nav">
                                        <Icon type="md-text" />
                                        <a href="#/Back">用户反馈</a>
                                    </div>
                                </MenuGroup>
                            </Menu>
                        </Sider>
                        <Content class="content_1">
                            <router-view></router-view>
                        </Content>  
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return{
          flag:false
      }
  },
  methods:{
       login_out(){
            this.$http.get('http://47.106.89.101:8080/logout').then((res)=>{
                                         if(res.data.status==1){
                                              this.$router.push("/")
                                             alert("登出成功")
                                         }          
                    })
        },
         login(){
            this.$http.get('http://47.106.89.101:8080/login').then((res)=>{
                                         if(res.data.status==1){
                                             alert("d")
                                         }          
                    })
        },
  }
}
</script>

<style scoped>
a{
    
    color:grey;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    height: 720px;

}
.layout-logo h1{ 
    position: relative;
    color:white;
    top: 12px;
    left: 20px;
    float: left;
    font-size: 30px;
    letter-spacing: 10px;
    font-family: 'handsome'; 
}
.layout-nav{
    width: 220px;
    margin: 0 auto;
    margin-right: 0px;    
    position: relative;
    top:15px;
    
}
.nav{
    margin: 30px;
}
.layout-nav a{
    color: white;
    font-family: handsome;
    
}
.layout-footer-center{
    text-align: center;
    position:absolute;
    top: 630px;
    left: 600px;
}
.content_1{
    padding-left: 20px;
    min-height: 580px;
    background: '#fff';
    padding-top:60px;
}
.acli{
    
    margin: 20px;
}
</style>
