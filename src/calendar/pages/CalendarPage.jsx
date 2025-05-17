import { Calendar } from 'react-big-calendar'

import { NavBar } from "../components/NavBar"
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'




const events = [{
  title: 'Cumpleaños del Jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Chipy'
  }
}]


export const CalendarPage = () => {

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });

  }
  const onSelect = (event) => {
    console.log({ click: event });

  }
  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event)
    
  }
  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick}
        onSelectEvent={ onSelect}
        onView={ onViewChanged}
      />
      <CalendarModal/>
    </>
  )
}
