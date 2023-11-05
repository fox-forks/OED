/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react';
import TooltipHelpContainer from '../containers/TooltipHelpContainer';
import DashboardComponent from './DashboardComponent';

/**
 * Top-level React component that controls the home page
 * @returns JSX to create the home page
 */
export default function HomeComponent() {

	return (
		<div>
			<TooltipHelpContainer page='home' />
			<DashboardComponent />
		</div>
	);
}
