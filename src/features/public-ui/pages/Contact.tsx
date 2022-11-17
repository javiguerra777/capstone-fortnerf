import React, { FormEvent, useState } from 'react';
import HomeNavBar from '../../../common/components/HomeNavBar';
import ContactWrapper from '../styles/Contact';
import validateEmail from '../../../common/functions/validateEmail';
import sendContact from '../utils';

function Contact() {
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      sendContact({
        name: state.name,
        email: state.email,
        message: state.message,
      });
    } catch (err) {
      console.log(err.message);
    }
    setState({ name: '', email: '', message: '' });
  };
  const buttonDisabled = () => {
    if (!validateEmail(state.email) || state.message.length <= 30) {
      return true;
    }
    return false;
  };
  const updateState = (option: string, value: string) => {
    switch (option) {
      case 'name':
        setState({ ...state, name: value });
        break;
      case 'email':
        setState({ ...state, email: value });
        break;
      case 'message':
        setState({ ...state, message: value });
        break;
      default:
        break;
    }
  };
  return (
    <ContactWrapper>
      <HomeNavBar />
      <section className="main-contact">
        <form onSubmit={sendEmail}>
          <label htmlFor="name">
            <p>Name: (optional)</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={state.name}
              onChange={(e) => updateState('name', e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <p>Email:</p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter a valid email"
              value={state.email}
              onChange={(e) => updateState('email', e.target.value)}
            />
          </label>
          <label htmlFor="message">
            <p>Message:</p>
            <textarea
              name="message"
              id="message"
              cols={30}
              rows={10}
              placeholder="Enter your message: min 30 characters"
              value={state.message}
              onChange={(e) => updateState('message', e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="email-btn"
            disabled={buttonDisabled()}
          >
            Send Message
          </button>
        </form>
        <section className="contact-text">
          <h1>We would love to hear from you!</h1>
          <h2>Contact Us</h2>
          <p>
            Currently, I am the only person working on this project.
            Basically I am a team of one. If you are interested,
            please fill out the contact form and we can talk. I would
            like to bring more people on and build out this online
            game.
          </p>
        </section>
      </section>
    </ContactWrapper>
  );
}

export default Contact;
