import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SigninContainer from '../containers/SigninContainer';

function SigninPage() {
  const token = useSelector((state) => state.auth.token);
  if (token !== null) {
    return <Redirect to="/" />;
  }

  return <SigninContainer />;
}

export default SigninPage;
