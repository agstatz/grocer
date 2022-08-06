/**
 * PrintGroceries.js
 * Page where user can print a list
 * of groceries for their own use
 *
 * @date 7/31/2022
 * @author Ashton Statz
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavButton, PrintableList } from '../components/';
import Pdf from 'react-to-pdf';

// CurrentDate()
// outputs nicely formatted date for user
// in react component form
function CurrentDate() {
    const d = new Date();
    let month = d.getMonth();
    let day = d.getDate();
    let year = d.getFullYear();
    return <span>{month + '/' + day + '/' + year}</span>;
}

const PrintGroceries = ({ ingredients }) => {
    const ref = React.createRef();

    return (
        <div>
            <h1>grocer</h1>
            <p>Printable Grocery List</p>
            <div style={{ paddingTop: '10px', paddingBottom: '20px' }}>
                <div ref={ref} className='print-out'>
                    <div className='ui one column stackable center aligned page grid'>
                        <div className='column twelve wide'>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    paddingTop: '15px',
                                }}
                            >
                                Groceries <CurrentDate />
                            </h2>
                            <div style={{ padding: '10px', textAlign: 'left' }}>
                                <PrintableList ingredients={ingredients} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ui horizontal list'>
                <div className='item'>
                    <Pdf targetRef={ref} filename='groceries.pdf'>
                        {({ toPdf }) => (
                            <Button onClick={toPdf}>Download PDF</Button>
                        )}
                    </Pdf>
                </div>
                <div className='item'>
                    <NavButton text={'Return Home'} link={'/'} display={true} />
                </div>
            </div>
        </div>
    );
};

export default PrintGroceries;
