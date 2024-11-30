import { useState, useEffect, useRef } from "react";
import "./App.css";
import bulb from "./assets/images/bulb.png";
import bulbYellow from "./assets/images/bulb_yellow.png";
import bulbRed from "./assets/images/bulb_red.png";
import bulbBlue from "./assets/images/bulb_blue.png";
import bulbGreen from "./assets/images/bulb_green.png";
import bulbPink from "./assets/images/bulb_pink.png";
import backgroundMusic from "./assets/audio/September.mp3";
import videoFile from "./assets/videos/Video.mp4";
import surpriseImage from "./assets/images/hesitate.gif";
import Please from "./assets/images/Please.gif";
import HeartBeat from "./assets/images/heartbeat-tom-and-jerry.gif";
import { GiftBox } from "./GiftBox";

const App = () => {
  const [isLightsOff, setIsLightsOff] = useState(true);
  const [normalBulbsVisible, setNormalBulbsVisible] = useState(false);
  const [showColoredBulbs, setShowColoredBulbs] = useState(false);
  const [hoverTextVisible, setHoverTextVisible] = useState(false);
  const [showPlayMusicButton, setShowPlayMusicButton] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showClickForSomethingButton, setShowClickForSomethingButton] =
    useState(false);
  const [showCard, setShowCard] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [showThankYouImage, setShowThankYouImage] = useState(false);
  const [showSurpriseButton, setShowSurpriseButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showSurpriseImage, setShowSurpriseImage] = useState(false);
  const [clickYes, setClickYes] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [areBulbsGlowing, setAreBulbsGlowing] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const [showTypingEffectMessage, setShowTypingEffectMessage] = useState(false);

  const toggleLights = () => {
    setIsLightsOff(false);

    document.body.style.cursor = "default";
  };
  const audioRef = useRef(new Audio(backgroundMusic));
  audioRef.current.volume = 0.1;
  const playMusic = () => {
    setIsPlayingMusic(true);
    audioRef.current.loop = true;
    audioRef.current.play();
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    setShowPlayMusicButton(false);

    setTimeout(() => {
      setShowClickForSomethingButton(true);
      setIsPlayingMusic(false);
    }, 10000);
  };

  const handleVideoEnd = () => {
    setTimeout(() => setShowSurpriseImage(true), 1000);
  };

  const handleClick = () => {
    setShowFinalMessage(true);
    setTimeout(() => {
      setShowImage(true);
      setTimeout(() => {
        setShowImage(false);
        setShowTypingEffectMessage(true);
      }, 7000);
    }, 2000);
  };

  const TypingEffect = ({ text, speed = 100 }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let index = 0;
      let exclamationCount = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          const currentChar = text[index];

          if (currentChar === "!") {
            exclamationCount++;
          }

          if (exclamationCount > 3) {
            clearInterval(interval);
            return;
          }

          setDisplayedText((prev) => prev + currentChar);
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, [text, speed]);

    return <p className="typing-effect">{displayedText}</p>;
  };

  useEffect(() => {
    if (!isLightsOff) {
      setNormalBulbsVisible(true);
      const timer = setTimeout(() => {
        setShowColoredBulbs(true);
      }, 2000);

      const musicButtonTimer = setTimeout(() => {
        setShowPlayMusicButton(true);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(musicButtonTimer);
      };
    }
  }, [isLightsOff]);

  useEffect(() => {
    if (showColoredBulbs) {
      setAreBulbsGlowing(true);
    }
  }, [showColoredBulbs]);

  const bulbs = showColoredBulbs
    ? [
        { id: 1, src: bulbYellow, glowing: true },
        { id: 2, src: bulbRed, glowing: true },
        { id: 3, src: bulbBlue, glowing: true },
        { id: 4, src: bulbGreen, glowing: true },
        { id: 5, src: bulbPink, glowing: true },
      ]
    : normalBulbsVisible
    ? Array(5).fill({ id: null, src: bulb, glowing: isPlayingMusic })
    : [];

  useEffect(() => {
    let countdownTimer;
    if (isCountdownVisible && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownTimer);
  }, [isCountdownVisible, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setShowBirthdayMessage(true);
      setCountdown(null);
    }
  }, [countdown]);

  useEffect(() => {
    if (showBirthdayMessage) {
      const thankYouTimer = setTimeout(() => {
        setShowThankYouImage(true);
      }, 7000);

      return () => clearTimeout(thankYouTimer);
    }
  }, [showBirthdayMessage]);

  useEffect(() => {
    if (showBirthdayMessage) {
      const surpriseButtonTimer = setTimeout(() => {
        setShowGreeting(true);
      }, 10000);

      return () => clearTimeout(surpriseButtonTimer);
    }
  }, [showBirthdayMessage]);

  const handleLearnMoreClick = () => {
    setShowCard(false);
    setIsCountdownVisible(true);
  };

  const handleSurpriseButtonClick = () => {
    setShowGiftBox(false);
    setShowVideo(true);
  };

  const handleClickForGreeting = () => {
    setShowGreeting(false);
    setShowGiftBox(true);
    setTimeout(() => {
      setShowSurpriseButton(true);
    }, 3000);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowMobileMessage(true);
      } else {
        setShowMobileMessage(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobileMessageCard = (
    <div className="mobile-message-card">
      <h3>Mobile Devices Are Not Supported</h3>
      <p>
        This app is not optimized for mobile devices. Please view it on a
        desktop.
      </p>
      <button onClick={() => setShowMobileMessage(false)}>Close</button>
    </div>
  );

  return (
    <div className={`app-container ${!isLightsOff ? "light" : "dark"}`}>
      {showMobileMessage && (
        <div className="popup-overlay">{mobileMessageCard}</div>
      )}

      {isLightsOff && (
        <button
          onClick={toggleLights}
          className="toggle-button"
          onMouseEnter={() => setHoverTextVisible(true)}
          onMouseLeave={() => setHoverTextVisible(false)}
        >
          {hoverTextVisible ? "Click to Turn On" : "TURN ON LIGHTS"}
        </button>
      )}
      <div className="bulb-container">
        {bulbs.map((bulbItem, index) => (
          <img
            key={index}
            className={`bulb ${bulbItem.glowing ? "glowing" : ""}`}
            src={bulbItem.src}
            alt={`bulb-${bulbItem.id || "normal"}`}
          />
        ))}
      </div>

      {showPlayMusicButton &&
        !showCard &&
        !showGiftBox &&
        !showGreeting &&
        !showVideo &&
        !showSurpriseImage &&
        !showFinalMessage &&
        !isCountdownVisible && (
          <button className="toggle-button" onClick={playMusic}>
            Play Music
          </button>
        )}
      {isPlayingMusic && !showClickForSomethingButton && (
        <div className="music-bar">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bar"></div>
          ))}
        </div>
      )}
      {showClickForSomethingButton && !showCard && !isCountdownVisible && (
        <button className="toggle-button" onClick={() => setShowCard(true)}>
          Click for Something
        </button>
      )}
      {showCard && (
        <div className="card">
          <div className="card-content">
            <h2 className="card-title">Memorable Picture</h2>
            <p className="card-body">Did you Remember the image?</p>
            <button className="learn-button" onClick={handleLearnMoreClick}>
              Click to See a Message for You
            </button>
          </div>
        </div>
      )}
      {isCountdownVisible && countdown > 0 && (
        <div className="countdown">
          <span>{countdown}</span>
        </div>
      )}
      {showBirthdayMessage && !showGiftBox && !showGreeting && !showVideo && (
        <div className="birthday-celebration">
          <div className="fireworks">
            <img
              src="/src/assets/images/Firework.webp"
              alt="Firework"
              className="firework"
            />
            <img
              src="/src/assets/images/giphy.webp"
              alt="Firework"
              className="firework"
            />
            <img
              src="/src/assets/images/Firework.webp"
              alt="Firework"
              className="firework"
            />
          </div>
          <div className="birthday-message">
            {Array.from("Happy    Birthday    Ayisha").map((letter, index) => (
              <span key={index} className={`letter letter-${index}`}>
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {showGreeting && !showVideo && (
        <button className="toggle-button" onClick={handleClickForGreeting}>
          Click for Greeting
        </button>
      )}
      {showGiftBox && !showVideo && (
        <>
          <GiftBox />
          {showSurpriseButton && (
            <button
              className="surprise-toggle-button"
              onClick={handleSurpriseButtonClick}
            >
              Click me for a surprise!
            </button>
          )}
        </>
      )}

      {showVideo && !showSurpriseImage && (
        <div className="video-container">
          <video
            width="100%"
            height="auto"
            controls
            autoPlay
            muted
            onEnded={handleVideoEnd}
          >
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {showSurpriseImage && !showFinalMessage && (
        <div className="surprise-image-container fade-in">
          <img
            src={clickYes ? Please : surpriseImage}
            alt="Surprise"
            className="surprise-image"
          />
          <p className="ask-text">Shall I ask you something?</p>
          <button
            className="toggle-button"
            onMouseEnter={() => setClickYes(true)}
            onMouseLeave={() => setClickYes(false)}
            onClick={handleClick}
          >
            Please Click Yes
          </button>
        </div>
      )}

      {showFinalMessage && !showTypingEffectMessage && (
        <div
          className={`final-message-container ${
            showImage ? "with-image-margin" : ""
          }`}
        >
          <h2 className="animated-message">Can We Talk?</h2>
          {showImage && (
            <div className="image-container fade-in">
              <img
                src={HeartBeat}
                alt="Thank You"
                className="thank-you-image"
              />
            </div>
          )}
        </div>
      )}

      {showTypingEffectMessage && (
        <div className="typing-message-container">
          <TypingEffect text="Thank you for spending your precious time to go through this. I really hope you liked it! I'm eagerly awaiting the answer to my last question, and I trust it will be a positive one. Wishing you happiness always, and once again, a very happy birthday to you, Ayisha! May this year bring you endless joy and success!" />
        </div>
      )}
    </div>
  );
};

export default App;