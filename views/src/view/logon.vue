<template>
	<div class="login">
		<h2 class="index-title">注册</h2>
		<label>
			<p>邮箱：
				<y-tooltips content="请输入正确的邮箱" trigger="hover">
				    <span class="point" slot="html">提示</span>
				</y-tooltips>
			</p>
			<input type="text" v-model="email">
		</label>
		<label>
			<p>账号：
				<y-tooltips content="这是登陆id" trigger="hover">
				    <span class="point" slot="html">提示</span>
				</y-tooltips>
			</p>
			<input type="text" v-model="name">
		</label>
		<label>
			<p>密码：
				<y-tooltips content="password >= 6 && password <= 16" trigger="hover">
				    <span class="point" slot="html">提示</span>
				</y-tooltips>
			</p>
			<input type="password" v-model="password">
		</label>
		<y-button type="ghost" @click.native="logon">注册</y-button>
	</div>
</template>
<script>
export default {
	data(){
		return {
			email:"",
			name:"",
			password:""
		}
	},
	mounted(){
		console.log(this.$route)
	},
	methods:{
		logon(){
			this.$http.post("/api/logon",{
				name:this.name,
				email:this.email,
				password: this.password
			}).then((response)=>{
				return response.json()
			}).then((data)=>{
				if(data.status == "success"){
					this.$notify("注册成功~")
					this.$router.push("/login")
				}else {
					this.$notify.warning("注册失败~")
					this.$router.push("/")
				}
			})
		}
	}
}
</script>
<style lang="less">
.login {
	width: 320px;
	margin: 0 auto;
	h2.index-title {
		text-align: center;
		font-size: 28px;
	}
	label {
		p {
			margin: 8px 0;
			span.point {
			    display: inline-block;
				font-size: 12px;
				border: 1px #ccc solid;
				padding: 2px 6px;
				border-radius: 4px;
			}
		}
		input {
			width: 100%;
			display: block;
			outline: none;
			padding: 8px 12px;
			font-size: 18px;
			color: #111;
			border: 1px #cfcfcf solid;
			border-radius: 4px;
		}
	}
	.y-btn {
		font-size: 16px;
		margin-top: 12px;
		display: block;
		width: 100%;
		line-height: 1.6;
	}
}
</style>