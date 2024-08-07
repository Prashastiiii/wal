import React, { useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { ProductContext } from '../context';

const Navbar = () => {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const { addToCart } = useContext(ProductContext);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    const startRecognition = () => {
      if (!isListeningRef.current) {
        try {
          recognition.start();
          isListeningRef.current = true;
        } catch (error) {
          console.error('Error starting recognition:', error);
        }
      }
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log('Recognized command:', command);

      if (command.includes('go to cart')) {
        navigate('/cart');
       
        speak('Done');
      } else if (command.includes('go to home')) {
        navigate('/');
        
        speak('Done');
      } else if (command.includes('go to login')) {
        navigate('/login');

        speak('Done');
      } else if (command.includes('go to signup')) {
        navigate('/signup');
      
        speak('Done');
      } else if (command.includes('add tata salt to cart')) {
        addToCart(3); 
        
        speak('Done');
      } else if (command.includes('add google pixel to cart')) {
        addToCart(1); 
       
        speak('Done');
      } else if (command.includes('add wooden shelf to cart')) {
        addToCart(4); 
      
        speak('Done');
      } else if (command.includes('total amount of cart')) {
        // Implement logic for 'total amount of cart' if necessary
    
        speak('Done');
      } else {
        speak('Command not recognized');
       
      }
      
      recognition.stop();
      isListeningRef.current = false;
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isListeningRef.current = false;
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        startRecognition();
      }
    };

    recognition.onstart = () => {
      isListeningRef.current = true;
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      setTimeout(() => startRecognition(), 1000);
    };

    const speak = (text) => {
      const synth = window.speechSynthesis;
      if (!synth) {
        console.error('Speech Synthesis API is not supported in this browser.');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => {
        console.log('Speech started');
      };

      utterance.onend = () => {
        console.log('Speech Synthesis finished');
      };

      utterance.onerror = (event) => {
        console.error('Speech Synthesis error:', event.error);
      };

      // Check if there are any available voices
      if (synth.getVoices().length === 0) {
        console.error('No speech synthesis voices available.');
        return;
      }

      synth.speak(utterance);
    };

    const loadVoices = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          console.log('Voices changed:', window.speechSynthesis.getVoices());
        };
      }
    };

    // Load voices when the component mounts
    loadVoices();

    startRecognition();

    return () => {
      recognition.stop();
      recognition.onend = null;
    };
  }, [navigate, addToCart]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          <img src="img/walmart.png" alt="Walmart Logo"/>
        </NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link" activeClassName="active" end>
          Home
        </NavLink>
        <NavLink to="/cart" className="navbar-link" activeClassName="active">
          Cart
        </NavLink>
        <NavLink to="/login" className="navbar-link" activeClassName="active">
          Login
        </NavLink>
        <NavLink to="/signup" className="navbar-link" activeClassName="active">
          Signup
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
