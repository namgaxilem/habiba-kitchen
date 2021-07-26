import React, { useState, useEffect } from 'react';
import './quantityInput.scss';

function QuantityInput(props) {
    const { parentState, changeParentState } = props;

    return (
        <div className="quantity_input">
            <button className="minus" type="button" onClick={() => { if (parentState > 0) changeParentState(parentState - 1) }}>
                <svg width="18px" height="18px" viewBox="0 0 29 4">
                    <title>Minus</title>
                    <g transform="translate(-5 -18)" fill="none">
                        <rect width="39" height="39" rx="5"></rect>
                        <rect fill="currentColor" x="5" y="18" width="29" height="4" rx="2"></rect>
                    </g>
                </svg>
            </button>

            <input className="quantity_input" value={parentState} type="number" max="100" min="0" onChange={(e) => changeParentState(e.target.value)} />

            <button className="plus" type="button" onClick={() => { if (parentState < 50) changeParentState(parentState + 1) }}>
                <svg width="18px" height="18px" viewBox="0 0 29 29">
                    <title>Plus</title>
                    <g transform="translate(-5 -5)" fill="none">
                        <rect width="39" height="39" rx="5"></rect>
                        <g stroke="currentColor" stroke-linecap="round" stroke-width="4">
                            <path d="M7 19.5h25M19.5 7v25"></path>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
    );
}
export default QuantityInput;