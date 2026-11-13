import { useState } from "react";
import type { Checkout, Payment, Pickup } from "../data/types";
import { cn } from "../utils/cn";

type CheckoutFormProps = {
    orderEmpty: boolean;
    onSubmit?: (data: Checkout) => void;
}

const PICKUPS: { value: Pickup; label: string }[] = [
    { value: "ricreazione", label: "Ricreazione" },
    { value: "pranzo", label: "Pranzo" },
]

const PAYMENTS: { value: Payment; label: string }[] = [
    { value: "contanti", label: "Contanti" },
    { value: "carta", label: "Carta" },
]

const MAX_NOTES = 100;

const defaultState = {
    values: {
        name: "",
        schoolClass: "",
        pickup: "ricreazione" as Pickup,
        payment: "contanti" as Payment,
        notes: "",
    },
    errors: {
        name: [] as string[],
        schoolClass: [] as string[],
        notes: [] as string[],
    }
}

const CheckoutForm = ({ orderEmpty, onSubmit }: CheckoutFormProps) => {
    const [formState, setFormState] = useState(defaultState);

    function confirmOrder(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (orderEmpty) return;

        const name = formState.values.name.trim();
        const schoolClass = formState.values.schoolClass.trim();

        let errors = { ...defaultState.errors };

        if (!name) {
            errors = { ...errors, name: ['Nome obbligatorio'] }
        } else {
            if (name.length < 2) {
                errors = {
                    ...errors,
                    name: Array.from(new Set([...errors.name, 'Inserisci almeno 2 caratteri']))
                }
            }
            if (/\d/.test(name)) {
                errors = {
                    ...errors,
                    name: Array.from(new Set([...errors.name, 'Il nome non può contenere numeri']))
                }
            }
        }

        if (!schoolClass) {
            errors = { ...errors, schoolClass: ['Classe obbligatoria'] }
        } else if (!/^[1-5][A-Z]$/.test(schoolClass)) {
            errors = { ...errors, schoolClass: ['Un numero da 1 a 5 seguito da una lettera maiuscola (es. 4B)'] }
        }

        if (formState.values.notes.length > MAX_NOTES) {
            errors = { ...errors, notes: [`Al massimo ${MAX_NOTES} caratteri`] }
        }

        if (Object.values(errors).some(arr => arr.length)) {
            setFormState(prev => ({ ...prev, errors }));
            return;
        };

        setFormState(defaultState);
        onSubmit?.({
            ...formState.values,
            name,
            schoolClass,
            notes: formState.values.notes.trim(),
        });
    }

    return (
        <form onSubmit={confirmOrder} className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">I tuoi dati</h2>

            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Nome per il ritiro"
                value={formState.values.name}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, name: e.target.value },
                    }))
                }}
            />
            {formState.errors.name.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}

            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Classe (es. 4B)"
                value={formState.values.schoolClass}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, schoolClass: e.target.value },
                    }))
                }}
            />
            {formState.errors.schoolClass.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}

            <p className="font-bold">Ritiro</p>
            <div className="flex gap-4">
                {PICKUPS.map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        className={cn("px-4 py-2 bg-gray-200 rounded-full cursor-pointer", {
                            "bg-blue-500 text-white": formState.values.pickup === value,
                        })}
                        onClick={() => {
                            setFormState(prev => ({
                                ...prev,
                                values: { ...prev.values, pickup: value },
                            }))
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <p className="font-bold">Pagamento</p>
            <div className="flex gap-4">
                {PAYMENTS.map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        className={cn("px-4 py-2 bg-gray-200 rounded-full cursor-pointer", {
                            "bg-blue-500 text-white": formState.values.payment === value,
                        })}
                        onClick={() => {
                            setFormState(prev => ({
                                ...prev,
                                values: { ...prev.values, payment: value },
                            }))
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <textarea
                className="bg-gray-200 rounded-2xl w-full py-2 px-4"
                placeholder="Note (facoltative)"
                rows={3}
                value={formState.values.notes}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, notes: e.target.value },
                    }))
                }}
            />
            {formState.errors.notes.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}

            <button
                type="submit"
                disabled={orderEmpty}
                className="rounded-full px-4 py-2 bg-blue-400 w-fit cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Conferma ordine
            </button>
        </form>
    )
}

export default CheckoutForm