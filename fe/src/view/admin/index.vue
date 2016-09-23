<template>
	<admin-header></admin-header>
	<router-view></router-view>
</template>
<script>
import adminHeader from "../r/admin-header"
export default {
	components:{
		adminHeader
	}
}
</script>