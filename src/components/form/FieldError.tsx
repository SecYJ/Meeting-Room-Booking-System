import { useFieldContext } from "~/hooks/form-context";

const getErrorMessage = (err: unknown) => {
	if (err instanceof Error) return err.message;
	if (typeof err === "string") return err;
	return "An unknown error occurred";
};

export const FieldError = () => {
	const field = useFieldContext<unknown>();
	const { errors, isTouched } = field.state.meta;
	if (!isTouched || !errors.length) return null;

	const message = errors.map((err) => getErrorMessage(err)).join(", ");

	return <p className="text-xs text-destructive">{message}</p>;
};
