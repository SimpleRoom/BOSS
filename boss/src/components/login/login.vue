<template>
    <div class="login-bg">
      <div id="login">
        <form action="">
          <h3>BOSS直聘</h3>
          <ul class="info-login">
            <li><b>{{lable}}<i class="icon-down"></i></b><input type="text" v-model="userules.userid" placeholder="用户名"></li>
            <li><span></span><input type="password" v-model="userules.userpwd" placeholder="密码"><b>获取验证码</b></li>
            <li><input @click.prevent="infologin" type="submit" value="进入"></li>
          </ul>
        </form>
      </div>
      <!--底部-->
      <div class="login-footer flex_parent">
        <router-link to="" class="flex_child"><span>用户协议</span></router-link>
        <router-link to="" class="flex_child"><span>密码登录</span></router-link>
      </div>
    </div>
</template>

<script>
  import Store from "../../js/userstore"
    export default {
        data () {
            return {
                isNhad:false,
                userlist:[],
                //1用户信息
                userules:{
                  userid:"",
                  userpwd:""
                },
                lable:"+86"
            }
        },
        components:{
        },
        watch:{
          '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
          },
          userlist:{
            handler:function(items){
              Store.save(items);
            },
            deep:true
          }
        },
        methods: {
          infologin(){
              let _self=this;
              let users=Store.fetch();
              users.forEach(function (i) {
                if(_self.userules.userid===i.userid&&_self.userules.userpwd===i.userpwd){
                    _self.$router.push({
                      path:"/home"
                    });
                    //console.log(_self.$router);
                    //console.log("登录成功");
                }else{
                    alert("用户名与密码不匹配！")
                }
              });
          },
          adduser(){
              //注册用户，如果已经被注册
            let _self=this;
            _self.haduser();
            if(_self.isNhad&&_self.userules.userid&&_self.userules.userpwd){
              _self.userlist.push({
                userid:_self.userules.userid,
                userpwd:_self.userules.userpwd
              });
              console.log(_self.userlist)
            }
          },
          // 过滤注册的用户是否已经存在
          haduser(){
              let _self=this;
              let items=Store.fetch();
              let len=items.length;
              items.forEach(function (i) {
                  if(_self.userules.userid!==i.userid){
                      _self.isNhad=true;
                  }else{
                    _self.isNhad=false;
                  }
               //console.log(i.userid);
              });
          }
        },
        mounted(){
            //加载之前先给一个可以登录的用户
          let _self=this;
          let admin={
            userid:"13800000000",
            userpwd:"123456"
          };
          _self.userlist.push(admin);
          _self.userules.userid=admin.userid;
          _self.userules.userpwd=admin.userpwd;
          //console.log("aaa");
        }
    }

</script>

<style lang="scss" scoped>
  @import "../../styles/login.scss";

</style>