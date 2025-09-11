import React from 'react';

function Awards() {
    return ( 
        <div className='container mt-5'>
            <div className='row '>
                <div className='col-6 mt-5 mb-5'>
                    <img src='media/images/largestBroker.svg'/>

                </div>
                <div className='col-6 mt-5'>
                        <h1>Largest stock broker in India</h1>
                    <p className='mb-5'>2+ million Zerodha clients contribute to over 15% of all</p>
                    
                    <div className='row'>
                        <div className='col-6'>
                            <ul>
                        <li>Futures and Options</li>
                        <li>Futures and Options</li>
                        <li>Futures and Options</li>
                       </ul>

                        </div>
                          <div className='col-6'>
                            <ul>
                                <li>Futures and Options</li>
                                <li>Futures and Options</li>
                                <li>Futures and Options</li>
                        
                            </ul>

                        </div>
                        <div>
                            <img src='media/images/pressLogos.png' style={{width:"80%"}}/>
                        </div>
                        

                    </div>
                

                </div>
            </div>
        </div>
        
    );
}

export default Awards;