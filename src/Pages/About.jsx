export default function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>Our Mission: Uniting Through Support</h1>
        <p className="hero-subtitle">
          At SupportSphere, we believe in the power of community and the impact
          of collective kindness. We provide a platform where individuals can
          share their stories and receive the support they need from a caring
          network of donors.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Empathy</h3>
            <p>
              We strive to understand and share the feelings of others,
              fostering a compassionate environment.
            </p>
          </div>
          <div className="value-item">
            <h3>Transparency</h3>
            <p>
              We are committed to open communication and accountability in all
              our operations.
            </p>
          </div>
          <div className="value-item">
            <h3>Community</h3>
            <p>
              We believe in the strength of collective action and the importance
              of a supportive network.
            </p>
          </div>
          <div className="value-item">
            <h3>Impact</h3>
            <p>
              We are dedicated to making a tangible difference in the lives of
              those who seek our help.
            </p>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? We'd love to hear from you!</p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5"></textarea>
          </div>
          <button type="submit" className="button">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
