import { format, parse, startOfWeek, getDay } from 'date-fns'
import esES from 'date-fns/locale/es'
import { dateFnsLocalizer } from 'react-big-calendar'

const locales = {
    es: esES,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
})