/**
 * PrintableList
 * Sorts list of ingredients to a grocery list
 * separated by the department the item would
 * be found in
 *
 * @date 7/31/2022
 * @author Ashton Statz
 */

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

const PrintableList = ({ ingredients }) => {
    const [categorizedList, setCategorizedList] = useState([]);

    useEffect(() => {
        const getIngredientCategories = async () => {
            const response = await axios.get('./ingredientCategories.json');
            setCategorizedList(categorize(ingredients, response.data));
        };
        getIngredientCategories();
    }, []);

    // initializeCatList(categories)
    // creates a base categorized list for categorize()
    // to populate with grocery items using the categories
    // from ingredientCategories.json
    const initializeCatList = (categories) => {
        let outputList = [];

        for (var i = 0; i < categories.length; i++) {
            outputList.push({
                category: categories[i].CATEGORY,
                items: [],
            });
        }

        return outputList;
    };

    // categorize(list, categories)
    // returns a list categorized by the categories passed
    // in the second parameter.
    const categorize = (list, categories) => {
        // 1. label all of the items in the grocery
        // list with their respective categories

        let labeledList = [];

        // Loop through all categories
        for (var i = 0; i < categories.length; i++) {
            let currentCategoryName = categories[i].CATEGORY;

            // Loop through all ingredients in every category
            for (var j = 0; j < categories[i].INGREDIENTS.length; j++) {
                // Loop through list of grocery list items
                for (var k = 0; k < list.length; k++) {
                    // compare current item from grocery list and current
                    // item from categories list

                    let currentListItem = list[k].ingredient.toLowerCase();
                    let currentCategoryItem =
                        categories[i].INGREDIENTS[j].toLowerCase();

                    if (currentCategoryItem === currentListItem) {
                        // if we find a match, push the item and the category into the
                        // labeled list
                        currentListItem = list[k].ingredient;
                        labeledList.push({
                            ingredient: currentListItem,
                            category: currentCategoryName,
                        });
                    }
                }
            }
        }

        // 2. Use labeled list to make category buckets with
        // each list of items within that bucket

        // initialize categorized list with the categories
        // from ingredientCategories.json
        let categorizedList = initializeCatList(categories);

        // Sort items into their category buckets
        for (var i = 0; i < labeledList.length; i++) {
            for (var j = 0; j < categorizedList.length; j++) {
                console.log(labeledList[i].category);
                if (labeledList[i].category === categorizedList[j].category) {
                    categorizedList[j].items.push(labeledList[i]);
                }
            }
        }

        // return final categorized list
        return categorizedList;
    };

    return (
        <Grid>
            {categorizedList !== [] ? (
                categorizedList.map((category) => {
                    return (
                        <>
                            {category.items.length !== 0 ? (
                                <Grid.Column width={8}>
                                    <h2>{category.category}</h2>
                                    {category.items.map((item) => {
                                        return <li>{item.ingredient}</li>;
                                    })}
                                </Grid.Column>
                            ) : (
                                <></>
                            )}
                        </>
                    );
                })
            ) : (
                <></>
            )}
        </Grid>
    );
};

export default PrintableList;
