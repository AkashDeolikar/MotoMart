import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import './footer.css'; // Assuming the CSS file is in the same directory

// Define prop types for better code quality and documentation
const FooterLinkSection = PropTypes.shape({
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      isExternal: PropTypes.bool,
      iconClass: PropTypes.string, // For Bootstrap icons, e.g., "bi bi-github"
    })
  ).isRequired,
});

const Footer = ({ projectName, linkSections }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Project Name Section */}
      <h2 className="footer__project-name">{projectName}</h2>

      {/* Main Footer Content Container */}
      <div className="footer__container">
        {linkSections.map((section, index) => (
          <div className="footer__section" key={index}>
            <h5 className="footer__section-title">{section.title}</h5>
            <ul className="footer__list">
              {section.links.map((link, linkIndex) => (
                <li className="footer__list-item" key={linkIndex}>
                  <a
                    href={link.href}
                    {...(link.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                    className="footer__link"
                  >
                    {link.text} {link.iconClass && <i className={link.iconClass}></i>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Bottom Section */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {currentYear} {projectName} TrueValue. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Define default props for easier usage
Footer.defaultProps = {
  projectName: 'MotoMart',
  linkSections: [
    {
      title: 'Project Links',
      links: [
        { text: 'GitHub', href: 'https://github.com/AkashDeolikar/MotoMart', isExternal: true, iconClass: 'bi bi-github' },
        { text: 'Vercel Hosting', href: 'https://motomart-ten.vercel.app', isExternal: true, iconClass: 'bi bi-box-arrow-up-right' }, // Changed to a more general external link icon
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { text: 'Home', href: '/home' },
        { text: 'Car Detail', href: '/cardetails' },
        { text: 'Contact Us', href: '/contact' },
      ],
    },
  ],
};

// Add PropTypes for validation
Footer.propTypes = {
  projectName: PropTypes.string,
  linkSections: PropTypes.arrayOf(FooterLinkSection),
};

export default Footer;