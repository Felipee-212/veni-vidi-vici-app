import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Box
            sx={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundImage: "url('https://images.unsplash.com/photo-1600180758895-17d6a35d7c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                px: 2,
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    mb: 2,
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                }}
            >
                VENI VIDI VICI
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    mb: 4,
                    textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
                }}
            >
                Suplementos para conquistar tus objetivos
            </Typography>
            <Button
                variant="contained"
                size="large"
                component={Link}
                to="/productos"
                sx={{
                    backgroundColor: "#d4af37",
                    color: "#000",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#b7952b",
                    },
                }}
            >
                Ver productos
            </Button>
        </Box>
    );
}
