/**
 * ReviewList.js
 * Page where the user adds other ingredients
 * not included on their list
 *
 * @date 8/23/2022
 * @author Ashton Statz
 */

import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { NavButton, NewIngredient } from '../components';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

const ReviewList = ({ ingredients, handleChange }) => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [localIngredientList, setLocalIngredientList] = useState(ingredients);

    // removeDuplicates(list)
    // removes duplicates from a list of items
    // from a list of groceries
    const removeDuplicates = (list) => {
        let set = new Set();
        for (var i = 0; i < list.length; i++) {
            set.add(list[i].ingredient);
        }

        let outputList = [];

        for (var i = 0; i < set.size; i++) {
            const currentValue = [...set][i];
            outputList.push({
                ingredient: currentValue,
            });
        }

        return outputList;
    };

    // Remove duplicates from the list
    useEffect(() => {
        setLocalIngredientList(removeDuplicates(localIngredientList));
    }, []);

    const handleListChange = (newList) => {
        setLocalIngredientList(removeDuplicates(newList));

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
                <br />
                <p className='align-left'>
                    Review the currently selected items on the grocery list and
                    add, remove, or edit items as needed.
                </p>
                <table className='ui padded small table'>
                    <thead>
                        <tr>
                            <th>Currently Selected Grocery Items</th>
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
                <br />
                <p className='align-left'>Finished? Decide what's next.</p>
                <br />
                <div className='ui horizontal list'>
                    <div
                        className='item'
                        style={{ marginLeft: '30px', marginRight: '30px' }}
                    >
                        <Link to='/printGrocery'>
                            <div className='icon-button'>
                                <i className='huge print icon'></i>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                Print Grocery List
                            </div>
                        </Link>
                    </div>
                    <div
                        className='item'
                        style={{ marginLeft: '30px', marginRight: '30px' }}
                    >
                        <Link to='/orderGrocery'>
                            <div className='icon-button'>
                                <i className='huge shopping cart icon'></i>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                Order Groceries
                            </div>
                        </Link>
                    </div>
                </div>
                <br />
                <br />
                <div className='item'>
                    <NavButton
                        text={'Back'}
                        display={true}
                        link={'/ingredients'}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
