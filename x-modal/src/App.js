import "./App.css";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: new Date(),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!");
      setErrors({});
      setShowModal(false);
    } else {
      setShowModal(true);
      if (newErrors.phone) {
        alert(newErrors.phone);
      }
      if (newErrors.dob) {
        alert(newErrors.dob);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (data.phone.length < 10 || data.phone.length > 10) {
      errors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
    }
    var now = new Date();
    var inputDate = new Date(data.dob);
    if (inputDate > now) {
      errors.dob =
        "Invalid date of birth. Date of birth cannotbe in the future.";
    }

    return errors;
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button className="submit-button" onClick={() => setShowModal(true)}>
        Open Form
      </button>
      {showModal && (
        <>
          <div
            className="modal-wrapper"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal">
            <div className="modal-content">
              <h1>Fill Details</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  required
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="email">Email Address:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="phone">Phone Number:</label>
                <br />
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  required
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="dob">Date of Birth:</label>
                <br />
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  required
                  onChange={handleChange}
                />
                <br />
                <button className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
