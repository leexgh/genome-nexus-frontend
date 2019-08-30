import * as React from 'react';
import {FormEvent} from "react";
import "./CheckBox.css";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { Form, Button } from "react-bootstrap";

interface ICheckBoxProps
{
    checkboxName: string;
    isChecked: boolean;
    className?: string;
    onChange?: (event: FormEvent<any>) => void;
}

@observer
class CheckBox extends React.Component<ICheckBoxProps>
{
    @computed get className() {
        if (this.props.className) {
            return this.props.className;
        }
        else {
            // set different checkbox background for selected/unselected chechkbox
            return this.props.isChecked ? "selectedBackground" : "unselectedBackground";
        }
    }

    public render()
    {
        return (
            <div className={this.className}>
                <Form.Check
                    className="custom-checkbox"
                    type={"checkbox"}
                    // click button will go the selection field and make it on the top
                    label={<Button href={`#${this.props.checkboxName}`} variant="link"> {this.props.checkboxName}</Button>}
                    onChange={this.props.onChange}
                    value={this.props.checkboxName}
                    checked={this.props.isChecked}
                />
            </div>
        );
    }
}

export default CheckBox;