interface AlertProps {
	children?: React.ReactNode;
	title: string;
	description: string;
	icon?: React.ReactNode;
	variant: 'info' | 'success';
}

export default function Alert({
	children,
	title,
	description,
	icon,
	variant,
}: AlertProps) {
	return (
		<div className={`alert alert-${variant}`}>
			{icon && icon}
			<div>
				<h3 className="alert-title">{title}</h3>
				<p className="alert-description">{description}</p>
				{children && <div className="mt-3">{children}</div>}
			</div>
		</div>
	);
}
