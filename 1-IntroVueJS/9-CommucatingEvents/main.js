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
                variantQuantity:5
            }
        ],
        brand: 'Samcom',
        selectedVatiant:0
        }
    },
    methods: {
        traHang(){
                this.$emit('remove-to-cart',this.variants[this.selectedVatiant].variantID);
        },
        doiHinh(variantImage){
            this.image=variantImage;
            console.log(variantImage);
        },
        themGioHang(){
                //this.$emit('add-to-cart');
                this.$emit('add-to-cart',this.variants[this.selectedVatiant].variantID);
                
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
});

var app = new Vue({
    el:'#app',
    data:{
       premium: true,
       cart: []
    },
    computed: {
        
    },
    methods: {
        updateCart(id){
            this.cart.push(id);
        },
        renderCart(id){
            if(id===198) return 'Tất đỏ';
            else if(id===199) return 'Tất xanh';
        },
        removeCart(id){
            let i=this.cart.indexOf(id);
            console.log('sản phẩm trả là'+i);
            this.cart.splice(i,1);
        }
    },
})

/** Thêm một nút loại bỏ sản phẩm khỏi mảng giỏ hàng bằng cách phát ra một sự kiện với id của sản phẩm sẽ bị xóa.
*/

