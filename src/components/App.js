import React from 'react';

import 'fomantic-ui-css/semantic.min.css';

import StreamShow from './stream/StreamShow';

const App = () => {

    let divStyle = {
        offset: '10%'
    }
    
    return (
        <div>
            <div className='ui secondary menu'>
                <a style={divStyle}className='item'>
                    <h1>TwitchRNG</h1><br />
                </a>
            </div>
            <StreamShow />
        </div>
    );
}

export default App;
