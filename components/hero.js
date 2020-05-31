function Hero({ title, description, image }) {
  const style = {
    background: `url(${image}) center center/cover no-repeat`
  };

  return (
    <div className="Hero" style={style}>
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