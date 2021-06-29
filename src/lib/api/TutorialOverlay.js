import axiosLib from "axios";
import https from 'https';

const endpoints = {
	postUserAppVersion: '/api/userAppVersion',
	tutorialOverlaysGET: '/api/tutorialOverlay',
	tutorialOverlaysPOST: '/api/tutorialOverlay/save'
};

export default class TutorialOverlayAPI {
	constructor(opts = {}) {
		const {
			axios = axiosLib
		} = opts

		this.axios = axios.create({
			baseURL: window?.__env__?.REACT_APP_TUTORIAL_HREF || process.env.REACT_APP_TUTORIAL_HREF,
			httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
		});
	}

	postUserAppVersion = async (app) => {
		return this.axios.post(endpoints.postUserAppVersion, { app });
	}

	tutorialOverlaysGET = async (url = endpoints.tutorialOverlaysGET) => {
		return await this.axios.get(url);
	}

	tutorialOverlaysPOST = async (appName, componentsList, url = endpoints.tutorialOverlaysPOST) => {
		return await this.axios.post(url, { appName, componentsList });
	}

	setupTutorialOverlay = (data) => {

		const appTutorialData = {};

		data.forEach(app => {

			appTutorialData[app.app_name] = {
				currentTutorial: this.constructTutorialObjects(app.current_tutorial_json),
				newUserTutorial: this.constructTutorialObjects(app.new_user_tutorial_json),
				allComponents: app.current_tutorial_json.components,
			}
		});
		return appTutorialData;
	}

	constructTutorialObjects = (app) => {

		const components = this.getActiveComponents(app);
		const componentStepNumbers = {}; // 'Component Name' : [step number], for conditional class selectors
		const tutorialJoyrideSteps = []; // list of objects for Tutorial Overlay to pass to Joyride

		components.forEach(component => {
			componentStepNumbers[component.component_name] = component.step_number;
			tutorialJoyrideSteps.push(
				{
					target: component.target ? component.target : `.tutorial-step-${component.step_number}`,
					content: component.step_text,
					disableBeacon: true,
					inputID: component.input_ID,
					buttonID: component.button_ID,
					input: component.input,
					clickButton: component.click_button,
					inputText: component.input_text,
					placement: component.placement ? component.placement : "auto",
					title: component.title,
					disableScrolling: component.disableScrolling,
					clickBack: component.click_back,
					backButtonID: component.back_button_ID,
					testA: component.test_A,
					testB: component.test_B
				}
			);
		});

		return { componentStepNumbers, tutorialJoyrideSteps, dbComponentList: components };
	}

	getActiveComponents = (appData) => {

		let sub_components = [];

		// grab sub component steps
		appData.components.forEach(component => {
			if (component.sub_components) {
				sub_components = sub_components.concat(component.sub_components);
			}
		});

		// remove components with step 0
		let components = appData.components.filter(component => component.step_number !== 0);

		// keep subcomponents that are steps
		sub_components = sub_components.filter(component => component.step_number !== 0);
		components = components.concat(sub_components);

		components.sort((function (a, b) {
			return a.step_number - b.step_number
		}));

		return components;
	}
}
