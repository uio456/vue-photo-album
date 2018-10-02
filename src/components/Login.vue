<template>
<div class="login">
  <AuthPanel type="login" @auth-panel-submit="handleLogin" />
  <!-- type="login" 會傳入AuthPanel協助判斷狀態 -->
</div>
</template>

<script>
import AuthPanel from "@/components/AuthPanel";
import axios from "axios";

export default {
  components: {
    AuthPanel: AuthPanel
  },
  methods: {
    handleLogin: function(payload) {
      // payload 從AuthPanel 發送來。
      console.log("handleLogin");
      var that = this;
      var url = "http://35.185.111.183/api/v1/login";
      axios
        .post(url, payload)
        .then(function(res) {
          console.log("login success!");
          console.log(res.data.auth_token);
          console.log(payload);
          // save to localstorage
          var authToken = res.data.auth_token;
          var eamil = payload.email;
          var sessionData = { authToken: authToken, email: email };
          localStorage.setItem("photo-album-user", JSON.stringify(sessionData));
          // localStorage.setItem 可儲存在是Web瀏覽器中
          // 第一個參數是名稱，第二個參數是資料
          // 用JSON.stringify()將資料轉成JSON格式字串
          // 用JSON.parse(myJSON) 將資料轉回原本格式

          // emit auth-state to $bus
          // 發給 Index Header 接收
          that.$bus.$emit("auth-state", { action: "login" });
          // then go to index page
          that.$router.push("/");
        })
        .catch(function(err) {
          console.error(err.response.data.errors);
        });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
</style>