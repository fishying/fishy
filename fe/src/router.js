export default (app) => {
	app.map({
		"/":{
			component: (resolve) => {
				require(["./view/index"], resolve)
			},
			subRoutes:{
				"/":{
					component: (resolve) => {
						require(["./view/i"], resolve)
					}
				},
				"/article":{
					component: (resolve) => {
						require(["./view/article"], resolve)
					}
				}
			}
		},
		"/admin":{
			component:(resolve) => {
				require(["./view/admin/index"], resolve)
			}
		}
	})
}