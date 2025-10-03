import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // Aquí tratamos la respuesta como un objeto, no como un arreglo
        const user = response.data;  // Ya no es un arreglo, es un objeto lo que se modificó explicado en cambios.txt
        setDeveloper({ ...user });
      })
      .catch(({ response: { data } }) => {
        console.error(data);
        window.sessionStorage.removeItem('token');
        setDeveloper(null);
        navigate('/');
      });
}

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  )
}

export default Profile
