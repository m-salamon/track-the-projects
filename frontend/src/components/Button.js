import * as React from 'react';

export default function Button(props) {
    return (
            <button
                className={props.className}
                type={props.type}
                onClick={props.onClick}>
                {props.buttonName}
            </button>
    );

}