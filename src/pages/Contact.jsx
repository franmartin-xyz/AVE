import React from 'react'
import "./contact.css"
const Contact = () => {
    function handleSubmit(e){
        e.preventDefault();
        let data =new FormData(e.target)
        console.log(data.get("subject"),data.ger("text"))
    }
  return (
    <div className='contacto__cont'>
        <div className='contacto__color'>
            <title>Envianos un comentario</title>
            <span>estamos para responder tus dudas</span>
        </div>
        <div className='wrapper__contacto'>
            <form action="sendMsg" onSubmit={e=>handleSubmit(e)} className="form__contact">
                <label htmlFor="subject">Encabezado</label>
                <input type="text" name='subject' id='subject' required={true} placeholder="Asunto. . ." className="form__subject" />
                <label htmlFor="text">Comentario</label>
                <textarea form="sendMsg" name='text' id='text' required={true} placeholder="Mensaje. . ." className="form__message"/>
                <button type='submit' className='form__submitBtn'>Enviar</button>
            </form>
        </div>
    </div>
  )
}

export default Contact