var app = new Vue({
    el:'#app',
    data:{
        product: "Socks",
        image: "./assets/tat.jpg",
        inStock: true,
        soLuong:10,
        onSale:true,
        details:["80% cotton", "20% polyester", "Gender-neutral"],
        variants:[
            {
                variantID: 198,
                variantColor: 'green',
                variantImage:'./assets/tatden.jpeg'
            },
            {
                variantID: 199,
                variantColor: 'red',
                variantImage:'./assets/tatxanh.jpeg'
            }
        ],
        cart:0,
    },
    methods: {
        traHang(){
            if(this.cart>0)
            this.cart-=1;
        },
        doiHinh(variantImage){
            this.image=variantImage;
        }
    },
})

/** Sử dụng sự kiện mouseover nhằm thay đổi ảnhảnh  */