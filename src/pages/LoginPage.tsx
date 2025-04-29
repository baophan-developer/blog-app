import { Box, Button, styled, Typography } from "@mui/material";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Form from "../components/Form";
import TextFieldEle from "../components/TextFieldEle";

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
    const onSubmit = useCallback((value: any) => {
        console.log(value);
    }, []);

    return (
        <div>
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
                    <TextFieldEle label="Username" name="username" />
                    <TextFieldEle
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <Button variant="contained" type="submit">
                        LOGIN
                    </Button>
                    <LinkCustom to="/register">
                        Don't you have an account?
                    </LinkCustom>
                </Box>
            </Form>
        </div>
    );
}

export default LoginPage;
