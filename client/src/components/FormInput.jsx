export default function FormInput({
	label,
	type,
	placeholder,
	value,
	onChange,
}) {
	return (
		<div>
			<label>{label}</label>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
