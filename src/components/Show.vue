<template>
<div class="show">
  <div class="photo-container">
    <ImgDisplay :url="url" v-if="url!='' && url != null " />
    <!-- 如果 url 不是空的 也不是null 在把img傳給ImgDisplay  -->
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
    };
  },
  components: {
    ImgDisplay: ImgDisplay
  },
  created() {
    var that = this;
    var id = this.$route.params.id;
    var showUrl = "http://35.185.111.183/api/v1/photos/" + id;

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