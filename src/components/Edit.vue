<template>
<div class="edit">
  <div class="photo-container">
    <ImgDisplay 
      :url="'http://35.185.111.183'+photo.file_location.url"
      v-if="photo.file_location"
     />
  </div>
  <div class="main-container">
    <PhotoForm
      :title="photo.title"
      :description="photo.description"
      :v-if="photo.title"
      @photo-form-submit="patchUpdate"
    />
  </div>
</div>
</template>
 <script>
import ImgDisplay from "@/components/ImgDisplay";
import PhotoForm from "@/components/PhotoForm";
import axios from "axios";
export default {
  components: {
    ImgDisplay: ImgDisplay,
    PhotoForm: PhotoForm
  },
  data: function() {
    return {
      photo: {}
    };
  },
  methods: {
    patchUpdate: function(payload) {
      var that = this;
      var id = this.$route.params.id
      var updateUrl = "http://35.185.111.183/api/v1/photos/" + id;
      var token = JSON.parse(localStorage.getItem("photo-album-user")).authToken;

      // pack params using FormData
      var params = new FormData();
      params.append("auth_token", token);
      params.append("title", payload.title);
      params.append("data", payload.data);
      params.append("description", payload.description);
      params.append("file_location", payload.file_location);

      // get data from api
      axios
      .patch(updateUrl, params, {
        headers: {
          "Content-Type": "multipart/form-data"
          // 上傳圖片檔案時通常使用 multipart/form-data，axios 預設是使用 application/x-www-form-urlencoded，需手動定義。
        }
      })
      .then(function(res) {
        that.$router.push("/photos/" + res.data.result.id);
      })
      .catch(function(err) {
        console.error(err.response.data);
      })
    }
  },
  created() {
    var that = this;
    var id = this.$route.params.id;
    // this.$route.params.id 類似 rails params[:id]
    // 可拿取網址中 :id 參數
    var url = "http://35.185.111.183/api/v1/photos/" + id;

    var token = JSON.parse(localStorage.getItem("photo-album-user")).authToken;
    var params = { auth_token: token };

    axios
    .get(url, { params })
    .then(function(res) {
      that.photo = res.data;
      that.title = res.data.title
      that.description = res.data.description
      console.log(res.data);
      // console.log(that.title);
      // console.log(that.description);
    })
    .catch(function(err) {
      console,error(err.response.data);
    })
  }
};
</script>
 <style scoped>
.edit {
  display: flex;
  justify-content: center;
}
 .photo-container {
  padding-top: 100px;
  margin-right: 50px;
}
 .main-container {
  padding-top: 100px;
}
</style>