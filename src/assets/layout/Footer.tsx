import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className=" container-fluid text-white mt-5 ">
      <div className="w-100 border-top border-light mb-4"></div>

      <div className="container py-4 text-black">
        <div className="row">
          <div className="col-md-3 col-12 mb-4 text-md-start text-left ">
            <Link to="/">
              <h1 className=" text-black text-muted">Gr8KEV</h1>
            </Link>
            <p className="text-muted">Your go-to store for quality products.</p>
            <p className="text-muted">Email: support@luane.com</p>
            <p className="text-muted">Phone: +123 456 7890</p>
          </div>

          <div className="col-md-3 col-12 mb-4 text-md-start text-left">
            <h5 className=" text-black">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-black text-muted">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/form" className="text-black text-muted">
                  Form
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-black text-muted">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/contact" className="text-black text-muted">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-12  mb-4 text-md-start text-left ">
            <h5 className=" text-black ">Customer Support</h5>
            <ul className="list-unstyled  ">
              <li className="">
                <Link to="/faqs" className="text-black text-muted">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-black text-muted">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-black text-muted">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-black text-muted">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-12 text-md-start text-left">
            <h5 className=" text-black">Follow Us</h5>
            <div className="d-flex gap-3 mb-3 mt-3">
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
              >
                <FaXTwitter size={24} />
              </Link>

              <Link
                to="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black"
              >
                <FaYoutube size={24} />
              </Link>
            </div>

            <div className="mt-3 mb-3 text-muted">
              Subscribe to Our Newsletter
            </div>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <button className="btn btn-secondary sub text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 border-top pt-3  ">
          &copy; 2025 GR8KEV. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
