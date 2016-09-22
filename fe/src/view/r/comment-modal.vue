<template>
    <div class="modal-box" v-if="isshow" transition="mdc" @click.self="b">
        <div class="modal-content">
            <div class="m-header">
                <h2>评论</h2>
            </div>
            <div class="m-body">
				<div class="m-comments">
				    <label for="" v-el:test>名字：</label>
				    <input type="text" class="input lg" v-model="name"/>
				    <label for="">邮箱：</label>
				    <input type="text" class="input lg"  v-model="email"/>
				    <label for="">主页：</label>
				    <input type="text" class="input lg" v-model="urls"/>
				    <label for="">内容：</label>
				    <textarea type="text" class="input lg" v-model="content"></textarea>
				</div>
            </div>
            <div class="m-footer">

                <button class="btn btn-default" @click="b"

                >取消</button>

                <button class="btn btn-primary" @click="ok"

                >评论</button>

            </div>
        </div>
    </div>
</template>
<script>
export default {
	props:{
		name:String,
		email:String,
		urls:String,
		content:String,
		isshow:Boolean
	},
    methods:{
        ok: function(){
            console.log(this)
        },
        b:function(){
            this.isshow = false
        }
    },
}
</script>