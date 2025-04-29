import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type Props = Omit<TextFieldProps, "name"> & {
    name: string;
};

function TextFieldEle(props: Props) {
    const {
        name,
        onChange: onChangeProp,
        onBlur: onBlurProp,
        type,
        ...restProps
    } = props;
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(() =>
        type === "password" ? false : true
    );

    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => {
                const hasError = Boolean(error);
                const messError = hasError ? error?.message : "";
                return (
                    <TextField
                        {...restProps}
                        type={showPassword ? "text" : "password"}
                        slotProps={
                            type === "password"
                                ? {
                                      ...restProps.slotProps,
                                      input: {
                                          ...restProps.slotProps?.input,
                                          endAdornment: (
                                              <IconButton
                                                  onClick={() =>
                                                      setShowPassword((p) => !p)
                                                  }
                                              >
                                                  {showPassword ? (
                                                      <VisibilityOff />
                                                  ) : (
                                                      <Visibility />
                                                  )}
                                              </IconButton>
                                          ),
                                      },
                                  }
                                : { ...restProps.slotProps }
                        }
                        error={hasError}
                        helperText={messError}
                        value={value}
                        onChange={(e) => {
                            onChange(e);
                            onChangeProp?.(e);
                        }}
                        onBlur={(e) => {
                            onBlur();
                            onBlurProp?.(e);
                        }}
                    />
                );
            }}
        />
    );
}

export default TextFieldEle;
