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
            <el-input type="password" v-model="formData.password"></el-input>
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
import axios from 'axios';
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
        handleLogin() {
            axios
                .post('http://localhost:8888/api/private/v1/login',this.formData)
                .then((response) => {
                    var status = response.data.meta.status;
                    var msg = response.data.meta.msg;
                    if (status === 200) {
                        // 登陆成功
                        this.$message.success(msg);
                        var token = response.data.data.token;
                        sessionStorage.setItem('token',token);
                    } else {
                        // 登录失败
                        this.$message.error(msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
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
