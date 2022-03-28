axios.get('./goods.json').then(data => {
  let html = '';
  JSON.parse(data).forEach(goods => {
    // console.log(goods.herff);
    // console.log(goods);
    html +=
      `<a href="${goods.herff}"><div class="lb" id="InitCartUrl" class="btn-special1 btn-lg" onclick="addCart(${goods.id},'${goods.name}','${goods.src}','${goods.price}',1)"><img src="${goods.src}" alt=""><p>${goods.name}</p>
      <p>${goods.info}</p>
      <span class="goods_item_price" data-price-id="100004222715" style="">${goods.price}元起</span></div></a>`;
  })
  $('#box').innerHTML = html;
})

function addCart(id, name, src, price, num) {
  let cartGoods = localStorage.getItem('cart')
  // console.log(cartGoods); 所有数据
  if (cartGoods) {
    cartGoods = JSON.parse(cartGoods);
    // console.log(cartGoods); 转化之后的数据
    let exists = false;
    cartGoods.forEach(v => {
      //遍历数组，点击返回该条数据
      if (v.id == id) {
        v.num = v.num - 0 + (num - 0)
        exists = true;
        // console.log(v); 
      }
    })
    if (!exists) {
      cartGoods.push({
        id,
        name,
        src,
        price,
        num
      })
    }

    localStorage.setItem('cart', JSON.stringify(cartGoods))
  } else {
    let tmpGoods = {
      id,
      name,
      src,
      price,
      num
    };
    let goodsArr = [tmpGoods];
    localStorage.setItem('cart', JSON.stringify(goodsArr))
  }
}
// 购物车
function fn(){
  window.open("./cart2.html");
}
function fn1() {
  // location.href = './'
  window.open("./cart3.html");
}
// 注册
function enroll(){
  location.href='./enroll.html'
}
// 登录
function register(){
  location.href='./register.html'
}

layui.use('carousel', function () {
  var carousel = layui.carousel;
  //建造实例
  carousel.render({
    elem: '#test1',
    width: '1226px' //设置容器宽度
      ,
    height: '460px',
    arrow: 'always' //始终显示箭头
      ,
    anim: 'fade' //切换动画方式
  });
});

//返回顶部
// console.log(document.querySelector('.rtop'));
// document.querySelector('.rtop').addEventlistener('click',function(){
//   window.scrollTo(0,0);
// })
function topFn(){
  window.scrollTo(0,0);
}

//点击跳去购物车
// console.log($('.icart'));
// $('.icart').addEventlistener('click',function(){
//   location.href='./cart3.html';
// })
function cartFn(){
  location.href='./cart3.html';
}

function $ (tag) {
  return document.querySelector(tag)
}