import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Productos from "./components/Productos";
import MisOrdenes from "./components/MisOrdenes";
import Home from "./pages/Home";
import logo from "./assets/logo.png";
import ProductDetail from "./pages/ProductDetail";
import api, { setAuthHeader, clearAuthHeader } from "./services/api";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Cart from "./pages/Cart";
import "@fontsource/cinzel";
import "@fontsource/cinzel/700.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import Footer from "./components/Footer";


export default function App() {
    const [userEmail, setUserEmail] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [mensaje, setMensaje] = useState("");

    // Recuperar sesión y carrito al iniciar la app
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const auth = localStorage.getItem("auth");
        if (email && auth) {
            setUserEmail(email);
            const [u, p] = atob(auth).split(":");
            setAuthHeader(u, p);
        }

        const savedCart = localStorage.getItem("carrito");
        if (savedCart) {
            setCarrito(JSON.parse(savedCart));
        }
    }, []);

    // Guardar carrito cada vez que cambie
    useEffect(() => {
        if (carrito.length > 0) {
            localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
            localStorage.removeItem("carrito");
        }
    }, [carrito]);

    //Manejo de login exitoso
    const handleLogin = (email, password) => {
        setUserEmail(email);
        setAuthHeader(email, password);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("auth", btoa(`${email}:${password}`));

        const savedCart = localStorage.getItem("carrito");
        if (savedCart) {
            setCarrito(JSON.parse(savedCart));
        }
    };

    //Logout
    const logout = () => {
        clearAuthHeader();
        localStorage.removeItem("userEmail");
        localStorage.removeItem("auth");
        localStorage.removeItem("carrito");
        setUserEmail(null);
        setCarrito([]);
    };

    const agregarAlCarrito = (producto) => {
        const existe = carrito.find((i) => i.id === producto.id);
        if (existe) {
            setCarrito(
                carrito.map((i) =>
                    i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const confirmarCompra = async () => {
        try {
            const items = carrito.map((i) => ({
                productoId: i.id,
                cantidad: i.cantidad,
            }));
            const res = await api.post("/orden/nueva", items);
            setMensaje("Orden creada con éxito (ID: " + res.data.id + ")");
            setCarrito([]);
            localStorage.removeItem("carrito");
        } catch (e) {
            setMensaje("Error al crear la orden");
        }
    };

    if (!userEmail)
        return <Login onOk={(email, password) => handleLogin(email, password)} />;

    return (
        <div>
            <header>
                <AppBar
                    position="fixed"
                    sx={{
                        background: "linear-gradient(90deg, #000 0%, #1a1a1a 100%)",
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                        borderBottom: "2px solid #d4af37",
                    }}
                >
                    <Toolbar sx={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

                        <Link
                            to="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "#d4af37",
                            }}
                        >
                            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 12 }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: "Cinzel, serif",
                                    fontWeight: 700,
                                    letterSpacing: "3px",
                                    color: "#d4af37",
                                    textShadow: "0px 0px 10px rgba(212,175,55,0.7)",
                                }}
                            >
                                VENI VIDI VICI
                            </Typography>
                        </Link>


                        <div style={{ flexGrow: 1 }} />


                        <Button
                            color="inherit"
                            component={Link}
                            to="/productos"
                            sx={{
                                color: "#fff",
                                fontWeight: 500,
                                "&:hover": { color: "#d4af37" },
                            }}
                        >
                            Productos
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/ordenes"
                            sx={{
                                color: "#fff",
                                fontWeight: 500,
                                "&:hover": { color: "#d4af37" },
                            }}
                        >
                            Mis Órdenes
                        </Button>


                        <Button
                            color="inherit"
                            component={Link}
                            to="/carrito"
                            sx={{
                                color: "#fff",
                                "&:hover": { color: "#d4af37" },
                            }}
                        >
                            <Badge badgeContent={carrito.length} color="error">
                                <ShoppingCartIcon sx={{ color: "#d4af37" }} />
                            </Badge>
                        </Button>


                        <Button
                            onClick={logout}
                            sx={{
                                color: "#fff",
                                fontWeight: 500,
                                "&:hover": { color: "#d4af37" },
                            }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </header>

            <main style={{ padding: 16, marginTop: 64 }}>
                {mensaje && <p>{mensaje}</p>}

                <Routes>
                    <Route
                        path="/carrito"
                        element={<Cart carrito={carrito} confirmarCompra={confirmarCompra} />}
                    />
                    <Route
                        path="/productos"
                        element={<Productos onAdd={agregarAlCarrito} />}
                    />
                    <Route
                        path="/producto/:id"
                        element={<ProductDetail onAdd={agregarAlCarrito} />}
                    />
                    <Route path="/ordenes" element={<MisOrdenes />} />
                    <Route path="/" element={<Home onAdd={agregarAlCarrito} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </main>
        </div>
    );
}
