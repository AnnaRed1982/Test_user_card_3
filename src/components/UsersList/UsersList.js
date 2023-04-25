import Logo from '../../images/Logo.png';
import Background from '../../images/Background.png';
import Rectangle from '../../images/Rectangle.png';
import Ellipse from '../../images/Ellipse.png';
import css from './UsersList.module.css';

export const UsersList = ({ users, userVote }) => {
  return (
    <>
      <ul className={css.list}>
        {users.map(({ id, user, tweets, followers, avatar, vote }) => (
          <li key={id} className={css.card}>
            <img src={Logo} alt="logo" className={css.logo} />
            <img src={Background} alt="background" className={css.background} />
            <img src={Rectangle} alt="rectangle" className={css.rectangle} />
            <img src={Ellipse} alt="ellipse" className={css.ellipse} />
            <img src={avatar} alt={user} className={css.foto} />
            <div className={css.titleBox}>
              <p className={css.title}>{tweets} TWEETS</p>
              <p className={css.title}>
                {followers.toLocaleString('en-US')} Followers
              </p>
            </div>
            <button
              type="button"
              className={vote ? css.buttonActive : css.button}
              onClick={
                !vote
                  ? () => userVote(id, !vote, (followers += 1))
                  : () => userVote(id, !vote, (followers -= 1))
              }
            >
              {vote ? 'Following' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
