const NavigationButton = ({ onClick, disabled, children, isActive }) => {
    return (
      <button
        className={`px-4 py-2 rounded ${
          disabled || !isActive ? "text-gray-500" : "bg-blue-500 text-white"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  export default NavigationButton;
