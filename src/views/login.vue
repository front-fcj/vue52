<template>
<div class="login-wrap">
    <el-form 
    label-position="top" 
    label-width="80px"
    :model="formData"
    class="login-form">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input @keyup.enter.native="handleLogin" type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="handleLogin"
            type="primary"
            class="login-button"
            >登录</el-button>
        </el-form-item>
        
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                username:'',
                password:''
                }
            };
        },
    methods: {
        async handleLogin() {
            var response = await this.$http.post
           ('login',this.formData);
           var { data: {meta: { status, msg}}} = response;
           if (status === 200) {
               var token = response.data.data.token;
                sessionStorage.setItem('token',token);
                 this.$message.success(msg);
                 this.$router.push('/');
           }else {
               this.$message.error(msg);
           }
        }
    }
}
</script>
// scoped是html5中的属性， 会给当前页面所有的标签添加一个data-v-xxx属性作为标识
// 当前页面样式职位当前页面的元素服务

<style scoped>
    .login-wrap {
        background-color: #324152;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
}
    .login-wrap .login-form {
        background-color: #fff;
        width: 400px;
        padding: 30px;
        border-radius: 5px;
}
    .login-wrap .login-form .login-button {
        width: 100%;
}
</style>
