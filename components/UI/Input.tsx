function Input(props: any) {
  const classes = "input " + props.className;
  return <input className={classes} {...props} />;
}

export default Input;
