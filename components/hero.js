function Hero({ title, description }) {
  return (
    <div className="Hero">
      <div className="Hero-colorOverlay">
        <div className="Hero-info">
          <h1>{title}</h1>
          {description}
        </div>
      </div>
    </div>
  );
}

export default Hero;