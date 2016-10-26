<template>
	<div>test</div>
</template>
<script>
export default {
	mounted(){
		this.$http.get("/api/index?t=1")
		.then(function(json) {
			console.log(json)
		}).catch(function(ex) {
			console.log(ex)
		})
	}
}
</script>