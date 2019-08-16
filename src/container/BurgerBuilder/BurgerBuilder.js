import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/auxiliary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = () => {
        const isPurchasable = this.state.ingredients.find((ingredient) => ingredient.count > 0) !== undefined
        this.setState({purchasable: isPurchasable})
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
        this.updatePurchaseState()
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
        this.updatePurchaseState()
    }

    puchaseHandler = () => {
        this.setState({purchasing: true})
    }

    puchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    render () {
        const disabledInfo = this.state.ingredients.reduce((obj, item) =>
            Object.assign(obj, { [item.type]: item.count <= 0}), 
        {})
        return (
          <Aux>
              <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
                <OrderSummary ingredients={this.state.ingredients} />
              </Modal>
              <Burger ingredients={this.state.ingredients} />
              <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                makeOrder={this.puchaseHandler}
                price={this.state.totalPrice}/>
          </Aux>
        )
    }
}

export default BurgerBuilder