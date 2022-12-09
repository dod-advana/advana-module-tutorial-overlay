import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import TutorialOverlay from './TutorialOverlay';
import { initializeTutorial } from './TutorialOverlayHelper';

const noop = () => { };

export default function TutorialOverlayWrapper({
	name,
	onComponentStepNumberChange = noop,
	showTutorial,
	setShowTutorial,
	tutorialData,
	localVersionData,
	userId = ''
}) {

	const [tutorialJoyrideSteps, setTutorialJoyrideSteps] = useState([]);
	const [showTutorialUncontrolled, setShowTutorialUncontrolled] = useState(false);
	const [stepIndex, setStepIndex] = useState(0);

	let showTutorialState, setShowTutorialFn;
	if (_.isBoolean(showTutorial) && setShowTutorial) {
		showTutorialState = showTutorial;
		setShowTutorialFn = setShowTutorial;
	}
	else {
		showTutorialState = showTutorialUncontrolled;
		setShowTutorialFn = setShowTutorialUncontrolled;
	}

	useEffect(() => {
		(async () => {
			try {
				const tutorial = await initializeTutorial(name, tutorialData, localVersionData);
				const { componentStepNumbers, tutorialJoyrideSteps, showTutorial } = tutorial || {};
				onComponentStepNumberChange(componentStepNumbers)
				setTutorialJoyrideSteps(tutorialJoyrideSteps);
				setShowTutorialFn(showTutorial);
			} catch (err) {
				console.error(err);
			}
		})()
	}, [setShowTutorialFn, name, onComponentStepNumberChange]);

	return <TutorialOverlay
		userId={userId}
		tutorialAppName={name}
		tutorialJoyrideSteps={tutorialJoyrideSteps}
		setShowTutorial={setShowTutorialFn}
		showTutorial={showTutorialState}
		buttonColor={'#43A047'}
		resetPage={() => { }}
		stepIndex={stepIndex}
		setStepIndex={setStepIndex}
	/>
}

TutorialOverlayWrapper.propTypes = {
	tutorialData: PropTypes.shape({
		componentStepNumbers: PropTypes.any.isRequired,
		tutorialJoyrideSteps: PropTypes.any.isRequired,
		showTutorial: PropTypes.any.isRequired
	}),
	localVersionData: PropTypes.shape({
		newUser: PropTypes.bool,
		currentVersion: PropTypes.bool,
		message: PropTypes.string,
	})
}