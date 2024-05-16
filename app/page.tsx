"use client";

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
    const { data: session } = useSession();
    const [user, setUser] = useState<any>(null);
    const [empresa, setEmpresa] = useState<any>(null);

    const fetchUserData = async () => {
        if (session && session.user && 'id' in session.user) {
            const response = await fetch(`/api/users/${session.user.id}`);
            const data = await response.json();
            setUser(data);
        }
    };

    const fetchEmpresaData = async () => {
        if (user && user._empresaId) {
            const response = await fetch(`/api/empresa/${user._empresaId}`);
            const data = await response.json();
            setEmpresa(data);
        }
    };

    useEffect(() => {
        if (session && session.user) {
            fetchUserData();
        }
    }, [session]);

    useEffect(() => {
        if (user) {
            fetchEmpresaData();
        }
    }, [user]);

    return (
        <>
            {!session && (
                <div className="mx-auto max-w-60 bg-white p-3 border-t-4 border-green-400 rounded">
                    <div className="mx-auto space-y-8 w-40">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingresar</h2>
                        </div>
                        <div>
                            <button
                                type="button"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                onClick={() => {
                                    signIn()
                                }}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>

            )}
            {session?.user && user && empresa && (
                <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                            <div className="bg-white p-3 border-t-4 border-green-400">
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.apellido_paterno} {user.apellido_materno}, {user.nombres}</h1>
                                <h3 className="text-gray-600 font-lg text-semibold leading-6">{user.cargo_actual} | {user.area_actual}</h3>
                                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">El Assessment de Competencias se está utilizando para el
                                    siguiente proceso: {user.razon_assesment}</p>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li className="flex items-center py-3">
                                        <span>Fin del assesment</span>
                                        <span className="ml-auto">{empresa.fecha_fin}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="my-4"></div>
                            <div className="bg-white p-3 hover:shadow">
                                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                    <span className="text-green-500">
                                        <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </span>
                                    <span>Empresa</span>
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <div className="mt-3 flex justify-end mr-2">
                                        <img src={empresa.logo} alt="logo" className="w-10 h-10 rounded-full border-2 border-gray-300" />
                                    </div>
                                    <div className="text-gray-700 mt-2">{empresa.name}</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-9/12 mx-2 h-64">

                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span className="text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </span>
                                    <span className="tracking-wide">Tareas Pendientes</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="text-gray-700">
                                        {user.links.map((link: string, index: number) => {
                                            if (user.links_status[index] === "pending") {
                                                return (
                                                    <div key={index} className="grid grid-cols-2">
                                                        <div className="text-gray-700 mt-3">
                                                            <a href={link} target="_blank" rel="noreferrer">{link}</a>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                </div>
                            </div>


                            <div className="my-4"></div>


                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span className="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Tareas Completadas</span>
                                </div>
                                <div className="text-gray-700">
                                    {user.links.map((link: string, index: number) => {
                                        if (user.links_status[index] === "approved") {
                                            return (
                                                <div key={index} className="grid grid-cols-2">
                                                    <div className="text-gray-700 mt-3">
                                                        <a href={link} target="_blank" rel="noreferrer">{link}</a>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
