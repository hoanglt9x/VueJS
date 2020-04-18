var app = new Vue({
    el:'#app',
    data:{
        product: "Socks",
        image: "./assets/tat.jpg",
        inStock: true,
        soLuong:10,
        onSale:true
    }
})

/** Thêm điều kiện onSale nhằm thông báo giảm giá trong thẻ span */