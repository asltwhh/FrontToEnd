
### post和get
    - 两者都是将表单数据从浏览器发送给服务器
    - post是将表单数据打包之后，在后台将它发送给服务器
    - get是将表单数据打包之后，将所有的表单数据添加到url的后面，向服务器发送一个页面请求

    - 举例分析：E:\java前端\学习代码与笔记\css\chap14代码\contest
#### 使用post方法：将表单数据
    - 得到的目标界面的url为：https://wickedlysmart.com/hfhtmlcss/contest.php
#### 使用get方法：
    - 得到的目标界面的url为：https://wickedlysmart.com/hfhtmlcss/contest.php?firstname=Wu&lastname=Huanhuan


### 两个方法的适用范围：
    - 使用get:
        - 当希望可以将提交表单之后的结果页面添加到标签页中就需要使用get
    - 使用post:
        - 如果表单中填写的数据比较私密时就需要使用post,因为get会将表单数据明文形式显示
        - 如果表单数据过多时，就需要使用post,因为一般post和get清切对于发送的数据量都具备限制，但是post的限制较为宽松
