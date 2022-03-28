class Register {
  constructor() {
    // 获取表单节点
    this.user = this.$$('#user')
    this.pwd = this.$$('#password')
    this.userr = this.$$('#uerss')
    this.pwdkk = this.$$('#pwdk')
    // 绑定获取鼠标焦点
    this.user.addEventListener('focus', this.userFn.bind(this));
    this.user.addEventListener('blur', this.userrFn.bind(this));
    this.pwd.addEventListener('focus', this.pwdFn.bind(this));
    this.pwd.addEventListener('blur', this.pwddFn.bind(this));
    //获取登录按钮
    this.btn = this.$$("#btn")
    this.btn.addEventListener('click', this.btnFn.bind(this));
  }
  btnFn() {
    // this.pwddFn(1);
    this.userrFn(1);
    // console.log();
  }

  userFn() {
    // console.log('获取user');
    this.userr.innerHTML = "";
  }
  userrFn(text) {
    // console.log('失去user焦点');
    let userr = this.user.value;
    //var reg = /^1[3456789]\d{9}$/;
    if (!userr) {
      this.user.style.background = '#fcf2f3';
    }
    axios.get('./register.json').then(data => {
      // let html = '';
      JSON.parse(data).forEach(k => {
        let u = k.user;
        //  console.log(u);
        // console.log(pwdk);  
        if (u == userr) {
          // console.log('用户名正确');
          // this.userr.innerHTML = "";
        } else {
          this.userr.innerHTML = `<span>用户名不匹配</span>`;
        }
      })
      JSON.parse(data).forEach(k => {
        let u = k.user;
        // console.log(u);
        // console.log(pwdk);  
        if (u == userr) {
          //  console.log('用户名正确');
          this.userr.innerHTML = "";
          if (text == 1) {
            this.pwddFn(1);
          }
        }
      })
      // $('').innerHTML = html;
    })
  }

  pwdFn() {
    // console.log('获取pwd');
  }
  pwddFn(text) {
    // console.log('失去pwd');
    let pwdk = this.pwd.value;
    // console.log(pwdk);
    //只能输入5-20个以字母开头、可带数字、“_.”
    //var reg2 = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!pwdk) {
      this.pwd.style.background = '#fcf2f3';
    }
    // if (reg2.test(pwdk)) {
    //   this.pwdkk.innerHTML = '';
    // } else {
    //   this.pwdkk.innerHTML = `<span>手机号不符合要求</span>`;
    // }
    axios.get('./register.json').then(data => {
      // let html = '';
      JSON.parse(data).forEach(user => {
        let u = user.pwd;
        //  console.log(u);
        // console.log(pwdk);  
        if (u == pwdk) {
          // console.log('密码正确');

        } else {
          this.pwdkk.innerHTML = `<span>密码错误</span>`;
        }
      })
      JSON.parse(data).forEach(user => {
        let u = user.pwd;
        //  console.log(u);
        // console.log(pwdk);  
        if (u == pwdk) {
          //  console.log('密码正确');
          this.pwdkk.innerHTML = "";
          if (text == 1) {
            location.href = "./index2.html";
          } else {
            location.href = "#none";
          }
        }
      })
    })
  }

  popover(sel) {
    sel.popover('show');
  }
  popovers(sel) {
    sel.popover('hide');
  }
  $$(ele) {
    return document.querySelector(ele)
  }
}
new Register;