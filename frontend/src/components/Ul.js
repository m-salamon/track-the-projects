import * as React from 'react';
import Li from './Li';

export default function Ul(props) {
    return (
        <ul className={props.className}>
            {props.listItems.map((item) => <Li key={item} name={item} />)}
        </ul>
    )
}
