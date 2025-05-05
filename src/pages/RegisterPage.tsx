import {Box, Button, Typography} from "@mui/material";
import Form from "../components/Form";
import TextFieldEle from "../components/TextFieldEle";
import * as Yup from "yup";
import {useMutation} from "@tanstack/react-query";
import {register} from "../apis";
import {useNavigate} from "react-router-dom";
import useNotification from "../hooks/useNotification";

function RegisterPage() {
	const navigate = useNavigate();
	const {showNotification, content} = useNotification();

	const {mutate, isPending} = useMutation<
		any,
		Error,
		{username: string; password: string},
		unknown
	>({
		mutationKey: ["Register"],
		mutationFn: async (value) => await register(value.username, value.password),
		onSuccess: (data) => {
			if (data.status === 200) {
				navigate("/login");
			}
			if (data.status === 400) {
				showNotification({message: data.message});
			}
		},
	});

	return (
		<Box>
			{content}
			<Form
				onSubmit={function (data: any) {
					mutate(data);
				}}
				objectShape={{
					username: Yup.string().nullable().required("Username is required"),
					password: Yup.string().nullable().required("Password is required"),
					confirmPass: Yup.string()
						.nullable()
						.test("confirmPass", "Password is not match", (val, context) => {
							const {parent = {}} = context;
							const {password} = parent;
							return password === val;
						}),
				}}
				defaultValues={{
					username: "",
					password: "",
					confirmPass: "",
				}}
			>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					gap={1}
				>
					<Typography variant='h4' fontWeight={600} textAlign='center'>
						REGISTER
					</Typography>
					<TextFieldEle label='Username' name='username' disabled={isPending} />
					<TextFieldEle
						label='Password'
						name='password'
						type='password'
						disabled={isPending}
					/>
					<TextFieldEle
						label='Confirm password'
						name='confirmPass'
						type='password'
						disabled={isPending}
					/>
					<Button variant='contained' type='submit' loading={isPending}>
						REGISTER
					</Button>
				</Box>
			</Form>
		</Box>
	);
}

export default RegisterPage;
