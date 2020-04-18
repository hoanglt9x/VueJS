var app = new Vue({
    el:'#app',
    data:{
        product: "Socks",
        // image: "./assets/tat.jpg",
        // inStock: true,
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
    },
    computed: {
        titleProduct(){
            return this.product+' ' + this.brand;
        },
        image(){

            return this.variants[this.selectedVatiant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVatiant].variantQuantity;
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
})

/** Thêm một tài sản dữ liệu boolean mới onSale và tạo ra một tài sản tính mà mất brand, productvà onSalevà in ra một chuỗi bất cứ khi nào onSalelà đúng.*/