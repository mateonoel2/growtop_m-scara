"use client"

import { useState } from 'react';


const Task = ({link_status, instrucciones, link, nombre_usuario, codigo, titulo} ) => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(true);

    const toggleDetails = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    // Prueba 1: Estilos de aprendizaje 
    // Ingresa al link del test y complétalo con todos los datos que se requieren, no hay tiempo límite, recuerda que no hay respuesta buena o mala.
    // Regístrate con tus nombres, apellidos y correo en la plataforma.
    // {empresa.codigo}
  return (
    <>
    {link_status === "pending" ? (
      <div className="mt-5 mb-5">
          <div className="flex items-center ">
              <h4 className="text-gray-700 font-semibold text-lg">{titulo}</h4>
              <button onClick={toggleDetails} className="hover:text-green-400 ml-2">
                  {isDetailsVisible ? "-" : "+"}
              </button>
          </div>
          {isDetailsVisible && (
              <div className='rounded bg-gray-200 p-3 m-3'>
                  <p className="mb-2">
                      <span className="font-bold">Instrucciones:</span> {instrucciones}
                  </p>
                  <p className="mb-2">
                      <span className="font-bold">Link:</span> <a href={link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{link}</a>
                  </p>
                  <p className="mb-2">
                      <span className="font-bold">Nombre de usuario:</span> {nombre_usuario}
                  </p>
                  <p className="mb-2">
                      <span className="font-bold">Código:</span> {codigo}
                  </p>
              </div>
          )}
      </div>) : (
      <div className="mt-5 mb-5" >
          <h4 className="text-gray-700 font-semibold text-lg">{titulo}</h4>
          <span className="ml-auto"><span
              className="bg-green-500 py-1 px-2 rounded text-white text-sm">Completado</span></span>
      </div>
  )
  }
  </>
  )
}

export default Task