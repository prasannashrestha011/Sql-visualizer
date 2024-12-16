import SqlVisualizer from '@/app_components/Visualizer/VisualizerRenderer'
import { store } from '@/redux/store';
import React from 'react'
import { Provider } from 'react-redux';
const index = () => {
  return (
   <Provider store={store}>
     <div className='overflow-hidden'>
    
        <SqlVisualizer/>
    </div>
   </Provider>
  )
}

export default index