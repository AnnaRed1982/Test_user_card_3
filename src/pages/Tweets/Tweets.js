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
  const [searchValue, setSearchValue] = useState('all');

  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await fetchUsers(page, searchValue);

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
  }, [page, searchValue]);

  useEffect(() => {
    const fetchResponsePages = async () => {
      try {
        const response = await fetchUsersAmount(searchValue);

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
  }, [searchValue]);

  const userVote = async (id, vote, followers) => {
    try {
      await fetchUserVoteUpdate(id, vote, followers);
      const response = await fetchUsersAmount(searchValue);
      setUsersAmount(response.length);
      let length = users.length;

      setUsers(response.slice(0, length));
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      setError(error.message);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSelect = event => {
    setUsers([]);
    setPage(1);
    setSearchValue(event.target.value);
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
        <label>
          <select
            value={searchValue}
            className={css.select}
            onChange={handleSelect}
          >
            <option value="all">All</option>
            <option value="follow">Follow</option>
            <option value="followings">Following</option>
          </select>
        </label>
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
