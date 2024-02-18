import { createContext, useContext, useMemo, useReducer, useState } from "react"
import { applyDelta, Event, hydrateClientStorage, useEventLoop, refs } from "/utils/state.js"

export const initialState = {"state": {"is_hydrated": false, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}, "state.register_state": {"organ_inputted": false, "searched": false, "vitals": {}}, "state.donor_state": {"form_data": {}, "modal_open": false}, "state.data_state": {"data": [[]]}, "state.iter_state": {"route": [{"name": "Home", "icon": "heart", "link": "/dashboard"}, {"name": "Register a patient", "icon": "heart", "link": "/register/patient"}, {"name": "Register a donor", "icon": "heart", "link": "/register/donor"}]}}

export const ColorModeContext = createContext(null);
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {
  state: createContext(null),
  state__register_state: createContext(null),
  state__donor_state: createContext(null),
  state__data_state: createContext(null),
  state__iter_state: createContext(null),
}
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const onLoadInternalEvent = () => [Event('state.on_load_internal')]

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
    ...onLoadInternalEvent()
]

export const isDevMode = true

export function UploadFilesProvider({ children }) {
  const [filesById, setFilesById] = useState({})
  refs["__clear_selected_files"] = (id) => setFilesById(filesById => {
    const newFilesById = {...filesById}
    delete newFilesById[id]
    return newFilesById
  })
  return (
    <UploadFilesContext.Provider value={[filesById, setFilesById]}>
      {children}
    </UploadFilesContext.Provider>
  )
}

export function EventLoopProvider({ children }) {
  const dispatch = useContext(DispatchContext)
  const [addEvents, connectError] = useEventLoop(
    dispatch,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      {children}
    </EventLoopContext.Provider>
  )
}

export function StateProvider({ children }) {
  const [state, dispatch_state] = useReducer(applyDelta, initialState["state"])
  const [state__register_state, dispatch_state__register_state] = useReducer(applyDelta, initialState["state.register_state"])
  const [state__donor_state, dispatch_state__donor_state] = useReducer(applyDelta, initialState["state.donor_state"])
  const [state__data_state, dispatch_state__data_state] = useReducer(applyDelta, initialState["state.data_state"])
  const [state__iter_state, dispatch_state__iter_state] = useReducer(applyDelta, initialState["state.iter_state"])
  const dispatchers = useMemo(() => {
    return {
      "state": dispatch_state,
      "state.register_state": dispatch_state__register_state,
      "state.donor_state": dispatch_state__donor_state,
      "state.data_state": dispatch_state__data_state,
      "state.iter_state": dispatch_state__iter_state,
    }
  }, [])

  return (
    <StateContexts.state.Provider value={ state }>
    <StateContexts.state__register_state.Provider value={ state__register_state }>
    <StateContexts.state__donor_state.Provider value={ state__donor_state }>
    <StateContexts.state__data_state.Provider value={ state__data_state }>
    <StateContexts.state__iter_state.Provider value={ state__iter_state }>
      <DispatchContext.Provider value={dispatchers}>
        {children}
      </DispatchContext.Provider>
    </StateContexts.state__iter_state.Provider>
    </StateContexts.state__data_state.Provider>
    </StateContexts.state__donor_state.Provider>
    </StateContexts.state__register_state.Provider>
    </StateContexts.state.Provider>
  )
}