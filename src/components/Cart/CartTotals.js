import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

  // State to manage the button's disabled state
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Update button state when cartTotal changes
  useEffect(() => {
    if (cartTotal && cartTotal > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [cartTotal]);

  // Function to speak the cart totals
  const speakTotals = () => {
    const synth = window.speechSynthesis;

    if (!synth) {
      console.error('Speech Synthesis API is not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `The subtotal is ${cartSubTotal}, the tax is ${cartTax}, and the total amount is ${cartTotal}.`
    );

    utterance.onend = () => {
      console.log('Speech Synthesis finished');
    };
    utterance.onerror = (event) => {
      console.error('Speech Synthesis error:', event.error);
    };

    synth.speak(utterance);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => clearCart()}
              >
                Clear Cart
              </button>
            </Link>
            <h5>
              <span className="text-title">Subtotal :</span>
              <strong>{cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">Tax :</span>
              <strong>{cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">Total :</span>
              <strong>{cartTotal}</strong>
            </h5>
            {/* Button to manually trigger speech synthesis */}
            <button
              className="btn btn-outline-primary mt-3"
              onClick={speakTotals}
              disabled={!isButtonEnabled} // Disable if cartTotal is not available
            >
              Speak Totals
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
