import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { MecaContext } from "../context/MecaContext";

export const ActividadesPage = () => {
    const { futbol, padel, boxeo, gym } = useContext(MecaContext);


    // Notas de las actividades
    const [notes, setNotes] = useState({
        futbol: "",
        padel: "",
        boxeo: "",
        gym: "",
    });


    // Saber que notas se están editando
    const [editing, setEditing] = useState({
        futbol: false,
        padel: false,
        boxeo: false,
        gym: false,
    });


    // Cargar notas desde el backend al iniciar el componente
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get("https://meca-admin-backend.onrender.com/notas");
                // Mapea las actividades a un objeto con la actividad como clave y la nota como valor
                const fetchedNotes = response.data.reduce((acc, note) => {
                    acc[note.actividad] = note.nota;
                    return acc;
                }, {});
                setNotes(fetchedNotes);
            } catch (error) {
                console.error("Error al cargar notas:", error);
            }
        };

        fetchNotes();
    }, []);

    // Maneja los cambios en las notas
    const handleNoteChange = (activity, value) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            [activity]: value,
        }));
    };

    // Alterna en modo de edicion y modo de visualizacion
    const toggleEdit = async (activity) => {
        const isEditing = editing[activity]; // Saber si la sección está en edición

        // Si se está saliendo del modo de edición, guardar la nota en el backend
        if (isEditing) {
            try {
                const res = await axios.post("https://meca-admin-backend.onrender.com/notas", {
                    actividad: activity,
                    nota: notes[activity],
                });
            } catch (error) {
                console.error("Error al guardar la nota:", error);
            }
        }

        // Alternar el modo de edición con el de visualizacion
        setEditing((prevEditing) => ({
            ...prevEditing,
            [activity]: !prevEditing[activity],
        }));
    };


    // Función para renderizar una ctividad con participantes y anotaciones.
    const renderNoteSection = (activity, title, participants) => (
        <div className="border-r border-gray-600 p-2">
            <span className="font-semibold text-lg border-b pb-1">
                {title} <span>({participants.length})</span>
            </span>
            <div
                className={`mt-4 p-2 rounded border ${editing[activity]
                    ? "border-blue-500 bg-gray-800"
                    : "border-gray-600 bg-gray-700"
                    }`}
                onClick={() => !editing[activity] && toggleEdit(activity)} // Permite activar el modo de edición
            >
                {editing[activity] ? (
                    // Si está en modo de edición, mostrar un textarea
                    <textarea
                        className="w-full p-2 bg-transparent text-white outline-none resize-none"
                        style={{ minHeight: "60px" }}
                        value={notes[activity]}
                        onChange={(e) => handleNoteChange(activity, e.target.value)}
                        onBlur={() => toggleEdit(activity)} // Guardar y salir del modo de edición
                        autoFocus
                    />
                ) : (
                    // Si no está en modo de edición, mostrar el texto
                    <div className="text-white text-sm whitespace-pre-wrap cursor-pointer">
                        {notes[activity] || "Haz clic para agregar una nota..."}
                    </div>
                )}
            </div>
            <ul className="mt-5 flex flex-col gap-2">
                {participants.length === 0 ? (
                    <li className="font-semibold text-lg">No hay inscriptos</li>
                ) : (
                    participants.map((act) => (
                        <li key={act.dni} className="font-light text-lg">
                            <Link to={`/socio/${act.dni}`}>{act.nombre}</Link>
                        </li>
                    ))
                )}
            </ul>

        </div>
    );

    return (
        <section style={{ backgroundColor: "#001529", width: "100%" }}>
            <div className="text-white text-center m-10">
                <div className="flex">
                    <Link
                        to={"/"}
                        className="text-sm align-center font-semibold underline hover:text-blue-200"
                    >
                        Atrás
                    </Link>
                    <h1 className="text-3xl font-bold mb-16 flex-1">ACTIVIDADES</h1>
                </div>
                <div className="grid grid-cols-4 border border-gray-600 p-4 rounded gap-4">
                    {renderNoteSection("futbol", "ACADEMIA FUTBOL", futbol)}
                    {renderNoteSection("padel", "ACADEMIA PADEL", padel)}
                    {renderNoteSection("boxeo", "BOXEO", boxeo)}
                    {renderNoteSection("gym", "GIMNASIO", gym)}
                </div>
            </div>
        </section>
    );
};
