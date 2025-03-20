import React from 'react';
import "./Modal.css";
import  {useSelector, useDispatch} from 'react-redux';
import {openModal} from '../actions/modalAction';

const Modal = () => {
    const dispatch = useDispatch ()
    const modal = useSelector((state) => state.modal);
    const {openClose, content} = modal;
    
    let modalInlineStyle;

    if(openClose === 'open') {
        modalInlineStyle = {
            display: 'block',
        }
    } else {
        modalInlineStyle = {
            display: 'none',
        }
      
    }
    const closeModalHandler = () => {
        dispatch(openModal("close", ""))
    };
  return (
    <div className='site-modal' style={modalInlineStyle}>
      <div className='modal-content'>
        <div className='col right'>
            <span onClick={closeModalHandler} className='close'> &times;</span>
        </div>
        <div>{content}</div>
      </div>
    </div>
  )
}

export default Modal


// const Modal = ({setIsOpen}) => {
//   return (
//     <>
//     <div onClick={() => setOpen(false)}> 
//     <div style= {}>
//       <h3> Test Modal</h3>
//       <button onClick={() => setIsOpen(false)}>Close</button>
//       <p> This is a simple modal</p>

//     </div>
//     </div>
//     </>
//   )
// }
