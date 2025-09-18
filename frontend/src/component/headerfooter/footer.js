import React from "react";
import PropTypes from "prop-types";
import "./footer.css";

const FooterLinkSection = PropTypes.shape({
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      isExternal: PropTypes.bool,
      iconClass: PropTypes.string,
    })
  ).isRequired,
});

const Footer = ({ projectName, linkSections }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-google">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-title">{projectName}</span>
        </div>

        {/* Sections */}
        <div className="footer-links">
          {linkSections.map((section, idx) => (
            <div className="footer-section" key={idx}>
              <h4 className="footer-heading">{section.title}</h4>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      {...(link.isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {link.text}
                      {link.iconClass && <i className={link.iconClass}></i>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} {projectName} — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  projectName: "MotoMart",
  linkSections: [
    {
      title: "Project Links",
      links: [
        {
          text: "GitHub",
          href: "https://github.com/AkashDeolikar/MotoMart",
          isExternal: true,
          iconClass: "bi bi-github",
        },
        {
          text: "Vercel Hosting",
          href: "https://motomart-ten.vercel.app",
          isExternal: true,
          iconClass: "bi bi-box-arrow-up-right",
        },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/home" },
        { text: "Car Detail", href: "/cardetails" },
        { text: "EMI Calculator", href: "/emicalculator" },
      ],
    },
    {
      title: "Bike Riding Gears",
      links: [
        { text: "Gears Page", href: "/MainPageGear" },
        { text: "Off-Road Asset", href: "/RaidOffroadGear" },
        { text: "Jacket", href: "/JacketPage" },
        { text: "Helmet", href: "/HelmetStore" },
      ],
    },
  ],
};

Footer.propTypes = {
  projectName: PropTypes.string,
  linkSections: PropTypes.arrayOf(FooterLinkSection),
};

export default Footer;
