const LoadingButton = ({ isLoading, children, ...props }) => {
    return (
        <button {...props} disabled={isLoading}>
            {isLoading ? (
                <div>
                    <span>Loading...</span>
                    {/* You can use an actual spinner or any loading animation here */}
                </div>
            ) : (
                children
            )}
        </button>
    );
};