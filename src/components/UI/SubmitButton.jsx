import classes from './SubmitButton.module.scss';

function SubmitButton(props) {
  return (
    <button
      className={`${classes['submit-btn']} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default SubmitButton;
