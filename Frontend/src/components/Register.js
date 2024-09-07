import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Registration.css';

const Register = () => {
  const [formData, setFormData] = useState({
    Firstname: '',
    Lastname: '',
    email: '',
    Contact: '',
    password: '',
    confirmPassword: '',
    gender: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const requiredFields = [
      'Firstname', 'Lastname', 'email', 'Contact', 'password', 
      'confirmPassword', 'gender', 'securityQuestion', 'securityAnswer'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').toUpperCase()} is required!`);
        return;
      }
    }

    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA!', {
        autoClose: 3000, // Closes after 3 seconds
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.Firstname,
          lastname: formData.Lastname,
          email: formData.email,
          contact: formData.Contact,
          password: formData.password,
          gender: formData.gender,
          securityQuestion: formData.securityQuestion,
          securityAnswer: formData.securityAnswer,
          recaptchaValue: recaptchaValue,
        }),
      });

      if (response.ok) {
        toast.success('Registration successful!');
        navigate('/login', { replace: true }); // Instant navigation without loader
      } else {
        const errorData = await response.text();
        toast.error(`Error: ${errorData || 'Registration failed. Please try again.'}`);
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Registration error:', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login', { replace: true }); // Instant navigation without loader
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-right">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Register yourself</h2>

          <div className="input-row">
            <input
              type="text"
              name="Firstname"
              placeholder="First Name*"
              value={formData.Firstname}
              onChange={handleChange}
              required
              autoComplete="given-name"
              aria-label="First Name"
            />
            <input
              type="text"
              name="Lastname"
              placeholder="Last Name*"
              value={formData.Lastname}
              onChange={handleChange}
              required
              autoComplete="family-name"
              aria-label="Last Name"
            />
          </div>

          <div className="input-row">
            <input
              type="email"
              name="email"
              placeholder="Your Email*"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              aria-label="Email"
            />
            <input
              type="text"
              name="Contact"
              placeholder="Your Phone*"
              value={formData.Contact}
              onChange={handleChange}
              required
              autoComplete="tel"
              aria-label="Phone"
            />
          </div>

          <div className="input-row">
            <input
              type="password"
              name="password"
              placeholder="Password*"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              aria-label="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password*"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              aria-label="Confirm Password"
            />
          </div>

          <div className="input-row">
            <select
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              required
              aria-label="Security Question"
            >
              <option value="">Select Security Question*</option>
              <option value="What is your Imam's Name?">What is your Imam's Name?</option>
              <option value="What is your pet's name?">What is your pet's name?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
              <option value="What is your first school?">What is your first school?</option>
            </select>
            <input
              type="text"
              name="securityAnswer"
              placeholder="Your Answer*"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
              autoComplete="off"
              aria-label="Security Answer"
            />
          </div>

          <div className="gender-section">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                required
                aria-label="Gender Male"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                required
                aria-label="Gender Female"
              />
              Female
            </label>
          </div>

          <div className="input-row">
            <ReCAPTCHA
              sitekey="6Lcb5DMqAAAAAIIl4V5AOlufFrPaHsWhN8VK6l3L"
              onChange={handleRecaptchaChange}
              className="recaptcha"
            />
            <p className="login-link" onClick={handleLoginClick}>
              Already have an account? <span>Login</span>
            </p>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Register;
