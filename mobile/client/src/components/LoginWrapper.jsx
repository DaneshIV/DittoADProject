import { SignIn, useUser} from "@clerk/clerk-react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import logoImage from "/JAAS_CLEAR.png";
import { neobrutalism } from '@clerk/themes';


export default function LoginWrapper() {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/dashboard");
        }
    }, [isSignedIn, navigate]);

    return (
        <Container 
            maxWidth= {false} 
            disableGutters
            sx={{ 
                minHeight: '100vh', 
                width: '100%',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#f4f5f4'
            }}
        >
            <Box sx={{ p: 3 }}>
                <SignIn
                    appearance={{
                        baseTheme: neobrutalism,
                        layout: {
                            logoImageUrl: logoImage, // Add your image path or URL here
                            logoPlacement: "inside", // Ensures the image is inside the card
                        },

                        elements: {
                            card: {
                                borderRadius: '16px', // Adjust the value to make the corners more or less rounded
                              },

                            logoBox: {
                                height: '100px',          
                                //width: '80px', 
                                margin: '0px 0px 0px 120px', 
                            },
                        },

                        variables: {
                            colorPrimary: '#bd212f',
                        },
                    }}
                /> 
            </Box>
        </Container>
    )
}