import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const checkedContact = (name, number) => {
      return contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() &&
          contact.number === number
      );
    };

    if (checkedContact(name, number)) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(() => ({
      contacts: [newContact, ...contacts],
    }));
  };

  const deleteContact = id => {
    setContacts(() => {
      return { contacts: contacts.filter(contact => contact.id !== id) };
    });
  };

  const changeFilter = e => {
    setFilter({ filter: e.currentTarget.value });
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    setContacts({ contacts: parsedContacts });
  }, [contacts]);

  const filteredContacts = getFilteredContacts;
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100px',
          marginBottom: '20px',
          backgroundColor: '#acacc8',
          color: '#017fb8',
          fontSize: '35px',
        }}
      >
        React-hw-04-Phonebook
      </div>
      <div
        style={{
          marginBottom: '20px',
          padding: '20px',
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </div>
      <div
        style={{
          padding: '20px',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={filteredContacts} onClick={deleteContact} />
      </div>
    </div>
  );
}
