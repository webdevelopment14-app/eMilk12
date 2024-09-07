import React, { Component } from 'react';
import Loader from '../components/Loader';

const withLoader = (WrappedComponent) => {
  return class WithLoader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }

    componentDidMount() {
      this.timer = setTimeout(() => {
        this.setState({ loading: false });
      }, 3000); 
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    render() {
      if (this.state.loading) {
        return <Loader />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoader;
