import { Box, Button, styled, Typography } from "@mui/material";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { login } from "../apis";
import Form from "../components/Form";
import TextFieldEle from "../components/TextFieldEle";
import useNotification from "../hooks/useNotification";
import { useMutation } from "@tanstack/react-query";

const LinkCustom = styled(Link)(({ theme }) => [
    {
        color: "black",
        textDecoration: "none",
    },
    theme.applyStyles("dark", {
        color: "white",
    }),
]);

function LoginPage() {
    const navigate = useNavigate();
    const { showNotification, content } = useNotification();

    const { mutate, isPending } = useMutation<
        {
            status: number;
            message: any;
        },
        Error,
        { password: string; username: string },
        unknown
    >({
        mutationKey: ["handleLogin"],
        mutationFn: async (value) =>
            await login(value.username, value.password),
        onSuccess: (data) => {
            if (data.status === 200) {
                navigate("/");
            }
            if (data.status === 400) {
                showNotification({ message: data.message });
            }
        },
    });

    const onSubmit = useCallback(
        (value: any = {}) => {
            mutate(value);
        },
        [mutate]
    );

    return (
        <div>
            {content}
            <Form
                onSubmit={onSubmit}
                objectShape={{
                    username: yup
                        .string()
                        .nullable()
                        .required("Username is required."),
                    password: yup
                        .string()
                        .nullable()
                        .required("Password is required."),
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    gap={1}
                >
                    <Typography
                        variant="h4"
                        fontWeight={600}
                        textAlign="center"
                    >
                        LOGIN
                    </Typography>
                    <TextFieldEle
                        label="Username"
                        name="username"
                        disabled={isPending}
                    />
                    <TextFieldEle
                        label="Password"
                        name="password"
                        type="password"
                        disabled={isPending}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        loading={isPending}
                    >
                        LOGIN
                    </Button>
                    <LinkCustom
                        to="/register"
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        Don't you have an account?
                    </LinkCustom>
                </Box>
            </Form>
        </div>
    );
}

export default LoginPage;
