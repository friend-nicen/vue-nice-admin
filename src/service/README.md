# 关于登录

登录方法只在requests.js
结果判断有两个地方，第一个是路由守卫成功后的load-user，第二个是手动登录

登录成功都会调用user.save
如何是token模式，会保存token，加载axios的请求头和authorization