import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// pages
import Error from './pages/Error';
import Signin from './pages/Signin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';

// redux
import create from './redux/create';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { useState } from 'react';
import Modal from './components/Modal';
import Add from './pages/Add';

// 1. 히스토리를 생성
const history = createBrowserHistory();

// 2. 스토어를 생성
const store = create(history);

function App() {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      {visible && (
        <Modal>
          <div
            style={{
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.5)',
            }}
            onClick={hide}
          >
            나는 모달이다.
          </div>
        </Modal>
      )}
      <button onClick={show}>모달 오픈</button>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/add" component={Add} />
            <Route path="/signin" component={Signin} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
