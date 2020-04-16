Vue.component("product", {
  template: `<div class="product">
    <!--Ảnh sản phẩm-->
    <div class="product-image">
        <img v-bind:src="image" alt="Tất" srcset="">
    </div>

    <!--Thông tin sản phẩm sử dụng computed-->
    <div class="product-info">
        <h1>{{titleProduct}}</h1>
        <span v-show="onSale">Giảm giá</span>
        <p>Phí ship của khác hàng: {{Shipping}}</p>
    </div>
    <hr>

    <!--Cú pháp điều kiện-->
    <div class="dieuKien">
        <p v-if="inStock">Còn trong kho</p>
        <p v-else>Hết hàng</p>
    </div>

    <hr>
    <!--Chi tiết sản phẩm-->
    <ul>
        <li v-for="(item, index) in details" :key="index">{{item}}</li>
    </ul>
    <hr>
    <!--Kết xuất danh sách cho đối tượng-->
    <!--Rằng buộc thuộc tính style và class-->
    <div class="color-box"
    v-for="(item, index) in variants" 
    :key="item.variantID"
    :style="{backgroundColor:item.variantColor}"
    >
        <p @mouseover="doiHinhIndex(index)">{{item.variantColor}}</p>
    </div>
    <hr>

    <div class="gioHang">
        <button 
        :disabled="!inStock" 
        @click="themGioHang"
        :class="{disabledButton:!inStock}"
        >Mua thêm hàng</button>
        <button @click="traHang">Trả sản phẩm</button>
        &nbsp;
    </div> 
</div>
`,
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      product: "Socks",
      soLuong: 10,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantID: 198,
          variantColor: "green",
          variantImage: "./assets/tatden.jpeg",
          variantQuantity: 10,
        },
        {
          variantID: 199,
          variantColor: "red",
          variantImage: "./assets/tatxanh.jpeg",
          variantQuantity: 5,
        },
      ],
      brand: "Samcom",
      selectedVatiant: 0,
    };
  },
  methods: {
    traHang() {
      this.$emit(
        "remove-to-cart",
        this.variants[this.selectedVatiant].variantID
      );
    },
    doiHinh(variantImage) {
      this.image = variantImage;
      console.log(variantImage);
    },
    themGioHang() {
      //this.$emit('add-to-cart');
      this.$emit("add-to-cart", this.variants[this.selectedVatiant].variantID);
    },
    doiHinhIndex(index) {
      this.selectedVatiant = index;
      console.log(index);
    },
    
  },
  computed: {
    titleProduct() {
      return this.product + " " + this.brand;
    },
    image() {
      return this.variants[this.selectedVatiant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVatiant].variantQuantity;
    },
    Shipping() {
      if (this.premium) return "Miễn phí";
      else return "Mất 100.000 vnđ";
    },
  },
});

//Thêm phần đánh giá sản phẩm
Vue.component("product-review", {
  template: `<form class="review-form" @submit.prevent="onSubmit">
    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name" required>
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review" required></textarea>
      </p>
      
      <p>
        <label for="rating" required>Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>        
      <p>
        <input type="submit" value="Submit">  
      </p>   
      
      <p>
      <label for="introProduct">Bạn có muốn giới thiệu sản phẩm</label>
        <input type="checkbox" v-model="introProduct" id="introProduct">
     </p>
</form>`,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      introProduct: false,
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        introProduct: this.introProduct,
      };
      eventBus.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
      this.introProduct = false;
    },
  },
});

//Tạo tab
Vue.component("product-tabs", {
  template: ` <div>
  <ul>
      <li class="tab1" @click="isSelected=menu" :class="{activeTab: isSelected===menu}" v-for="menu in menus " :key="menu.id">{{menu}}</li>
  </ul>

      <div v-show="isSelected === 'Đánh giá'"> 
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul v-else>
              <li v-for="(review, index) in reviews" :key="index">
                <p>{{ review.name }}</p>
                <p>Rating:{{ review.rating }}</p>
                <p>{{ review.review }}</p>
              </li>
          </ul>
      </div>

      <div v-show="isSelected === 'Gửi đánh giá'">
      <product-review></product-review>
    </div>

</div>`,
  data() {
    return {
        menus: ['Đánh giá','Gửi đánh giá'],
        isSelected:'Đánh giá'
    };
  },
    props: {
        reviews: {
            type: Array,
            default:[], 
        },
    },
  methods: {
    tabSelected(value) {
      selectedTab = value;
    },
  },
});


var eventBus=new Vue()

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
    reviews:[]
  },
  computed: {},
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    renderCart(id) {
      if (id === 198) return "Tất đỏ";
      else if (id === 199) return "Tất xanh";
    },
    removeCart(id) {
      let i = this.cart.indexOf(id);
      console.log("sản phẩm trả là" + i);
      this.cart.splice(i, 1);
    },
  },
  mounted () {
    eventBus.$on("review-submitted", productReview=>{
        this.reviews.push(productReview);
    }) ;
  },
});

/**Tạo các tab cho Chi tiết vận chuyển và các chi tiết trên mạng, tương ứng hiển thị chi phí vận chuyển và chi tiết sản phẩm. */