export default {
    data() {
        return {
            data: [],
            pagenum: 1,
            pagesize: 2,
            count: 0,
            searchValue: '',
            addUserDialogFormVisible: false,
            form: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
                ]
            },
            editUserDialogFormVisible: false,
            setRoleDialogFormVisible: false,
            currentName: '',
            currentRoleId: -1,
            currentUserId: -1,
            roles: []
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            var token = sessionStorage.getItem('token');
            this.$http.defaults.headers.common['Authorization'] = token;
            var response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
            var {
                meta: {
                    status,
                    msg
                }
            } = response.data;
            if (status === 200) {
                this.count = response.data.data.total;
                this.data = response.data.data.users;
            } else {
                this.$message.error(msg);
            }
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.loadData();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pagenum = val;
            this.loadData();
            // console.log(`当前页: ${val}`);
        },
        handleSearch() {
            this.loadData();
        },
        async handleAdd() {
            this.$refs.addForm.validate(async(valid) => {
                if (valid) {
                    const response = await this.$http.post('users', this.form);
                    const { data: { meta: { status, msg } } } = response;
                    if (status === 201) {
                        this.$message.success(msg);
                        this.addUserDialogFormVisible = false;
                        this.loadData();
                        this.$refs.addForm.resetFields();
                    } else {
                        this.$message.error(msg);
                    }
                } else {
                    this.$message.warning('表单验证失败');
                }
            })

        },
        OpenEditDialog(user) {
            this.editUserDialogFormVisible = true;
            this.form.username = user.username;
            this.form.mobile = user.mobile;
            this.form.email = user.email;
            this.form.id = user.id;
        },
        async handleEdit() {
            const response = await this.$http.put(`users/${this.form.id}`, {
                email: this.form.email,
                mobile: this.form.mobile
            });
            const { meta: { status, msg } } = response.data;
            if (status === 200) {
                this.$message.success(msg);
                this.editUserDialogFormVisible = false;
                // this.$refs.editForm.resetFields();
                this.loadData();
                // this.form.username = '';
                for (var key in this.form) {
                    this.form[key] = '';
                }
            } else {
                this.$message.error(msg);
            }
        },
        handleEditDialogClose() {
            for (var key in this.form) {
                this.form[key] = '';
            }
        },
        handleDelete(user) {
            this.$confirm('是否删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const response = await this.$http.delete(`users/${user.id}`);
                const { meta: { status, msg } } = response.data;
                if (status === 200) {
                    if (this.data.length === 1 && this.pagenum !== 1) {
                        this.pagenum--;
                        this.loadData();
                    }
                    this.$message.success(msg);

                } else {
                    this.$message.error(msg);
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        async handleChange(user) {
            const response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
            const { meta: { status, msg } } = response.data;
            if (status === 200) {
                this.$message.success(msg);
            } else {
                this.$message.error();
            }
        },
        async handleOpensetRoleDialog(user) {
            this.setRoleDialogFormVisible = true;
            this.currentName = user.username;
            this.currentUserId = user.id;
            const response = await this.$http.get(`roles`);
            this.roles = response.data.data;
            const userResponse = await this.$http.get(`users/${user.id}`);
            this.currentRoleId = userResponse.data.data.roleId
                // console.log(userResponse)
        },
        async handleSetRole() {
            const response = await this.$http.put(`users/${this.currentUserId}/role`, {
                rid: this.currentRoleId
            });
            const { meta: { status, msg } } = response.data;
            if (status === 200) {
                this.$message.success(msg);
                this.setRoleDialogFormVisible = false;
            } else {
                this.$message.error(msg);
            }
        }
    }
}