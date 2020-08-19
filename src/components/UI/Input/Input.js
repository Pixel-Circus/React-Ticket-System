import React from "react";
import Select from "react-select";
// Style
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  //console.log(props);
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <div className={classes.Input}>
          <label className={classes.Label}>{props.label}</label>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <div className={classes.Input}>
          <label className={classes.Label}>{props.label}</label>
          <textarea
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "select":
      const sanitizedOptions = [];
      props.elementConfig.options.map(function (option) {
        if (option.value && option.displayValue) {
          sanitizedOptions.push({
            value: option.value,
            label: option.displayValue,
          });
        } else if (option.value && !option.displayValue) {
          sanitizedOptions.push({ value: option.value, label: option.value });
        } else if (!option.value && option.displayValue) {
          sanitizedOptions.push({
            value: option.displayValue,
            label: option.displayValue,
          });
        }
      });
      inputElement = (
        <div className={classes.Input}>
          <label className={classes.Label}>{props.label}</label>
          <Select
            className={inputClasses.join(" ")}
            options={sanitizedOptions}
            isMulti
            onChange={props.changed}
          >
            {/*props.elementConfig.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                dangerouslySetInnerHTML={{ __html: option.displayValue }}
              ></option>
            ))*/}
          </Select>
        </div>
      );
      break;
    case "checkbox":
      inputElement = (
        <div className={classes.Input}>
          <label>
            <input
              type="checkbox"
              className={inputClasses.join(" ")}
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
            />
            {props.label}
          </label>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return inputElement;
};

export default input;
