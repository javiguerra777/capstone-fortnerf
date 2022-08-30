import React, { FormEvent } from 'react';
import styled from 'styled-components';
import HomeNavBar from '../components/HomeNavBar';

const ContactWrapper = styled.main`
  height: auto;
  textarea {
    resize: none;
  }
  textarea,
  input {
    color: #fff5ee;
    background: #222222;
    border: none;
  }
  input {
    height: 2em;
    margin-bottom: 0.5em;
    width: 30em;
  }
  textarea {
    width: 40em;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-right: 3em;
  }
  .main-contact {
    color: #fff5ee;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 3em;
    margin-left: 2em;
    margin-right: 2em;
    h2 {
      color: #16d892;
      font-size: 2em;
    }
  }
  .email-btn {
    background: #16d892;
    color: #fff5ee;
    cursor: pointer;
    margin-top: 1em;
    height: 3em;
    width: 10em;
  }
  @media (max-width: 860px) {
    input {
      width: 30vw;
    }
    textarea {
      width: 45vw;
    }
  }
`;

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
