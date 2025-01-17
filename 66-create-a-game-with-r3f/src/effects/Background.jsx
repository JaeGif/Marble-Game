import style from './effects.module.css';

function Background() {
  return (
    <div className={`${style.effectContainer}`}>
      <img
        className={`${style.animation} ${style.colorimg} ${style.greyscale}`}
        src={`/assets/home/greyscale.jpg`}
        alt='background grey'
      ></img>
      <img
        className={`${style.color}`}
        src={`/assets/home/color.jpg`}
        alt='background color'
      ></img>
    </div>
  );
}

export default Background;
