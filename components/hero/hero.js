function Hero({ title, description, image, height }) {
  const style = {
    background: `url(${image}) center center/cover no-repeat #551991`,
    height: height || '100vh'
  };

  const infoClass = height === '100vh'
    ? 'Hero-info Hero-info--fullheight'
    : 'Hero-info';

  return (
    <div className="Hero" style={style}>
      <div className="Hero-colorOverlay">
        <div className={infoClass}>
          <h1>{title}</h1>
          {description}
        </div>
      </div>
    </div>
  );
}

export default Hero;
