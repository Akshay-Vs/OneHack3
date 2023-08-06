'use client'
import "./Button.scss";

interface Props {
  text?: string;
}
const Button = ({ text }: Props) => {
  return (
    <div className="Button" onClick={() => (window.location.href = "/start")}>
      <div className="content">{text}</div>
    </div>
  );
};

export default Button;
