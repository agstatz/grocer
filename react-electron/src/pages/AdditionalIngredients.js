/**
 * AdditionalIngredients.js
 * Page where the user adds other ingredients
 * not included on their list
 *
 * @date 8/23/2022
 * @author Ashton Statz
 */

import React from 'react';
import { useState, useReducer } from 'react';
import { NavButton, NewIngredient } from '../components';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

const AdditionalIngredients = ({ ingredients, handleChange }) => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const [localIngredientList, setLocalIngredientList] = useState(ingredients);

    const handleListChange = (newList) => {
        setLocalIngredientList(newList);
        handleChange(newList);
        forceUpdate();
    };

    return (
        <div className='basic-container'>
            <div>
                <h1>Review List</h1>
                <div className='breadcrumb'>
                    <Breadcrumb size='large'>
                        <Breadcrumb.Section link>
                            <Link to={'/'}>Choose Meals</Link>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider
                            icon='right chevron'
                            className='chevron'
                        />
                        <Breadcrumb.Section link>
                            <Link to={'/ingredients'}>Choose Ingredients</Link>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider
                            icon='right chevron'
                            className='chevron'
                        />
                        <Breadcrumb.Section active>
                            Review List
                        </Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <table className='ui padded small table'>
                    <thead>
                        <tr>
                            <th>Currently Selected Ingredients</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localIngredientList.map((ingredient) => {
                            return (
                                <tr>
                                    <td colSpan='1'>{ingredient.ingredient}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <NewIngredient
                    ingredients={ingredients}
                    handleChange={handleListChange}
                />
                <div className='ui horizontal list'>
                    <div className='item'>
                        <NavButton
                            text={'Back'}
                            display={true}
                            link={'/ingredients'}
                        />
                    </div>
                    <div className='item'>
                        <NavButton
                            text={'Print Grocery List'}
                            display={true}
                            link={'/printGrocery'}
                        />
                    </div>
                    <div className='item'>
                        <NavButton
                            text={'Order Groceries'}
                            display={true}
                            link={'/orderGrocery'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalIngredients;
