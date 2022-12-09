import TutorialOverlayAPI from "./api/TutorialOverlay";

const tutorialOverlayAPI = new TutorialOverlayAPI();

export async function initializeTutorial(appName, localTutData, localVersionData) {
	let data;
	if (localTutData) {
		data = { data: localTutData };
	} else {
		data = await tutorialOverlayAPI.tutorialOverlaysGET('/api/tutorialOverlay');
	}
	const tutorialData = tutorialOverlayAPI.setupTutorialOverlay(data.data);
	const appTutorialData = tutorialData[appName];

	if (appTutorialData && !sessionStorage.getItem('userVersionChecked_' + appName)){ // TODO: per app. when do we set this?
		let versionData;
		if (localVersionData) {
			versionData = { data: localVersionData };
		} else {
			versionData = await tutorialOverlayAPI.postUserAppVersion(appName);
		}
		return checkUserAppVersion(appTutorialData, versionData);
	}
}

export function checkUserAppVersion(tutorialData, data) {
	try {
		const tutorialType = data.data.newUser ? "newUserTutorial" : "currentTutorial";
		return {
			componentStepNumbers: tutorialData[tutorialType].componentStepNumbers,
			tutorialJoyrideSteps: tutorialData[tutorialType].tutorialJoyrideSteps,
			showTutorial: !data.data.currentVersion ? true : false
		}
	} catch(err) {
		console.log(err.message);
	}
}