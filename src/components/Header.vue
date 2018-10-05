<template>
<div class="header">
  <h1 @click="handleTitleClick">{{ title }}</h1>
  <p class="new-photo-btn btn" @click="handleNewPhotoClick">New Photo</p>
  <div class="user-unlogin-container" v-if="!isLogin"> <!-- 如果是false 就顯示這裡 (default 是 false) -->
    <p class="login-btn btn" @click="handleLogin">Login</p>
    <p class="signup-btn btn" @click="handleSignUp">Sign up</p>
  </div>
  <div class="user-login-container" v-else>
    <p class="user-email">{{ userEmail }}</p>
    <p class="login-btn btn" @click="handleLogout">Log out</p>
  </div>
</div>
</template>
 <script>
import axios from "axios";
export default {
  data() {
    return {
      title: "Photo Album",
      isLogin: false,
      userEmail: ""
    };
  },
  methods: {
    handleTitleClick: function() {
      this.$router.push("/");
    },
    handleNewPhotoClick: function() {
      this.$router.push("/photos/new");
    },
    handleSignUp: function() {
      this.$router.push("/signup");
    },
    handleLogin: function() {
      this.$router.push("/login");
    },
    handleLogout: function() {
      console.log("logout");
      var sessionData = JSON.parse(localStorage.getItem("photo-album-user"));
      if (sessionData == null) {
        return;
      }
      var token = sessionData.authToken;
      var url = "http://35.185.111.183/api/v1/logout";
      axios
        .post(url, { auth_token: token })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.error(err.response.data.errors);
      });
      this.$bus.$emit("auth-state", { action: "logout" });
      // 上面這行可以拿掉，因為底下那行就會移除 user 資料了。
      localStorage.removeItem("photo-album-user");
      this.$router.push("/login");
    },
    handleAuthState: function(payload) {
      console.dir(payload);
      var action = payload.action;
      if (action === "login") {
        this.isLogin = true;
        this.userEmail = JSON.parse(
          localStorage.getItem("photo-album-user")
          ).email._value;
      } else {
        this.isLogin = false;
        this.userEmail = "";
      }
    }
  },
  created() {
    // subscribe 'auth-state' event from $bus
    var that = this;
    this.$bus.$on("auth-state", this.handleAuthState);
    // check auth state form local storage
    var sessionData = JSON.parse(localStorage.getItem("photo-album-user"));
    if (sessionData) {
      this.handleAuthState({ action: "login" });
    } else {
      this.handleAuthState({ action: "logout" });
    }
  },
  beforeDestroy: function() {
    // 如果不解除監聽每次到Header 都會在監聽一次？影響效能？
    this.$bus.$off("auth-state", this.handleAuthState)
  }
};
</script>
 <style scoped>
.header {
  height: 60px;
  width: 100%;
  background-color: #e7e7e7;
  border-bottom: 2px solid #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 .header h1 {
  font-size: 26px;
  padding-left: 25px;
  margin: 0;
  color: #404040;
}
 .header h1:hover {
  cursor: pointer;
  color: #000;
}
 .user-email {
  font-size: 18px;
  margin-right: 30px;
}
 .new-photo-btn {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
  margin-left: 30px;
  margin-right: auto;
}
 .user-unlogin-container {
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
 .user-login-container p {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
}
 .user-login-container {
  height: 100%;
  width: auto;
  margin-right: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
 .user-unlogin-container p {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
}
 .btn:hover {
  cursor: pointer;
  color: #000;
}
 @media (max-width: 772px) {
  .header h1 {
    display: none;
  }
}
</style>