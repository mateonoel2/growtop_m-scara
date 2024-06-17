"use client"

import { useState } from 'react';
import Image from 'next/image';

const Task = ({link_status, instrucciones, link, nombre_usuario, codigo, titulo, vector} ) => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(true);

    const toggleDetails = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

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
              <div className='rounded-xl bg-gray-200 p-3 m-3 grid-cols-2 grid'>
                <div className="flex flex-col">
                  <p className="mb-2">
                      <span className="font-bold">Instrucciones:</span> {instrucciones}
                  </p>
                  <p className="mb-2">
                      <span className="font-bold">Link:</span> <a href={link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{link}</a>
                  </p>
                  <p className="mb-2">
                      <span className="font-bold">Nombre de usuario:</span> {nombre_usuario}
                  </p>
                  {codigo && (
                  <p className="mb-2">
                      <span className="font-bold">Código:</span> {codigo}
                  </p>)}
                </div>
                <div className="flex justify-center">
                  <Image className="rounded-2xl" src={vector} alt="vector" height={300} width={'auto'} />
                  </div>
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