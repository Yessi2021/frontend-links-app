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





export const linksSliceUser = createSlice(

    {
    name: 'linksUser',
    initialState: {
        isLoadingLinks: true,
        eventsLinkUser: [
            // templateLink
        ],
        activeEvent: null
    },
    reducers: {
      
       onLoadLinksUser: ( state, {payload = []} ) => {
            state.isLoadingLinks = false;
             state.eventsLink = payload
           
       },

     
    },
    
})

export const { onLoadLinksUser  } = linksSliceUser.actions;