import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BookListContainer from '../containers/BookListContainer';

function Home() {
  const token = useSelector((state) => state.auth.token);
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <BookListContainer />;
}

export default Home;
