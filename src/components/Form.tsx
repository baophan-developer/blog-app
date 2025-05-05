import {yupResolver} from "@hookform/resolvers/yup";
import {memo, PropsWithChildren} from "react";
import {FieldValues, FormProvider, SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";

type Props = PropsWithChildren<{
	onSubmit: SubmitHandler<FieldValues>;
	objectShape?: yup.ObjectShape;
	defaultValues: any;
}>;

function Form(props: Props) {
	const {children, onSubmit, objectShape = {}, defaultValues = {}} = props;
	const methods = useForm({
		defaultValues,
		resolver: yupResolver(yup.object().shape(objectShape)),
	});
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
}

export default memo(Form);
