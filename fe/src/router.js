export default (app) => {
	app.map({
		"/":{
			name:"index",
			component: (resolve) => {
				require(["./view/index"], resolve)
			}
		}
	})
}