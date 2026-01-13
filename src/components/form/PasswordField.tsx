import { Eye, EyeOff } from "lucide-react";
import { useFieldContext } from "~/hooks/form-context";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FieldError } from "~/components/form/FieldError";

type PasswordFieldProps = {
	showPassword: boolean;
	onTogglePasswordVisibility: () => void;
};

export const PasswordField = ({ showPassword, onTogglePasswordVisibility }: PasswordFieldProps) => {
	const field = useFieldContext<string>();

	return (
		<div className="space-y-2">
			<Label htmlFor={field.name}>Password</Label>
			<div className="relative">
				<Input
					id={field.name}
					name={field.name}
					type={showPassword ? "text" : "password"}
					autoComplete="current-password"
					placeholder="••••••••"
					className="pr-12"
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
					onClick={onTogglePasswordVisibility}
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</Button>
			</div>
			<FieldError />
		</div>
	);
};
