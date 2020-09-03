import React from "react";
import Select from "react-select";
// Style
import classes from "./Input.scss";
import { Editor } from "@tinymce/tinymce-react";

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
        <div className={"Input " + classes.Input}>
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
        <div className={"Input " + classes.Input}>
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
        return false;
      });
      inputElement = (
        <div className={"Input " + classes.Input}>
          <label className={classes.Label}>{props.label}</label>
          <Select
            className={inputClasses.join(" ")}
            options={sanitizedOptions}
            onChange={props.changed}
            {...props.elementConfig}
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
        <div className={"Input " + classes.Input}>
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
    case "wysiwyg":
      inputElement = (
        <div className={"Input " + classes.Input}>
          <label>{props.label}</label>
          <Editor
            apiKey="1nnp243dek7309ia9k8n55ot1j5e3prw7kp4pb76tpro24sj"
            initialValue={props.value}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={props.changed}
          />
        </div>
      );
      break;
    case "button":
      inputElement = (
        <div className={"Input " + classes.Input}>
          <input type="button" value={props.value} onClick={props.submit} />
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
