import { Grid, Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";

export default function FeaturedProducts({ products = [], onAdd }) {
    return (
        <div style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontFamily: "Cinzel, serif", fontWeight: 700, mb: 4 }}
            >
                Productos destacados
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 300, margin: "0 auto", borderRadius: 3, boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.imagenUrl || `https://via.placeholder.com/300x300?text=${product.nombre}`}
                                alt={product.nombre}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {product.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${product.precio}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center" }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#d4af37",
                                        color: "#000",
                                        "&:hover": { backgroundColor: "#b7952b" },
                                    }}
                                    onClick={() => onAdd(product)}
                                >
                                    Agregar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
