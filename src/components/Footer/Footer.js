import React from "react";
import footerimg from "./evangadi-logo-footer.png";
import "./Footer.css";
import youtube from "./youtube.png";
import instagram from "./icons8-instagram-48.png";
import facebook from "./icons8-facebook-48.png";

function Footer() {
  return (
    <div>
      {/* footer  */}
      <footer class="footer">
        <div class="footer-wrapper">
          {/* first section socialmedias */}
          <div className="social">
            <img class="footer-logo" src={footerimg} alt="footer-logo" />
            <div class="socialmedias">
              <a href="https://www.facebook.com/evangaditech" alt="facebook">
                <img src={facebook} alt="facebook logo" />
              </a>

              <a href="https://www.instagram.com/evangaditech/" alt="instagram">
                <img src={instagram} alt="instagram-logo" />
              </a>
              <a href="https://www.youtube.com/@EvangadiTech" alt="youtube">
                <img src={youtube} alt="youtube-logo" />
              </a>
            </div>
          </div>
          {/* second section useful links */}
          <div class="link-wrapper">
            <h4>Useful Link</h4>
            <div className="link-outer-wrapper">
              <div class="internal-links">
                <p>
                  <a
                    className="a1"
                    href="https://www.evangadi.com/explained/"
                    target="blank"
                  >
                    how it works
                  </a>
                </p>

                <br />
                <p>
                  <a
                    className="a2"
                    href="https://www.evangadi.com/legal/terms/"
                    target="blank"
                  >
                    Terms of Service
                  </a>
                </p>

                <br />

                <p>
                  <a
                    className="a3"
                    href="https://www.evangadi.com/legal/privacy/"
                    target="blank"
                  >
                    Privacy policy
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* third section contact info */}
          <div class="contact-info">
            <h4>Contact info</h4>
            <div className="info-links">Evangadi Networks</div>
            <div className="info-links">support@evangadi.com</div>
            <div className="info-links">+1-202-306-2702</div>
          </div>
        </div>
        <h1 className="developedby">
          Developed by:
          <a href="https://www.linkedin.com/in/nebiyu-tefera-5a5b5428a/">
            {" "}
            Nebiyu Tefera
          </a>
        </h1>
      </footer>
    </div>
  );
}

export default Footer;
