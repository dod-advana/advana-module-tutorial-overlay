/**
 * @jest-environment jsdom
 */

import React from 'react';
const assert = require('assert');
import 'regenerator-runtime/runtime';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TutorialOverlayWrapper from '../src/lib/TutorialOverlayWrapper';


describe('Tutorial Overlay', () => {
  it('renders without crashing', () => {
    render(
      <TutorialOverlayWrapper
        name={'test'}
        onComponentStepNumberChange={()=>{}}
        showTutorial={false}
        setShowTutorial={false}
      />);
  });
});
