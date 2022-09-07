/**
 * ReviewList.js
 * Page where the user adds other ingredients
 * not included on their list
 *
 * @date 9/6/2022
 * @author Ashton Statz
 */

import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { NavButton, NewIngredient } from '../components';
import { Link } from 'react-router-dom';
import { Breadcrumb, List, Label } from 'semantic-ui-react';

const ReviewList = ({ ingredients, handleChange }) => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [localIngredientList, setLocalIngredientList] = useState([]);

    const labelColors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
    ];

    // Upon loading the page, remove duplicates from the list
    // of ingredients due to multiple meals having the same ingredient
    useEffect(() => {
        setLocalIngredientList(removeDuplicates(ingredients));
    }, []);

    // removeDuplicates(list)
    // removes duplicates from a list of items
    // from a list of groceries
    const removeDuplicates = (list) => {
        let set = new Set();
        for (var i = 0; i < list.length; i++) {
            set.add(list[i].ingredient);
        }

        return listifyMeals(set, list);
    };

    // listifyMeals(set)
    // takes a set as input, returns a list of
    // ingredients with the meals it belongs to
    // as a list within the object
    const listifyMeals = (set, list) => {
        let outputList = [];

        for (var i = 0; i < set.size; i++) {
            const currentValue = [...set][i];
            let newEntry = {
                ingredient: currentValue,
            };

            for (var j = 0; j < list.length; j++) {
                if (list[j].ingredient) {
                    if (list[j].ingredient === newEntry.ingredient) {
                        if (list[j].meal) {
                            if (Array.isArray(list[j].meal)) {
                                for (var i = 0; i < list[j].meal.length; i++) {
                                    if (newEntry.meal) {
                                        newEntry.meal.push(list[j].meal[i]);
                                    } else {
                                        newEntry.meal = [list[j].meal[i]];
                                    }
                                }
                                continue;
                            }

                            if (newEntry.meal) {
                                newEntry.meal.push(list[j].meal);
                            } else {
                                newEntry.meal = [list[j].meal];
                            }
                        }
                    }
                }
            }
            outputList.push(newEntry);
        }

        return outputList;
    };

    // removeIngredient()
    // removes the ingredient from the list and updates
    // accordingly
    const removeIngredient = (e) => {
        var outputList = localIngredientList;

        // we do not allow users to delete the last item
        if (outputList.length === 1) {
            return;
        }

        var ingredient = e.target.id;
        for (var i = 0; i < outputList.length; i++) {
            if (outputList[i].ingredient === ingredient) {
                outputList.splice(i, 1);
                break;
            }
        }
        handleListChange(outputList);
    };

    // handleItemEnter()
    // shows x and edit buttons in an item list when
    // the mouse enters the respective list item
    const handleItemEnter = (e) => {
        var otherItems = document.getElementsByClassName('edit-remove-group');
        for (let i = 0; i < otherItems.length; i++) {
            otherItems[i].hidden = true;
        }

        if (document.getElementById(e.target.id + '-info')) {
            document.getElementById(e.target.id + '-info').hidden = false;
        }
    };

    // handleItemExit()
    // hides the x and edit buttons in an item list
    // when the mouse leaves
    const handleItemExit = (e) => {
        if (document.getElementById(e.target.id + '-info')) {
            document.getElementById(e.target.id + '-info').hidden = true;
        }
    };

    // handleListChange(newList)
    // updates any changes to the list across the
    // app
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
                <br />
                <p className='align-left'>
                    Review the currently selected items on the grocery list and
                    add, remove, or edit items as needed.
                </p>
                <List
                    size='large'
                    divided
                    selection
                    verticalAlign='middle'
                    style={{ backgroundColor: 'white' }}
                    className='align-left item-list'
                >
                    {localIngredientList.map((ingredient) => {
                        return (
                            <List.Item
                                key={ingredient.ingredient}
                                id={ingredient.ingredient}
                                onMouseEnter={handleItemEnter}
                                onMouseLeave={handleItemExit}
                            >
                                <List.Content
                                    floated='right'
                                    verticalAlign='middle'
                                >
                                    <span
                                        className='edit-remove-group'
                                        id={ingredient.ingredient + '-info'}
                                        hidden={true}
                                    >
                                        <span className='item-list-edit'>
                                            <i className='edit icon'></i>
                                        </span>{' '}
                                        <span
                                            id={ingredient.ingredient}
                                            className='item-list-x'
                                            onClick={removeIngredient}
                                        >
                                            ×
                                        </span>{' '}
                                    </span>
                                </List.Content>
                                <List.Content verticalAlign='middle'>
                                    {ingredient.ingredient}
                                    <List.Description>
                                        {ingredient.meal ? (
                                            ingredient.meal.map(
                                                (meal, index) => {
                                                    return (
                                                        <>
                                                            <Label
                                                                color={
                                                                    labelColors[
                                                                        index
                                                                    ]
                                                                }
                                                            >
                                                                {meal}
                                                            </Label>{' '}
                                                        </>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>

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
                                Print grocery list
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
                                Order groceries
                            </div>
                        </Link>
                    </div>
                    <div
                        className='item'
                        style={{ marginLeft: '30px', marginRight: '30px' }}
                    >
                        <Link to='/saveList'>
                            <div className='icon-button'>
                                <i className='huge save icon'></i>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                Save for later
                            </div>
                        </Link>
                    </div>
                </div>
                <br />
                <br />
                <div style={{ paddingBottom: '20px' }}>
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
