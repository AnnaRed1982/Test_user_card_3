import { Link, useLocation } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  const location = useLocation();
  return (
    <div className="container">
      <div className={css.background}>
        <h1 className={css.title}>The Best Social Network</h1>

        <Link to="/tweets" state={{ from: location }} className={css.button}>
          Start
        </Link>
      </div>
    </div>
  );
};

export default Home;
