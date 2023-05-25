import { createSlice } from "@reduxjs/toolkit";



// const templateLink =  {
//     _id: new Date().getTime(),
//     title:'aprender',
//     notes:'Hay que aprender mas Nextjs',
//     user: {
//       _id:1234,
//       name: "Alexander"
//     }
// }





export const linksSlice = createSlice(

    {
    name: 'links',
    initialState: {
        isLoadingLinks: true,
        eventsLink: [
            // templateLink
        ],
        activeEvent: null
    },
    reducers: {
       onSetActiveLinks: (state, { payload } ) => {
            state.activeEvent = payload
       },

         onAddNewEvent: (state, {payload} ) => {
            state.eventsLink.push(payload)
            state.activeEvent = null;
       },
       onUpdateLinks: ( state, {payload} ) => { 
            state.eventsLink = state.eventsLink.map(link => {
                if ( link.id === payload.id){
                    return payload
                }
                return link
            })
       },
       onDeleteLinks: (state ) => {
            if ( state.activeEvent ){
                  state.eventsLink = state.eventsLink.filter( link => link.id !== state.activeEvent.id )
                state.activeEvent = null
            }
          
       },
       onLoadLinks: ( state, {payload = []} ) => {
            state.isLoadingLinks = false;
            // state.eventsLink = payload
            // validar si el evento ta existe en el store
            payload.forEach( link => {
                const exists = state.eventsLink.some( dbLink => dbLink.id === link.id )
                if ( !exists ) {
                    state.eventsLink.push(link)
                }
            })
       },

       onLogoutLink: (state) => {
        
            state.isLoadingLinks= true,
            state.eventsLink = [],
            state.activeEvent = null
       
       },
  
   
     
    },
    
})

export const {  onSetActiveLinks,  onAddNewEvent,  onUpdateLinks, onDeleteLinks,  onLoadLinks, onLogoutLink,  onLoadUserLink } = linksSlice.actions;