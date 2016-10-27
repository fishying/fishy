<template>
	<header class="index">
		<router-link to="/" class="logo">W</router-link>
		<nav>
			<a href="">Home</a>
			<a href="">Home</a>
			<a href="">Home</a>
			<a href="">Home</a>
		</nav>
	</header>
</template>
<style lang="less">
header.index {
	width: 900px;
	margin: 0 auto;
	padding: 30px 0;
	display: flex;
	align-items: center;
	.logo {
		font-size: 38px;
		font-weight: 700;
		text-decoration: none;
		color: #111;
		margin-right: 22px;
	}
	nav {
		text-align: center;
		a {
			text-decoration: none;
			color: #b3b3b3;
			margin-right: 22px;
			font-size: 14px;
		}
		i {
			font-size: 54px;
			color: #666;
		}
	}
}
</style>