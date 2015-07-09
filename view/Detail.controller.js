sap.ui.core.mvc.Controller.extend("sap.training.view.Detail", {

	onInit: function() {

		this.getRouter().attachRoutePatternMatched(this.onRoutePatternMatched, this);
	},

	onRoutePatternMatched: function(oEvent) {
		var oParameters = oEvent.getParameters();

		if (oParameters.name !== "detail") {
			return;
		}

		var sEntityPath = "/" + oParameters.arguments.entity;
		var oView = this.getView();
		oView.bindElement(sEntityPath);

	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	onNavBack: function() {
		// This is only relevant when running on phone devices
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();

		//The history contains a previous entry
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			var bReplace = true; // otherwise we go backwards with a forward history
			this.getRouter().navTo("main", {}, bReplace);
		}
	},

});