sap.ui.core.mvc.Controller.extend("sap.training.view.Master", {

	onInit: function() {

	},

	onSearch: function() {

		// Add search filter
		var filters = [];
		var searchString = this.getView().byId("searchField").getValue();

		if (searchString && searchString.length > 0) {
			filters = [new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, searchString)];
		}
		// Update list binding
		this.getView().byId("list").getBinding("items").filter(filters);

	},

	onSelect: function(oEvent) {
		// Get the list item either from the listItem parameter or from the event's
		// source itself (will depend on the device-dependent mode)
		this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
	},

	showDetail: function(oItem) {
		// If we're on a phone device, include nav in history
		var bReplace = jQuery.device.is.phone ? false : true;
		this.getRouter().navTo("detail", {
			entity: oItem.getBindingContext().getPath().substr(1)
		}, bReplace);
	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

});