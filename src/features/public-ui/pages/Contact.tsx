import React, { FormEvent } from 'react';
import HomeNavBar from '../../../common/components/HomeNavBar';
import ContactWrapper from '../styles/Contact';

function Contact() {
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <ContactWrapper>
      <HomeNavBar />
      <section className="main-contact">
        <form onSubmit={sendEmail}>
          <label htmlFor="name">
            <p>Name: (optional)</p>
            <input type="text" placeholder="Enter your name" />
          </label>
          <label htmlFor="email">
            <p>Email:</p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter a valid email"
            />
          </label>
          <label htmlFor="message">
            <p>Message:</p>
            <textarea
              name="message"
              id="message"
              cols={30}
              rows={10}
              placeholder="Enter your message"
            />
          </label>
          <button type="submit" className="email-btn">
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
