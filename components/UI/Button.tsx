function Button(props: any) {
  const classes = "button " + props.className;
  return (
    <button type={props.type} className={classes} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

export default Button;
