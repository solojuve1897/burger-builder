import React from 'react';

import Aux from '../../../hoc/auxiliary'

const orderSummary = (props) => {
    const ingredientsSummary = props.ingredients.map((ingredient) => (
        <li key={ingredient.type}>
            <span style={{textTransform: 'capitalize'}}>{ingredient.type}</span>: {ingredient.count}
        </li>
    ))
    return ( 
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
     );
}
 
export default orderSummary;