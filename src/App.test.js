import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
// Smoke Test
it('renders without crashing', function() {
	render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
});

// Snapshot Test
it('matches snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
