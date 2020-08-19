import { act } from 'react-dom/test-utils';

import { render_dashboard } from './index';

it('renders successfully', async () => {
  await act(async () => { render_dashboard(document.createElement('div')); } );
});
