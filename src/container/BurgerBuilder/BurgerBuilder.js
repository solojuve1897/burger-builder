import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/auxiliary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: [
            {type: 'salad', count: 0},
            {type: 'bacon', count: 0},
            {type: 'cheese', count: 0},
            {type: 'meat', count: 0},
        ],
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const ingredients = [...this.state.ingredients]
        const updatedIngredient = ingredients.find((ingredient) => ingredient.type === type);
        updatedIngredient.count++;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newTotalPrice,
            ingredients: ingredients
        });
    }

    removeIngredientHandler = (type) => {
        const ingredients = [...this.state.ingredients]
        const updatedIngredient = ingredients.find((ingredient) => ingredient.type === type);
        if (updatedIngredient.count <= 0) { return }
        updatedIngredient.count--;
        const newTotalPrice =  this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newTotalPrice,
            ingredients: ingredients
        });
    }

    render () {
        const disabledInfo = this.state.ingredients.reduce((obj, item) =>
            Object.assign(obj, { [item.type]: item.count <= 0}), 
        {})
        return (
          <Aux>
              <Burger ingredients={this.state.ingredients} />
              <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo} 
                price={this.state.totalPrice}/>
          </Aux>
        )
    }
}

export default BurgerBuilder