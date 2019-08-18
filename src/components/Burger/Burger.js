import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const burger = (props) => {
    const ingredientsOutput = getIngredientsOutput(props.ingredients)

    function getIngredientsOutput (ingredients) {
        const hasIngredients = ingredients.find((ingredient) => ingredient.count !== 0)
        if (hasIngredients === undefined) { return <p>Please start adding ingredients!</p> }
        
        return ingredients.map((ingredient) => {
            if (ingredient.count === 0) return false
            return [...Array(ingredient.count)].map((_, i) => {
                return <BurgerIngredient key={ingredient.type + i} type={ingredient.type} />
            })
        })
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsOutput}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}
 
export default burger;