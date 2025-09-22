import { Box, Grid, Typography } from "@mui/material";

// 🔹 Importa tus logos aquí (asegúrate de que estén en src/assets/)
import marca1 from "../assets/logoon.png";
import marca2 from "../assets/no fondofereal-01 (1).png";
import marca3 from "../assets/insane labz - another danger logo - stacked [black & red] copy.png";
import marca4 from "../assets/3918004-middle.png";
import marca5 from "../assets/lavronnlogo_315.png";

const brands = [
    { src: marca1, alt: "Marca 1" },
    { src: marca2, alt: "Marca 2" },
    { src: marca3, alt: "Marca 3" },
    { src: marca4, alt: "Marca 4" },
    { src: marca5, alt: "Marca 5" },
];

export default function BrandsSection() {
    return (
        <Box
            sx={{
                background: "linear-gradient(180deg, #000 0%, #111 100%)",
                color: "#d4af37",
                py: 6,
                px: 2,
                textAlign: "center",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontFamily: "Cinzel, serif",
                    fontWeight: 700,
                    mb: 4,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                }}
            >
                Marcas Aliadas
            </Typography>

            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {brands.map((brand, i) => (
                    <Grid item key={i} xs={6} sm={4} md={2}>
                        <Box
                            component="img"
                            src={brand.src}
                            alt={brand.alt}
                            sx={{
                                maxWidth: "120px",
                                height: "auto",
                                filter: "grayscale(40%) brightness(1.2)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    filter: "grayscale(0%) drop-shadow(0 0 10px #d4af37)",
                                    transform: "scale(1.1)",
                                },
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
