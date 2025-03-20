import React from "react";
import "./Footer.css";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_items">
        <div className="support_section">
          <h3> Support</h3>
          <ul className="footer_links">
            <li>Help Center</li>
            <li>Safety Information</li>
            <li>Cancellation Options</li>
            <li>Our COVID-19 Response</li>
            <li>Supporting people with disabilities</li>
            <li>Report a neighborhood concern</li>
          </ul>
        </div>
        <div className="community_section">
          <h3> Community</h3>
          <ul>
            <li>Airbnb.org: disaster relief housing</li>
            <li>Support: Afghan refugees</li>
            <li>Celebrating diversity & belonging</li>
            <li>Combating discrimination</li>
          </ul>
        </div>
        <div className="hosting_section">
          <h3> Hosting</h3>
          <ul>
            <li>Try hosting</li>
            <li>AirCover:protection for Hosts</li>
            <li>Explore hosting resources</li>
            <li>Visit our community forum</li>
            <li>How to host responsibly</li>
          </ul>
        </div>
        <div className="about_section">
          <h3> About</h3>
          <ul>
            <li>Newsroom</li>
            <li>Learn about new features</li>
            <li>Letter from our founders</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb Luxe</li>
          </ul>
        </div>
      </div>
      <div className="copyright_footer">
        <div className="copyright_info">
          <div className="copyright">
            <span>© 2024 Airbnb, Inc. · Privacy · Terms · Sitemap</span>
          </div>
          <div className="drop_downs">
            <LanguageIcon />
            <select name="translate" id="translate">
              <option value="English">English</option>
              <option value="Swahili">Swahili</option>
            </select>
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
