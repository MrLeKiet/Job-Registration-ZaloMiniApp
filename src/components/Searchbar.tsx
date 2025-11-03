import React from "react";


type SearchbarProps = {
	value?: string;
	onSearch: (value: string) => void;
	placeholder?: string;
	className?: string;
	debounce?: number;
};

const Searchbar: React.FC<SearchbarProps> = ({ value = "", onSearch, placeholder = "Tìm kiếm...", className, debounce = 2000 }) => {
	const [inputValue, setInputValue] = React.useState(value);
	const [loading, setLoading] = React.useState(false);
	const [isUserTyping, setIsUserTyping] = React.useState(false);
	const debounceRef = React.useRef<number | null>(null);

	React.useEffect(() => {
		setInputValue(value);
	}, [value]);

	React.useEffect(() => {
		if (debounceRef.current) globalThis.clearTimeout(debounceRef.current);
		// Only show loading if user is typing and input is not blank
		if (isUserTyping && inputValue.trim() !== "") {
			setLoading(true);
		} else {
			setLoading(false);
		}
		debounceRef.current = globalThis.setTimeout(() => {
			onSearch(inputValue);
			setLoading(false);
			setIsUserTyping(false);
		}, debounce);
		return () => {
			if (debounceRef.current) globalThis.clearTimeout(debounceRef.current);
		};
	}, [inputValue]);

	return (
		<div className={`flex relative justify-center ${className || ""}`}>
			<input
				type="text"
				placeholder={placeholder}
				className="bg-white border-opacity-35 border-[#141415]/30 h-12 px-3 w-full mb-1 flex items-center rounded-lg justify-between border text-base transition focus:outline-none hover:border-[#3b82f6] focus:border-[#3b82f6] pr-24"
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value);
					setIsUserTyping(true);
				}}
			/>
			{loading && inputValue.trim() !== "" && (
				<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-600 animate-pulse">
					Đang tìm...
				</span>
			)}
		</div>
	);
};

export default Searchbar;
