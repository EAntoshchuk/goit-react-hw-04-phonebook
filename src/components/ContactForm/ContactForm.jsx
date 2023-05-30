import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setName({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(name, number);
    resetInput();
  };

  const resetInput = () => {
    setName({ [name]: '' });
    setNumber({ [number]: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.form_label}>
        <div className={css.form_title}>Name</div>

        <input
          className={css.form_input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.form_label}>
        <div className={css.form_title}>Number</div>

        <input
          className={css.form_input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
