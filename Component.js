jQuery.sap.declare("sap.training.Component");

sap.ui.core.UIComponent.extend("sap.training.Component", {
	metadata: {
		version: "1.0",
		includes: [],
		dependencies: {
			libs: ["sap.m", "sap.ui.layout"],
			components: []
		},

		rootView: "sap.training.view.App",

		config: {
			resourceBundle: "i18n/messageBundle.properties",
			serviceConfig: {
				name: "DemoService",
				serviceUrl: "/destinations/ODATA_ORG/V2/OData/OData.svc/"
			}
		},

		routing: {
			config: {
			    routerClass: "sap.m.routing.Router",
				viewType: "XML",
				viewPath: "sap.training.view",
				targetAggregation: "detailPages",
				clearTarget: false
			},
			routes: [
				{
					pattern: "",
					name: "main",
					view: "Master",
					targetAggregation: "masterPages",
					targetControl: "idAppControl",
					subroutes: [
						{
							pattern: "{entity}",
							name: "detail",
							view: "Detail"
						}
					]
				},
				{
					name: "catchallMaster",
					view: "Master",
					targetAggregation: "masterPages",
					targetControl: "idAppControl",
					subroutes: [
						{
							pattern: ":all*:",
							name: "catchallDetail",
							view: "NotFound",
							transition: "show"
						}
					]
				}
			]
		}
	},

	init: function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// Always use absolute paths relative to the own component
		var oRootPath = jQuery.sap.getModulePath("sap.training");

		// Set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: [oRootPath, mConfig.resourceBundle].join("/")
		});
		this.setModel(i18nModel, "i18n");

		var sServiceUrl = mConfig.serviceConfig.serviceUrl;

		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl);
		this.setModel(oModel);

		// Set device model
		var oDeviceModel = new sap.ui.model.json.JSONModel({
			isTouch: sap.ui.Device.support.touch,
			isNoTouch: !sap.ui.Device.support.touch,
			isPhone: sap.ui.Device.system.phone,
			isNoPhone: !sap.ui.Device.system.phone,
			listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		oDeviceModel.setDefaultBindingMode("OneWay");
		this.setModel(oDeviceModel, "device");

		this.getRouter().initialize();
	//	new sap.m.routing.RouteMatchedHandler(this.getRouter());

	}
});