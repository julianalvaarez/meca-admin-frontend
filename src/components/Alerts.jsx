import { useContext } from "react"
import { MecaContext } from "../context/MecaContext"
import { Alert } from "antd"

export const Alerts = () => {
    const { alert, setAlert, errorAlert, setErrorAlert, deleteAlert, setDeleteAlert, createAlert, setCreateAlert } = useContext(MecaContext)

    const handleCloseAlerts = () => {
        setAlert(false);
        setErrorAlert(false);
        setDeleteAlert(false);
        setCreateAlert(false);
    };
    return (
        <>
            {alert && (
                <Alert message="Socio Actualizado" type="success" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleCloseAlerts}
                />
            )}
            {createAlert && (
                <Alert message="Socio Creado" type="success" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleCloseAlerts}
                />
            )}
            {deleteAlert && (
                <Alert message="Socio Eliminado" type="success" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleCloseAlerts}
                />
            )}
            {errorAlert && (
                <Alert message="El Socio no pudo ser actualizado" type="error" showIcon closable style={{ position: 'fixed', bottom: '10px', right: '10px' }} onClose={handleCloseAlerts}
                />
            )}
        </>
    )
}
