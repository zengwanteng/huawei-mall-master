class Carts {
  constructor() {
    this.getCartGoods();
    // 获取全选和单选按钮并绑定点击事件
    this.allChec = document.querySelectorAll('.check-col1');
    this.oneChec = document.querySelectorAll('.check-one1');
    // 全选按钮,绑定事件
    this.allChec[0].addEventListener('click', this.allCCFn.bind(this))

    this.oneFn();
    // 处理商品数量的增加+和减-
    this.$('.body').addEventListener('click', this.tbodyFn.bind(this))
  }

  tbodyFn(eve) {
    //  console.log(eve.target);

    // 判断点击的是哪个节点对象
    if (eve.target.className == 'add') {
      // console.log('add');
      this.addFn(eve.target);
    }
    if (eve.target.className == 'reduce') {
      // console.log('reduce');
      this.reduceFn(eve.target);
    }
    if (eve.target.className == 'delete') {
      this.deleteFn(eve.target);
    }
  }

  addFn(tar) {
    // console.log(tar);
    let numObj = tar.previousElementSibling;
    // console.log(numObj);
    // 数量增加
    let num = numObj.value - 0 + 1;
    numObj.value = num;
    // 取出单价
    let tdObj = tar.parentNode;
    let price = tdObj.previousElementSibling.innerHTML;

    //console.log(price);
    // 计算小计
    price = parseInt(price);
    tdObj.nextElementSibling.innerHTML = num * price;

    // 当前商品未选中,则不调用小计
    // console.log((tdObj.parentNode.children)[0].firstElementChild.checked);
    let trObj = tdObj.parentNode;
    // console.log(trObj);

    (trObj.children)[0].firstElementChild.checked && this.totalNP();

    // 获取id
    let goodsId = trObj.getAttribute('goods-id');
    this.modLocal(goodsId, num);

  }

  reduceFn(tar) {
    let numObj2 = tar.nextElementSibling;
    // 数量减少
    if (numObj2.value > 1) {
      let num = numObj2.value - 1;
      numObj2.value = num;
      // 取出单价
      let numObj = tar.parentNode;
      let price = numObj.previousElementSibling.innerHTML;

      //console.log(price);
      // 计算小计
      price = parseInt(price);
      numObj.nextElementSibling.innerHTML = num * price;

      // 当前商品未选中,则不调用小计
      // console.log((tdObj.parentNode.children)[0].firstElementChild.checked);
      let divObj = numObj.parentNode;
      // console.log(trObj);

      (divObj.children)[0].firstElementChild.checked && this.totalNP();

      // 获取id
      let goodsId = divObj.getAttribute('goods-id');
      this.modLocal(goodsId, num);
    }

  }

  //更新local数量
  modLocal(goodsId, num = 0) {
    // 获取local数据
    let god = localStorage.getItem('cart');
    // 无数据则清空
    if (!god) return;
    god = JSON.parse(god);
    // console.log(god);

    god.forEach((goods, index) => {
      // console.log(goodsId == goods.id);
      // console.log(goodsId);
      if (goodsId == goods.id) {
        if (num) {
          goods.num = num;
          // console.log(goodsId == goods.id);
        } // 修改数量
        else { // 删除当前商品
          god.splice(index, 1)
          // console.log("3");
        }
      }
    });
    // console.log(god);
    localStorage.setItem('cart', JSON.stringify(god))
    // console.log(god);
  }

  deleteFn(tar) {
    // console.log(tar);
    // console.log(tar.parentNode.parentNode.parentNode);
    let trObj = tar.parentNode.parentNode.parentNode;
    // console.log(trObj);
    let id = trObj.getAttribute('goods-id');
    let that = this;
    // console.log(id);
    // 弹出框,是否删除
    layer.confirm('是否删除？', {
      btn: ['确定', '取消'] //按钮
    }, function (index) {
      layer.close(index);
      // console.log(this); 
      // 当前商品选中,则更新数量
      trObj.remove();
      if ((trObj.children)[0].firstElementChild.checked) {
        that.totalNP(document.querySelectorAll('.check-one'))
      }
      // 更新local中的数据
      that.modLocal(id);
      // console.log(id);
    });
  }

  //全选实现
  allCCFn(eve) {
    // console.log(this);
    // console.log(eve.target);
    // console.log(eve.target.checked);
    let allStatus = eve.target.checked;
    // // console.log(allStatus);
    this.oneChec.forEach(check => {
      check.checked = allStatus
    });
    this.totalNP();
  }

  // 遍历单个商品选中,绑定事件
  oneFn() {
    let that = this;
    let checkNum = 0;
    let len = this.oneChec.length;
    this.oneChec.forEach((one, key) => {
      // console.log(one.checked);
      one.checked && checkNum++;
      one.onclick = function () {
        // console.log(this.checked);
        if (this.checked) {
          // 选取当前处于选中状态按钮
          checkNum++
          // console.log(checkNum);
          // console.log(key);
          // 让全选选中
          checkNum == len && (that.allChec[0].checked = true);

        } else {
          checkNum--;
          // 取消全选
          that.allChec[0].checked = false;
          // that.allChec[1].checked = false;
        }
        that.totalNP();
      }
    })
  }

  // 统计数量和价格
  totalNP(oneObj = '') {
    // 删除的时候,重新获取check-one数据
    this.oneChec = oneObj || this.oneChec;
    // console.log(this.oneChec);
    let totalNum = 0;
    let totalPrice = 0;
    // 1 循环商品,找出选中的
    this.oneChec.forEach(goods => {
      // console.log(goods);
      // console.log(goods.checked);
      if (goods.checked) { // 判断选中的商品
        let goodsTrObj = goods.parentNode.parentNode;
        console.log(goodsTrObj);
        let num = goodsTrObj.querySelector('.goods-num').value - 0;
        let subT = goodsTrObj.querySelector('.col-total').innerHTML - 0;
        // console.log(subT);
        //  console.log(num, subT);
        totalNum += num;
        totalPrice += subT;
        // console.log(totalPrice);
      }
    });
    // console.log(totalNum, totalPrice);

    // 显示到总计
    this.$('.cart-total').innerHTML = totalNum;
    this.$('.total-price').innerHTML = totalPrice;

  }

  //获取购物车数据
  getCartGoods() {
    let cartG = localStorage.getItem('cart');
    // console.log(cartG);
    let html = ''
    JSON.parse(cartG).forEach(data => {
      html += `  <div goods-id=${data.id}>
      <div class="item-row clearfix">
        <div class="col-check"><input type="checkbox" class='check-one1'></div>
        <div class="col-img"><a href="javascript:void(0)"><img alt=""
              src="${data.src}"
              width="70" height="70"></a></div>
        <div class="col-name">
          <h4 class="name"><a href="javascript:void(0)">${data.name}</a></h4>
        </div>
        <div class="col-price">${data.price}元
        </div>
        <div class="col-num">
          <span class="reduce">-</span>
          <input type="text" autocomplete="off" class="goods-num"
          value="${data.num}">
          <span class="add">+</span>
        </div>
        <div class="col-total" style="color:red">${data.price * data.num}
        </div>
        <div class="col-action"><span class="delete">删除</span></div>
      </div>
    </div>`
    });
    this.$('.body').innerHTML = html;
  }

  //获取节点的方法
  $(tag) {
    return document.querySelector(tag);
  }
}
new Carts;