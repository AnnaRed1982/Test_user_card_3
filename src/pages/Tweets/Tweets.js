import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { HiArrowLeft } from 'react-icons/hi';

import { fetchUsers } from 'services/api';
import { fetchUserVoteUpdate } from 'services/api';
import { fetchUsersAmount } from 'services/api';

import { UsersList } from 'components/UsersList/UsersList';
import { Button } from 'components/Button/Button';

import css from './Tweets.module.css';

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('ideal');
  const [usersAmount, setUsersAmount] = useState(0);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await fetchUsers(page);

        if (response.length === 0) {
          setStatus(null);
          return alert('Sorry, there are no users in database');
        }
        if (response.length > 0) {
          setUsers(prevUsers => [...prevUsers, ...response]);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
        setError(error.message);
      }
    };

    fetchResponse();
  }, [page]);

  useEffect(() => {
    const fetchResponsePages = async () => {
      try {
        const response = await fetchUsersAmount();

        if (response.length === 0) {
          setStatus(null);
          return alert('Sorry, there are no users in database');
        }
        if (response.length > 0) {
          setUsersAmount(response.length);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
        setError(error.message);
      }
    };

    fetchResponsePages();
  }, []);

  const userVote = async (id, vote, followers) => {
    try {
      const response = await fetchUserVoteUpdate(id, vote, followers);
      const result = users.map(user =>
        user.id === response.id ? response : user
      );
      setUsers(result);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setError(error.message);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'rejected') {
    return (
      <>
        <h2>Whoops, something went wrong: {error}</h2>
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <div className="container">
        <UsersList users={users} userVote={userVote} />
        <div className={css.buttonContainer}>
          <Link to={backLinkHref.current} style={{ textDecoration: 'none' }}>
            <button type="button" className={css.button}>
              <HiArrowLeft size="20" />
              Go back
            </button>
          </Link>
          {users.length < usersAmount && <Button onClick={loadMore} />}
        </div>
      </div>
    );
  }
};

export default Tweets;
