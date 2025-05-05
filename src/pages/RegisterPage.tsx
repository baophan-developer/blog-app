import {Box, Button, Typography} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {register} from "../apis";
import Form from "../components/Form";
import TextFieldEle from "../components/TextFieldEle";
import useNotistack from "../hooks/useNotistack";

function RegisterPage() {
	const navigate = useNavigate();
	const {open} = useNotistack();

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
				open(data.message, {
					variant: "success",
				});
				navigate("/login");
			}
			if (data.status === 400) {
				open(data.message, {
					variant: "error",
				});
			}
		},
	});

	return (
		<Box>
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
