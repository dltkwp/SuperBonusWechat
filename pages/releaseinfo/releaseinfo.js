Page({
  data: {
    array: ['实体产品', '虚拟服务'],
    index: 0,
    image:'',
    other:{}
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  uploadImage: function () {

  },
  submit: function (e) {
    let save = e.detail.value;
    let _this = this;
    let commpanyName =  save.companyName;
    let userName = save.userName;
    let phone = save.phone;
    let projectName = save.projectName;
    let projectArea = save.projectArea;
    let productPrice = save.productPrice;
    let platePrice = save.platePrice;
    let desc = save.desc;
    let image = _this.data.image;
    let categroy = _this.data.index; // 0: 实体服务 1: 虚拟服务
    

    console.log(_this.data.other);

  }
})