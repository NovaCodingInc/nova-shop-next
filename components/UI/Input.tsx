function Input(props: any) {
  const classes = "input " + props.className;
  return (
    <input
      type={props.type}
      className={classes}
      id={props.id}
      placeholder={props.placeholder}
      required={props.required}
      onChange={props.onChange}
    />
  );
}

export default Input;
