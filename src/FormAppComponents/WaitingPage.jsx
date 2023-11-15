import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { labels } from "./Labels";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const pendingPageStyles = css`
  height: 82vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fa; // Soft, soothing background color

  p {
    font-size: 1.5rem;
    color: #757575; // Gentle color for text
    margin: 20px 0; // Spacing above and below the text
  }
  p2 {
    font-size: 0.8 rem;
    color: #757575; // Gentle color for text
    margin: 20px 0; // Spacing above and below the text
  }
`;
const contentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const loaderStyles = css`
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #e5e5e5;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }

  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }

  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }

  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

const WaitingPage = (props) => {
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/get-application?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }

        return response.json();
      })
      .then((data) => {
        if (data && (data.replyDate === null || data.replyDate === undefined)) {
          setStatus("pending");
        } else {
          navigate(`/${email}`);
        }
      })
      .catch((error) => {
        setStatus("error");
      });
  }, [email, navigate]);

  return (
    <div css={pendingPageStyles}>
      {status === "pending" && (
        <div css={contentWrapper}>
          <div css={loaderStyles}>
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <p>{labels.pending[language]}</p>
          <p2>{labels.revisitlink[language]}</p2>
        </div>
      )}
    </div>
  );
};

export default WaitingPage;
