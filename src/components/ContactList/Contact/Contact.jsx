import PropTypes from 'prop-types';
import css from './Contact.module.css';

export default function Contact({ id, name, number, onClick }) {
  return (
    <li key={id} className={css.contact_item}>
      <p className={css.contact_name}>{name}:</p>
      <p className={css.contact_number}>{number}</p>
      <button name="btnDelete" className={css.btn} onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
