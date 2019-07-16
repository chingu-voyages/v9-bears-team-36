import React from 'react';
import ErrorModal from './ErrorModal';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return <ErrorModal error={error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
