<template>
<div class="container">
  <div class="item-list" v-for="(photo, index) in photos" :key="photo.id">
    <!-- 把拿到的 photos 陣列一個一個轉出來成photo -->
    <item-list-element 
      :isLogin="isLogin"
      :id ="photo.id"
      :title ="photo.title"
      :description ="photo.description"
      :url ="'http://35.185.111.183'+photo.file_location.url" 
      @destroy-item="handleDestroyItem(index)"
      />
      <!-- :id :title 設定這樣就能直接傳到子原件？(ItemListElement.vue) -->
  </div>
</div>
</template>
 <script>
import ItemListElement from "@/components/ItemListElement";
import axios from "axios";
export default {
  data: function() {
    return {
      isLogin: false,
      photos: []
    };
  },
  components: {
    ItemListElement: ItemListElement
  },
  methods: {
    handleAuthState: function(payload) {
      var action = payload.action;
      if (action == "login") {
        this.isLogin = true;
      } else if (action == "logout") {
        this.isLogin = false;
      }
    },
    handleDestroyItem: function(index) {
      console.log("delete photo" + index);
      this.photos.splice(index, 1);
    }

  },
  created() {
    this.$bus.$on("auth-state", this.handleAuthState);
    // $bus.$on 接收login.vue 跟 header.vue 裡的 logout 發出的 $emit
    // 啟動上方的 handleAuthState 方法。
    var sessionData = JSON.parse(localStorage.getItem("photo-album-user"));
    if (!!sessionData) {
      // 兩個驚嘆號的原因是？
      this.handleAuthState({ action: "login" });
    } else {
      this.handleAuthState({ action: "logout" });
    }

    // get photos from api
    var indexUrl = "http://35.185.111.183/api/v1/photos";
    var hostUrl = "http://35.185.111.183/";
    var that = this;
    axios
    .get(indexUrl, {})
    .then(function(res) {
      that.photos = res.data.data;
      console.log(res.data.data);
      console.log(res.data);
    })
    .catch(function(err) {
      console.error(err.response.data);
    }); 
  },
  beforDestroy() {
    this.$but.$off("auth-state", this.handleAuthState);
  }
};
</script>
<style scoped>
.container {
  max-width: 1440px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
}
 .item-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin-bottom: 60px;
}
 @media (max-width: 993px) {
  .photo-container-wrapper {
    width: 33.333%;
  }
}
 @media (max-width: 769px) {
  .photo-container-wrapper {
    width: 50%;
  }
}
 @media (max-width: 577px) {
  .photo-container-wrapper {
    width: 100%;
  }
}
</style>