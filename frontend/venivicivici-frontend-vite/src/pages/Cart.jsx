import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

export default function Cart({ carrito, confirmarCompra }) {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Carrito</Typography>

            {carrito.length === 0 ? (
                <Typography>No hay productos en el carrito.</Typography>
            ) : (
                <>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {carrito.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img src={item.imagenUrl} alt={item.nombre} style={{ width: 50, marginRight: 8 }} />
                                            {item.nombre}
                                        </TableCell>
                                        <TableCell align="right">${item.precio}</TableCell>
                                        <TableCell align="right">{item.cantidad}</TableCell>
                                        <TableCell align="right">${(item.precio * item.cantidad).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h6" gutterBottom>Total: ${total.toFixed(2)}</Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={confirmarCompra}
                    >
                        Confirmar compra
                    </Button>
                </>
            )}
        </div>
    );
}
