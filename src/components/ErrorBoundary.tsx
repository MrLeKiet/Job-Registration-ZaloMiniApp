import React from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can log error info here if needed
        // console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 bg-red-50 text-red-700 rounded-xl shadow">
                    <h2 className="font-bold text-lg mb-2">Đã xảy ra lỗi khi tải chi tiết công việc.</h2>
                    <p>{this.state.error?.message || "Vui lòng thử lại sau."}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
