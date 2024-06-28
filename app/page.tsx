"use client";

import Task from '@/components/Task';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import estilo_de_aprendizaje from '../assets/images/estilo_de_aprendizaje.png';
import assessment_de_liderazgo from '../assets/images/assessment_de_liderazgo.png';
import test_de_competencias_transversales from '../assets/images/test_de_competencias_transversales.png';
import dinamic_de_assesment_individual from '../assets/images/dinamic_de_assessment_individual.png';


export default function Home() {
    const [email, setEmail] = useState('');
    const { data: session } = useSession();
    const [user, setUser] = useState<any>(null);
    const [empresa, setEmpresa] = useState<any>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [tasks, setTasks] = useState([
        { id: 0, text: 'Prueba 1', completed: false },
        { id: 1, text: 'Prueba 2', completed: false },
        { id: 2, text: 'Prueba 3', completed: false },
        { id: 3, text: 'Sesión en vivo', completed: false },
    ]);

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
            setTasks(tasks.map(task => {
                if (user && user.links_status[task.id] === "completed") {
                    return { ...task, completed: true };
                }
                return task;
            }));
        }
    }, [user]);

    const changeTaskStatus = async (id: number) => {
        if (session && session.user && 'id' in session.user) {
            const response = await fetch(`/api/users/${session.user.id}/tasks`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            setUser(data);
        }
    }


    const handleCheckboxChange = (id: number) => {
        changeTaskStatus(id);
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    };

    const calculateCompletedPercentage = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        return (completedTasks / tasks.length) * 100;
    };

    return (
        <>
            {session === undefined && (
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            {session === null && (
                <div className="mx-auto max-w-lg bg-white p-7 border-t-4 border-green-400 rounded">
                    <div className="mx-auto space-y-8 w-full max-w-md">
                        <form
                            action={async () => {
                                await signIn("email", { email, redirect: false })
                                    .then((value) => {
                                        if (value && value.ok && value.error == null) {
                                            setShowPopup(true);
                                        }
                                        else {
                                            alert("No se pudo iniciar sesión, por favor ingrese un correo válido.")
                                        }
                                    })
                            }}
                        >
                            <input
                                className="rounded mb-4 text-black p-2 w-full border"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Iniciar Sesión
                            </button>
                        </form>
                        {showPopup && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
                                    <p className="mb-4 text-black">Por favor, confirme el correo de verificación que se le ha enviado.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            )}
            {session?.user && user && empresa && (
                <div className="container mx-auto mb-5">
                    <div className='p-0.5 m-2 mb-4 bg-gray-500 rounded-2xl'>
                        <p className='p-5'> ¡Hola! Te damos la bienvenida a la Experiencia de evaluación de Growtop. Este proceso se compone de 4 pruebas: 3 test que puedes realizar desde cualquier dispositivo y 1 sesión en vivo que debes agendar desde el link que está debajo para cumplir con los 4 indicadores y poner a prueba todo tu potencial. ¡Muchos éxitos! </p>
                    </div>
                    <div className="md:flex no-wrap md:-mx-2">
                        <div className="w-full md:w-3/12 md:mx-2">
                            <div className="bg-white p-3 border-t-4 border-green-400 rounded-xl">
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.apellido_paterno} {user.apellido_materno}, {user.nombres}</h1>
                                <h3 className="text-gray-600 font-lg text-semibold leading-6">{user.cargo_actual} | {user.area_actual}</h3>
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
                            <div className="bg-white p-3 hover:shadow rounded-xl">
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
                                <div className="grid grid-cols-[auto,1fr] items-center gap-2">
                                    <div className="mt-3 flex mr-2 ">
                                        <img src={empresa.logo} alt="logo" className="w-10 h-10 rounded-full border-2 border-gray-300" />
                                    </div>
                                    <div className="text-gray-700 mt-2">{empresa.name}</div>
                                </div>
                            </div>

                            <div className="my-4"></div>
                            <div className="bg-white p-3 hover:shadow rounded-xl">
                                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                    <span className="text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle>
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                    </span>
                                    <span>¿Necesitas Ayuda?</span>
                                </div>

                                <div className="text-gray-700 mt-2">
                                    <p className="text-gray-700">Si tienes alguna duda o necesitas ayuda con el proceso, no dudes en contactar a tu especialista de Growtop:</p>
                                    <div className="mt-2">
                                        <a href="diegoc@growtop.pe" className="text-blue-500 hover:text-blue-600">diegoc@growtop.pe</a>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="w-full md:w-9/12 mx-2">

                            <div className="bg-white p-3 shadow-sm rounded-xl">

                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span className="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Tareas Completadas</span>
                                    <div className="flex flex-grow bg-gray-200 rounded-full h-6 mb-4 mt-4 outline outline-1">
                                        <div className="bg-green-400 m-1 rounded-full"
                                            style={{ width: `${calculateCompletedPercentage()}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-gray-700">
                                    <div className="pl-2">
                                        <div className="flex flex-wrap">
                                            {tasks.map(task => (
                                                <button
                                                    key={task.id}
                                                    onClick={() => handleCheckboxChange(task.id)}
                                                    className={`flex items-center mb-2 mr-2 px-3 py-2 rounded-md border border-gray-300 bg-white ${task.completed ? 'line-through' : ''
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => handleCheckboxChange(task.id)}
                                                        className="mr-2 cursor-pointer"
                                                    />
                                                    <span>{task.text}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {tasks.every(task => task.completed) ? (
                                        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                                ¡Felicidades! Has completado todas las tareas,
                                                por favor llene la encuesta de satisfacción para finalizar el proceso.
                                            </h2>
                                            <button
                                                onClick={() => window.open('https://forms.gle/8Z9Z9Z9Z9Z9Z9Z9Z9', '_blank')}
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Encuesta de satisfacción
                                            </button>
                                        </div>

                                    ) :
                                        <p className='pl-2 text-red-400'> No olvides marcar cuando termines con una de las tareas</p>
                                    }
                                </div>
                            </div>

                            <div className="my-4"></div>

                            <div className="bg-white p-3 shadow-sm rounded-xl">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span className="text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </span>
                                    <span className="tracking-wide">Tareas Pendientes</span>
                                </div>
                                <div className="text-gray-700">


                                    <Task
                                        link_status={user.links_status[0]}
                                        instrucciones={"Ingresa al link del test y complétalo con todos los datos que se requieren, no hay tiempo límite, recuerda que no hay respuesta buena o mala."}
                                        link={user.links[0]}
                                        nombre_usuario={"Regístrate con tus nombres, apellidos y correo en la plataforma."}
                                        codigo={empresa.codigo}
                                        titulo={"Prueba 1: Estilos de aprendizaje"}
                                        vector={estilo_de_aprendizaje}
                                    />

                                    <Task
                                        link_status={user.links_status[1]}
                                        instrucciones={"Te llegará un correo de bienvenida directamente de la plataforma LEIRO ASSESSMENTS con un link, tu correo y una contraseña para ingresar directamente a una plataforma con una imagen como la de arriba."}
                                        link={user.links[1]}
                                        nombre_usuario={"CORREO ELECTRÓNICO al que te llegó esta comunicación y la contraseña la podrás encontrar en el correo de “PRUEBA APL”"}
                                        codigo={""}
                                        titulo={"Prueba 2: Potencial de liderazgo"}
                                        vector={assessment_de_liderazgo}
                                    />

                                    <Task
                                        link_status={user.links_status[2]}
                                        instrucciones={"Ingresa al link a continuación para acceder al sitio. La primera vez que inicie sesión en el sitio, deberá registrarse con nombres, apellidos y correo. Recuerda no cerrar el explorador cuando estés realizando la evaluación para evitar el cierre del sistema."}
                                        link={user.links[2]}
                                        nombre_usuario={"Regístrate con tus nombres, apellidos y correo en la plataforma."}
                                        codigo={""}
                                        titulo={"Prueba 3: Test de competencias transversales"}
                                        vector={test_de_competencias_transversales}
                                    />

                                    <Task
                                        link_status={user.links_status[3]}
                                        instrucciones={"Ingresa al link de CALENDLY y agenda tu sesión con un especialista de Growtop de acuerdo con los horarios disponibles para pasar esta evaluación a través de Microsoft Teams. Recuerda que la sesión individual dura una 1 hora y 30 minutos. Las indicaciones del reto que debes cumplir las conocerás durante la sesión, recuerda estar puntual en la sesión."}
                                        link={user.links[3]}
                                        nombre_usuario={"Regístrate con tus nombres, apellidos y correo en la plataforma."}
                                        codigo={""}
                                        titulo={"Sesión en vivo: Dinámica de Assesment individual"}
                                        vector={dinamic_de_assesment_individual}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}