import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStreams } from '../../actions/streamActions';

class StreamShow extends Component {

    componentWillMount(){
        this.props.fetchStreams();
    }

    renderList = () => {
        return this.props.streams;
    }

    render(){
        return (
            <div>
                {this.renderList()}
            </div>
        )
    };
}

const mapStateToProps = state => {
    streams: Object.values(state.streams)
}

export default connect(null,{ fetchStreams })(StreamShow);