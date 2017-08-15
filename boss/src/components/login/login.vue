<template>
    <div id="login">
      <form action="">
        <h3>BOSS</h3>
        <ul class="info-login">
          <li><label for="">用户:</label><input type="text" v-model="userules.userid" placeholder="用户名"></li>
          <li><label for="">密码:</label><input type="password" v-model="userules.userpwd" placeholder="密码"></li>
          <li><input @click.prevent="infologin" type="submit" value="登录"></li>
          <li><input @click.prevent="adduser" type="button" value="注册"></li>
        </ul>
      </form>
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
                }
            }
        },
        watch:{
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
            userid:"jianfei",
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
  @import "../../styles/mixin.scss";
  #login{
    @include center;
    width: 8rem;
    box-sizing: border-box;
    padding: 3%;
    border-radius: .1rem;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 .2rem #cac6c6;
    & h3{
      text-align: center;
      margin-bottom: .2rem;
      @include sc(.6rem,$vuecolor);
    }
  }
  .info-login li{
    height: .8rem;
    margin-top: 4%;
    line-height: .8rem;
    & label{
      @include sc(.3rem,#999);
    }
    & input{
      @include sc(.3rem,#999);
      background-image: none;
      transition:all .3s;
    }
    & input[type=text],input[type=password]{
      width: 80%;
      line-height: .7rem;
      margin-left:4%;
      border: 1px solid #ccc;
      padding-left:3%;
      border-radius: .1rem;
    }
    & input[type=text]:focus,input[type=password]:focus{
      border-color: $vuecolor;
    }
    & input[type=submit],input[type=button]{
      width: 100%;
      height: 100%;
      color: #fff;
      cursor: pointer;
      background-color: $vuecolor;
      border: 1px solid $vuecolor;
      border-radius: .1rem;
      -webkit-appearance: none;
      white-space: nowrap;
    }
    & input[type=submit]:hover,input[type=button]:hover{
      background-color: #42AA83;
    }
  }

</style>