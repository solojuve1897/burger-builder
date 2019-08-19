import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

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
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
     );
}
 
export default orderSummary;