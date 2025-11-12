/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
}

interface ErrorBoundaryProps {
	children: ReactNode;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error(error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return <h1 className="text-center text-2xl">Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
