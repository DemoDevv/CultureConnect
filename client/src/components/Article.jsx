export default function Article({ title, content, mirror, className }) {
	return (
		<div className={className + " flex flex-col items-center gap-9"}>
			<h2 className="font-castoro italic text-4xl">{title}</h2>
			<div className="flex justify-around gap-10 font-inter text-xl">
				{mirror ? (
					<>
						<div className="w-1/2 h-[300px]">{content}</div>
						<div className="w-1/2 h-[300px] bg-white rounded-[12px]"></div>
					</>
				) : (
					<>
						<div className="w-1/2 h-[300px] bg-white rounded-[12px]"></div>
						<div className="w-1/2 h-[300px]">{content}</div>
					</>
				)}
			</div>
		</div>
	);
}
