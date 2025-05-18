import { Calendar } from 'react-big-calendar'

import { NavBar } from "../components/NavBar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useCalendarStore, useUiStore } from '../../hooks'






export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');
  const { events } = useCalendarStore();


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
    // console.log({ doubleClick: event });
    openDateModal ( event )

  }
  const onSelect = (event) => {
    console.log({ click: event });

  }
  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event)
    setLastView(event);
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
