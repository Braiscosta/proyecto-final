import "./fire.css";

function Fire({ counterTop }) {
  let clase;
  if (counterTop < 50) {
    clase = "flames-peq";
  } else if (counterTop > 50 && counterTop < 150) {
    clase = "flames-med";
  } else if (counterTop > 150) {
    clase = "flames";
  }

  return (
    <div className="fire">
      <div className={clase}>
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
      </div>
      <div className="logs"></div>
    </div>
  );
}
export default Fire;
