<template>
	<header class="admin">
		<nav>
			<a href=""><i class="iconfont icon-filetext"></i></a>
			<a href=""><i class="iconfont icon-message"></i></a>
			<a href=""><i class="iconfont icon-setting"></i></a>
			<a href=""><i class="iconfont icon-plus"></i></a>
		</nav>
	</header>
</template>
<style lang="less">
@import "../../assets/style/color";
@width: 55px;
@bg: #2e3641;
header.admin {
	position: fixed;
	top: 0;
	left:0;
	height: 100%;
	width: @width;
	background: @bg;
	color: #fff;
	nav {
		a {
			i {
				font-size: 28px;
			}
			display: block;
			color: #f2f2f2;
			text-decoration: none;
			width: @width;
			text-align: center;
			height: 52px;
			line-height: 52px;
		}
	}
}
</style>