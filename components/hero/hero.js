function Hero({ title, description, image, fullheight }) {
  const infoClass = fullheight
    ? 'info fullheight'
    : 'info';

  return (
    <div className="Hero" style={
      image ? { backgroundImage: `url(${image})` } : {}
    }>
      <div className="colorOverlay">
        <div className={infoClass}>
          <h1>{title}</h1>
          {description}
        </div>
      </div>
    </div>
  );
}

export default Hero;
