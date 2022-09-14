/**
 * PrintGroceries.js
 * Page where user can print a list
 * of groceries for their own use
 *
 * @date 9/14/2022
 * @author Ashton Statz
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Dimmer, Segment, Header, Icon } from 'semantic-ui-react';
import { NavButton, PrintableList } from '../components/';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import Pdf from 'react-to-pdf';

// CurrentDate()
// outputs nicely formatted date for user
// in react component form
function CurrentDate() {
    const d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    return <span>{month + '/' + day + '/' + year}</span>;
}

const PrintGroceries = ({ ingredients }) => {
    const ref = React.createRef();
    const [active, setActive] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleShow = () => {
        setActive(true);
    };

    const handleHide = () => {
        setActive(false);
    };

    return (
        <div className='basic-container'>
            <div>
                <h1>Print</h1>
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
                        <Breadcrumb.Section link>
                            <Link to={'/review'}>Review List</Link>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider
                            icon='right chevron'
                            className='chevron'
                        />
                        <Breadcrumb.Section active>Print</Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <br />
                <p className='align-left'>
                    Preview the grocery list and save as a PDF.
                </p>
                <br />
                <Dimmer.Dimmable
                    as={Segment}
                    raised
                    dimmed={active}
                    onMouseEnter={handleShow}
                    onMouseLeave={handleHide}
                    style={{ border: 'none' }}
                >
                    <div style={{ paddingBottom: '20px' }}>
                        <div ref={ref} className='print-out'>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    paddingTop: '15px',
                                }}
                                className='print-out-header'
                            >
                                Groceries <CurrentDate />
                            </h2>
                            <p
                                style={{
                                    textAlign: 'center',
                                }}
                                className='print-out-header'
                            >
                                Created using grocer
                            </p>
                            <div
                                style={{
                                    padding: '10px',
                                    textAlign: 'left',
                                }}
                            >
                                <PrintableList ingredients={ingredients} />
                            </div>
                        </div>
                    </div>
                    <Dimmer active={active}>
                        <Header icon style={{ color: 'white' }}>
                            <Icon name='pdf file outline' />
                        </Header>
                        <br />
                        <Pdf targetRef={ref} filename='groceries.pdf'>
                            {({ toPdf }) => (
                                <Button onClick={toPdf}>Download PDF</Button>
                            )}
                        </Pdf>
                    </Dimmer>
                </Dimmer.Dimmable>
                <br />
                <Pdf targetRef={ref} filename='groceries.pdf'>
                    {({ toPdf }) => (
                        <Button onClick={toPdf}>Download PDF</Button>
                    )}
                </Pdf>
                <br />
                <br />
                <div className='ui horizontal list'>
                    <div className='item'>
                        <NavButton
                            text={'Back'}
                            link={'/review'}
                            display={true}
                        />
                    </div>
                    <div className='item'>
                        <NavButton
                            text={'Return Home'}
                            link={'/'}
                            display={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintGroceries;
