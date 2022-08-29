function Button(props: any) {
  const classes = "button " + props.className;
  return (
    <button type={props.type} className={classes}>
      {props.children}
    </button>
  );
}

export default Button;
