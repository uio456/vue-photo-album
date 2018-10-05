<template>
<div class="show">
  <div class="photo-container">
    <ImgDisplay :url="url" v-if="url!='' && url != null " />
    <!-- 如果 url 不是空的 也不是null 在把img傳給ImgDisplay  -->
    <!-- 這裡傳給ImgDisplay的url，需跟遠端要資料，可能有時間差，所以加一個 v-if輔助正確顯示資料 -->
  </div>
  <div class="main-container">
    <h3 class="main-title">{{title}}</h3>
    <p class="main-date">{{date}}</p>
    <p class="main-description">{{description}}</p>
  </div>
</div>
</template>
 <script>
import ImgDisplay from "@/components/ImgDisplay";
import axios from "axios";
export default {
  data: function() {
    return {
      title: "",
      description:
        "",
      url: "",
      date: ""
      // 這裡雖然是空的，但有透過 axios 在crated() 向遠端API拿取資料
    };
  },
  components: {
    ImgDisplay: ImgDisplay
  },
  created() {
    var that = this;
    var id = this.$route.params.id;
    var showUrl = "http://35.185.111.183/api/v1/photos/" + id;

     // get token if user logged in
     // 雖然沒有login 就不會有show button 可以按
     // 但多一個判斷式可以增加保險。
    if (localStorage.getItem("photo-album-user")) {
      var token = JSON.parse(localStorage.getItem("photo-album-user")).authToken;
      var params = { auth_token: token };
    }

    axios
    .get(showUrl, { params })
    .then(function(res){
      that.title = res.data.title;
      that.data = res.data.data;
      that.description = res.data.description;
      that.url = "http://35.185.111.183" + res.data.file_location.url;
      console.log(res.data);
    })
    .catch(function(err) {
      console.error(err.response.data);
      that.$router.push("/login");
    })
  }
};
</script>
 <style scoped>
.show {
  display: flex;
  justify-content: center;
  align-items: center;
}
 .photo-container {
  padding-top: 100px;
  padding-right: 50px;
}
 .main-container {
  width: 500px;
  padding-top: 100px;
  margin-bottom: auto;
}
 .main-title {
  font-size: 43px;
  margin-top: 0;
  margin-bottom: 0;
}
 .main-date {
  font-size: 24px;
}
 .main-description {
  font-size: 20px;
}
</style>