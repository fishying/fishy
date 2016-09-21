<template>
	<header class="index">
		<a href="" class="logo">
			logo
		</a>
		<popover :placement="'bottom'" :position="'right'" :trigger="'hover'">
			<i slot="content" class="iconfont icon-ellipsis menu"></i>
			<ul slot="html" class="header menu">
				<li><i class="iconfont icon-code"></i><a href="">test</a></li>
				<li><a href="">test</a></li>
				<li><a href="">test</a></li>
			</ul>
		</popover>
	</header>
</template>
<script>
import popover from "../../components/popover"
export default {
	components:{
		popover
	}
}
</script>
<style lang="less">
@import "../../assets/style/color";
@header: 60px;
@size: 24px;
.header.menu li{
	margin-right: 50px;
    line-height: 28px;
    i {
    	margin-right: 6px;
    }
	*{
		font-size: 18px;
		color: @pColor;
		text-decoration: none;
	}
}
header.index {
	border-bottom: 1px @Border-C solid;
	height: @header;
	padding: 0 30px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	background: #fff;
	.logo {
		display: block;
		text-decoration: none;
		color: @pColor;
		line-height: @header;
		height: @header;
		font-size: @size;
	}
	.menu {
		display: inline-block;
		line-height: @header;
		height: @header;
		font-size: @size+12px;
	}
}
</style>