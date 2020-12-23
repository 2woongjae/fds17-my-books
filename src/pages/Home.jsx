import { Redirect } from 'react-router-dom';
import withToken from '../hocs/withToken';

function Home({ token }) {
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return (
    <div>
      <h1>홈</h1>
    </div>
  );
}

export default withToken(Home);
