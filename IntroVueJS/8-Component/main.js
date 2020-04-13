Vue.component('product',{
    template:
    `<div class="product">
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
        <p v-if="inStock">Còn trong kho {{soLuong - cart}}</p>
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
        <button v-on:click="traHang">Trả sản phẩm</button>
        &nbsp;
        <label>{{cart}}</label>
    </div>
</div>
`,
 props: {
       premium : {
           type: Boolean,
           required: true
       }
    },
   
    data() {
        return {
        product: "Socks",
        soLuong:10,
        onSale:true,
        details:["80% cotton", "20% polyester", "Gender-neutral"],
        variants:[
            {
                variantID: 198,
                variantColor: 'green',
                variantImage:'./assets/tatden.jpeg',
                variantQuantity:10
            },
            {
                variantID: 199,
                variantColor: 'red',
                variantImage:'./assets/tatxanh.jpeg',
                variantQuantity:0
            }
        ],
        cart:0,
        brand: 'Samcom',
        selectedVatiant:0
        }
    },
    methods: {
        traHang(){
            if(this.cart>0)
            {
                this.cart-=1;
                this.inStock=true;
            }
            
        },
        doiHinh(variantImage){
            this.image=variantImage;
            console.log(variantImage);
        },
        themGioHang(){
            if(this.cart<this.soLuong){
                this.cart= this.cart+1;
            }else this.inStock=false;
            
        },
        doiHinhIndex(index){
            this.selectedVatiant=index;
            console.log(index);
        }
    },
  computed:{
      titleProduct(){
            return this.product+' ' + this.brand;
        },
        image(){

            return this.variants[this.selectedVatiant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVatiant].variantQuantity;
        },
        Shipping(){
            if(this.premium) return "Miễn phí"
            else return "Mất 100.000 vnđ"
        }
  }
})

var app = new Vue({
    el:'#app',
    data:{
       premium: true
    },
    computed: {
        
    },
    methods: {
        
    },
})

/** Tạo một thành phần mới cho product-detailsvới một prop details.
Components are blocks of code, grouped together within a custom element
Components make applications more manageable by breaking up the whole into reusuable parts that have their own structure and behavior
Data on a component must be a function
Props are used to pass data from parent to child
We can specify requirements for the props a component is receiving
Props are fed into a component through a custom attribute
Props can be dynamically bound to the parent’s data
Vue dev tools provide helpful insight about your components
*/