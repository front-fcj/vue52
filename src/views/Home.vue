<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <img src="@/assets/logo.png" alt="">
            </el-col>
                <el-col :span="19">
                    <div class="title">电商后台管理</div>
                </el-col>
                <el-col :span="1">
                    <a href="#" class="logout" @click.prevent="handleLogout">退出</a>
                </el-col>
        </el-row>
    </el-header>
    <el-container class="container">
        <el-aside class="aside" width="200px">
          <!-- :router 开启路由模式 如果值为true
            被激活的导航的index可以修改path标识
           -->
            <el-menu
            default-active="/users"
            class="el-menu-vertical-demo"
            unique-opened
            router>

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>

                    <el-menu-item index="/users">
                        <i class="el-icon-menu"></i>
                        用户列表</el-menu-item>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="/roles"><i class="el-icon-menu"></i>角色列表</el-menu-item>
                    <el-menu-item index="/rights"><i class="el-icon-menu"></i>权限列表</el-menu-item>

                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
                    <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类参数</el-menu-item>
                    <el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>

                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
                </el-submenu>

                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="5-1"><i class="el-icon-menu"></i>数据报表</el-menu-item>
                </el-submenu>

            </el-menu>

        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    beforeCreate() {
        var token = sessionStorage.getItem('token');
        console.log(token)
        if (!token) {
            this.$message.warning('请先登录');
            this.$router.push('login');
        }
    },
    methods: {
        handleLogout() {
            this.$message.success('退出成功');
            sessionStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
    padding: 0;
}

.header .title {
    font-size: 24px;
    line-height: 60px;
    text-align: center;
    color: #fff;
}

.header .logout {
    display: block;
    line-height: 60px;
    text-decoration: none;
    color: rgb(37, 5, 58);
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
    height: 100%;
}
</style>
