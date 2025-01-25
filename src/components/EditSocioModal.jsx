import { useContext, useState, useEffect } from "react";
import { MecaContext } from "../context/MecaContext";
import { SelectActivities } from "./SelectActivities";
import { Input, Modal } from "antd";
import axios from "axios";

export const EditSocioModal = ({ formState, setFormState, socio, isModalOpen, setIsModalOpen, newActivities, setNewActivities, newCategoryPadel, setNewCategoryPadel }) => {
    const { getBirthdays, getSocios, setAlert, setErrorAlert } = useContext(MecaContext)
    const [isLoading, setIsLoading] = useState(false)
    const { nombre = '', fecha_nacimiento = '', mail = '', telefono = '', notas = '' } = formState;

    const closeModal = async () => {
        const activitiesToIdMap = {
            'gimnasio': 1,
            'academia_futbol': 2,
            'academia_padel': 3,
            'boxeo': 4,
        }

        const getIdActivities = (nombresActividades) => {
            return nombresActividades.map(nombre => activitiesToIdMap[nombre]).filter(id => id !== undefined);
        };
        const idActividades = getIdActivities(newActivities);
        try {
            setIsLoading(true)
            await axios.put(`https://meca-admin-backend.onrender.com/actualizar-socio/${socio.dni}`, {
                ...formState,
                id_socio: socio.id_socio,
                idActividades,
                categoria_padel: newCategoryPadel
            });
            getBirthdays()
            getSocios()
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 2000);
        } catch (error) {
            setErrorAlert(true);
            console.log(error);
            setTimeout(() => {
                setErrorAlert(false);
            }, 2000);

        } finally {
            setIsLoading(false)
            setIsModalOpen(false);
        };

    };


    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    function handleInputFormChange({ target }) {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    return (
        <>
            <Modal title="Editar Socio" open={isModalOpen} onOk={closeModal} onCancel={handleCancelModal} confirmLoading={isLoading} >
                <form >
                    <div className="flex flex-col gap-4">
                        <Input placeholder='Nombre' name='nombre' value={nombre} onChange={handleInputFormChange} defaultValue={socio.nombre} />
                        <Input placeholder='Email' name='mail' value={mail} onChange={handleInputFormChange} defaultValue={socio.mail} />
                        <Input placeholder='Telefono' name='telefono' value={telefono} onChange={handleInputFormChange} defaultValue={socio.telefono} />
                        <Input placeholder='Fecha de Nacimiento' name='fecha_nacimiento' value={fecha_nacimiento} onChange={handleInputFormChange} defaultValue={socio.fecha_nacimiento} />
                        <textarea className="p-2 border rounded-md border-gray-300" placeholder="Notas Adicionales" name="notas" value={notas} onChange={handleInputFormChange} defaultValue={socio.notas ? socio.notas : ''} />
                        <SelectActivities defaultActivities={newActivities} setNewActivities={setNewActivities} newCategoryPadel={newCategoryPadel} setNewCategoryPadel={setNewCategoryPadel} />
                    </div>
                </form>
            </Modal>
        </>
    )
}
