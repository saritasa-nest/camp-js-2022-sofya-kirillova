import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Loading } from './components/Loading';
import { RootRouter } from './routes/RootRouter';
import { store } from './store';

export const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Suspense fallback={<Loading />}>
          <RootRouter />
        </Suspense>
      </div>
    </BrowserRouter>
  </Provider>
);
