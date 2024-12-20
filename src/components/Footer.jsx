import {
  faWhatsapp,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <div className="absolute text-white bottom-2 text-center sm:text-sm text-xs font-semibold sm:w-6/12 w-9/12 left-[50%] translate-x-[-50%]">
      <p>
        © حقوق الطبع والنشر 2024
        <a
          className="text-[#15dcffc0] mx-1.5 hover:text-[#187d8f] no-underline"
          href="https://una-oic.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          UNA.OIC.ORG
        </a>
        جميع الحقوق محفوظة لصالح
      </p>
      <div className="flex justify-center mt-2 gap-4 mx-auto text-center">
        <a
          // className="hover:text-[#15dcff] text-[#15dcff]"
          className="hover:text-[#187d8f] text-[#15dcffc0]"
          href="https://whatsapp.com/channel/0029Va9VuuE1XquahZEY5S1S"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="sm:w-5 sm:h-5 w-4 h-4"
            icon={faWhatsapp}
          />
        </a>
        <a
          className="hover:text-[#187d8f] text-[#15dcffc0]"
          href="https://www.facebook.com/unaoic"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="sm:w-5 sm:h-5 w-4 h-4"
            icon={faFacebook}
          />
        </a>
        <a
          // className="hover:text-[#15dcff] text-[#15dcff]"
          className="hover:text-[#187d8f] text-[#15dcffc0]"
          href="https://una-oic.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            className="sm:w-5 sm:h-5 w-4 h-4"
            icon={faGlobeAmericas}
          />
        </a>
        <a
          // className="hover:text-[#15dcff] text-[#15dcff]"
          className="hover:text-[#187d8f] text-[#15dcffc0]"
          href="https://twitter.com/UNAOIC"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className="sm:w-5 sm:h-5 w-4 h-4" icon={faTwitter} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
