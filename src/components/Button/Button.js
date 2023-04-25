import css from './Button.module.css';
import { HiArrowDown } from 'react-icons/hi';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      Load more
      <HiArrowDown size="20" />
    </button>
  );
};
