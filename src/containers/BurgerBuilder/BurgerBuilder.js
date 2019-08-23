import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../plugins/axios'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
      axios.get('/ingredients.json')
        .then(response => {
            const ingredients = Object.keys(response.data).map(key => {
                return { type: key, count: response.data[key]}
            })
            this.setState({ingredients: ingredients})
        })
        .catch(error => {})
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

    purchaseContinueHandler = ()  => {
        // this.setState({loading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Mohammad Khalil',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '34243',
        //             country: 'Sweden'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => console.log(response))
        //     .catch(error => console.log(error))
        //     .finally(
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         })
        //     )
        
        this.props.history.push({
            pathname: '/checkout',
            params: {
                ingredients: JSON.stringify(this.state.ingredients)
            }
        })
    }

    render () {
        let orderSummary = null
        let burger = <div style={{paddingTop:'10px'}}><Spinner /></div>

        if (this.state.ingredients) {
            const disabledInfo = this.state.ingredients.reduce((obj, item) =>
                Object.assign(obj, { [item.type]: item.count <= 0}), 
            {})
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        makeOrder={this.puchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                                ingredients={this.state.ingredients}
                                totalPrice={this.state.totalPrice}
                                purchaseCancelled={this.puchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
          <Aux>
              <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
                {orderSummary}
              </Modal>
              {burger}
          </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)