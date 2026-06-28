import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
    title: "Componentes/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["text", "circular", "rectangular"],
            description: "La forma visual del skeleton cuando se usa individualmente.",
        },
        animation: {
            control: "radio",
            options: ["pulse", "wave", "none"],
            description: "El tipo de animación de transición del skeleton.",
        },
        width: {
            control: "text",
            description: "Ancho personalizado del skeleton.",
        },
        height: {
            control: "text",
            description: "Alto personalizado del skeleton.",
        },
        borderRadius: {
            control: "text",
            description: "Radio de borde personalizado.",
        },
        loading: {
            control: "boolean",
            description: "Modo Wrapper/Auto-detectable: enmascara los hijos con efecto skeleton si es verdadero.",
        },
        duration: {
            control: "text",
            description: 'Duración/velocidad de la animación (ej. "2s", "800ms" o número en segundos).',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// 1. Uso Standalone básico (Texto)
export const TextVariant: Story = {
    argTypes: {
        // La variante text usa border-radius: 4px fijo por CSS — el control confundiría al usuario
        borderRadius: { table: { disable: true } },
        loading: { table: { disable: true } },
    },
    args: {
        variant: "text",
        width: "60%",
        animation: "wave",
    },
};

// 2. Uso Circular (Avatar)
export const CircularVariant: Story = {
    argTypes: {
        // La variante circular fuerza border-radius: 50% por CSS — modificarlo rompe la forma circular
        borderRadius: { table: { disable: true } },
        loading: { table: { disable: true } },
    },
    args: {
        variant: "circular",
        width: 64,
        height: 64,
        animation: "wave",
    },
};

// 3. Uso Rectangular (Banner/Imagen)
export const RectangularVariant: Story = {
    argTypes: {
        loading: { table: { disable: true } },
    },
    args: {
        variant: "rectangular",
        width: 300,
        height: 150,
        animation: "pulse",
    },
};

// 4. Historia CSF3 interactiva para probar velocidad (duration)
export const AnimatedWithCustomSpeed: Story = {
    argTypes: {
        // El propósito de esta story es demostrar la prop `duration` — los controles de forma son ruido
        borderRadius: { table: { disable: true } },
        loading: { table: { disable: true } },
    },
    args: {
        variant: "text",
        animation: "wave",
        duration: "2.5s",
        width: "80%",
    },
};

// 5. Maqueta de Tarjeta Completa usando Skeletons individuales (Uso Libre)
export const CardSkeletonMockup: Story = {
    argTypes: {
        variant: { table: { disable: true } },
        width: { table: { disable: true } },
        height: { table: { disable: true } },
        borderRadius: { table: { disable: true } },
        loading: { table: { disable: true } },
    },
    render: (args) => (
        <div
            style={{
                width: "320px",
                padding: "16px",
                border: "1px solid var(--theme-border-color, #e2e8f0)",
                borderRadius: "var(--theme-border-radius, 8px)",
                background: "var(--theme-bg-secondary, #f8fafc)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            {/* Imagen Rectangular */}
            <Skeleton variant="rectangular" height={160} animation={args.animation} duration={args.duration} />

            {/* Header: Avatar + Título */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    animation={args.animation}
                    duration={args.duration}
                />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <Skeleton
                        variant="text"
                        width="80%"
                        height={16}
                        animation={args.animation}
                        duration={args.duration}
                    />
                    <Skeleton
                        variant="text"
                        width="40%"
                        height={12}
                        animation={args.animation}
                        duration={args.duration}
                    />
                </div>
            </div>

            {/* Cuerpo del texto */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Skeleton variant="text" width="100%" animation={args.animation} duration={args.duration} />
                <Skeleton variant="text" width="100%" animation={args.animation} duration={args.duration} />
                <Skeleton variant="text" width="60%" animation={args.animation} duration={args.duration} />
            </div>

            {/* Botón */}
            <Skeleton
                variant="rectangular"
                height={36}
                width={100}
                borderRadius={6}
                animation={args.animation}
                duration={args.duration}
            />
        </div>
    ),
};

// 6. Modo Wrapper (Auto-detección)
export const AutoDetectorWrapper: Story = {
    argTypes: {
        variant: { table: { disable: true } },
        width: { table: { disable: true } },
        height: { table: { disable: true } },
        borderRadius: { table: { disable: true } },
    },
    args: {
        loading: true,
    },
    render: (args) => {
        const [loading, setLoading] = useState(args.loading ?? true);

        // Sincronizar el estado local cuando cambia el control en Storybook
        useEffect(() => {
            setLoading(args.loading ?? true);
        }, [args.loading]);

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
                <button
                    onClick={() => setLoading((prev) => !prev)}
                    style={{
                        padding: "8px 16px",
                        background: "var(--theme-primary-color, #6366f1)",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontFamily: "var(--theme-font-family, sans-serif)",
                        fontWeight: 600,
                    }}
                >
                    Alternar Estado: {loading ? "Cargando (Skeleton)" : "Cargado"}
                </button>

                {/* Componente Skeleton actuando como Wrapper */}
                <Skeleton loading={loading} animation={args.animation} duration={args.duration}>
                    <div
                        style={{
                            width: "320px",
                            padding: "16px",
                            border: "1px solid var(--theme-border-color, #e2e8f0)",
                            borderRadius: "var(--theme-border-radius, 8px)",
                            background: "var(--theme-bg-secondary, #f8fafc)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            textAlign: "left",
                        }}
                    >
                        {/* Imagen real */}
                        <div style={{ width: "100%", height: "160px", borderRadius: "4px", overflow: "hidden" }}>
                            <img
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
                                alt="Abstracción moderna"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {/* Avatar real */}
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                    alt="Usuario avatar"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "var(--theme-text-primary)",
                                    }}
                                >
                                    Andrea Belmonte
                                </h3>
                                <span style={{ fontSize: "12px", color: "#64748b" }}>Diseñadora UX/UI</span>
                            </div>
                        </div>

                        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#475569" }}>
                            Este es un ejemplo de contenido real que se convierte automáticamente en skeleton cuando la
                            propiedad `loading` es activa. El diseño mantiene sus dimensiones perfectas.
                        </p>

                        <button
                            style={{
                                alignSelf: "flex-start",
                                padding: "6px 12px",
                                border: "1px solid var(--theme-border-color, #e2e8f0)",
                                borderRadius: "4px",
                                background: "white",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: 500,
                            }}
                        >
                            Ver perfil
                        </button>
                    </div>
                </Skeleton>
            </div>
        );
    },
};

// 7. Velocidades de Animación personalizadas (Comparativa estática)
export const CustomSpeed: Story = {
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
            <div>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Por defecto (1.4s)</span>
                <Skeleton variant="text" />
            </div>
            <div>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Rápida (0.5s - prop duration="0.5s")</span>
                <Skeleton variant="text" duration="0.5s" />
            </div>
            <div>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Lenta (3.5s - prop duration={3.5})</span>
                <Skeleton variant="text" duration={3.5} />
            </div>
        </div>
    ),
};
