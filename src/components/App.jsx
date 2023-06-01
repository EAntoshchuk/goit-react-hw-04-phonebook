import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
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

    setContacts(contacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...contacts];
    });
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().trim().includes(normalizedFilter);
    });
    return filteredContacts;
  };

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
        <ContactList contacts={getFilteredContacts()} onClick={deleteContact} />
      </div>
    </div>
  );
}
