import * as React from 'react';

export default function PageTitle(props) {
    return (
        <div>
        <div className="row justify-content-between blue">
        <div className="col-md-6">
            <h2>{props.title}{/*Track Log*/}</h2>
        </div>
            <div className="col-md-6 text-md-right">{props.todaysDate}{/*Monday september 4th 2017*/}</div>
        </div>
        <hr className="hr-line mt-1" />
        </div>
    )

}