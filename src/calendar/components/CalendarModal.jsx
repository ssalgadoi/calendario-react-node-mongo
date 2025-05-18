// Importa funciones para manejar fechas desde la librería date-fns
import { addHours, differenceInSeconds } from 'date-fns';
// Importa hooks de React
import { useEffect, useMemo, useState } from 'react';
// Importa el componente Modal para mostrar el formulario en un modal
import Modal from 'react-modal';
// Importa el componente DatePicker para seleccionar fechas
import DatePicker, { registerLocale } from "react-datepicker";
// Importa los estilos por defecto del selector de fechas
import "react-datepicker/dist/react-datepicker.css";
// Importa el idioma español para usarlo en el selector de fechas
import { es } from 'date-fns/locale/es';
// Importa estilos y librería para mostrar alertas modernas
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2';
// Importa el hook personalizado que maneja el estado de apertura del modal
import { useCalendarStore, useUiStore } from '../../hooks';

// Registra el idioma español en el DatePicker
registerLocale('es', es)

// Estilos personalizados para centrar el modal en pantalla
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Establece el elemento raíz del modal para accesibilidad
Modal.setAppElement('#root');

// Componente funcional del modal del calendario
export const CalendarModal = () => {

    // Obtiene del store si el modal está abierto y la función para cerrarlo
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();

    // Estado que indica si se intentó enviar el formulario
    const [fromSubmitted, setFormSubmitted] = useState(false);

    // Estado del formulario con valores por defecto
    const [formValues, setFormValues] = useState({
        title: '', // título inicial
        notes: '', // notas iniciales
        start: new Date(), // fecha de inicio: ahora
        end: addHours(new Date(), 2) // fecha de fin: ahora + 2 horas
    })

    // Determina la clase del input del título, útil para validaciones visuales
    const titleClass = useMemo(() => {
        if (!fromSubmitted) return ''; // si no se ha intentado enviar, sin clase
        return (formValues.title.length > 0)
            ? '' // si tiene título, sin clase
            : 'is-invalid' // si está vacío, muestra clase de error
    }, [formValues.title, fromSubmitted])
    useEffect(() => {
        if ( activeEvent !== null)
            setFormValues({ ...activeEvent })
    }, [activeEvent])
    // Maneja cambios en inputs de texto (title, notes)
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    // Maneja cambios en las fechas (start, end)
    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    // Cierra el modal
    const onCloseModal = () => {
        closeDateModal()
    }

    // Maneja el envío del formulario
    const onSubmit = (event) => {
        event.preventDefault(); // evita el comportamiento por defecto (recargar)
        setFormSubmitted(true) // indica que se intentó enviar el formulario

        // Calcula la diferencia en segundos entre la fecha de fin e inicio
        const difference = differenceInSeconds(formValues.end, formValues.start);

        // Si las fechas no son válidas o el fin es antes del inicio, muestra error
        if (isNaN(difference) || difference <= 0) {
            Swal.fire("Fechas incorrectas", "Revisar las fechas ingresada", "error")
            return;
        }

        // Si el título está vacío, no continúa
        if (formValues.title.length <= 0) return;

        // Aquí podrías hacer un dispatch al store o una petición al backend
        console.log(formValues);
    }

    // JSX que representa el contenido del modal
    return (
        <>
            <Modal
                isOpen={isDateModalOpen} // abre el modal si es true
                onRequestClose={onCloseModal} // permite cerrarlo al hacer clic fuera o presionar ESC
                style={customStyles} // aplica estilos personalizados
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200} // tiempo para animación de cierre
            >
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={onSubmit}>
                    {/* Fecha y hora de inicio */}
                    <div className="form-group mb-2">
                        <label className="form-label d-block">Fecha y hora inicio</label>
                        <DatePicker
                            locale='es'
                            showTimeSelect
                            dateFormat='Pp'
                            className='form-control'
                            onChange={(event) => onDateChange(event, 'start')}
                            selected={formValues.start}
                            timeCaption='Hora'
                        />
                    </div>

                    {/* Fecha y hora de fin */}
                    <div className="form-group mb-2">
                        <label className="form-label d-block">Fecha y hora fin</label>
                        <DatePicker
                            showTimeSelect
                            locale='es'
                            minDate={formValues.start}
                            dateFormat='Pp'
                            className='form-control'
                            onChange={(event) => onDateChange(event, 'end')}
                            selected={formValues.end}
                        />
                    </div>

                    <hr />
                    {/* Campo de título del evento */}
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${titleClass}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={onInputChanged}
                        />
                        <small className="form-text text-muted">Una descripción corta</small>
                    </div>

                    {/* Campo de notas */}
                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={formValues.notes}
                            onChange={onInputChanged}
                        ></textarea>
                        <small className="form-text text-muted">Información adicional</small>
                    </div>

                    {/* Botón para guardar */}
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </Modal>
        </>
    )
}
