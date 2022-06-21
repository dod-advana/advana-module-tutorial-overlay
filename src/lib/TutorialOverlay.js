import React, { useEffect, useState } from 'react';
import Joyride from 'react-joyride';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const tutorialStyle = {
	buttonNext: {
		backgroundColor: '#00838F',
		padding: '12px 15px',
		fontFamily: 'Montserrat',
		fontWeight: 600,
		outline: 'none',
		height: 50
	},
	buttonBack: {
		color: '#8091A5',
		border: '1px solid #8091A5',
		padding: '12px 15px',
		borderRadius: '5px',
		fontFamily: 'Montserrat',
		fontWeight: 600,
		margin: '0 10px 0 0',
		outline: 'none',
		height: 50
	},
	options: {
		zIndex: 99999999,
	},
	buttonClose: {
		backgroundColor: 'transparent',
		outline: 'none',
		borderRadius: '4px',
		padding: '13px',
		right: '15px',
		top: '15px',
		border: '1px solid #b0b9be',
	},
	buttonSkip: {
		color: '#8091A5',
		border: '1px solid #8091A5',
		padding: '12px 15px',
		borderRadius: '5px',
		fontFamily: 'Montserrat',
		fontWeight: 600,
		fontSize: '16px',
		outline: 'none',
		height: 50,
		float: 'right',
		margin: '0 15px 0 0'
	},
	tooltipFooter: {
		marginTop: 0
	},
	tooltipTitle: {
		fontFamily: 'Montserrat',
		fontWeight: 700,
		textAlign: 'left',
		margin: '2% 45px 1% 2%'
	},
	tooltipContent: {
		textAlign: 'left'
	},
	tooltip: {
		width: 500
	}
};

export default ({ tutorialJoyrideSteps, showTutorial, setShowTutorial, buttonColor, resetPage, stepIndex, setStepIndex, showSkipButton=true }) => {

	const [restartJoyride, setRestartJoyride] = useState(false);
	const [disableScroll, setDisableScroll] = useState(false);
	const { trackEvent } = useMatomo();


	useEffect(() => {

	}, [showTutorial])


	// called every status change in Joyride
	const onStepCallback = (tutorialState) => {

		// we have stopped the tutorial but want to start it again
		if (restartJoyride) {
			setRestartJoyride(false);
			setShowTutorial(true);
		}
		else {

			// disable scrolling to this step if desired
			if (tutorialState.step) {
				setDisableScroll(tutorialState.step.disableScrolling ? true : false);
			}

			// skip steps that error/are missing
			if (tutorialState.type === "error:target_not_found") {
				setStepIndex(stepIndex + 1);
				trackEvent({
					category: 'Tutorial',
					name: 'targetNotFoundError',
					value: stepIndex
				});
			}

			// close tutorial if clicking outside
			// or if clicking skip
			// or if clicking Next on the last step
			else if ((tutorialState.action === 'close' && tutorialState.type === 'step:after') ||
				tutorialState.action === 'skip' ||
				(tutorialState.action === 'next' && tutorialState.status === 'finished')
			) {
				trackEvent({
					category: 'Tutorial',
					action: 'onClick',
					name: 'Skip',
					value: stepIndex
				});
				setStepIndex(0);
				setShowTutorial(false);
				resetPage();

			}

			// this state comes before a step happens
			else if (tutorialState.action === "update" || tutorialState.action === "start") {
				// check for inputs you want to fill in
				if (tutorialState.step && tutorialState.step.input && tutorialState.step.inputID) {
					const tutorialInput = document.getElementById(tutorialState.step.inputID);

					// set the input text
					const nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
					nativeInputSetter.call(tutorialInput, tutorialState.step.inputText);

					// fire the onChange event with the text
					const inputEvent = new Event("input", { bubbles: true });
					tutorialInput.dispatchEvent(inputEvent);

				}
			}

			// this state happens after you click next on a step
			else if (tutorialState.action === "next" && tutorialState.type === "step:after") {
				setStepIndex(stepIndex + 1);
				trackEvent({
					category: 'Tutorial',
					action: 'onClick',
					name: 'Next',
					value: stepIndex
				});
				// check for buttons you want clicked
				if (tutorialState.step && tutorialState.step.clickButton && tutorialState.step.buttonID.length > 0) {
					const tutorialButton = document.getElementById(tutorialState.step.buttonID);
					tutorialButton.click();

					// activate a tutorial restart
					setShowTutorial(false);
					setRestartJoyride(true);

				}


			}

			// after clicking back
			else if (tutorialState.action === "prev" && tutorialState.type === "step:after") {
				setStepIndex(stepIndex - 1);
				trackEvent({
					category: 'Tutorial',
					action: 'onClick',
					name: 'Back',
					value: stepIndex
				});
				if (tutorialState.step && tutorialState.step.clickBack && tutorialState.step.backButtonID) {
					const tutorialButton = document.getElementById(tutorialState.step.backButtonID);
					tutorialButton.click();

				}
			}
		}
	}

	return (
		<>
			<Joyride
				steps={tutorialJoyrideSteps}
				spotlightClicks={true}
				scrollOffset={150}
				continuous={true}
				showSkipButton={showSkipButton}
				styles={{
					...tutorialStyle,
					buttonNext: {
						...tutorialStyle.buttonNext,
						backgroundColor: buttonColor
					}
				}}
				callback={onStepCallback}
				run={showTutorial}
				stepIndex={stepIndex}
				disableScrolling={disableScroll}
				showProgress={true}
			/>
		</>
	);
}
