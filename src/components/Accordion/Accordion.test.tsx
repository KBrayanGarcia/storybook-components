import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";
import type { AccordionItem } from "./Accordion.types";

const mockItems: AccordionItem[] = [
    {
        id: "1",
        title: "Título 1",
        subtitle: "Subtítulo 1",
        content: "Contenido 1",
    },
    {
        id: "2",
        title: "Título 2",
        content: "Contenido 2",
    },
    {
        id: "3",
        title: "Título 3",
        content: "Contenido 3",
        disabled: true,
    },
];

describe("Accordion Component", () => {
    it("debería renderizar todos los elementos del acordeón correctamente", () => {
        render(<Accordion items={mockItems} />);

        expect(screen.getByText("Título 1")).toBeInTheDocument();
        expect(screen.getByText("Subtítulo 1")).toBeInTheDocument();
        expect(screen.getByText("Título 2")).toBeInTheDocument();
        expect(screen.getByText("Título 3")).toBeInTheDocument();
    });

    it("debería aplicar las clases CSS correspondientes a variante y tamaño", () => {
        const { container } = render(
            <Accordion items={mockItems} variant="separated" size="large" className="mi-clase" />,
        );

        const accordionElement = container.firstChild;
        expect(accordionElement).toHaveClass("custom-accordion");
        expect(accordionElement).toHaveClass("custom-accordion--separated");
        expect(accordionElement).toHaveClass("custom-accordion--large");
        expect(accordionElement).toHaveClass("mi-clase");
    });

    it("debería expandir y colapsar un elemento en modo no controlado", async () => {
        render(<Accordion items={mockItems} />);

        const header = screen.getByRole("button", { name: /título 1/i });
        const panel = screen.getByRole("region", { name: /título 1/i });

        expect(header).toHaveAttribute("aria-expanded", "false");
        expect(panel).not.toHaveClass("custom-accordion__panel--expanded");

        await userEvent.click(header);

        expect(header).toHaveAttribute("aria-expanded", "true");
        expect(panel).toHaveClass("custom-accordion__panel--expanded");

        await userEvent.click(header);

        expect(header).toHaveAttribute("aria-expanded", "false");
        expect(panel).not.toHaveClass("custom-accordion__panel--expanded");
    });

    it("debería colapsar otros elementos si allowMultiple es falso", async () => {
        render(<Accordion items={mockItems} allowMultiple={false} />);

        const header1 = screen.getByRole("button", { name: /título 1/i });
        const header2 = screen.getByRole("button", { name: /título 2/i });

        await userEvent.click(header1);
        expect(header1).toHaveAttribute("aria-expanded", "true");

        await userEvent.click(header2);
        expect(header1).toHaveAttribute("aria-expanded", "false");
        expect(header2).toHaveAttribute("aria-expanded", "true");
    });

    it("debería mantener múltiples elementos abiertos si allowMultiple es verdadero", async () => {
        render(<Accordion items={mockItems} allowMultiple={true} />);

        const header1 = screen.getByRole("button", { name: /título 1/i });
        const header2 = screen.getByRole("button", { name: /título 2/i });

        await userEvent.click(header1);
        await userEvent.click(header2);

        expect(header1).toHaveAttribute("aria-expanded", "true");
        expect(header2).toHaveAttribute("aria-expanded", "true");

        await userEvent.click(header1);
        expect(header1).toHaveAttribute("aria-expanded", "false");
        expect(header2).toHaveAttribute("aria-expanded", "true");
    });

    it("debería admitir defaultExpandedIds para inicializar elementos abiertos", () => {
        render(<Accordion items={mockItems} defaultExpandedIds={["1"]} />);

        const header1 = screen.getByRole("button", { name: /título 1/i });
        const header2 = screen.getByRole("button", { name: /título 2/i });

        expect(header1).toHaveAttribute("aria-expanded", "true");
        expect(header2).toHaveAttribute("aria-expanded", "false");
    });

    it("no debería expandir elementos deshabilitados al hacer clic", async () => {
        const onChangeSpy = vi.fn();
        render(<Accordion items={mockItems} onChange={onChangeSpy} />);

        const disabledHeader = screen.getByRole("button", { name: /título 3/i });
        expect(disabledHeader).toBeDisabled();

        // Invocamos directamente el manejador de clic de React expuesto internamente en el nodo del DOM,
        // ya que React bloquea la propagación de eventos sintéticos en botones deshabilitados de forma nativa.
        const reactPropsKey = Object.keys(disabledHeader).find(
            (key) => key.startsWith("__reactProps$") || key.startsWith("__reactEventHandlers$"),
        );
        if (reactPropsKey) {
            (disabledHeader as any)[reactPropsKey].onClick({
                preventDefault: () => {},
                stopPropagation: () => {},
            });
        }

        expect(disabledHeader).toHaveAttribute("aria-expanded", "false");
        expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it("debería comportarse en modo controlado y llamar a onChange", async () => {
        const onChangeSpy = vi.fn();
        const { rerender } = render(<Accordion items={mockItems} expandedIds={["1"]} onChange={onChangeSpy} />);

        const header1 = screen.getByRole("button", { name: /título 1/i });
        const header2 = screen.getByRole("button", { name: /título 2/i });

        expect(header1).toHaveAttribute("aria-expanded", "true");
        expect(header2).toHaveAttribute("aria-expanded", "false");

        await userEvent.click(header2);

        // En modo controlado, la UI no cambia hasta que cambien las props
        expect(header2).toHaveAttribute("aria-expanded", "false");
        expect(onChangeSpy).toHaveBeenCalledWith(["2"]);

        rerender(<Accordion items={mockItems} expandedIds={["1", "2"]} allowMultiple={true} onChange={onChangeSpy} />);
        expect(header1).toHaveAttribute("aria-expanded", "true");
        expect(header2).toHaveAttribute("aria-expanded", "true");
    });

    it("debería comportarse correctamente en modo controlado con allowMultiple habilitado", async () => {
        const onChangeSpy = vi.fn();
        render(<Accordion items={mockItems} expandedIds={["1"]} allowMultiple={true} onChange={onChangeSpy} />);

        const header2 = screen.getByRole("button", { name: /título 2/i });
        await userEvent.click(header2);

        expect(onChangeSpy).toHaveBeenCalledWith(["1", "2"]);
    });
});
