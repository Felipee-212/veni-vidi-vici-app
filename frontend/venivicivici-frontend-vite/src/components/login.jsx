import { useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import api, { setAuthHeader } from "../services/api";

export default function Login({ onOk }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const res = await api.post("/cliente/login", null, {
                params: { email, password },
            });

            if (res.data === true) {
                setAuthHeader(email, password);
                setOpenDialog(true);
            } else {
                setMsg("Credenciales inválidas");
            }
        } catch (err) {
            console.error(err);
            setMsg("Error al intentar loguearse");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #000, #1a1a1a)",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    maxWidth: 400,
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "#111",
                    color: "#fff",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "Cinzel, serif", color: "#d4af37", fontWeight: 700 }}
                >
                    VENI VIDI VICI
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Correo"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                        InputProps={{ style: { color: "#fff" } }}
                        InputLabelProps={{ style: { color: "#bbb" } }}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                        InputProps={{ style: { color: "#fff" } }}
                        InputLabelProps={{ style: { color: "#bbb" } }}
                    />
                    {msg && (
                        <Typography sx={{ color: "red", mt: 1 }}>{msg}</Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            mt: 3,
                            backgroundColor: "#d4af37",
                            color: "#000",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#b7952b" },
                        }}
                    >
                        Entrar
                    </Button>
                </form>
            </Paper>


            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle sx={{ fontWeight: "bold", color: "#d4af37" }}>
                    Bienvenido
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Este proyecto es realizado con fines académicos y de práctica.
                        <br />
                        Soy estudiante de Ingeniería Informática, no persigo fines de lucro
                        y solo busco aprender y demostrar mis habilidades.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenDialog(false);
                            onOk?.(email, password);
                        }}
                        autoFocus
                    >
                        Entendido
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
