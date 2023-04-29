import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    for (const contact of this.state.contacts) {
      if (contact.name === data.name) {
        return alert(`${data.name} is already in contacts.`);
      }
    }
    const updatedContacts = [data, ...this.state.contacts];
    this.setState({ contacts: updatedContacts });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = number => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.number !== number),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter}></Filter>
        <ContactsList
          contacts={this.getVisibleContacts()}
          onDelete={this.deleteContact}
        ></ContactsList>
      </div>
    );
  }
}
