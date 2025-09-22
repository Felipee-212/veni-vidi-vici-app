import { useEffect, useState } from "react";
import api from "../services/api";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Typography
} from "@mui/material";

export default function MisOrdenes() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const res = await api.get("/orden/mis-ordenes");
                setOrdenes(res.data);
            } catch (err) {
                console.error("Error al traer órdenes:", err);
            }
        };
        fetchOrdenes();
    }, []);

    const pagarOrden = async (id) => {
        try {
            await api.put(`/orden/pagar/${id}`);
            setOrdenes(ordenes.map(o => o.id === id ? { ...o, estado: "PAGADO" } : o));
        } catch (err) {
            console.error(err);
        }
    };

    const cancelarOrden = async (id) => {
        try {
            await api.put(`/orden/cancelar/${id}`);
            setOrdenes(ordenes.map(o => o.id === id ? { ...o, estado: "CANCELADA" } : o));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Mis Órdenes</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordenes.map((orden) => (
                            <TableRow key={orden.id}>
                                <TableCell>{orden.id}</TableCell>
                                <TableCell>{new Date(orden.fecha).toLocaleString()}</TableCell>
                                <TableCell>{orden.estado}</TableCell>
                                <TableCell>${orden.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    {orden.estado === "PENDIENTE" && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => pagarOrden(orden.id)}
                                                sx={{ mr: 1 }}
                                            >
                                                Pagar
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => cancelarOrden(orden.id)}
                                            >
                                                Cancelar
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
