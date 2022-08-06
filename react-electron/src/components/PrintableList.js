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

    // createLabeledList(list, categories)
    // creates a list where each item is an
    // object that holds the item's name as well
    // as its respective category. Helper function for
    // categorize()
    const createLabeledList = (list, categories) => {
        var labeledList = [];

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
                        list[k].found = true;
                    }
                }
            }
        }

        for (var k = 0; k < list.length; k++) {
            console.log(
                k + '. ' + list[k].ingredient + ' found:' + list[k].found
            );

            if (list[k].found === true) {
                continue;
            }

            // Last minute check for some key words

            if (list[k].ingredient.toLowerCase().indexOf('cheese') >= 0) {
                labeledList.push({
                    ingredient: list[k].ingredient,
                    category: 'Dairy',
                });
                continue;
            }

            if (list[k].ingredient.toLowerCase().indexOf('bread') >= 0) {
                labeledList.push({
                    ingredient: list[k].ingredient,
                    category: 'Bakery',
                });
                continue;
            }

            if (list[k].ingredient.toLowerCase().indexOf('frozen') >= 0) {
                labeledList.push({
                    ingredient: list[k].ingredient,
                    category: 'Frozen',
                });
                continue;
            }

            if (
                list[k].ingredient.toLowerCase().indexOf('canned') >= 0 ||
                list[k].ingredient.toLowerCase().indexOf('soup') >= 0 ||
                list[k].ingredient.toLowerCase().indexOf('can ') >= 0 ||
                list[k].ingredient.toLowerCase().indexOf(' can ') >= 0
            ) {
                labeledList.push({
                    ingredient: list[k].ingredient,
                    category: 'Canned',
                });
                continue;
            }

            labeledList.push({
                ingredient: list[k].ingredient,
                category: 'Other',
            });
        }

        return labeledList;
    };

    // categorize(list, categories)
    // returns a list of grocery items in categorized
    // buckets based on department/section from
    // ingredientCategories.json
    const categorize = (list, categories) => {
        // 1. Remove duplicates in list

        list = removeDuplicates(list);

        // 2. label all of the items in the grocery
        // list with their respective categories

        let labeledList = createLabeledList(list, categories);

        // 3. Use labeled list to make category buckets with
        // each list of items within that bucket

        // initialize categorized list with the categories
        // from ingredientCategories.json
        let categorizedList = initializeCatList(categories);

        // Sort items into their category buckets
        for (var i = 0; i < labeledList.length; i++) {
            for (var j = 0; j < categorizedList.length; j++) {
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
